import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, CreditCard, Banknote, MapPin, Phone, User, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  checkoutData,
  onOrderCompleted,
  orderMode,
  selectedLocation
}) {
  if (!isOpen || !checkoutData) return null;

  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    name: 'Dilanka',
    phone: '077 123 4567',
    address: 'No 45, Temple Road',
    city: selectedLocation,
    notes: 'Please call before arriving'
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (step === 3) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setOrderNumber('KFC-LK-' + Math.floor(100000 + Math.random() * 900000));
    }
  }, [step]);

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirmOrder = () => {
    setStep(3);
    if (onOrderCompleted) onOrderCompleted();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <span className="text-[10px] font-black uppercase text-[#e4002b] tracking-widest">
              KFC Online Ordering Sri Lanka
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-['Oswald'] uppercase tracking-tight text-gray-900">
              {step === 1 && 'Delivery & Contact Details'}
              {step === 2 && 'Choose Payment Method'}
              {step === 3 && 'Order Confirmed! 🎉'}
            </h2>
          </div>
          {step !== 3 && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* STEP 1: Details */}
          {step === 1 && (
            <form onSubmit={handleSubmitInfo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e4002b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Mobile Phone (SMS updates)
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e4002b]"
                  />
                </div>
              </div>

              {orderMode === 'D' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Street Address / House No.
                    </label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e4002b]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Area / City
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={formData.city}
                      className="w-full text-xs px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formData.city}
                    className="w-full text-xs px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Rider Delivery Note
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e4002b]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#e4002b] hover:bg-[#c40024] text-white py-3 rounded-full font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                >
                  <span>Continue to Payment &rarr;</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2.5">
                {[
                  { id: 'cod', name: 'Cash on Delivery', desc: 'Pay cash to our delivery rider at your doorstep', icon: Banknote },
                  { id: 'card-delivery', name: 'Card on Delivery', desc: 'Swipe your Visa / Mastercard on portable POS machine', icon: CreditCard },
                  { id: 'online', name: 'Online Card Payment', desc: 'Instant secure payment via Sri Lankan payment gateway', icon: ShieldCheck }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`w-full flex items-start gap-3 p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                      paymentMethod === m.id
                        ? 'border-[#e4002b] bg-red-50/60 shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${
                      paymentMethod === m.id ? 'bg-[#e4002b] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <m.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-black uppercase tracking-wider text-gray-900 font-['Oswald']">
                        {m.name}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Order Quick Summary */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-500">Order Amount to Pay:</span>
                  <div className="font-black text-[#e4002b] text-base font-['Oswald']">
                    Rs. {checkoutData.grandTotal.toLocaleString()}
                  </div>
                </div>
                <div className="text-right text-[11px] text-gray-500">
                  <div>{formData.name}</div>
                  <div>{formData.city}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100 uppercase"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#e4002b] hover:bg-[#c40024] text-white py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
                >
                  <CheckCircle2 size={16} />
                  <span>Place Order • Rs. {checkoutData.grandTotal.toLocaleString()}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Placed / Tracking Screen */}
          {step === 3 && (
            <div className="text-center space-y-5 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Order Reference: <strong className="text-gray-900">{orderNumber}</strong>
                </span>
                <h3 className="text-2xl font-black font-['Oswald'] uppercase text-gray-900 mt-1">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                  Your order has been sent to our nearest KFC kitchen. Get ready for finger lickin' goodness!
                </p>
              </div>

              {/* Live Status Tracker */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-700 flex items-center gap-1.5">
                    <Clock size={14} className="text-[#e4002b]" /> Estimated Delivery:
                  </span>
                  <span className="font-black text-[#e4002b] text-sm font-['Oswald']">
                    30 - 40 Mins
                  </span>
                </div>

                {/* Progress Bar Steps */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-3 text-xs text-emerald-700 font-bold">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
                    <span>Order Placed & Confirmed</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#e4002b] font-bold">
                    <span className="w-5 h-5 rounded-full bg-[#e4002b] text-white flex items-center justify-center text-[10px] animate-pulse">●</span>
                    <span>Kitchen is Frying to Crisp Perfection</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[10px]">3</span>
                    <span>Rider Dispatch & Delivery</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep(1);
                  onClose();
                }}
                className="w-full bg-[#202124] hover:bg-black text-white py-3 rounded-full font-black text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Back to Home Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
