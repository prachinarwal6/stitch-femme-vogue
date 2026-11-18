import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AuthModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('signin'); // 'signin' or 'register'
  const [email, setEmail] = useState('eleonore@maison-vogue.fr');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Éléonore de Saint-Germain');
  const { showToast } = useCart();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'signin') {
      showToast(`Welcome back, ${name}. VIP Privé salon privileges active.`);
    } else {
      showToast(`Maison profile created for ${name}. Tier 3 Exclusivité assigned.`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">Maison Privé</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {tab === 'signin' ? 'Salon Sign In' : 'Register New Member'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-surface-container">
          <button
            onClick={() => setTab('signin')}
            className={`flex-1 py-3 font-label-md text-label-md uppercase tracking-wider text-center transition-all ${
              tab === 'signin'
                ? 'border-b-2 border-primary text-primary font-bold bg-surface-container/30'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 font-label-md text-label-md uppercase tracking-wider text-center transition-all ${
              tab === 'register'
                ? 'border-b-2 border-primary text-primary font-bold bg-surface-container/30'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-on-surface text-sm focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider mb-1">
              Fashion Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-on-surface text-sm focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-on-surface text-sm focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-primary" />
              <span>Remember atelier device</span>
            </label>
            <a href="#reset" onClick={(e) => { e.preventDefault(); showToast('Password reset link dispatched.'); }} className="text-secondary hover:underline">
              Reset Key?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-lg bg-inverse-surface hover:bg-primary text-surface font-label-md text-label-md uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>{tab === 'signin' ? 'Access Member Salon' : 'Complete VIP Registration'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
}
