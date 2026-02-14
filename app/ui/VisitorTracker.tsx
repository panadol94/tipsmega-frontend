"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

// Generate or retrieve persistent visitor ID
function getVisitorId(): string {
    let id = localStorage.getItem("visitor_id");
    if (!id) {
        id = "v_" + crypto.randomUUID();
        localStorage.setItem("visitor_id", id);
    }
    return id;
}

// Parse UTM params from URL
function getUtmParams() {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
        utmSource: params.get("utm_source") || "",
        utmMedium: params.get("utm_medium") || "",
        utmCampaign: params.get("utm_campaign") || "",
    };
}

// Get battery level (async, may not be available)
async function getBatteryLevel(): Promise<number | null> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nav = navigator as any;
        if (nav.getBattery) {
            const battery = await nav.getBattery();
            return Math.round(battery.level * 100);
        }
    } catch {
        // Battery API not available
    }
    return null;
}

export default function VisitorTracker() {
    const pathname = usePathname();
    const trackedPages = useRef<Set<string>>(new Set());
    const sessionStartTime = useRef<number>(0);
    const visitorIdRef = useRef<string>("");

    // Initialize session start time (avoid impure call during render)
    useEffect(() => {
        sessionStartTime.current = Date.now();
    }, []);

    // Send visitor notification for a page
    const notifyVisit = useCallback(async (page: string) => {
        try {
            const visitorId = getVisitorId();
            visitorIdRef.current = visitorId;

            const battery = await getBatteryLevel();
            const utm = getUtmParams();

            const payload = {
                page,
                referrer: document.referrer || "",
                userAgent: navigator.userAgent || "",
                visitorId,
                screenRes: `${screen.width}x${screen.height}`,
                language: navigator.language || "",
                battery,
                ...utm,
            };

            fetch(`${API_BASE}/api/visitor-notify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }).catch(() => { });
        } catch {
            // Silent fail
        }
    }, []);

    // Send leave notification
    const notifyLeave = useCallback(() => {
        const visitorId = visitorIdRef.current;
        if (!visitorId) return;

        const duration = (Date.now() - sessionStartTime.current) / 1000;
        if (duration < 2) return; // Ignore instant bounces

        const payload = JSON.stringify({ visitorId, duration });

        // Use sendBeacon for reliable delivery on page close
        if (navigator.sendBeacon) {
            const blob = new Blob([payload], { type: "application/json" });
            navigator.sendBeacon(`${API_BASE}/api/visitor-leave`, blob);
        } else {
            fetch(`${API_BASE}/api/visitor-leave`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload,
                keepalive: true,
            }).catch(() => { });
        }
    }, []);

    // Track each page navigation
    useEffect(() => {
        const page = pathname || "/";

        // Skip if this page was already tracked this session
        if (trackedPages.current.has(page)) return;
        trackedPages.current.add(page);

        notifyVisit(page);
    }, [pathname, notifyVisit]);

    // Session duration tracking on page leave
    useEffect(() => {
        const handleBeforeUnload = () => notifyLeave();
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                notifyLeave();
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [notifyLeave]);

    return null; // Invisible component
}
