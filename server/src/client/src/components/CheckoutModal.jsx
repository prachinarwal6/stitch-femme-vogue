import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, cartItems, total, clearCart, coupon } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Éléonore de Saint-Germain',
    email: 'eleonore@maison-vogue.fr',
    street: '28 Rue du Faubourg Saint-Honoré',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
    paymentMethod: 'credit-card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/28',
    cardCvc: '•••'
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderPayload = {
        customerName: formData.name,
        customerEmail: formData.email,
        items: cartItems,
        totalAmount: total,
        discountCode: coupon,
        shippingAddress: `${formData.street}, ${formData.city}, ${formData.postalCode}, ${formData.country}`
      };

      const res = await api.createOrder(orderPayload);
      setCompletedOrder(res.data);
      clearCart();
    } catch (err) {
      console.error(err);
      // Fallback order simulation
      const fallbackOrder = {
        orderNumber: `FV-${Math.floor(10000 + Math.random() * 90000)}`,
        estimatedTime: 'Tomorrow, 14:00 CET',
        totalAmount: total,
        carrier: 'Priority Air • White Glove'
      };
      setCompletedOrder(fallbackOrder);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="p-5 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">lock</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Paris Atelier Checkout</h3>
          </div>
          <button
            onClick={() => {
              setCompletedOrder(null);
              closeCheckout();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {completedOrder ? (
            <div className="flex flex-col items-center text-center py-6 gap-3">
              <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md animate-bounce-once">
                <span className="material-symbols-outlined text-[32px]">verified</span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                Acquisition Confirmed
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Order #{completedOrder.orderNumber}</h2>
              <p className="font-body-sm text-on-surface-variant max-w-sm">
                Your luxury items are currently being hand-prepared and wrapped in tissue by our Rue Saint-Honoré atelier.
              </p>

              <div className="w-full bg-surface-container p-4 rounded-xl text-left my-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Estimated Delivery:</span>
                  <span className="font-semibold text-on-surface">{completedOrder.estimatedTime || 'Tomorrow, 14:00 CET'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Courier Service:</span>
                  <span className="font-semibold text-on-surface">White-Glove Priority</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Total Charged:</span>
                  <span className="font-semibold text-primary">${completedOrder.totalAmount}</span>
                </div>
              </div>

              <div className="flex gap-3 w-full pt-2">
                <button
                  onClick={() => {
                    closeCheckout();
                    setCompletedOrder(null);
                    navigate('/salon');
                  }}
                  className="flex-1 py-3 px-4 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors"
                >
                  Track In Member Salon
                </button>
                <button
                  onClick={() => {
                    closeCheckout();
                    setCompletedOrder(null);
                    navigate('/shop');
                  }}
                  className="py-3 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Recipient Details */}
              <div className="space-y-2">
                <span className="font-label-sm uppercase tracking-wider text-primary font-semibold block text-xs">
                  1. Delivery Destination
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="col-span-2 px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Fashion Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="col-span-2 px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="col-span-2 px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-2 pt-2 border-t border-surface-container">
                <span className="font-label-sm uppercase tracking-wider text-primary font-semibold block text-xs">
                  2. Atelier Payment Method
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'credit-card' })}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider border text-center transition-all ${
                      formData.paymentMethod === 'credit-card'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-outline-variant/50 text-on-surface-variant'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'apple-pay' })}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider border text-center transition-all ${
                      formData.paymentMethod === 'apple-pay'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-outline-variant/50 text-on-surface-variant'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'vip-account' })}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider border text-center transition-all ${
                      formData.paymentMethod === 'vip-account'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-outline-variant/50 text-on-surface-variant'
                    }`}
                  >
                    VIP Credit
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="col-span-3 px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                    className="col-span-2 px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="bg-surface-container-low p-3 rounded-xl text-xs space-y-1">
                <div className="flex justify-between font-semibold text-on-surface">
                  <span>{cartItems.length} Atelier Selection{cartItems.length > 1 ? 's' : ''}</span>
                  <span>${total}</span>
                </div>
                <p className="text-[10px] text-on-surface-variant">Includes insured white-glove courier shipping.</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-lg bg-inverse-surface hover:bg-primary text-surface font-label-md text-label-md uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                    <span>Transmitting to Atelier...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Place Order (${total})</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
