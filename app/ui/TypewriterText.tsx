"use client";

import { useEffect, useState } from "react";

export default function TypewriterText({ text, speed = 40 }: { text: string; speed?: number }) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        setDisplayed(""); // reset
        let i = 0;
        const t = setInterval(() => {
            if (i < text.length) {
                setDisplayed((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(t);
            }
        }, speed);

        return () => clearInterval(t);
    }, [text, speed]);

    return (
        <div className="hint mt-2">
            {displayed}
            <span className="animate-pulse">_</span>
        </div>
    );
}
