"use client";

import { useEffect, useRef } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";
const SYNC_INTERVAL_MS = 10000; // Check every 10 seconds for near real-time updates

interface UseStarSyncOptions {
    token: string | null;
    deviceId: string;
    onStarsUpdated: (newStars: number, claimedAmount: number) => void;
    enabled?: boolean;
}

/**
 * Custom hook to automatically sync bonus stars from user ledger to device
 * Polls server every 10 seconds to check for pending stars and auto-claims them
 */
export function useStarSync({
    token,
    deviceId,
    onStarsUpdated,
    enabled = true,
}: UseStarSyncOptions) {
    const syncingRef = useRef(false);

    useEffect(() => {
        if (!token || !enabled) return;

        const checkAndClaim = async () => {
            // Prevent concurrent syncs
            if (syncingRef.current) return;

            try {
                syncingRef.current = true;

                // 1. Check for pending stars
                const checkRes = await fetch(`${API_BASE}/api/auth/check-pending`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!checkRes.ok) {
                    console.warn("Star sync: check-pending failed");
                    return;
                }

                const { pending } = await checkRes.json();

                // 2. If pending > 0, claim them
                if (pending > 0) {
                    console.log(`✨ Detected ${pending} pending stars, claiming...`);

                    const grantRes = await fetch(`${API_BASE}/api/auth/grant-device`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ deviceId }),
                    });

                    if (grantRes.ok) {
                        const { stars } = await grantRes.json();
                        console.log(`✅ Stars claimed! New total: ${stars}`);
                        onStarsUpdated(stars, pending);
                    }
                }
            } catch (e) {
                console.error("Star sync error:", e);
            } finally {
                syncingRef.current = false;
            }
        };

        // Run immediately on mount (for user who just got stars while logged in)
        checkAndClaim();

        // Then run periodically
        const interval = setInterval(checkAndClaim, SYNC_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [token, deviceId, enabled, onStarsUpdated]);
}
