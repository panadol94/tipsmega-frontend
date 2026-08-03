"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  loc: string;
  text: string;
  stars: number;
  photo: string;
}

const testimonials: Testimonial[] = [
  { name: "Ahmad R.", loc: "Kuala Lumpur", text: "AI Scanner ni memang membantu. Saya boleh tahu game mana yang tengah hot sebelum mula main", stars: 5, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" },
  { name: "Siti M.", loc: "Johor Bahru", text: "Guna AI Scanner ni lepas tu peluang menang lebih konsisten. Odds memang lebih baik ✔️", stars: 5, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" },
  { name: "Chuan L.", loc: "Penang", text: "Best — totally free! Saya check RTP setiap hari sebelum main Mega888", stars: 5, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face" },
  { name: "Wei J.", loc: "Sabah", text: "Scanner ni bagi tahu RTP yang accurate. Dah jadi rutin harian saya", stars: 5, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face" },
  { name: "Nadia S.", loc: "Selangor", text: "Alhamdulillah lepas 2 minggu guna scanner ni, result lebih konsisten dari biasa", stars: 5, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face" },
  { name: "Raj K.", loc: "Sarawak", text: "Tool terbaik untuk Mega888! Free dan semua orang kena try", stars: 5, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" },
  { name: "Lisa T.", loc: "Melaka", text: "Scanner ni sangat berguna! Scan habis terus tahu game mana yang payout lebih tinggi", stars: 5, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" },
];

const stats = [
  { val: "4.9/5", lbl: "Rating Purata" },
  { val: "50K+", lbl: "Pengguna Aktif" },
  { val: "2024–2026", lbl: "Online" },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goToNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, goToNext]);

  const current = testimonials[currentIndex];

  return (
    <section
      aria-label="Social proof"
      className="card p-4 border-red-500/20 bg-gradient-to-br from-red-950/60 to-slate-950/80 overflow-hidden"
      style={{ borderRadius: 16 }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30 flex items-center justify-center">
            <Quote className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-wide">
              ⭐ Apa Kata Pengguna
            </h2>
            <p className="text-[10px] text-red-400/70 font-medium tracking-wider uppercase">
              Testimoni Pelanggan
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={goToPrev}
            className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-red-500/30 transition-all duration-200 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-red-500/30 transition-all duration-200 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Slide */}
        <div
          key={currentIndex}
          className={`p-4 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm transition-all duration-500 ease-out ${
            direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
          }`}
        >
          {/* Quote icon */}
          <div className="absolute top-3 right-3 opacity-10">
            <Quote className="w-8 h-8 text-red-400" />
          </div>

          {/* User info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <img
                src={current.photo}
                alt={current.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-red-500/30 shadow-lg shadow-red-500/10"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{current.name}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-medium text-emerald-400">
                  Verified
                </span>
              </div>
              <span className="text-xs text-slate-500">{current.loc}</span>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: current.stars }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          {/* Testimonial text */}
          <p className="text-sm text-slate-300 leading-relaxed">
            &ldquo;{current.text}&rdquo;
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-6 h-1.5 bg-gradient-to-r from-red-500 to-rose-500"
                : "w-1.5 h-1.5 bg-slate-600 hover:bg-slate-500"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Trust stats bar */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div
            key={s.lbl}
            className="text-center py-2.5 rounded-xl bg-gradient-to-b from-cyan-500/[0.06] to-cyan-500/[0.02] border border-cyan-500/15 hover:border-cyan-500/30 transition-colors"
          >
            <div className="text-sm font-black bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              {s.val}
            </div>
            <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">
              {s.lbl}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
