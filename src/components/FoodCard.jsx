import React, { useState } from "react";
import { ShoppingBag, Flame, Star, Eye, Plus, Minus, Info } from "lucide-react";

export default function FoodCard({ item, cartQty, onAddToCart, onUpdateQuantity, onOpenItemModal, index }) {
  const [adding, setAdding] = useState(false);
  const inCart = cartQty > 0;

  const handleAdd = () => {
    setAdding(true);
    onAddToCart(item, 1);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div
      className="card-float group relative flex flex-col rounded-2xl overflow-hidden border float-in"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-color)",
        boxShadow: "var(--shadow-card)",
        animationDelay: `${(index % 8) * 0.06}s`,
      }}
    >
      {/* ---- Image ---- */}
      <div className="relative overflow-hidden" style={{ paddingBottom: "65%" }}>
        <img
          src={item.image}
          alt={item.name}
          className="img-zoom absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={e => { e.target.src = "https://via.placeholder.com/400x260/1a1a1a/e4002b?text=KFC"; }}
        />

        {/* Overlay Quick View */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onOpenItemModal(item)}
            className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer"
          >
            <Eye size={17} className="text-red-600" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.badge && (
            <span
              className="text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider"
              style={{ background: item.badge === "New" ? "#f9a01b" : "var(--kfc-red)" }}
            >
              {item.badge}
            </span>
          )}
          {item.spicy && (
            <span className="flex items-center gap-1 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase">
              <Flame size={9} /> Spicy
            </span>
          )}
        </div>

        {/* Cart count pill (top right) */}
        {inCart && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-black px-2 py-1 rounded-full badge-pulse">
            ×{cartQty}
          </span>
        )}
      </div>

      {/* ---- Body ---- */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start gap-2">
          <h3 className="font-black text-sm leading-snug flex-1" style={{ color: "var(--text-primary)" }}>
            {item.name}
          </h3>
          <button
            onClick={() => onOpenItemModal(item)}
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition hover:bg-red-50 cursor-pointer"
            style={{ color: "var(--text-muted)" }}
          >
            <Info size={14} />
          </button>
        </div>

        {item.description && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
            {item.description}
          </p>
        )}

        <div className="flex items-center gap-1 mt-auto mb-2">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={10} fill={s <= 4 ? "#f9a01b" : "none"} stroke={s <= 4 ? "#f9a01b" : "#ccc"} />
          ))}
          <span className="text-[10px] ml-1" style={{ color: "var(--text-muted)" }}>4.{Math.floor(Math.random()*5)+3}</span>
        </div>

        {/* Price & Cart Controls */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-black text-base" style={{ color: "var(--kfc-red)" }}>Rs. {item.price.toLocaleString()}</span>
          </div>

          {inCart ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.id, cartQty - 1)}
                className="w-8 h-8 rounded-full border-2 border-red-500 text-red-500 flex items-center justify-center transition hover:bg-red-500 hover:text-white cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="font-black text-sm w-6 text-center" style={{ color: "var(--text-primary)" }}>{cartQty}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, cartQty + 1)}
                className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center transition hover:bg-red-700 cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className={`btn-kfc flex items-center gap-2 px-4 py-2 text-xs cursor-pointer ${adding ? "scale-90" : ""} transition-transform duration-150`}
            >
              <ShoppingBag size={13} className={adding ? "spin" : ""} />
              {adding ? "Added!" : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
