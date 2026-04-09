"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    trigger?: boolean;
}

export default function AnimatedCounter({
    value,
    duration = 800,
    decimals = 0,
    prefix = "",
    suffix = "",
    className = "",
    trigger = true,
}: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!trigger) return;

        if (!hasAnimated) {
            setHasAnimated(true);
            startTimeRef.current = null;

            const animate = (timestamp: number) => {
                if (!startTimeRef.current) {
                    startTimeRef.current = timestamp;
                }

                const elapsed = timestamp - startTimeRef.current;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = eased * value;

                setDisplayValue(current);

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    setDisplayValue(value);
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [value, duration, trigger, hasAnimated]);

    const formattedValue = decimals > 0
        ? displayValue.toFixed(decimals)
        : Math.round(displayValue).toString();

    return (
        <span className={`count-up inline-block ${className}`}>
            {prefix}{formattedValue}{suffix}
        </span>
    );
}

// Hook version for more control
export function useCountUp(
    endValue: number,
    duration: number = 800,
    trigger: boolean = true
): number {
    const [value, setValue] = useState(0);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!trigger) return;

        startTimeRef.current = null;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setValue(eased * endValue);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setValue(endValue);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [endValue, duration, trigger]);

    return value;
}