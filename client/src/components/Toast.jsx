import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage, openCart } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 transition-all duration-300 animate-bounce-once max-w-md mx-auto">
      <div className="bg-inverse-surface text-inverse-on-surface p-3.5 rounded-xl shadow-2xl flex items-center justify-between border border-primary/20 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-primary-fixed text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span className="font-label-md text-label-md text-surface-container-lowest font-medium">
            {toastMessage}
          </span>
        </div>
        <button
          onClick={openCart}
          className="font-label-sm text-label-sm text-primary-fixed underline hover:text-white transition-colors cursor-pointer shrink-0 pl-3"
        >
          View Bag
        </button>
      </div>
    </div>
  );
}
