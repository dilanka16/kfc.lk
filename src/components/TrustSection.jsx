import React, { useEffect, useRef, useState } from "react";
import { Shield, Award, Leaf, Clock, Star, Truck } from "lucide-react";

const stats = [
  { icon: Shield, label: "Local Chicken",     value: "100%",   sub: "Sri Lankan Sourced",    color: "#e4002b" },
  { icon: Award,  label: "Years in SL",       value: "30+",    sub: "Serving Since 1995",    color: "#f9a01b" },
  { icon: Leaf,   label: "Fresh Daily",       value: "Fresh",  sub: "Hand-Breaded Every Day", color: "#16a34a" },
  { icon: Clock,  label: "Delivery Time",     value: "45 Min", sub: "Average Delivery",       color: "#3b82f6" },
  { icon: Star,   label: "Customer Rating",   value: "4.8★",   sub: "App Store Rating",       color: "#f59e0b" },
  { icon: Truck,  label: "Outlets Islandwide",value: "50+",    sub: "Restaurants in Sri Lanka",color: "#8b5cf6" },
];

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setDisplay(value);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} className="transition-all duration-700">{display}</span>;
}

export default function TrustSection() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #e4002b 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 float-in">
          <span
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4"
            style={{ background: "rgba(228,0,43,0.08)", color: "var(--kfc-red)" }}
          >
            <Shield size={12}/> Why Choose KFC Sri Lanka
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ fontFamily: "'Oswald', sans-serif", color: "var(--text-primary)" }}
          >
            The Colonel's Promise
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            Freshly prepared with the Colonel's secret blend of 11 herbs &amp; spices — every order, every time.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card-float group flex flex-col items-center text-center p-5 rounded-2xl border float-in"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-color)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: `${stat.color}18`, color: stat.color }}
              >
                <stat.icon size={22} />
              </div>
              <div className="font-black text-2xl leading-none mb-1" style={{ color: stat.color, fontFamily: "'Oswald', sans-serif" }}>
                <AnimatedNumber value={stat.value}/>
              </div>
              <div className="font-black text-xs mb-1" style={{ color: "var(--text-primary)" }}>
                {stat.label}
              </div>
              <div className="text-[10px] leading-snug" style={{ color: "var(--text-muted)" }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Banner strip */}
        <div
          className="mt-10 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left float-in delay-500"
          style={{ background: "var(--kfc-red)" }}
        >
          <div className="text-4xl">🍗</div>
          <div className="flex-1">
            <h3 className="text-white font-black text-xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
              100% Sri Lankan Fresh Chicken
            </h3>
            <p className="text-white/80 text-sm mt-1">
              All our chicken is sourced from local Sri Lankan farms and hand-breaded fresh in our kitchens daily.
              No frozen, no shortcuts — just the real deal.
            </p>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-xs font-bold shrink-0 px-4 py-2 rounded-full bg-white/10 border border-white/20">
            <Award size={14}/> Certified Quality
          </div>
        </div>
      </div>
    </section>
  );
}
