import React, { useState, useEffect } from "react";
import { X, CheckCircle, ChevronRight, MapPin, Phone, User, MessageSquare, Loader, Truck, Store } from "lucide-react";
import confetti from "canvas-confetti";

const STEPS = ["Your Details", "Confirm Order", "Done!"];

export default function CheckoutModal({ isOpen, onClose, checkoutData, onOrderCompleted, orderMode, selectedLocation }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) { setStep(0); setForm({ name: "", phone: "", address: "", note: "" }); setErrors({}); }
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen || !checkoutData) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (orderMode === "D" && !form.address.trim()) e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (step === 0 && !validate()) return;
    if (step === 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(2);
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ["#e4002b", "#f9a01b", "#ffffff"] });
        setTimeout(() => { confetti({ particleCount: 60, angle: 60,  spread: 60, origin: { x: 0 } }); }, 300);
        setTimeout(() => { confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 } }); }, 500);
      }, 1800);
      return;
    }
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const Field = ({ label, name, type = "text", placeholder, icon: Icon, rows }) => (
    <div>
      <label className="text-xs font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-muted)" }}>{label}</label>
      <div className={`flex items-start gap-2 px-3 py-3 rounded-xl border transition-all ${errors[name] ? "border-red-500" : ""}`}
        style={{ background: "var(--bg-input)", borderColor: errors[name] ? "#dc2626" : "var(--border-color)" }}>
        {Icon && <Icon size={15} className="shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }}/>}
        {rows ? (
          <textarea rows={rows} placeholder={placeholder} value={form[name]}
            onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: "" })); }}
            className="flex-1 bg-transparent text-sm outline-none resize-none" style={{ color: "var(--text-primary)" }}/>
        ) : (
          <input type={type} placeholder={placeholder} value={form[name]}
            onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: "" })); }}
            className="flex-1 bg-transparent text-sm outline-none" style={{ color: "var(--text-primary)" }}/>
        )}
      </div>
      {errors[name] && <p className="text-red-500 text-xs mt-1 font-semibold">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={step < 2 ? onClose : undefined}/>

      <div className="relative w-full sm:max-w-lg max-h-[96vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl scale-in no-scrollbar"
        style={{ background: "var(--bg-drawer)", color: "var(--text-primary)" }}>

        {/* Close */}
        {step < 2 && (
          <button onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition cursor-pointer"
            style={{ background: "var(--bg-input)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
            <X size={16}/>
          </button>
        )}

        {/* Step Indicator */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-5">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 transition-all duration-300 ${i <= step ? "" : "opacity-40"}`}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300"
                    style={{ background: i < step ? "#16a34a" : i === step ? "var(--kfc-red)" : "var(--border-color)", color: i <= step ? "#fff" : "var(--text-muted)" }}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className="text-xs font-bold hidden sm:block" style={{ color: i === step ? "var(--text-primary)" : "var(--text-muted)" }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 rounded" style={{ background: i < step ? "#16a34a" : "var(--border-color)" }}/>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 0: Form */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-black text-xl mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Your Details</h2>
              <Field label="Full Name"    name="name"    placeholder="Your name"        icon={User}/>
              <Field label="Phone Number" name="phone"   placeholder="07X XXX XXXX"     icon={Phone} type="tel"/>
              {orderMode === "D" && (
                <Field label="Delivery Address" name="address" placeholder="Your full delivery address" icon={MapPin} rows={2}/>
              )}
              <Field label="Special Note (Optional)" name="note" placeholder="Any extra instructions" icon={MessageSquare} rows={2}/>
              <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-full font-bold" style={{ background: "rgba(228,0,43,0.08)", color: "var(--kfc-red)" }}>
                {orderMode === "D" ? <Truck size={13}/> : <Store size={13}/>}
                {orderMode === "D" ? `Delivering to: ${selectedLocation}` : `Pickup from: ${selectedLocation}`}
              </div>
            </div>
          )}

          {/* Step 1: Confirm */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-black text-xl mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Confirm Order</h2>
              {[
                { label: "Name",   val: form.name },
                { label: "Phone",  val: form.phone },
                ...(orderMode === "D" ? [{ label: "Address", val: form.address }] : []),
                ...(form.note ? [{ label: "Note", val: form.note }] : []),
              ].map(row => (
                <div key={row.label} className="flex items-start justify-between text-sm">
                  <span className="font-bold" style={{ color: "var(--text-muted)" }}>{row.label}:</span>
                  <span className="font-semibold text-right max-w-[60%]" style={{ color: "var(--text-primary)" }}>{row.val}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2" style={{ borderColor: "var(--border-color)" }}>
                {[
                  { label: "Subtotal",  val: `Rs. ${checkoutData.subtotal.toLocaleString()}` },
                  ...(checkoutData.discount > 0 ? [{ label: "Discount", val: `-Rs. ${checkoutData.discount.toLocaleString()}`, green: true }] : []),
                  { label: "Delivery",  val: checkoutData.delivery === 0 ? "Free" : `Rs. ${checkoutData.delivery}`, green: checkoutData.delivery === 0 },
                ].map(r => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>{r.label}</span>
                    <span className={r.green ? "text-green-500 font-bold" : ""} style={!r.green ? { color: "var(--text-primary)" } : {}}>{r.val}</span>
                  </div>
                ))}
                <div className="flex justify-between text-lg font-black pt-2 border-t" style={{ borderColor: "var(--border-color)" }}>
                  <span>Total</span>
                  <span style={{ color: "var(--kfc-red)" }}>Rs. {checkoutData.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Done */}
          {step === 2 && (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-pulse-fast">
                <CheckCircle size={44} className="text-green-500"/>
              </div>
              <h2 className="font-black text-2xl" style={{ fontFamily: "'Oswald', sans-serif", color: "var(--text-primary)" }}>
                Order Placed! 🎉
              </h2>
              <p style={{ color: "var(--text-muted)" }} className="text-sm max-w-xs">
                Thank you, {form.name}! Your KFC order has been received.
                {orderMode === "D" ? " Estimated delivery: 30-45 minutes." : " Please collect from the outlet."}
              </p>
              <div className="flex items-center gap-2 text-sm font-black px-4 py-2 rounded-full" style={{ background: "rgba(228,0,43,0.08)", color: "var(--kfc-red)" }}>
                Order #KFC{Date.now().toString().slice(-5)}
              </div>
              <button
                onClick={() => { onOrderCompleted(); onClose(); }}
                className="btn-kfc mt-2 px-8 py-3 font-black cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          )}

          {/* Action Button */}
          {step < 2 && (
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="btn-kfc w-full py-4 font-black mt-6 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <><Loader size={18} className="spin"/> Placing Order...</>
              ) : step === 0 ? (
                <>Continue <ChevronRight size={16}/></>
              ) : (
                <>Place Order <ChevronRight size={16}/></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
