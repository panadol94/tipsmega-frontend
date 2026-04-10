"use client";

import { useEffect, useState } from "react";

const TAGLINES = [
    "Cari slot yang lebih aktif dengan bantuan AI",
    "Semak game yang tengah panas sebelum mula main",
    "Lihat signal RTP semasa tanpa agak-agak",
    "Kenal pasti waktu terbaik untuk masuk game",
    "Data AI membantu pilih game dengan lebih bijak",
    "Scan RTP live dan bandingkan trend semasa",
];

export default function TypewriterHero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentTagline = TAGLINES[currentIndex];
        const typeSpeed = isDeleting ? 30 : 60;
        const pauseAfterType = 2000;
        const pauseAfterDelete = 300;

        let timer: NodeJS.Timeout;

        if (!isDeleting && displayedText === currentTagline) {
            // Finished typing, pause then start deleting
            timer = setTimeout(() => setIsDeleting(true), pauseAfterType);
        } else if (isDeleting && displayedText === "") {
            // Finished deleting, move to next tagline
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % TAGLINES.length);
        } else {
            // Typing or deleting
            timer = setTimeout(() => {
                if (isDeleting) {
                    setDisplayedText(currentTagline.slice(0, displayedText.length - 1));
                } else {
                    setDisplayedText(currentTagline.slice(0, displayedText.length + 1));
                }
            }, typeSpeed);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentIndex]);

    return (
        <div className="mt-5 min-h-[32px] flex items-center justify-center">
            <p className="text-[15px] sm:text-base text-white/95 font-medium tracking-wide">
                {displayedText}
                <span className="inline-block w-0.5 h-5 bg-amber-400 ml-0.5 animate-pulse" />
            </p>
        </div>
    );
}
