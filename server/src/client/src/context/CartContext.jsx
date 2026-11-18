import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('femme_vogue_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('femme_vogue_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, quantity = 1, options = {}) => {
    setCartItems(prev => {
      const itemId = product.id || product.title;
      const existingIndex = prev.findIndex(item => item.id === itemId && item.selectedSize === options.size && item.selectedColor === options.color);

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, {
          id: itemId,
          title: product.title,
          subtitle: product.subtitle || '',
          price: product.price || 185,
          image: product.image,
          selectedSize: options.size || (product.sizes ? product.sizes[0] : 'FR 36'),
          selectedColor: options.color || (product.colorVariants ? product.colorVariants[0]?.name : 'Standard'),
          quantity
        }];
      }
    });

    showToast(`Added ${product.title} to your bag`);
  };

  const addBundleToCart = (bundle) => {
    bundle.items.forEach(item => {
      addToCart(item, 1, { size: 'Standard', color: 'Curated' });
    });
    showToast(`Added complete "${bundle.title}" set to your bag`);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from bag');
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === 'NOCTURNE15') {
      setCoupon('NOCTURNE15');
      setDiscountPercent(15);
      showToast('Promotional Code NOCTURNE15 Applied: 15% VIP Reduction');
      return true;
    } else {
      showToast('Invalid invitation code. Try NOCTURNE15');
      return false;
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      addBundleToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      isCheckoutOpen,
      setIsCheckoutOpen,
      openCheckout: () => { setIsCartOpen(false); setIsCheckoutOpen(true); },
      closeCheckout: () => setIsCheckoutOpen(false),
      coupon,
      discountPercent,
      applyCoupon,
      subtotal,
      discountAmount,
      total,
      itemsCount,
      toastMessage,
      showToast,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
