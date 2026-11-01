import React, { useState } from 'react';
import { Search, Flame, Sparkles, Sandwich, Soup, Drumstick, Utensils, Cookie, Coffee, X } from 'lucide-react';
import FoodCard from './FoodCard';
import { categories, menuItems } from '../data/menuData';

const iconMap = {
  Sparkles: Sparkles,
  Flame: Flame,
  Sandwich: Sandwich,
  Soup: Soup,
  Drumstick: Drumstick,
  Utensils: Utensils,
  Cookie: Cookie,
  Coffee: Coffee
};

export default function MenuSection({
  selectedCategory,
  onSelectCategory,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onOpenItemModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySpicy, setOnlySpicy] = useState(false);

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpicy = onlySpicy ? item.spicy : true;
    return matchesCategory && matchesSearch && matchesSpicy;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="menu">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[#e4002b] text-xs font-black uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-[#e4002b]"></span>
            Freshly Prepared & Finger Lickin Good
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Oswald'] uppercase tracking-tight text-gray-900">
            Explore Our Menu
          </h2>
        </div>

        {/* Search Bar & Spicy Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Spicy Only Filter */}
          <button
            onClick={() => setOnlySpicy(!onlySpicy)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
              onlySpicy
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Flame size={15} className={onlySpicy ? "fill-white" : "text-amber-500"} />
            <span>Spicy Only</span>
          </button>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search chicken, burgers, sawan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-8 py-2 text-xs font-medium focus:outline-none focus:border-[#e4002b] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Category Nav */}
      <div className="relative mb-10 pb-2 border-b border-gray-200/80">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#e4002b] text-white shadow-md shadow-red-500/20 scale-102'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-black border border-gray-200/70'
                }`}
              >
                <IconComponent size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Food Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const cartItem = cartItems.find((c) => c.id === item.id);
            return (
              <FoodCard
                key={item.id}
                item={item}
                cartItem={cartItem}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onOpenItemModal={onOpenItemModal}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#e4002b] flex items-center justify-center mx-auto mb-4">
            <Search size={28} />
          </div>
          <h3 className="text-xl font-black font-['Oswald'] text-gray-900 uppercase">
            No matching items found
          </h3>
          <p className="text-xs text-gray-500 mt-2">
            Try adjusting your search or filter to find what you crave.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setOnlySpicy(false);
              onSelectCategory('all');
            }}
            className="mt-5 bg-[#e4002b] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#c40024] transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
