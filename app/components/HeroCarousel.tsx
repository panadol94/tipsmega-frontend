"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface HeroCarouselProps {
  onScanClick?: () => void;
}

const slides = [
  { 
    src: "/carousel/image-1-1.png", 
    alt: "TipsMega888 Komuniti Mega888 Malaysia 2026 - AI RTP Scanner",
    description: "TipsMega888 Komuniti Mega888 Malaysia 2026 - AI RTP Scanner"
  },
  { 
    src: "/carousel/image-2-1.png", 
    alt: "Komuniti WhatsApp Mega888 Malaysia - Tips dan Strategi",
    description: "Komuniti WhatsApp Mega888 Malaysia - Tips dan Strategi"
  },
  { 
    src: "/carousel/image-3-1.png", 
    alt: "AI Scanner Mega888 - Analisis RTP Live Real-time",
    description: "AI Scanner Mega888 - Analisis RTP Live Real-time"
  },
  { 
    src: "/carousel/image-4-1.png", 
    alt: "Tips Menang Mega888 - Panduan Pro Player",
    description: "Tips Menang Mega888 - Panduan Pro Player"
  },
  { 
    src: "/carousel/image-5-1.png", 
    alt: "Download Mega888 APK - Official Malaysia 2026",
    description: "Download Mega888 APK - Official Malaysia 2026"
  },
  { 
    src: "/carousel/image-6-1.png", 
    alt: "Register Akaun Mega888 - Tutorial Lengkap",
    description: "Register Akaun Mega888 - Tutorial Lengkap"
  },
  { 
    src: "/carousel/image-7-1.png", 
    alt: "Free Credit Mega888 - Bonus dan Promosi",
    description: "Free Credit Mega888 - Bonus dan Promosi"
  },
  { 
    src: "/carousel/image-8-1.png", 
    alt: "Trusted Agent Mega888 - Platform Sahih Malaysia",
    description: "Trusted Agent Mega888 - Platform Sahih Malaysia"
  },
  { 
    src: "/carousel/image-9-1.png", 
    alt: "Scan Sekarang Mega888 - Join Komuniti VIP",
    description: "Scan Sekarang Mega888 - Join Komuniti VIP"
  },
];

// JSON-LD Schema for ImageGallery
const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "TipsMega888 Hero Carousel",
  "description": "Koleksi gambar komuniti Mega888 Malaysia - AI Scanner, tips, strategi dan panduan lengkap",
  "url": "https://tipsmega888.com",
  "image": slides.map((slide, index) => ({
    "@type": "ImageObject",
    "position": index + 1,
    "url": `https://tipsmega888.com${slide.src}`,
    "name": slide.alt,
    "description": slide.description
  }))
};

export default function HeroCarousel({ onScanClick }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSwipeRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_SWIPE_INTERVAL = 4000; // 4 seconds

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setTranslateX(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTranslateX(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTranslateX(0);
  }, []);

  // Auto-swipe timer
  useEffect(() => {
    if (isPaused || isDragging) {
      if (autoSwipeRef.current) {
        clearInterval(autoSwipeRef.current);
        autoSwipeRef.current = null;
      }
      return;
    }

    autoSwipeRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SWIPE_INTERVAL);

    return () => {
      if (autoSwipeRef.current) {
        clearInterval(autoSwipeRef.current);
      }
    };
  }, [isPaused, isDragging, nextSlide]);

  // Touch/Drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    if (autoSwipeRef.current) {
      clearInterval(autoSwipeRef.current);
      autoSwipeRef.current = null;
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50; // Minimum swipe distance
    if (translateX > threshold) {
      prevSlide();
    } else if (translateX < -threshold) {
      nextSlide();
    } else {
      setTranslateX(0);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
    setIsPaused(false);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageGallerySchema),
        }}
      />

      {/* Visually Hidden SEO Content */}
      <div className="sr-only" aria-hidden="true">
        <h2>TipsMega888 Komuniti Mega888 Malaysia - Gallery Slides</h2>
        <ul>
          {slides.map((slide, index) => (
            <li key={index}>{slide.description}</li>
          ))}
        </ul>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="TipsMega888 Hero Carousel - 9 slides showcasing Mega888 Malaysia community features"
      >
        {/* Carousel Container */}
        <div
          className="relative aspect-[16/9] w-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative h-full w-full flex-shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`Carousel slide ${index + 1} of ${slides.length}: ${slide.description}`}
                aria-hidden={index !== currentIndex}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Scan CTA Button - positioned at bottom */}
                {index === 0 && onScanClick && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onScanClick();
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm rounded-full shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 border border-red-400/50"
                      aria-label="Start scanning your Mega888 ID now"
                    >
                      🔍 Scan Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div 
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-sm border border-white/10"
          role="tablist"
          aria-label="Carousel navigation dots"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-5 bg-amber-400"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1} of ${slides.length}`}
              aria-selected={index === currentIndex}
              role="tab"
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>

        {/* Navigation Arrows (visible on hover) */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-slate-900/80 transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100 flex items-center justify-center"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-slate-900/80 transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100 flex items-center justify-center"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Slide counter */}
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-slate-950/60 backdrop-blur-sm border border-white/10 text-xs font-medium text-white/70" aria-live="polite" aria-atomic="true">
          <span className="sr-only">Current slide</span>
          {currentIndex + 1} / {slides.length}
        </div>
      </div>
    </>
  );
}
