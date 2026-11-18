import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    total,
    coupon,
    applyCoupon,
    openCheckout
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <aside
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Cart Sheet */}
      <div
        className={`absolute top-0 right-0 h-full w-[90%] max-w-md bg-surface-container-lowest shadow-[0_16px_40px_-8px_rgba(30,30,30,0.15)] flex flex-col justify-between p-6 transform transition-transform duration-300 overflow-y-auto border-l border-outline-variant/30 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Your Atelier Bag</h2>
            </div>
            <button
              onClick={closeCart}
              className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors"
              aria-label="Close Bag"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Complimentary Delivery Progress */}
          <div className="my-4 p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">
                {subtotal >= freeShippingThreshold ? (
                  <strong className="text-primary font-semibold">✓ Free Editorial Delivery Unlocked</strong>
                ) : (
                  <>Add ${(freeShippingThreshold - subtotal).toFixed(0)} for Free White-Glove Delivery</>
                )}
              </span>
              <span className="font-label-sm text-primary font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Bag Items List */}
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-on-surface-variant gap-3">
              <span className="material-symbols-outlined text-5xl text-outline-variant">local_mall</span>
              <p className="font-headline-sm text-lg text-on-surface">Your bag is currently empty</p>
              <p className="font-body-sm text-xs max-w-xs text-on-surface-variant">
                Curate your capsule wardrobe with handcrafted pieces from our seasonal Parisian collections.
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="mt-3 py-2.5 px-6 rounded-lg bg-inverse-surface text-surface font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors"
              >
                Explore Boutique
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 divide-y divide-surface-container overflow-y-auto max-h-[46vh] pr-1">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="pt-3 flex gap-3 items-center">
                  <div className="w-16 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline-sm text-[0.95rem] text-on-surface truncate">{item.title}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">
                      {item.selectedSize} • {item.selectedColor}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-outline-variant/50 rounded-md bg-surface-container-lowest">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface hover:bg-surface-container text-xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-on-surface">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface hover:bg-surface-container text-xs"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-headline-sm text-[0.95rem] text-on-surface font-semibold">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout Breakdown */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-surface-container mt-auto">
            {/* Promo Code Form */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Code (e.g. NOCTURNE15)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant text-xs focus:outline-none focus:ring-1 focus:ring-primary uppercase tracking-wider"
              />
              <button
                onClick={() => {
                  applyCoupon(couponInput);
                  setCouponInput('');
                }}
                className="px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-dim text-on-surface text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-on-surface-variant pb-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-on-surface">${subtotal}</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-secondary">
                  <span>VIP Invitation ({coupon})</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Editorial Shipping</span>
                <span className="text-primary font-medium">
                  {subtotal >= freeShippingThreshold ? 'Complimentary' : '$25'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-surface-container text-base font-semibold text-on-surface">
                <span>Total Due</span>
                <span>${subtotal >= freeShippingThreshold ? total : total + 25}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={openCheckout}
              className="w-full py-3.5 px-4 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-2"
            >
              <span>Atelier Checkout</span>
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
