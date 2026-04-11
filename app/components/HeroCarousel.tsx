"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface HeroCarouselProps {
  onScanClick?: () => void;
}

interface SlideConfig {
  src: string;
  alt: string;
  description: string;
  // Mobile optimization settings
  mobileObjectPosition?: string; // CSS object-position for mobile
  mobileSafe?: boolean; // Whether slide works well on mobile
  mobileFeatured?: boolean; // Whether slide is safe enough for mobile rotation
  mobileFallback?: "show" | "skip" | "placeholder"; // Behavior on mobile
  focalPoint?: { x: string; y: string }; // Focal point for mobile cropping
}

const slides: SlideConfig[] = [
  { 
    src: "/carousel/image-1-1.png", 
    alt: "TipsMega888 Komuniti Mega888 Malaysia 2026 - AI RTP Scanner",
    description: "TipsMega888 Komuniti Mega888 Malaysia 2026 - AI RTP Scanner",
    mobileObjectPosition: "center 30%",
    mobileSafe: true,
    mobileFeatured: true,
    mobileFallback: "show",
    focalPoint: { x: "center", y: "30%" }
  },
  { 
    src: "/carousel/image-2-1.png", 
    alt: "Komuniti WhatsApp Mega888 Malaysia - Tips dan Strategi",
    description: "Komuniti WhatsApp Mega888 Malaysia - Tips dan Strategi",
    mobileObjectPosition: "center 40%",
    mobileSafe: true,
    mobileFeatured: true,
    mobileFallback: "show",
    focalPoint: { x: "center", y: "40%" }
  },
  { 
    src: "/carousel/image-3-1.png", 
    alt: "AI Scanner Mega888 - Analisis RTP Live Real-time",
    description: "AI Scanner Mega888 - Analisis RTP Live Real-time",
    mobileObjectPosition: "center 35%",
    mobileSafe: true,
    mobileFeatured: false,
    mobileFallback: "show",
    focalPoint: { x: "center", y: "35%" }
  },
  { 
    src: "/carousel/image-4-1.png", 
    alt: "Tips Menang Mega888 - Panduan Pro Player",
    description: "Tips Menang Mega888 - Panduan Pro Player",
    mobileObjectPosition: "center 30%",
    mobileSafe: true,
    mobileFeatured: false,
    mobileFallback: "show",
    focalPoint: { x: "center", y: "30%" }
  },
  { 
    src: "/carousel/image-5-1.png", 
    alt: "Download Mega888 APK - Official Malaysia 2026",
    description: "Download Mega888 APK - Official Malaysia 2026",
    mobileObjectPosition: "center 25%",
    mobileSafe: true,
    mobileFeatured: false,
    mobileFallback: "show",
    focalPoint: { x: "center", y: "25%" }
  },
  { 
    src: "/carousel/image-6-1.png", 
    alt: "Register Akaun Mega888 - Tutorial Lengkap",
    description: "Register Akaun Mega888 - Tutorial Lengkap",
    mobileObjectPosition: "center 20%",
    mobileSafe: false,
    mobileFeatured: false,
    mobileFallback: "skip", // Skip on mobile - too dense with 4 grid sections
    focalPoint: { x: "center", y: "20%" }
  },
  { 
    src: "/carousel/image-7-1.png", 
    alt: "Free Credit Mega888 - Bonus dan Promosi",
    description: "Free Credit Mega888 - Bonus dan Promosi",
    mobileObjectPosition: "center 30%",
    mobileSafe: true,
    mobileFeatured: false,
    mobileFallback: "show",
    focalPoint: { x: "center", y: "30%" }
  },
  { 
    src: "/carousel/image-8-1.png", 
    alt: "Trusted Agent Mega888 - Platform Sahih Malaysia",
    description: "Trusted Agent Mega888 - Platform Sahih Malaysia",
    mobileObjectPosition: "left center",
    mobileSafe: true,
    mobileFeatured: true,
    mobileFallback: "show",
    focalPoint: { x: "20%", y: "center" }
  },
  { 
    src: "/carousel/image-9-1.png", 
    alt: "Scan Sekarang Mega888 - Join Komuniti VIP",
    description: "Scan Sekarang Mega888 - Join Komuniti VIP",
    mobileObjectPosition: "center 25%",
    mobileSafe: false,
    mobileFeatured: false,
    mobileFallback: "skip", // Skip on mobile - too dense with 4 feature boxes
    focalPoint: { x: "center", y: "25%" }
  },
];

// Mobile uses a curated animated subset to avoid problematic slides
const getMobileSlides = () => slides.filter((s) => s.mobileFeatured && s.mobileFallback !== "skip");

