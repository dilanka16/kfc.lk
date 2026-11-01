import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export default function Footer({ onOpenOutletsModal, onSelectCategory }) {
  return (
    <footer className="bg-[#202124] text-white pt-16 pb-12 border-t-4 border-[#e4002b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Header Row: Logo & Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-8 gap-1 items-stretch py-0.5">
              <div className="w-2 bg-[#e4002b] rounded-t-sm"></div>
              <div className="w-2 bg-white rounded-t-sm"></div>
              <div className="w-2 bg-[#e4002b] rounded-t-sm"></div>
            </div>
            <div>
              <span className="text-3xl font-black tracking-tighter text-[#e4002b] font-['Oswald'] leading-none">
                KFC
              </span>
              <span className="text-xs font-extrabold tracking-widest text-gray-400 uppercase block">
                Sri Lanka
              </span>
            </div>
          </div>

          {/* Social Badges */}
          <div className="flex items-center gap-3">
            {[
              { name: 'Facebook', url: 'https://www.facebook.com/KFCSriLanka/' },
              { name: 'Instagram', url: 'https://www.instagram.com/kfcsl' },
              { name: 'TikTok', url: 'https://www.tiktok.com/@kfcsrilanka' },
              { name: 'Twitter', url: 'https://twitter.com/kfc_srilanka' },
              { name: 'YouTube', url: 'https://www.youtube.com/channel/UCieRHv-34HT5es5ZiqiI5yw/featured' }
            ].map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#e4002b] text-gray-300 hover:text-white flex items-center justify-center transition text-xs font-bold"
                title={s.name}
              >
                {s.name.substring(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-gray-400">
          {/* About */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-['Oswald']">
              About KFC
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Our Heritage & Secret Recipe</a></li>
              <li><a href="#" className="hover:text-white transition">Local Poultry Farmers</a></li>
              <li><a href="#" className="hover:text-white transition">Careers at KFC</a></li>
              <li><a href="#" className="hover:text-white transition">Corporate Governance</a></li>
            </ul>
          </div>

          {/* Order Now */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-['Oswald']">
              Order Online
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onSelectCategory('chicken')} className="hover:text-white transition cursor-pointer">Hot & Crispy Chicken</button></li>
              <li><button onClick={() => onSelectCategory('burgers')} className="hover:text-white transition cursor-pointer">Signature Burgers</button></li>
              <li><button onClick={() => onSelectCategory('biriyani')} className="hover:text-white transition cursor-pointer">KFC Biriyani & Sawan</button></li>
              <li><button onClick={() => onSelectCategory('drumlets')} className="hover:text-white transition cursor-pointer">Hot Drumlets & Wings</button></li>
              <li><button onClick={onOpenOutletsModal} className="hover:text-white transition cursor-pointer">Store Locator</button></li>
            </ul>
          </div>

          {/* Policy */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-['Oswald']">
              Policy & Terms
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">General Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">WhatsApp Broadcast Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Customer Feedback & Survey</a></li>
              <li><a href="#" className="hover:text-white transition">Security & Cookies</a></li>
            </ul>
          </div>

          {/* Hotline Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-['Oswald']">
              Direct Contact
            </h4>
            <div className="space-y-3">
              <a
                href="tel:0115555555"
                className="flex items-center gap-2 text-white font-bold text-base hover:text-[#e4002b] transition"
              >
                <Phone size={18} className="text-[#e4002b]" />
                <span>011 555 5555</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={14} className="text-gray-500" />
                <span>customercare@kfc.lk</span>
              </div>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin size={14} className="text-gray-500 shrink-0 mt-0.5" />
                <span>KFC Sri Lanka Head Office, Colombo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© 2026 KFC Sri Lanka. All Rights Reserved. Scienter Technologies & Yum! Brands.</p>
          <div className="flex items-center gap-4">
            <span>Sri Lanka Standard Time (GMT+5:30)</span>
            <span>•</span>
            <span className="text-gray-400">Finger Lickin' Good</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
