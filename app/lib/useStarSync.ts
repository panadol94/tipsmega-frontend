"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";
const SYNC_INTERVAL_MS = 5000; // Reduced to 5 seconds for faster updates

interface UseStarSyncOptions {
    token: string | null;
    deviceId: string;
    onStarsUpdated: (newStars: number, claimedAmount: number) => void;
    onPendingDetected?: (pending: number) => void;
    enabled?: boolean;
}

interface UseStarSyncReturn {
    claimNow: () => Promise<void>;
    isClaiming: boolean;
}

/**
 * Custom hook to automatically sync bonus stars from user ledger to device
 * Polls server every 5 seconds to check for pending stars and auto-claims them
 * Also provides manual claim function
 */
export function useStarSync({
    token,
    deviceId,
    onStarsUpdated,
    onPendingDetected,
    enabled = true,
}: UseStarSyncOptions): UseStarSyncReturn {
    const syncingRef = useRef(false);
    const [isClaiming, setIsClaiming] = useState(false);
    const pendingNotifiedRef = useRef(false); // Track if we've notified about current pending amount

    const checkAndClaim = useCallback(async (manual = false) => {
        // Prevent concurrent syncs
        if (syncingRef.current) return;

        // Only show CLAIMING state for manual claims
        if (manual) {
            setIsClaiming(true);
        }

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

            // 2. If pending > 0, notify user (only once per pending batch)
            if (pending > 0 && !pendingNotifiedRef.current && onPendingDetected && !manual) {
                onPendingDetected(pending);
                pendingNotifiedRef.current = true;
            }

            // 3. If pending > 0, claim them
            if (pending > 0) {
                // Show claiming state when actually claiming
                setIsClaiming(true);

                if (manual) {
                    console.log(`✨ Manual claim: ${pending} pending stars`);
                } else {
                    console.log(`✨ Auto-detected ${pending} pending stars, claiming...`);
                }

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
                    pendingNotifiedRef.current = false; // Reset for next batch
                } else {
                    console.error("Grant device failed:", await grantRes.text());
                }
            }
        } catch (e) {
            console.error("Star sync error:", e);
        } finally {
            // ALWAYS reset state
            syncingRef.current = false;
            setIsClaiming(false);
        }
    }, [token, deviceId, onStarsUpdated, onPendingDetected]);

    // Manual claim function
    const claimNow = useCallback(async () => {
        if (!token) {
            console.warn("Cannot claim: not logged in");
            return;
        }
        await checkAndClaim(true);
    }, [token, checkAndClaim]);

    useEffect(() => {
        if (!token || !enabled) return;

        // Run immediately on mount (for user who just got stars while logged in)
        checkAndClaim();

        // Then run periodically every 5 seconds
        const interval = setInterval(() => checkAndClaim(), SYNC_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [token, enabled, checkAndClaim]);

    return {
        claimNow,
        isClaiming,
    };
}
