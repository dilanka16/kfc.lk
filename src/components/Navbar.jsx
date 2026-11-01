import React, { useState, useEffect } from "react";
import { ShoppingBag, MapPin, Phone, Menu, X, ChevronDown, Sun, Moon, Utensils, Flame, LayoutGrid } from "lucide-react";
import { useTheme } from "../App";

/* ---- Official KFC Logo (pure SVG, no external image) ---- */
function KFCLogo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red circle background */}
      <circle cx="28" cy="28" r="28" fill="#E4002B"/>
      {/* White Colonel head silhouette simplified */}
      <ellipse cx="28" cy="20" rx="10" ry="11" fill="white"/>
      <rect x="18" y="28" width="20" height="16" rx="2" fill="white"/>
      {/* Tie - red */}
      <polygon points="28,28 26,36 28,38 30,36" fill="#E4002B"/>
      {/* KFC text */}
      <text x="28" y="50" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="8.5" fill="white" letterSpacing="1.5">KFC</text>
      {/* Glasses lines */}
      <line x1="20" y1="20" x2="25" y2="20" stroke="#E4002B" strokeWidth="1.5"/>
      <line x1="31" y1="20" x2="36" y2="20" stroke="#E4002B" strokeWidth="1.5"/>
      <circle cx="22.5" cy="20" r="2.5" fill="none" stroke="#E4002B" strokeWidth="1.2"/>
      <circle cx="33.5" cy="20" r="2.5" fill="none" stroke="#E4002B" strokeWidth="1.2"/>
    </svg>
  );
}

export default function Navbar({ cartCount, cartTotal, onOpenCart, orderMode, selectedLocation, onOpenLocationModal, onOpenOutletsModal, onSelectCategory }) {
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home",         icon: LayoutGrid, href: "#",       action: () => onSelectCategory("all") },
    { label: "Menu",         icon: Utensils,   href: "#menu",   action: () => onSelectCategory("all") },
    { label: "Hot Deals",    icon: Flame,      href: "#promos", action: null, badge: "HOT" },
    { label: "Restaurants",  icon: MapPin,     href: "#",       action: () => { onOpenOutletsModal(); } },
  ];

  return (
    <>
      {/* ---- Top Announcement Bar ---- */}
      <div
        className="text-white text-xs py-2 px-4 transition-colors duration-300"
        style={{ background: "var(--kfc-black)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-fast" />
            <span className="font-semibold tracking-wide opacity-80">Customer Care:</span>
            <a href="tel:0115555555" className="font-black text-white hover:text-red-400 transition flex items-center gap-1.5">
              <Phone size={12}/> 011 555 5555
            </a>
            <span className="hidden md:inline opacity-50 text-[10px]">|  100% Locally Sourced Fresh Sri Lankan Chicken  |  Mon–Sun: 10:00 AM – 11:30 PM</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] opacity-60">
            <button onClick={onOpenOutletsModal} className="hover:opacity-100 hover:text-red-400 transition underline cursor-pointer">Find Outlet</button>
            <span>Sri Lanka Standard Time</span>
          </div>
        </div>
      </div>

      {/* ---- Main Navbar ---- */}
      <header
        className={`sticky top-0 z-40 glass transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
        style={{
          background: "var(--bg-nav)",
          borderBottom: "1px solid var(--border-color)",
          boxShadow: scrolled ? "var(--shadow-nav)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-2">

            {/* ---- Logo ---- */}
            <a href="#" className="flex items-center gap-3 group float-in" onClick={() => onSelectCategory("all")}>
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <KFCLogo size={50} />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-2xl font-black tracking-tight font-['Oswald'] text-gradient"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  KFC
                </span>
                <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
                  Sri Lanka
                </span>
              </div>
            </a>

            {/* ---- Desktop Nav Links ---- */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={link.action}
                  className={`nav-link-animated flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider py-1 transition-colors duration-200 float-in delay-${(i+1)*100}`}
                  style={{ color: "var(--text-primary)" }}
                >
                  <link.icon size={15} className="opacity-70" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-[#e4002b] text-white text-[9px] px-1.5 py-0.5 rounded font-black ml-1 animate-pulse-fast">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </nav>

            {/* ---- Right Controls ---- */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Location Pill */}
              <button
                onClick={onOpenLocationModal}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200 text-left hover:border-red-400 hover:shadow-sm cursor-pointer"
                style={{
                  background: "var(--bg-input)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <MapPin size={13} />
                </div>
                <div className="text-xs leading-tight max-w-[120px]">
                  <div className="text-[9px] font-bold uppercase opacity-50">{orderMode === "D" ? "Delivering to" : "Pickup at"}</div>
                  <div className="font-bold truncate">{selectedLocation}</div>
                </div>
                <ChevronDown size={13} className="opacity-40" />
              </button>

              {/* Dark/Light Toggle */}
              <button
                onClick={toggle}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer border"
                style={{
                  background: dark ? "#1e1e1e" : "#f3f4f6",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
                title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {dark
                  ? <Sun size={17} className="text-yellow-400 icon-pulse" />
                  : <Moon size={17} className="text-blue-500" />
                }
              </button>

              {/* Cart Bucket Button */}
              <button
                onClick={onOpenCart}
                className="relative btn-kfc flex items-center gap-2 px-4 py-2.5 rounded-full cursor-pointer"
                aria-label="View Basket"
              >
                <ShoppingBag size={17} />
                <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">Bucket</span>
                {cartCount > 0 ? (
                  <span className="bg-white text-red-600 text-xs font-black px-2 py-0.5 rounded-full badge-pulse">
                    {cartCount}
                  </span>
                ) : (
                  <span className="bg-black/20 text-white text-xs px-2 py-0.5 rounded-full">0</span>
                )}
                {cartTotal > 0 && (
                  <span className="hidden lg:inline text-xs font-semibold pl-2 border-l border-white/30">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center transition border cursor-pointer"
                style={{ background: "var(--bg-input)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ---- Mobile Drawer ---- */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 pt-3 pb-6 scale-in"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--bg-secondary)",
            }}
          >
            <div className="space-y-1">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { if (link.action) link.action(); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-sm uppercase transition cursor-pointer"
                  style={{ color: "var(--text-primary)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-card-hover)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <link.icon size={18} className="text-red-500" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black ml-auto">{link.badge}</span>
                  )}
                </a>
              ))}
              <div className="flex items-center justify-between px-3 py-3 border-t mt-2" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
                  {dark ? "Dark Mode" : "Light Mode"}
                </span>
                <button
                  onClick={toggle}
                  className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full transition cursor-pointer"
                  style={{ background: "var(--bg-input)", color: "var(--text-primary)" }}
                >
                  {dark ? <Sun size={15} className="text-yellow-400" /> : <Moon size={15} className="text-blue-500" />}
                  <span>Toggle</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
