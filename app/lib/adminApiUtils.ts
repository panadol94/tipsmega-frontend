import { useRef, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

/**
 * Global API error handler
 * Handles common error cases like 401/403 with auto-logout
 */
export function handleApiError(res: Response): never {
    if (res.status === 401 || res.status === 403) {
        // Token expired or unauthorized
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/login";
        throw new Error("Unauthorized - Redirecting to login");
    }

    if (res.status === 500) {
        throw new Error("Server error - Please try again");
    }

    if (res.status === 404) {
        throw new Error("Resource not found");
    }

    throw new Error(`API Error: ${res.status}`);
}

/**
 * Wrapped fetch with automatic error handling and auth headers
 */
export async function adminFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = localStorage.getItem("admin_token");

    if (!token) {
        window.location.href = "/admin/login";
        throw new Error("No token found");
    }

    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": options.body ? "application/json" : "",
        },
    });

    if (!response.ok) {
        handleApiError(response);
    }

    return response;
}

/**
 * Input validation utility
 * Sanitizes and validates user input
 */
export function validateInput(
    value: string,
    minLength = 1,
    maxLength = 100
): string | null {
    const trimmed = value.trim();

    if (!trimmed || trimmed.length < minLength || trimmed.length > maxLength) {
        return null;
    }

    // Remove potential XSS
    const sanitized = trimmed
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");

    return sanitized;
}

/**
 * Validate number input within range
 */
export function validateNumber(
    value: number,
    min: number,
    max: number
): boolean {
    return !isNaN(value) && value >= min && value <= max;
}

/**
 * Custom hook for preventing race conditions
 * Returns a function that tracks request IDs
 */
export function useRequestTracker() {
    const requestIdRef = useRef(0);

    const trackRequest = useCallback(async <T,>(
        fn: () => Promise<T>
    ): Promise<T | null> => {
        const currentId = ++requestIdRef.current;

        try {
            const result = await fn();

            // Check if this is still the latest request
            if (currentId !== requestIdRef.current) {
                return null; // Stale request, ignore
            }

            return result;
        } catch (error) {
            // Only throw if this is the latest request
            if (currentId === requestIdRef.current) {
                throw error;
            }
            return null;
        }
    }, []);

    return trackRequest;
}

/**
 * Optimistic update with automatic rollback
 */
export async function withRollback<T>(
    setState: (newState: T) => void,
    optimisticState: T,
    previousState: T,
    apiCall: () => Promise<void>
): Promise<boolean> {
    setState(optimisticState);

    try {
        await apiCall();
        return true;
    } catch (error) {
        // Rollback on failure
        setState(previousState);
        throw error;
    }
}

/**
 * Retry logic for GET requests
 */
export async function fetchWithRetry(
    endpoint: string,
    options: RequestInit = {},
    maxRetries = 3
): Promise<Response> {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await adminFetch(endpoint, options);
        } catch (error) {
            lastError = error as Error;

            // Don't retry on auth errors
            if (error instanceof Error && error.message.includes("Unauthorized")) {
                throw error;
            }

            // Exponential backoff
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
            }
        }
    }

    throw lastError || new Error("Max retries exceeded");
}

/**
 * Debounce function for preventing rapid calls
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    waitMs: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), waitMs);
    };
}
