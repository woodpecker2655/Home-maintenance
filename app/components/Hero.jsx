"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const IMAGES = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative max-w-[1280px] mx-auto w-full px-8 sm:px-20">
      <div className="relative overflow-hidden rounded-3xl shadow-lg">
        {/* Background image */}
        <div className="relative h-[560px] sm:h-[720px]">
          <Image
            src={IMAGES[idx]}
            alt={`Hero ${idx + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-start sm:items-center">
          <div className="max-w-3xl px-8 py-12 sm:py-24">
            <h1 className="text-white font-extrabold leading-tight text-4xl sm:text-[72px] sm:leading-[0.9]">
              EXPERT HOME
              <br />
              <span className="block text-emerald-400">MAINTENANCE SERVICES</span>
            </h1>
            <p className="text-white/90 mt-6 max-w-xl text-sm sm:text-lg font-medium">
              Find the best professionals near you — Plumbers, Electricians, Carpenters & more.
              Quality work, trusted by thousands.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-emerald-700 transition transform hover:-translate-y-1"
              >
                Find Services <span className="ml-2">›</span>
              </button>
            </div>
          </div>
        </div>

        {/* Controls: dots */}
        <div className="absolute bottom-6 left-8 flex gap-3">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`w-10 h-1 rounded-full transition-all ${
                i === idx ? "bg-white/90 w-16" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}