// JSON-LD Schema for ImageGallery
const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "TipsMega888 Hero Carousel",
  "description": "Koleksi gambar komuniti Mega888 Malaysia - AI Scanner, tips, strategi dan panduan lengkap",
  "url": "https://tipsmega888.com",
  image: slides.map((slide, index) => ({
    "@type": "ImageObject",
    position: index + 1,
    url: `https://tipsmega888.com${slide.src}`,
    name: slide.alt,
    description: slide.description
  }))
};

export default function HeroCarousel({ onScanClick }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSwipeRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_SWIPE_INTERVAL = 6500; // 6.5 seconds

  // Detect mobile on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get appropriate slides based on device
  const activeSlides = isMobile ? getMobileSlides() : slides;

  // Reset index when device changes to avoid out-of-bounds
  useEffect(() => {
    if (currentIndex >= activeSlides.length) {
      setCurrentIndex(0);
    }
  }, [isMobile, activeSlides.length, currentIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setTranslateX(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    setTranslateX(0);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    setTranslateX(0);
  }, [activeSlides.length]);

  // Auto-swipe timer
  useEffect(() => {
    if (isPaused || isDragging || activeSlides.length <= 1) {
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
  }, [isPaused, isDragging, nextSlide, activeSlides.length]);

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

  // Get slide-specific styling
  const getSlideImageClasses = (slide: SlideConfig) => {
    // Desktop: object-cover for full coverage
    // Mobile: object-contain with per-slide positioning
    const baseClasses = "select-none";
    const desktopClasses = "sm:object-cover sm:object-center";
    
    // Mobile uses cover for a sharper visual result with per-slide positioning
    const mobileClasses = "object-cover";
    
    return `${baseClasses} ${desktopClasses} ${mobileClasses}`;
  };

  // Get inline style for object-position on mobile
  const getSlideImageStyle = (slide: SlideConfig): React.CSSProperties => {
    // Desktop uses standard cover
    // Mobile uses per-slide positioning
    return {
      objectPosition: isMobile && slide.mobileObjectPosition ? slide.mobileObjectPosition : "center center"
    };
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

      {/* Visually Hidden SEO Content - show all slides for SEO */}
      <div className="sr-only" aria-hidden="true">
        <h2>TipsMega888 Komuniti Mega888 Malaysia - Gallery Slides</h2>
        <ul>
          {slides.map((slide, index) => (
            <li key={index}>{slide.description}</li>
          ))}
        </ul>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/70 shadow-[0_20px_60px_rgba(0,0,0,0.38)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={`TipsMega888 Hero Carousel - ${activeSlides.length} slides showcasing Mega888 Malaysia community features`}
      >
        {/* Mobile indicator showing skipped slides notice */}
        {isMobile && (
          <div className="sr-only" role="note">
            Menunjukkan {activeSlides.length} daripada {slides.length} slaid yang dioptimumkan untuk peranti mudah alih
          </div>
        )}

        {/* Carousel Container */}
        <div
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 cursor-grab active:cursor-grabbing select-none"
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
            {activeSlides.map((slide, index) => (
              <div
                key={slide.src}
                className="relative h-full w-full flex-shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`Carousel slide ${index + 1} of ${activeSlides.length}: ${slide.description}`}
                aria-hidden={index !== currentIndex}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={getSlideImageClasses(slide)}
                  style={getSlideImageStyle(slide)}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={100}
                  draggable={false}
                  sizes="100vw"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
                
                {/* Scan CTA Button - positioned at bottom (only on first visible slide) */}
                {index === 0 && onScanClick && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 sm:bottom-4">
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
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-950/55 backdrop-blur-sm border border-white/10 sm:bottom-3 sm:gap-2 sm:px-3 sm:py-1.5"
          role="tablist"
          aria-label="Carousel navigation dots"
        >
          {activeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "h-2 w-4 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.35)] sm:h-2.5 sm:w-6 sm:shadow-[0_0_14px_rgba(251,191,36,0.45)]"
                  : "h-1.5 w-1.5 bg-white/45 hover:bg-white/65 sm:h-2.5 sm:w-2.5"
              }`}
              aria-label={`Go to slide ${index + 1} of ${activeSlides.length}`}
              aria-selected={index === currentIndex}
              role="tab"
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>

        {/* Navigation Arrows (visible on hover, desktop only) */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-slate-900/80 hover:text-white focus:opacity-100 sm:flex"
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
          className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-slate-900/80 hover:text-white focus:opacity-100 sm:flex"
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

      </div>
    </>
  );
}
