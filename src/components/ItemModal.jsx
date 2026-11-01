import React, { useState } from 'react';
import { X, Plus, Minus, Flame, ShoppingBag, Check } from 'lucide-react';

const ADDONS = [
  { id: 'dip-garlic', name: 'Signature Garlic Mayo Dip', price: 150 },
  { id: 'dip-cheese', name: 'Melted Spicy Cheese Dip', price: 180 },
  { id: 'side-fries', name: 'Regular Hot French Fries', price: 350 },
  { id: 'drink-pepsi', name: 'Chilled Pepsi Can 330ml', price: 290 }
];

export default function ItemModal({
  item,
  isOpen,
  onClose,
  onAddToCart
}) {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [flavor, setFlavor] = useState(item.spicy ? 'Hot & Crispy' : 'Original Recipe');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [note, setNote] = useState('');

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = item.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      ...item,
      customization: {
        flavor,
        addons: selectedAddons,
        note
      },
      price: unitPrice,
      totalPrice
    }, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Image */}
        <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs uppercase font-extrabold bg-[#e4002b] px-2.5 py-0.5 rounded shadow">
              {item.category.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-['Oswald'] uppercase tracking-tight mt-1">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {item.description}
          </p>

          {/* Flavor Selection */}
          <div>
            <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider mb-2">
              Select Flavor / Preparation:
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {['Hot & Crispy', 'Original Recipe'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFlavor(f)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    flavor === f
                      ? 'border-[#e4002b] bg-red-50 text-[#e4002b]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {f === 'Hot & Crispy' && <Flame size={14} className="text-red-600 fill-red-600" />}
                    <span>{f}</span>
                  </div>
                  {flavor === f && <Check size={16} className="text-[#e4002b]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider mb-2">
              Delicious Add-ons (Optional):
            </h4>
            <div className="space-y-2">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.some(a => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'border-red-400 bg-red-50/70 text-gray-900'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-[#e4002b] border-[#e4002b] text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <Check size={12} />}
                      </div>
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-bold text-[#e4002b]">+ Rs. {addon.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Request */}
          <div>
            <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider mb-1.5">
              Special Instructions:
            </h4>
            <input
              type="text"
              placeholder="e.g. Extra napkins, sauce on the side..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e4002b]"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-gray-600 hover:text-red-600 transition p-1 cursor-pointer"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="text-sm font-black text-gray-900 px-1">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-gray-600 hover:text-red-600 transition p-1 cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add CTA */}
          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-center gap-2 bg-[#e4002b] hover:bg-[#c40024] text-white px-5 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-500/25 transition active:scale-95 cursor-pointer"
          >
            <ShoppingBag size={18} />
            <span>Add to Bucket • Rs. {totalPrice.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
