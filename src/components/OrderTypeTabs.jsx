import React, { useState } from 'react';
import { Bike, Store, MapPin, Navigation, Search, Check } from 'lucide-react';
import { deliveryCities } from '../data/outletsData';

export default function OrderTypeTabs({
  orderMode,
  setOrderMode,
  selectedLocation,
  setSelectedLocation,
  onOpenOutletsModal
}) {
  const [isLocating, setIsLocating] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = deliveryCities.filter(c =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocateMe = () => {
    setIsLocating(true);
    setTimeout(() => {
      setSelectedLocation('Colombo 03 - Kollupitiya');
      setIsLocating(false);
    }, 1200);
  };

  return (
    <div className="relative z-30 -mt-8 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-4 sm:p-6 transition">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          
          {/* Delivery / Pickup Switcher */}
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-full shrink-0">
            <button
              onClick={() => setOrderMode('D')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition cursor-pointer ${
                orderMode === 'D'
                  ? 'bg-[#e4002b] text-white shadow-md'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              <Bike size={18} />
              <span>Delivery</span>
            </button>

            <button
              onClick={() => setOrderMode('P')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition cursor-pointer ${
                orderMode === 'P'
                  ? 'bg-[#e4002b] text-white shadow-md'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              <Store size={18} />
              <span>Pickup</span>
            </button>
          </div>

          {/* Location Input & Locate Me */}
          <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative">
            <div className="relative flex-1">
              <div 
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100/80 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer transition text-left"
              >
                <div className="flex items-center gap-3 truncate">
                  <MapPin size={18} className="text-[#e4002b] shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">
                      {orderMode === 'D' ? 'Select Delivery Area in Sri Lanka' : 'Select Pickup Outlet Location'}
                    </div>
                    <div className="text-sm font-bold text-gray-800 truncate">
                      {selectedLocation}
                    </div>
                  </div>
                </div>
                <Search size={16} className="text-gray-400 shrink-0 ml-2" />
              </div>

              {/* Dropdown Menu */}
              {showLocationDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 max-h-72 overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Type city (e.g. Colombo, Kandy, Galle)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:border-[#e4002b] mb-2"
                    autoFocus
                  />
                  <div className="space-y-1">
                    {filteredCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedLocation(city);
                          setShowLocationDropdown(false);
                          setSearchTerm('');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-left transition cursor-pointer ${
                          selectedLocation === city
                            ? 'bg-red-50 text-[#e4002b] font-bold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedLocation === city && <Check size={14} className="text-[#e4002b]" />}
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <p className="text-xs text-gray-400 p-2 text-center">No matching area found</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Locate Me button */}
            <button
              onClick={handleLocateMe}
              disabled={isLocating}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer shrink-0 disabled:opacity-50"
            >
              <Navigation size={16} className={isLocating ? "animate-spin text-[#e4002b]" : "text-gray-600"} />
              <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
            </button>
          </div>
        </div>

        {/* Quick Promo Perks Row */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Estimated Delivery: <strong className="text-gray-800">30 - 45 Mins</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Free Delivery on orders over <strong className="text-gray-800">Rs. 2,500</strong></span>
          </div>
          <button 
            onClick={onOpenOutletsModal}
            className="text-[#e4002b] font-bold hover:underline cursor-pointer ml-auto"
          >
            View Outlet Map & Timings &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
