import React, { useState, useMemo } from "react";
import { Sparkles, Flame, Sandwich, Soup, Drumstick, Utensils, Cookie, Coffee, Search, X, ChevronDown } from "lucide-react";
import { menuItems, categories } from "../data/menuData";
import FoodCard from "./FoodCard";

const iconMap = { Sparkles, Flame, Sandwich, Soup, Drumstick, Utensils, Cookie, Coffee };

export default function MenuSection({ selectedCategory, onSelectCategory, cartItems, onAddToCart, onUpdateQuantity, onOpenItemModal }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const cartQtyOf = id => {
    const it = cartItems.find(i => i.id === id);
    return it ? it.quantity : 0;
  };

  const filtered = useMemo(() => {
    let list = selectedCategory === "all" ? menuItems : menuItems.filter(i => i.category === selectedCategory);
    if (searchQuery.trim()) list = list.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || (i.description || "").toLowerCase().includes(searchQuery.toLowerCase()));
    if (spicyOnly) list = list.filter(i => i.spicy);
    if (sortBy === "price_asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "popular")    list = [...list].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    return list;
  }, [selectedCategory, searchQuery, spicyOnly, sortBy]);

  return (
    <section id="menu" className="py-10" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ---- Header ---- */}
        <div className="mb-8 float-in">
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: "rgba(228,0,43,0.08)", color: "var(--kfc-red)" }}>
            Our Menu
          </span>
          <h2 className="text-3xl font-black mt-2 mb-1" style={{ fontFamily: "'Oswald', sans-serif", color: "var(--text-primary)" }}>
            What Are You Craving?
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Hand-breaded fresh daily with 11 Secret Herbs &amp; Spices
          </p>
        </div>

        {/* ---- Category Tabs (horizontal scroll) ---- */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Sparkles;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer float-in"
                style={{
                  animationDelay: `${i * 0.06}s`,
                  background: active ? "var(--kfc-red)" : "var(--bg-card)",
                  color:      active ? "#fff" : "var(--text-secondary)",
                  border:     `1.5px solid ${active ? "var(--kfc-red)" : "var(--border-color)"}`,
                  boxShadow:  active ? "var(--shadow-red)" : "none",
                }}
              >
                <Icon size={13} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* ---- Search + Filters ---- */}
        <div className="flex flex-wrap items-center gap-3 mb-7">
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border flex-1 min-w-[180px] max-w-xs transition-all duration-200"
            style={{ background: "var(--bg-card)", borderColor: searchQuery ? "var(--kfc-red)" : "var(--border-color)" }}
          >
            <Search size={15} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none font-semibold"
              style={{ color: "var(--text-primary)" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="cursor-pointer" style={{ color: "var(--text-muted)" }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Spicy Filter */}
          <button
            onClick={() => setSpicyOnly(s => !s)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-black uppercase transition-all duration-200 cursor-pointer"
            style={{
              background: spicyOnly ? "#ff5722" : "var(--bg-card)",
              color:      spicyOnly ? "#fff"    : "var(--text-secondary)",
              borderColor: spicyOnly ? "#ff5722" : "var(--border-color)",
            }}
          >
            <Flame size={13} /> Spicy Only
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border text-xs font-bold cursor-pointer outline-none"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            >
              <option value="default">Sort: Default</option>
              <option value="popular">Most Popular</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>

          <p className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* ---- Grid ---- */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-6xl">🍗</div>
            <p className="text-xl font-black" style={{ color: "var(--text-secondary)" }}>Nothing found</p>
            <button
              onClick={() => { setSearchQuery(""); setSpicyOnly(false); onSelectCategory("all"); }}
              className="btn-kfc px-6 py-3 text-sm cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((item, idx) => (
              <FoodCard
                key={item.id}
                item={item}
                index={idx}
                cartQty={cartQtyOf(item.id)}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onOpenItemModal={onOpenItemModal}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
