import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, Tag, Truck, ArrowRight, Flame, Package } from "lucide-react";

const COUPONS = {
  KFC10:    { desc: "10% off your order", apply: sub => Math.round(sub * 0.1),          free_delivery: false },
  FEAST500: { desc: "Rs. 500 off orders over Rs. 3,500", apply: sub => sub >= 3500 ? 500 : 0, free_delivery: false, minOrder: 3500 },
  FREESHIP: { desc: "Free Delivery",      apply: () => 0,                                free_delivery: true  },
};
const DELIVERY_FEE = 180;

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedToCheckout, orderMode }) {
  const [coupon, setCoupon]       = useState("");
  const [applied, setApplied]     = useState(null);
  const [couponError, setCouponError] = useState("");

  const subtotal  = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount  = applied ? COUPONS[applied].apply(subtotal) : 0;
  const freeShip  = applied ? COUPONS[applied].free_delivery : false;
  const delivery  = orderMode === "P" || freeShip ? 0 : DELIVERY_FEE;
  const total     = Math.max(0, subtotal - discount) + delivery;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const rule = COUPONS[code];
    if (!rule) { setCouponError("Invalid coupon code."); setApplied(null); return; }
    if (rule.minOrder && subtotal < rule.minOrder) { setCouponError(`Minimum order Rs. ${rule.minOrder.toLocaleString()} required.`); setApplied(null); return; }
    setApplied(code);
    setCouponError("");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose}/>

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col slide-in-right w-full max-w-md shadow-2xl"
        style={{ background: "var(--bg-drawer)", color: "var(--text-primary)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b shrink-0" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
              <ShoppingBag size={18} className="text-white"/>
            </div>
            <div>
              <h2 className="font-black text-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>Your Bucket</h2>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center border transition cursor-pointer"
            style={{ background: "var(--bg-input)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
            <X size={18}/>
          </button>
        </div>

        {/* Order Mode Badge */}
        <div className="px-5 pt-3 shrink-0">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold"
            style={{ background: "rgba(228,0,43,0.08)", color: "var(--kfc-red)" }}
          >
            {orderMode === "D" ? <Truck size={13}/> : <Package size={13}/>}
            <span>{orderMode === "D" ? "Delivery Order" : "Pickup Order"}</span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 no-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
              <div className="text-6xl">🍗</div>
              <h3 className="font-black text-xl" style={{ color: "var(--text-secondary)" }}>Your bucket is empty!</h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Add some finger lickin&apos; good items</p>
              <button onClick={onClose} className="btn-kfc px-6 py-3 text-sm cursor-pointer">Browse Menu</button>
            </div>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-2xl border float-in"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl shrink-0"
                  onError={e => { e.target.src = "https://via.placeholder.com/64x64/1a1a1a/e4002b?text=KFC"; }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-black text-sm leading-snug truncate max-w-[150px]">{item.name}</p>
                      {item.spicy && (
                        <span className="flex items-center gap-1 text-orange-500 text-[10px] font-bold">
                          <Flame size={9}/> Spicy
                        </span>
                      )}
                    </div>
                    <button onClick={() => onRemoveItem(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition hover:bg-red-50 cursor-pointer shrink-0"
                      style={{ color: "var(--text-muted)" }}>
                      <Trash2 size={13}/>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-sm" style={{ color: "var(--kfc-red)" }}>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border-2 border-red-500 text-red-500 flex items-center justify-center transition hover:bg-red-500 hover:text-white cursor-pointer">
                        <Minus size={11}/>
                      </button>
                      <span className="font-black text-sm w-5 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center transition hover:bg-red-700 cursor-pointer">
                        <Plus size={11}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t px-5 pb-6 pt-4 space-y-4 shrink-0" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>

            {/* Coupon */}
            <div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-xl border"
                  style={{ background: "var(--bg-input)", borderColor: applied ? "#16a34a" : couponError ? "#dc2626" : "var(--border-color)" }}>
                  <Tag size={14} className={applied ? "text-green-500" : "text-gray-400"}/>
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponError(""); }}
                    disabled={!!applied}
                    className="flex-1 bg-transparent text-sm font-bold outline-none tracking-widest"
                    style={{ color: "var(--text-primary)" }}
                  />
                </div>
                {applied ? (
                  <button
                    onClick={() => { setApplied(null); setCoupon(""); }}
                    className="px-4 py-2.5 rounded-xl bg-green-100 text-green-700 text-xs font-black cursor-pointer hover:bg-green-200 transition"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={applyCoupon}
                    disabled={!coupon.trim()}
                    className="btn-kfc px-4 py-2.5 text-xs cursor-pointer disabled:opacity-40"
                  >
                    Apply
                  </button>
                )}
              </div>
              {applied && (
                <p className="text-green-600 text-xs font-bold mt-1 flex items-center gap-1">
                  ✓ {COUPONS[applied].desc}
                </p>
              )}
              {couponError && <p className="text-red-500 text-xs font-bold mt-1">{couponError}</p>}
              <div className="flex gap-2 mt-2">
                {Object.keys(COUPONS).map(c => (
                  <button key={c} onClick={() => { setCoupon(c); setCouponError(""); }}
                    className="text-[10px] font-black px-2 py-1 rounded-full border cursor-pointer transition hover:border-red-500"
                    style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                  >{c}</button>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2">
              {[
                { label: "Subtotal",  value: `Rs. ${subtotal.toLocaleString()}` },
                ...(discount > 0 ? [{ label: `Discount (${applied})`, value: `-Rs. ${discount.toLocaleString()}`, red: true }] : []),
                { label: orderMode === "P" ? "Pickup (Free)" : freeShip ? "Delivery (Free!)" : "Delivery", value: delivery === 0 ? "Free" : `Rs. ${delivery}`, green: delivery === 0 },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>{row.label}</span>
                  <span className={`font-bold ${row.red ? "text-green-500" : row.green ? "text-green-500" : ""}`}
                    style={!row.red && !row.green ? { color: "var(--text-primary)" } : {}}>
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
                <span className="font-black text-base">Total</span>
                <span className="font-black text-xl" style={{ color: "var(--kfc-red)" }}>Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout({ subtotal, discount, delivery, total, coupon: applied })}
              className="btn-kfc w-full py-4 font-black text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={17}/> Checkout — Rs. {total.toLocaleString()} <ArrowRight size={15}/>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
