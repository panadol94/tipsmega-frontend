"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export default function VisitorTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Only fire once per session
        if (sessionStorage.getItem("visitor_tracked")) return;
        sessionStorage.setItem("visitor_tracked", "1");

        // Fire and forget - silent notification
        fetch(`${API_BASE}/api/visitor-notify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                page: pathname || "/",
                referrer: document.referrer || "",
                userAgent: navigator.userAgent || "",
            }),
        }).catch(() => {
            // Silent fail - never break user experience
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return null; // Invisible component
}
