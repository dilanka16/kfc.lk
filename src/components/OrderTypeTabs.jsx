import React, { useState, useRef, useEffect } from "react";
import { MapPin, Truck, ShoppingBag, ChevronDown, Store, Search } from "lucide-react";
import { outlets as outletsData, deliveryCities } from "../data/outletsData";

export default function OrderTypeTabs({ orderMode, setOrderMode, selectedLocation, setSelectedLocation, onOpenOutletsModal }) {
  const [citySearch, setCitySearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredCities = deliveryCities.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()));

  return (
    <section style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Mode Tabs */}
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Order Mode:</p>
          <div
            className="flex p-1.5 rounded-2xl gap-1"
            style={{ background: "var(--bg-input)" }}
          >
            {[
              { id: "D", label: "Delivery", icon: Truck },
              { id: "P", label: "Pickup",   icon: Store },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setOrderMode(tab.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-250 cursor-pointer"
                style={{
                  background: orderMode === tab.id ? "var(--kfc-red)" : "transparent",
                  color:      orderMode === tab.id ? "#fff" : "var(--text-secondary)",
                  boxShadow:  orderMode === tab.id ? "var(--shadow-red)" : "none",
                }}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Location Picker */}
        {orderMode === "D" ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
              <MapPin size={16} className="text-red-500" />
              <span>Deliver to:</span>
            </div>
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-bold transition-all duration-200 cursor-pointer min-w-[220px]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: showDropdown ? "var(--kfc-red)" : "var(--border-color)",
                  color: "var(--text-primary)",
                  boxShadow: showDropdown ? "0 0 0 3px var(--kfc-red-glow)" : "none",
                }}
              >
                <MapPin size={15} className="text-red-500 shrink-0" />
                <span className="flex-1 truncate text-left">{selectedLocation}</span>
                <ChevronDown size={15} className={`shrink-0 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} style={{ color: "var(--text-muted)" }} />
              </button>

              {showDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 w-72 rounded-2xl border overflow-hidden z-20 scale-in"
                  style={{ background: "var(--bg-drawer)", borderColor: "var(--border-color)", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}
                >
                  <div className="p-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "var(--bg-input)" }}>
                      <Search size={14} style={{ color: "var(--text-muted)" }} />
                      <input
                        type="text"
                        placeholder="Search city..."
                        value={citySearch}
                        onChange={e => setCitySearch(e.target.value)}
                        className="flex-1 bg-transparent text-sm outline-none"
                        style={{ color: "var(--text-primary)" }}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-52 no-scrollbar">
                    {filteredCities.map(city => (
                      <button
                        key={city}
                        onClick={() => { setSelectedLocation(city); setShowDropdown(false); setCitySearch(""); }}
                        className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2 transition-colors duration-150 cursor-pointer"
                        style={{ color: selectedLocation === city ? "var(--kfc-red)" : "var(--text-primary)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--bg-card-hover)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <MapPin size={13} className={selectedLocation === city ? "text-red-500" : "opacity-30"} />
                        {city}
                        {selectedLocation === city && <span className="ml-auto w-2 h-2 rounded-full bg-red-500" />}
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <p className="text-center py-6 text-sm" style={{ color: "var(--text-muted)" }}>No cities found</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-full font-bold" style={{ background: "rgba(228,0,43,0.08)", color: "var(--kfc-red)" }}>
              <Truck size={13} />
              Free delivery on orders over Rs. 1,000
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
              <Store size={16} className="text-red-500" />
              <span>Pickup from:</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border font-bold text-sm" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
              <ShoppingBag size={15} className="text-red-500" />
              <span className="truncate max-w-[200px]">{selectedLocation}</span>
            </div>
            <button
              onClick={onOpenOutletsModal}
              className="text-sm font-bold px-4 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <MapPin size={15} />
              Change Outlet
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
