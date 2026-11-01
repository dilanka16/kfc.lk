import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Search, CheckCircle2 } from 'lucide-react';
import { outlets } from '../data/outletsData';

export default function OutletsModal({
  isOpen,
  onClose,
  onSelectOutlet
}) {
  if (!isOpen) return null;

  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const cities = ['All', 'Colombo', 'Rajagiriya', 'Dehiwala', 'Nugegoda', 'Kandy', 'Galle', 'Negombo'];

  const filteredOutlets = outlets.filter((o) => {
    const matchesCity = selectedCity === 'All' || o.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSearch = o.name.toLowerCase().includes(search.toLowerCase()) ||
                          o.address.toLowerCase().includes(search.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div>
            <span className="text-[10px] font-black uppercase text-[#e4002b] tracking-widest">
              KFC Sri Lanka Directory
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-['Oswald'] uppercase tracking-tight text-gray-900">
              Our Restaurants
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-gray-100 space-y-3 bg-white">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by outlet name or street address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e4002b]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#e4002b] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Outlets List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-gray-50/40">
          {filteredOutlets.length > 0 ? (
            filteredOutlets.map((outlet) => (
              <div
                key={outlet.id}
                className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs hover:border-red-200 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black font-['Oswald'] text-gray-900 uppercase">
                      {outlet.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                      <MapPin size={13} className="text-[#e4002b] shrink-0" />
                      <span>{outlet.address}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectOutlet(outlet);
                      onClose();
                    }}
                    className="bg-red-50 hover:bg-[#e4002b] text-[#e4002b] hover:text-white border border-red-200 px-3 py-1.5 rounded-full text-xs font-bold uppercase transition cursor-pointer shrink-0"
                  >
                    Select Pickup
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock size={13} className="text-gray-400" />
                    <span>{outlet.hours}</span>
                  </div>
                  <a
                    href={`tel:${outlet.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1 font-bold text-[#e4002b] hover:underline"
                  >
                    <Phone size={13} />
                    <span>{outlet.phone}</span>
                  </a>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {outlet.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-semibold"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 text-xs">
              No outlets match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
