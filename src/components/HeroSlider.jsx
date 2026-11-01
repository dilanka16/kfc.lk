import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { promoSlides } from '../data/promosData';

export default function HeroSlider({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promoSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  };

  const active = promoSlides[currentSlide];

  return (
    <section 
      className="relative bg-[#202124] overflow-hidden text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="promos"
    >
      <div className="relative min-h-[420px] md:min-h-[500px] lg:min-h-[540px] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={active.image}
            alt={active.title}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
          <div className="max-w-2xl space-y-4 md:space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e4002b] text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-sm shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              {active.tag}
            </div>

            {/* Title with Oswald font */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Oswald'] uppercase tracking-tight text-white leading-none drop-shadow-md">
              {active.title}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-sm sm:text-lg max-w-xl font-medium leading-relaxed drop-shadow">
              {active.subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                onClick={() => onSelectCategory(active.category)}
                className="inline-flex items-center gap-2 bg-[#e4002b] hover:bg-[#c40024] text-white px-7 py-3.5 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95"
              >
                <span>{active.cta}</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="#menu"
                onClick={() => onSelectCategory('all')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition"
              >
                View Full Menu
              </a>
            </div>
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-[#e4002b] text-white flex items-center justify-center backdrop-blur-sm transition border border-white/10 cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-[#e4002b] text-white flex items-center justify-center backdrop-blur-sm transition border border-white/10 cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {promoSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlide
                  ? 'w-8 h-2.5 bg-[#e4002b]'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
