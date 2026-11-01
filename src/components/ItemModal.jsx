import React, { useState, useEffect } from "react";
import { X, Flame, Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight, Star } from "lucide-react";

const ADDONS = [
  { id: "fries",    label: "Large Fries",     price: 350 },
  { id: "coleslaw", label: "Coleslaw (Reg)",  price: 200 },
  { id: "pepsi",    label: "Pepsi Can",       price: 220 },
  { id: "sauce",    label: "Extra Sauce",     price: 80  },
];

const PHOTOS = [
  null, // placeholder - uses item.image at index 0
  "https://admin-kfc-web.azurewebsites.net//images/sliderimages/d5a32ea361ef43d89dfb16096003a1eb.jpg",
  "https://admin-kfc-web.azurewebsites.net//images/sliderimages/03216f67500642769d7b19d5298f3e4d.jpg",
];

export default function ItemModal({ item, isOpen, onClose, onAddToCart }) {
  const [qty, setQty]         = useState(1);
  const [addons, setAddons]   = useState([]);
  const [note, setNote]       = useState("");
  const [imgIdx, setImgIdx]   = useState(0);
  const [added, setAdded]     = useState(false);

  useEffect(() => {
    if (isOpen) { setQty(1); setAddons([]); setNote(""); setImgIdx(0); setAdded(false); }
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const photos = [item.image, ...PHOTOS.slice(1)];
  const totalPrice = (item.price + addons.reduce((s, a) => s + a.price, 0)) * qty;

  const toggleAddon = addon => {
    setAddons(prev =>
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleAdd = () => {
    onAddToCart({ ...item, addons, note }, qty);
    setAdded(true);
    setTimeout(() => { onClose(); setAdded(false); }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div
        className="relative w-full sm:max-w-lg max-h-[96vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl scale-in no-scrollbar"
        style={{ background: "var(--bg-drawer)", color: "var(--text-primary)" }}
      >
        {/* ---- Photo Slideshow ---- */}
        <div className="relative overflow-hidden" style={{ height: "240px" }}>
          {photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              style={{
                transform: `translateX(${(i - imgIdx) * 100}%)`,
                transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)",
              }}
              onError={e => { e.target.src = item.image; }}
            />
          ))}
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Slide Arrows */}
          <button onClick={() => setImgIdx(i => Math.max(0, i-1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-red-600 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-sm"
          ><ChevronLeft size={18}/></button>
          <button onClick={() => setImgIdx(i => Math.min(photos.length-1, i+1))}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-red-600 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-sm"
          ><ChevronRight size={18}/></button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${i === imgIdx ? "bg-red-500 w-5 h-2" : "bg-white/50 w-2 h-2"}`}
              />
            ))}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Spicy badge */}
          {item.spicy && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full">
              <Flame size={11}/> Spicy
            </div>
          )}
        </div>

        {/* ---- Content ---- */}
        <div className="p-5 space-y-5">
          {/* Title & Rating */}
          <div>
            <h2 className="font-black text-xl leading-tight mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
              {item.name}
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s<=4?"#f9a01b":"none"} stroke={s<=4?"#f9a01b":"#ccc"}/>)}
              </div>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>4.7 (230 ratings)</span>
            </div>
            {item.description && (
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
            )}
          </div>

          {/* Add-ons */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
              Make it a Combo
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {ADDONS.map(addon => {
                const on = addons.find(a => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer"
                    style={{
                      background: on ? "rgba(228,0,43,0.08)" : "var(--bg-input)",
                      borderColor: on ? "var(--kfc-red)" : "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span className="text-xs font-bold truncate mr-1">{addon.label}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs font-black text-red-500">+{addon.price}</span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border transition ${on ? "bg-red-500 border-red-500" : "border-gray-400"}`}>
                        {on && <X size={10} className="text-white" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Note */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>Special Request</h3>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Any special instructions? (e.g., extra crispy, no mayo)"
              rows={2}
              className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none transition"
              style={{ background: "var(--bg-input)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            />
          </div>

          {/* Quantity + Add */}
          <div className="flex items-center gap-4 pt-2">
            {/* Qty */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-full border" style={{ borderColor: "var(--border-color)" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-full flex items-center justify-center transition cursor-pointer text-red-500 border border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500"
              ><Minus size={14}/></button>
              <span className="w-6 text-center font-black text-base" style={{ color: "var(--text-primary)" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center transition cursor-pointer hover:bg-red-700"
              ><Plus size={14}/></button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className={`btn-kfc flex-1 flex items-center justify-center gap-2 py-3.5 font-black cursor-pointer ${added ? "opacity-80 scale-95" : ""} transition-all duration-200`}
            >
              <ShoppingBag size={17} className={added ? "spin" : ""} />
              {added ? "Added! 🎉" : `Add to Bucket — Rs. ${totalPrice.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
