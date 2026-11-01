import React, { useState } from "react";
import { X, Search, MapPin, Clock, Phone, Navigation, Star, ChevronRight } from "lucide-react";
import { outlets as outletsData } from "../data/outletsData";

export default function OutletsModal({ isOpen, onClose, onSelectOutlet }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  if (!isOpen) return null;

  const filtered = outletsData.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.city.toLowerCase().includes(search.toLowerCase()) ||
    (o.address || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}/>

      <div
        className="relative w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden scale-in flex flex-col"
        style={{ background: "var(--bg-drawer)", maxHeight: "90vh", color: "var(--text-primary)" }}
      >
        {/* ---- Header ---- */}
        <div
          className="flex items-center justify-between p-5 border-b shrink-0"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div>
            <h2 className="text-xl font-black flex items-center gap-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <span className="text-2xl">📍</span> Find a KFC Outlet
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {outletsData.length} restaurants across Sri Lanka
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer border"
            style={{ background: "var(--bg-input)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
          >
            <X size={18}/>
          </button>
        </div>

        {/* ---- Search ---- */}
        <div className="p-4 border-b shrink-0" style={{ borderColor: "var(--border-color)" }}>
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl border transition-all"
            style={{
              background: "var(--bg-input)",
              borderColor: search ? "var(--kfc-red)" : "var(--border-color)",
              boxShadow: search ? "0 0 0 3px var(--kfc-red-glow)" : "none",
            }}
          >
            <Search size={16} style={{ color: "var(--text-muted)" }}/>
            <input
              type="text"
              placeholder="Search by name or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none font-semibold"
              style={{ color: "var(--text-primary)" }}
              autoFocus
            />
            {search && (
              <button onClick={() => setSearch("")} className="cursor-pointer" style={{ color: "var(--text-muted)" }}>
                <X size={14}/>
              </button>
            )}
          </div>
        </div>

        {/* ---- Outlets List ---- */}
        <div className="overflow-y-auto flex-1 p-4 no-scrollbar space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="text-5xl">🗺️</div>
              <p className="font-bold" style={{ color: "var(--text-muted)" }}>No outlets found</p>
            </div>
          ) : (
            filtered.map((outlet, i) => (
              <button
                key={outlet.id}
                onClick={() => setSelected(outlet.id === selected ? null : outlet.id)}
                className="outlet-card w-full text-left p-4 rounded-2xl border float-in block"
                style={{
                  background: "var(--bg-card)",
                  borderColor: selected === outlet.id ? "var(--kfc-red)" : "var(--border-color)",
                  animationDelay: `${i * 0.04}s`,
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg font-black"
                    style={{ background: "rgba(228,0,43,0.1)", color: "var(--kfc-red)" }}
                  >
                    {outlet.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-black text-sm leading-snug">{outlet.name}</h3>
                        <p className="text-xs font-semibold" style={{ color: "var(--kfc-red)" }}>{outlet.city}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                        <Star size={11} fill="#f9a01b" stroke="none"/>
                        <span className="text-xs font-black text-yellow-500">4.{Math.floor(Math.random()*3)+5}</span>
                      </div>
                    </div>

                    {outlet.address && (
                      <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        <MapPin size={10} className="inline mr-1 text-red-400"/> {outlet.address}
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-2">
                      {outlet.hours && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>
                          <Clock size={10}/> {outlet.hours}
                        </span>
                      )}
                      {outlet.phone && (
                        <a href={`tel:${outlet.phone}`} onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:underline">
                          <Phone size={10}/> {outlet.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="shrink-0 mt-1 transition-transform duration-200"
                    style={{ transform: selected === outlet.id ? "rotate(90deg)" : "rotate(0deg)", color: "var(--text-muted)" }}
                  />
                </div>

                {/* Expanded: Select Pickup */}
                {selected === outlet.id && (
                  <div className="mt-4 pt-4 border-t flex items-center gap-3" style={{ borderColor: "var(--border-color)" }}>
                    <button
                      onClick={e => { e.stopPropagation(); onSelectOutlet(outlet); onClose(); }}
                      className="btn-kfc flex-1 py-2.5 text-sm font-black flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Navigation size={15}/> Pick Up Here
                    </button>
                    {outlet.mapUrl && (
                      <a
                        href={outlet.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition hover:border-red-500"
                        style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                      >
                        <MapPin size={13}/> View Map
                      </a>
                    )}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
