import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Sparkles, ChefHat } from 'lucide-react';

export default function TrustSection() {
  const pillars = [
    {
      icon: HeartHandshake,
      title: "100% Local Poultry",
      desc: "Sourced directly from certified Sri Lankan poultry farmers to empower local communities."
    },
    {
      icon: ChefHat,
      title: "Hand-Breaded Daily",
      desc: "Every single piece is freshly rolled in the Colonel's secret 11 herbs & spices by trained cooks."
    },
    {
      icon: ShieldCheck,
      title: "Highest Safety & Halal",
      desc: "Strict temperature controls and global quality standards from farm to your bucket."
    },
    {
      icon: Sparkles,
      title: "Golden & Piping Hot",
      desc: "Fried fresh in small batches so your chicken is always crispy outside and juicy inside."
    }
  ];

  return (
    <section className="bg-white border-y border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="bg-gradient-to-r from-red-600 to-[#c40024] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-12">
          {/* Subtle Background Pattern */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Award size={320} />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs uppercase font-black tracking-widest bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs inline-block">
              A Taste You Can Trust
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-['Oswald'] uppercase tracking-tight leading-tight">
              KFC Chicken is 100% Locally Sourced from Our Very Own Poultry Farmers
            </h2>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed font-medium">
              Hand-Breaded, Freshly Prepared & Finger Lickin' Good! When you enjoy KFC in Sri Lanka, you're enjoying fresh, premium chicken raised right here at home.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-gray-50/70 rounded-2xl p-6 border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition duration-300 space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 text-[#e4002b] flex items-center justify-center">
                <p.icon size={24} />
              </div>
              <h3 className="text-base font-black font-['Oswald'] uppercase tracking-tight text-gray-900">
                {p.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
