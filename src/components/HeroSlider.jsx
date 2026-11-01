import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Flame, ShoppingBag } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://admin-kfc-web.azurewebsites.net//images/sliderimages/d5a32ea361ef43d89dfb16096003a1eb.jpg",
    title: "Finger Lickin' Good",
    subtitle: "Sri Lanka's Favourite Fried Chicken",
    tag: "NEW ARRIVAL",
    tagColor: "#f9a01b",
    cta: "Order Now",
    category: "chicken",
    overlayColor: "from-black/80 via-black/40 to-transparent",
  },
  {
    id: 2,
    image: "https://admin-kfc-web.azurewebsites.net//images/sliderimages/03216f67500642769d7b19d5298f3e4d.jpg",
    title: "Zinger Sensation",
    subtitle: "Crispy, Spicy, Unforgettable",
    tag: "BEST SELLER",
    tagColor: "#e4002b",
    cta: "Get Yours",
    category: "burgers",
    overlayColor: "from-red-950/80 via-red-950/30 to-transparent",
  },
  {
    id: 3,
    image: "https://admin-kfc-web.azurewebsites.net//images/sliderimages/51114ff3e474404b81f9a97f11b7dbd7.jpg",
    title: "Feast Together",
    subtitle: "Bucket Meals for the Whole Family",
    tag: "FAMILY FEAST",
    tagColor: "#f9a01b",
    cta: "Explore Buckets",
    category: "chicken",
    overlayColor: "from-amber-950/80 via-amber-950/30 to-transparent",
  },
];

export default function HeroSlider({ onSelectCategory }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]   = useState(null);
  const [dir, setDir]     = useState(1);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const INTERVAL = 5000;

  const goTo = useCallback((idx, direction) => {
    if (animating) return;
    setAnimating(true);
    setPrev(current);
    setDir(direction);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 600);
  }, [animating, current]);

  const next = useCallback(() => goTo((current + 1) % slides.length, 1), [current, goTo]);
  const back = useCallback(() => goTo((current - 1 + slides.length) % slides.length, -1), [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => { timerRef.current = setInterval(next, INTERVAL); };

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(300px, 55vw, 640px)" }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-label="Promotional slides"
    >
      {/* ---- Slides ---- */}
      {slides.map((s, i) => {
        const isActive = i === current;
        const isPrev   = i === prev;
        return (
          <div
            key={s.id}
            className="absolute inset-0 transition-all"
            style={{
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              transform: isActive
                ? "translateX(0) scale(1)"
                : isPrev
                  ? `translateX(${dir * -105}%) scale(0.96)`
                  : `translateX(${dir * 105}%) scale(0.96)`,
              opacity: isActive ? 1 : isPrev ? 0 : 0,
              transition: "transform 0.6s cubic-bezier(0.77,0,0.175,1), opacity 0.4s ease",
            }}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${s.overlayColor}`} />

            {/* Text Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-20">
                <div className="max-w-xl">
                  {/* Tag */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 font-black text-xs tracking-widest text-white"
                    style={{ background: s.tagColor, opacity: isActive ? 1 : 0, transform: isActive ? "none" : "translateY(12px)", transition: "opacity 0.5s 0.15s, transform 0.5s 0.15s" }}
                  >
                    <Flame size={12} /> {s.tag}
                  </div>
                  {/* Title */}
                  <h2
                    className="text-white font-black leading-none mb-3 drop-shadow-lg"
                    style={{
                      fontSize: "clamp(2rem, 6vw, 4rem)",
                      fontFamily: "'Oswald', sans-serif",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "none" : "translateY(20px)",
                      transition: "opacity 0.5s 0.25s, transform 0.5s 0.25s",
                    }}
                  >
                    {s.title}
                  </h2>
                  {/* Subtitle */}
                  <p
                    className="text-white/80 text-base sm:text-lg mb-8"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "none" : "translateY(20px)",
                      transition: "opacity 0.5s 0.35s, transform 0.5s 0.35s",
                    }}
                  >
                    {s.subtitle}
                  </p>
                  {/* CTA */}
                  <button
                    onClick={() => onSelectCategory(s.category)}
                    className="btn-kfc flex items-center gap-2 px-7 py-4 text-sm sm:text-base font-black uppercase tracking-wider"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "none" : "translateY(20px)",
                      transition: "opacity 0.5s 0.45s, transform 0.5s 0.45s",
                    }}
                  >
                    <ShoppingBag size={18} />
                    {s.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ---- Arrows ---- */}
      <button
        onClick={back}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer backdrop-blur-sm border border-white/20"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer backdrop-blur-sm border border-white/20"
      >
        <ChevronRight size={22} />
      </button>

      {/* ---- Progress Dots ---- */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`slide-dot h-2 rounded-full cursor-pointer ${i === current ? "active bg-red-500 w-8" : "bg-white/50 w-2 hover:bg-white"}`}
          />
        ))}
      </div>

      {/* ---- Progress bar ---- */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-white/10">
        <div
          key={current}
          className="h-full bg-red-500"
          style={{
            animation: `progressBar ${INTERVAL}ms linear`,
          }}
        />
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
