import React, { useState } from 'react';
import { ShoppingBag, MapPin, Phone, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar({
  cartCount,
  cartTotal,
  onOpenCart,
  orderMode,
  selectedLocation,
  onOpenLocationModal,
  onOpenOutletsModal,
  onSelectCategory,
  activeSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      {/* Top Banner / Announcement */}
      <div className="bg-[#202124] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-medium tracking-wide">Hotline:</span>
            <a href="tel:0115555555" className="hover:text-red-400 font-bold transition flex items-center gap-1">
              <Phone size={12} /> 011 555 5555
            </a>
            <span className="hidden sm:inline text-gray-400">| 100% Locally Sourced Fresh Sri Lankan Chicken</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-300">
            <button 
              onClick={onOpenOutletsModal} 
              className="hover:text-white transition underline cursor-pointer"
            >
              Find Outlets
            </button>
            <span className="hidden md:inline">Daily: 10:00 AM - 11:30 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Stripes */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-3 group">
              {/* KFC 3 Red Stripes Icon */}
              <div className="flex h-10 w-8 gap-1 items-stretch py-0.5">
                <div className="w-2 bg-[#e4002b] rounded-t-sm group-hover:scale-y-110 transition origin-bottom"></div>
                <div className="w-2 bg-white border border-gray-200 rounded-t-sm"></div>
                <div className="w-2 bg-[#e4002b] rounded-t-sm group-hover:scale-y-110 transition origin-bottom"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter text-[#e4002b] font-['Oswald'] leading-none">
                  KFC
                </span>
                <span className="text-[10px] font-extrabold tracking-widest text-[#202124] uppercase">
                  Sri Lanka
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 ml-4">
              <a 
                href="#menu" 
                onClick={() => onSelectCategory('all')} 
                className="text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-[#e4002b] transition border-b-2 border-transparent hover:border-[#e4002b] py-2"
              >
                Menu
              </a>
              <a 
                href="#promos" 
                className="text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-[#e4002b] transition border-b-2 border-transparent hover:border-[#e4002b] py-2 flex items-center gap-1.5"
              >
                <span className="bg-red-100 text-[#e4002b] text-[10px] px-1.5 py-0.5 rounded font-black">DEALS</span>
                Promotions
              </a>
              <button 
                onClick={onOpenOutletsModal} 
                className="text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-[#e4002b] transition border-b-2 border-transparent hover:border-[#e4002b] py-2 cursor-pointer"
              >
                Our Restaurants
              </button>
            </nav>
          </div>

          {/* Right Action Controls: Location Selector + Bucket */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Delivery/Pickup Location Pill */}
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 px-3 py-2 rounded-full transition cursor-pointer text-left"
              title="Change Delivery Location"
            >
              <div className="w-7 h-7 rounded-full bg-red-100 text-[#e4002b] flex items-center justify-center shrink-0">
                <MapPin size={15} />
              </div>
              <div className="hidden sm:block text-xs leading-tight">
                <div className="text-gray-400 text-[10px] font-semibold uppercase">{orderMode === 'D' ? 'Delivering to' : 'Pick up at'}</div>
                <div className="font-bold text-gray-800 max-w-[130px] truncate">{selectedLocation}</div>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {/* Bucket / Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-[#e4002b] hover:bg-[#c40024] text-white px-4 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:shadow-red-500/20 active:scale-95 transition cursor-pointer"
              aria-label="View Shopping Basket"
            >
              <ShoppingBag size={18} />
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-extrabold hidden sm:inline">Bucket</span>
                {cartCount > 0 ? (
                  <span className="bg-white text-[#e4002b] text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
                    {cartCount}
                  </span>
                ) : (
                  <span className="bg-black/20 text-white text-xs px-2 py-0.5 rounded-full">0</span>
                )}
                {cartTotal > 0 && (
                  <span className="hidden lg:inline text-xs font-semibold pl-1 border-l border-white/30">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-gray-100 transition"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top">
          <div className="space-y-3">
            <a
              href="#menu"
              onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }}
              className="block px-3 py-2.5 rounded-lg text-base font-bold text-gray-800 hover:bg-red-50 hover:text-[#e4002b] transition uppercase"
            >
              Browse Menu
            </a>
            <a
              href="#promos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-bold text-gray-800 hover:bg-red-50 hover:text-[#e4002b] transition uppercase flex items-center justify-between"
            >
              <span>Promotions & Offers</span>
              <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HOT DEALS</span>
            </a>
            <button
              onClick={() => { onOpenOutletsModal(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-bold text-gray-800 hover:bg-red-50 hover:text-[#e4002b] transition uppercase"
            >
              Our Restaurants in Sri Lanka
            </button>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600 px-3">
              <span>Customer Care Hotline:</span>
              <a href="tel:0115555555" className="font-bold text-[#e4002b] flex items-center gap-1">
                <Phone size={14} /> 011 555 5555
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
