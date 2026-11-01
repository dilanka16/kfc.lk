import React from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, Heart } from "lucide-react";

/* SVG Social Icons */
const FbIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const IgIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const YtIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>;
const TwIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>;

/* ---- KFC Logo SVG (same as Navbar) ---- */
function KFCLogo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="28" fill="#E4002B"/>
      <ellipse cx="28" cy="20" rx="10" ry="11" fill="white"/>
      <rect x="18" y="28" width="20" height="16" rx="2" fill="white"/>
      <polygon points="28,28 26,36 28,38 30,36" fill="#E4002B"/>
      <text x="28" y="50" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="8.5" fill="white" letterSpacing="1.5">KFC</text>
      <line x1="20" y1="20" x2="25" y2="20" stroke="#E4002B" strokeWidth="1.5"/>
      <line x1="31" y1="20" x2="36" y2="20" stroke="#E4002B" strokeWidth="1.5"/>
      <circle cx="22.5" cy="20" r="2.5" fill="none" stroke="#E4002B" strokeWidth="1.2"/>
      <circle cx="33.5" cy="20" r="2.5" fill="none" stroke="#E4002B" strokeWidth="1.2"/>
    </svg>
  );
}

const socials = [
  { icon: FbIcon,  href: "https://web.facebook.com/KFCSriLanka", label: "Facebook",  color: "#1877f2" },
  { icon: IgIcon, href: "https://www.instagram.com/kfcsrilanka", label: "Instagram", color: "#e1306c" },
  { icon: YtIcon,   href: "https://www.youtube.com/c/KFCSriLanka",  label: "YouTube",   color: "#ff0000" },
  { icon: TwIcon,   href: "#",                                       label: "Twitter",   color: "#1da1f2" },
];

const quickLinks = [
  { label: "Our Menu",          href: "#menu" },
  { label: "Hot Deals",         href: "#promos" },
  { label: "Find a Restaurant", href: "#" },
  { label: "KFC App",           href: "#" },
  { label: "Catering",          href: "#" },
  { label: "About KFC SL",      href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy",    href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Cookie Policy",     href: "#" },
  { label: "Allergen Info",     href: "#" },
];

export default function Footer({ onOpenOutletsModal, onSelectCategory }) {
  return (
    <footer style={{ background: "var(--kfc-black)", color: "#e5e7eb" }}>
      {/* ---- Top Banner ---- */}
      <div style={{ background: "var(--kfc-red)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="text-center sm:text-left">
            <h3 className="text-white font-black text-xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Finger Lickin' Good — Delivered To Your Door
            </h3>
            <p className="text-white/75 text-sm mt-1">Order online and get fresh KFC delivered in 45 minutes or less</p>
          </div>
          <button
            onClick={() => onSelectCategory("all")}
            className="flex items-center gap-2 bg-white text-red-600 font-black px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-200 hover:scale-105 cursor-pointer shrink-0"
          >
            Order Now <ArrowRight size={16}/>
          </button>
        </div>
      </div>

      {/* ---- Main Footer ---- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <KFCLogo size={52}/>
              <div>
                <div className="font-black text-2xl text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>KFC</div>
                <div className="text-[10px] tracking-widest uppercase text-gray-400">Sri Lanka</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Sri Lanka's favorite fried chicken, served fresh with 11 secret herbs &amp; spices since 1995. 
              100% locally sourced Sri Lankan chicken.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: `${s.color}22`, color: s.color }}
                  onMouseEnter={e => e.currentTarget.style.background = s.color}
                  onMouseLeave={e => e.currentTarget.style.background = `${s.color}22`}
                >
                  <s.icon size={16}/>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-500 rounded"/> Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors duration-150 flex items-center gap-2 group"
                    onClick={link.href === "#menu" ? () => onSelectCategory("all") : undefined}
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 text-red-500"/>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-500 rounded"/> Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-red-400 shrink-0 mt-0.5"/>
                <div>
                  <div className="font-bold text-white">011 555 5555</div>
                  <div className="text-xs">Mon–Sun 10am – 11:30pm</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-red-400 shrink-0 mt-0.5"/>
                <div>
                  <div className="text-white">info@kfc.lk</div>
                  <div className="text-xs">Customer Support</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-red-400 shrink-0 mt-0.5"/>
                <div>
                  <div className="text-white">50+ Outlets</div>
                  <div className="text-xs">Across Sri Lanka</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-red-400 shrink-0 mt-0.5"/>
                <div>
                  <div className="text-white">Open Daily</div>
                  <div className="text-xs">10:00 AM – 11:30 PM</div>
                </div>
              </li>
            </ul>
          </div>

          {/* App + Outlets */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-500 rounded"/> Order Faster
            </h4>
            <div className="space-y-3">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-200 group"
              >
                <span className="text-2xl">🍎</span>
                <div className="text-xs leading-tight">
                  <div className="text-gray-400 group-hover:text-gray-200">Download on the</div>
                  <div className="text-white font-bold">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-200 group"
              >
                <span className="text-2xl">🤖</span>
                <div className="text-xs leading-tight">
                  <div className="text-gray-400 group-hover:text-gray-200">Get it on</div>
                  <div className="text-white font-bold">Google Play</div>
                </div>
              </a>
              <button
                onClick={onOpenOutletsModal}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-200 cursor-pointer"
              >
                <MapPin size={16} className="text-white shrink-0"/>
                <span className="text-white text-sm font-black">Find Nearest Outlet</span>
                <ArrowRight size={14} className="text-white/70 ml-auto"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Bottom Bar ---- */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>© {new Date().getFullYear()} KFC Sri Lanka. Made with</span>
            <Heart size={11} className="text-red-500 mx-0.5 animate-pulse-fast"/>
            <span>in Sri Lanka.</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map(l => (
              <a key={l.label} href={l.href} className="text-xs text-gray-500 hover:text-red-400 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
