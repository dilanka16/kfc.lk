import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import OrderTypeTabs from './components/OrderTypeTabs';
import MenuSection from './components/MenuSection';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ItemModal from './components/ItemModal';
import CheckoutModal from './components/CheckoutModal';
import OutletsModal from './components/OutletsModal';

export default function App() {
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kfc_lk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Order settings
  const [orderMode, setOrderMode] = useState('D'); // 'D' (Delivery) or 'P' (Pickup)
  const [selectedLocation, setSelectedLocation] = useState('Colombo 03 - Kollupitiya');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOutletsModalOpen, setIsOutletsModalOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kfc_lk_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Cart actions
  const handleAddToCart = (item, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleProceedToCheckout = (summary) => {
    setCheckoutData(summary);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('kfc_lk_cart');
    } catch {
      // ignore
    }
  };

  const handleSelectOutlet = (outlet) => {
    setOrderMode('P');
    setSelectedLocation(`${outlet.name} (${outlet.city})`);
  };

  // Cart total calculations
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f5] text-[#202124]">
      {/* Navbar */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        orderMode={orderMode}
        selectedLocation={selectedLocation}
        onOpenLocationModal={() => {
          // scrolls to order selector or toggles
          const el = document.getElementById('order-selector');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenOutletsModal={() => setIsOutletsModalOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Hero Promotional Carousel */}
      <HeroSlider
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Delivery / Pickup Location Bar */}
      <div id="order-selector">
        <OrderTypeTabs
          orderMode={orderMode}
          setOrderMode={setOrderMode}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          onOpenOutletsModal={() => setIsOutletsModalOpen(true)}
        />
      </div>

      {/* Main Menu & Category Section */}
      <main className="flex-1">
        <MenuSection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenItemModal={(item) => setSelectedModalItem(item)}
        />

        {/* 100% Sri Lankan Poultry & Trust Section */}
        <TrustSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenOutletsModal={() => setIsOutletsModalOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        orderMode={orderMode}
      />

      {/* Customization / Quick View Modal */}
      <ItemModal
        item={selectedModalItem}
        isOpen={Boolean(selectedModalItem)}
        onClose={() => setSelectedModalItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        checkoutData={checkoutData}
        onOrderCompleted={handleOrderCompleted}
        orderMode={orderMode}
        selectedLocation={selectedLocation}
      />

      {/* Outlets Directory Modal */}
      <OutletsModal
        isOpen={isOutletsModalOpen}
        onClose={() => setIsOutletsModalOpen(false)}
        onSelectOutlet={handleSelectOutlet}
      />
    </div>
  );
}
