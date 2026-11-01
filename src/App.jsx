import React, { useState, useEffect, createContext, useContext } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import OrderTypeTabs from "./components/OrderTypeTabs";
import MenuSection from "./components/MenuSection";
import TrustSection from "./components/TrustSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ItemModal from "./components/ItemModal";
import CheckoutModal from "./components/CheckoutModal";
import OutletsModal from "./components/OutletsModal";

export const ThemeContext = createContext({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("kfc_dark");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("kfc_dark", dark);
  }, [dark]);

  const [cartItems, setCartItems] = useState(() => {
    try { const s = localStorage.getItem("kfc_lk_cart"); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });
  const [orderMode, setOrderMode] = useState("D");
  const [selectedLocation, setSelectedLocation] = useState("Colombo 03 - Kollupitiya");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOutletsModalOpen, setIsOutletsModalOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    try { localStorage.setItem("kfc_lk_cart", JSON.stringify(cartItems)); }
    catch {}
  }, [cartItems]);

  const handleAddToCart = (item, quantity = 1) => {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id);
      if (idx > -1) {
        const u = [...prev];
        u[idx] = { ...u[idx], quantity: u[idx].quantity + quantity };
        return u;
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const handleUpdateQuantity = (itemId, qty) => {
    if (qty <= 0) { setCartItems(p => p.filter(i => i.id !== itemId)); return; }
    setCartItems(p => p.map(i => i.id === itemId ? { ...i, quantity: qty } : i));
  };

  const handleRemoveItem = id => setCartItems(p => p.filter(i => i.id !== id));

  const handleProceedToCheckout = summary => {
    setCheckoutData(summary);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    try { localStorage.removeItem("kfc_lk_cart"); } catch {}
  };

  const handleSelectOutlet = outlet => {
    setOrderMode("P");
    setSelectedLocation(`${outlet.name} (${outlet.city})`);
  };

  const totalCartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartSubtotal   = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const goToMenu = (cat = "all") => {
    setSelectedCategory(cat);
    setTimeout(() => {
      const el = document.getElementById("menu");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <div
        className="min-h-screen flex flex-col transition-colors duration-300"
        style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
      >
        <Navbar
          cartCount={totalCartCount}
          cartTotal={cartSubtotal}
          onOpenCart={() => setIsCartOpen(true)}
          orderMode={orderMode}
          selectedLocation={selectedLocation}
          onOpenLocationModal={() => document.getElementById("order-selector")?.scrollIntoView({ behavior: "smooth" })}
          onOpenOutletsModal={() => setIsOutletsModalOpen(true)}
          onSelectCategory={goToMenu}
        />

        <HeroSlider onSelectCategory={goToMenu} />

        <div id="order-selector" className="mt-0">
          <OrderTypeTabs
            orderMode={orderMode}
            setOrderMode={setOrderMode}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            onOpenOutletsModal={() => setIsOutletsModalOpen(true)}
          />
        </div>

        <main className="flex-1">
          <MenuSection
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onOpenItemModal={setSelectedModalItem}
          />
          <TrustSection />
        </main>

        <Footer onOpenOutletsModal={() => setIsOutletsModalOpen(true)} onSelectCategory={goToMenu} />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={handleProceedToCheckout}
          orderMode={orderMode}
        />

        <ItemModal
          item={selectedModalItem}
          isOpen={Boolean(selectedModalItem)}
          onClose={() => setSelectedModalItem(null)}
          onAddToCart={handleAddToCart}
        />

        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          checkoutData={checkoutData}
          onOrderCompleted={handleOrderCompleted}
          orderMode={orderMode}
          selectedLocation={selectedLocation}
        />

        <OutletsModal
          isOpen={isOutletsModalOpen}
          onClose={() => setIsOutletsModalOpen(false)}
          onSelectOutlet={handleSelectOutlet}
        />
      </div>
    </ThemeContext.Provider>
  );
}
