import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Tag, Check, ArrowRight } from 'lucide-react';
import { specialDeals } from '../data/promosData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  orderMode
}) {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Delivery Fee: 0 for pickup, 250 for delivery (free if > 2500 or FREESHIP coupon)
  let deliveryFee = orderMode === 'P' ? 0 : 250;
  if (subtotal >= 2500 || (appliedCoupon && appliedCoupon.code === 'FREESHIP')) {
    deliveryFee = 0;
  }

  const packagingFee = cartItems.length > 0 ? 80 : 0;

  // Coupon discount calculation
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.code === 'KFC10') {
      discount = Math.round(subtotal * 0.1);
    } else if (appliedCoupon.code === 'FEAST500' && subtotal >= 3500) {
      discount = 500;
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + packagingFee - discount);

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError('');

    const deal = specialDeals.find(d => d.code === code);
    if (!deal) {
      setCouponError('Invalid coupon code. Try KFC10 or FEAST500.');
      return;
    }

    if (code === 'FEAST500' && subtotal < 3500) {
      setCouponError('FEAST500 requires a minimum order of Rs. 3,500.');
      return;
    }

    setAppliedCoupon(deal);
    setCouponInput('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-red-100 text-[#e4002b] flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h2 className="text-xl font-black font-['Oswald'] uppercase tracking-tight text-gray-900 leading-none">
                Your Bucket
              </h2>
              <span className="text-[11px] text-gray-500 font-semibold">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-red-50 text-[#e4002b] flex items-center justify-center">
                <ShoppingBag size={36} />
              </div>
              <h3 className="text-xl font-black font-['Oswald'] text-gray-800 uppercase">
                Your Bucket is Empty
              </h3>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                Good food is only a click away. Explore our crispy chicken, burgers, and biriyani!
              </p>
              <button
                onClick={onClose}
                className="bg-[#e4002b] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#c40024] transition shadow-md cursor-pointer"
              >
                Browse Menu Now
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id + (item.customization ? JSON.stringify(item.customization) : '')}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-gray-900 truncate font-['Oswald']">
                        {item.name}
                      </h4>
                      {item.customization && (
                        <div className="text-[10px] text-gray-500 space-y-0.5 mt-0.5">
                          <div>Flavor: <span className="font-semibold">{item.customization.flavor}</span></div>
                          {item.customization.addons && item.customization.addons.length > 0 && (
                            <div className="truncate">
                              Addons: {item.customization.addons.map(a => a.name).join(', ')}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="text-xs font-black text-[#e4002b] mt-1 font-['Oswald']">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2 py-0.5 shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-red-600 transition"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-black text-gray-800 px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-red-600 transition"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="pt-3 border-t border-gray-100">
                <div className="text-xs font-black uppercase text-gray-800 tracking-wider mb-2 flex items-center gap-1.5">
                  <Tag size={14} className="text-[#e4002b]" />
                  <span>Promo Code & Coupons</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Check size={12} />
                      </div>
                      <div>
                        <span className="font-bold">{appliedCoupon.code}</span> applied: {appliedCoupon.discount}
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-emerald-700 hover:underline font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon (e.g. KFC10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e4002b] uppercase font-bold"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="bg-gray-900 hover:bg-black text-white text-xs font-black uppercase px-4 py-2 rounded-xl transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick Suggestions */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {specialDeals.map((deal) => (
                        <button
                          key={deal.code}
                          onClick={() => handleApplyCoupon(deal.code)}
                          className="text-[10px] bg-red-50 text-[#e4002b] hover:bg-red-100 border border-red-200 px-2 py-0.5 rounded-md font-bold cursor-pointer"
                        >
                          Use {deal.code} ({deal.discount})
                        </button>
                      ))}
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1.5">{couponError}</p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-gray-50 border-t border-gray-100 space-y-3">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-bold text-gray-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    `Rs. ${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Packaging Fee</span>
                <span className="font-bold text-gray-900">Rs. {packagingFee}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-200 flex justify-between text-base font-black text-gray-900 font-['Oswald']">
                <span>Total Amount</span>
                <span className="text-[#e4002b]">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onProceedToCheckout({
                  subtotal,
                  deliveryFee,
                  packagingFee,
                  discount,
                  grandTotal,
                  items: cartItems
                });
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#e4002b] hover:bg-[#c40024] text-white py-3.5 rounded-full font-black text-sm uppercase tracking-wider shadow-lg shadow-red-500/25 active:scale-95 transition cursor-pointer"
            >
              <span>Checkout • Rs. {grandTotal.toLocaleString()}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
