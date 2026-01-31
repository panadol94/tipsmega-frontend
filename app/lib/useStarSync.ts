"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";
const SYNC_INTERVAL_MS = 10000; // Increased to 10 seconds to reduce server load
const ERROR_COOLDOWN_MS = 30000; // 30 seconds cooldown after error

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
 * Polls server every 10 seconds to check for pending stars
 * Manual claim function available - auto-claim DISABLED to prevent flicker
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
    const pendingNotifiedRef = useRef(false);
    const errorCooldownUntilRef = useRef(0); // Timestamp when cooldown ends

    const checkAndClaim = useCallback(async (manual = false) => {
        // Check error cooldown for auto-sync (not for manual claims)
        if (!manual && Date.now() < errorCooldownUntilRef.current) {
            console.log("In error cooldown, skipping auto-sync...");
            return;
        }

        // Prevent concurrent syncs
        if (syncingRef.current) {
            console.log("Sync already in progress, skipping...");
            return;
        }

        syncingRef.current = true;

        // Only show CLAIMING state for manual claims
        if (manual) {
            setIsClaiming(true);
        }

        try {
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
            if (pending > 0 && !pendingNotifiedRef.current && onPendingDetected) {
                onPendingDetected(pending);
                pendingNotifiedRef.current = true;
            }

            // 3. Only claim if MANUAL - auto-claim disabled to prevent flicker
            if (pending > 0 && manual) {
                console.log(`✨ Manual claim: ${pending} pending stars`);

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
                    pendingNotifiedRef.current = false;
                    errorCooldownUntilRef.current = 0; // Reset cooldown on success
                } else {
                    const errorText = await grantRes.text();
                    console.error("Grant device failed:", errorText);
                    // Set error cooldown to prevent rapid retries
                    errorCooldownUntilRef.current = Date.now() + ERROR_COOLDOWN_MS;
                }
            }
        } catch (e) {
            console.error("Star sync error:", e);
            // Set error cooldown on network errors
            errorCooldownUntilRef.current = Date.now() + ERROR_COOLDOWN_MS;
        } finally {
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

        // Run immediately on mount
        checkAndClaim();

        // Then run periodically every 10 seconds (just checks, doesn't auto-claim)
        const interval = setInterval(() => checkAndClaim(), SYNC_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [token, enabled, checkAndClaim]);

    return {
        claimNow,
        isClaiming,
    };
}
