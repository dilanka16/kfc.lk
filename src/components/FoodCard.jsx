import React from 'react';
import { Plus, Minus, Flame, Eye, ShoppingBag } from 'lucide-react';

export default function FoodCard({
  item,
  cartItem,
  onAddToCart,
  onUpdateQuantity,
  onOpenItemModal
}) {
  const isInCart = Boolean(cartItem && cartItem.quantity > 0);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden cursor-pointer" onClick={() => onOpenItemModal(item)}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {item.badge && (
            <span className="bg-[#e4002b] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
              {item.badge}
            </span>
          )}
          {item.spicy && (
            <span className="bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm backdrop-blur-xs flex items-center gap-1 w-fit">
              <Flame size={11} className="fill-white" /> Spicy
            </span>
          )}
        </div>

        {/* Quick View Hover Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenItemModal(item);
          }}
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
        >
          <div className="bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye size={15} /> Quick View
          </div>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onOpenItemModal(item)}
            className="text-base sm:text-lg font-black text-gray-900 group-hover:text-[#e4002b] transition-colors line-clamp-1 cursor-pointer font-['Oswald'] tracking-tight"
            title={item.name}
          >
            {item.name}
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-semibold uppercase">Price</span>
            <span className="text-base sm:text-lg font-black text-gray-900 font-['Oswald']">
              Rs. {item.price.toLocaleString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div>
            {isInCart ? (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-2 py-1">
                <button
                  onClick={() => onUpdateQuantity(item.id, cartItem.quantity - 1)}
                  className="w-7 h-7 rounded-full bg-white text-[#e4002b] hover:bg-red-600 hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-black text-[#e4002b] px-1">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, cartItem.quantity + 1)}
                  className="w-7 h-7 rounded-full bg-[#e4002b] text-white hover:bg-[#c40024] flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item)}
                className="flex items-center gap-1.5 bg-[#e4002b] hover:bg-[#c40024] text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
              >
                <ShoppingBag size={14} />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
