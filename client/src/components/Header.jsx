import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header({ onOpenSearch, onOpenDrawer, onOpenAuth }) {
  const location = useLocation();
  const { openCart, itemsCount } = useCart();
  const { wishlistCount } = useWishlist();

  const getSubLabel = () => {
    switch (location.pathname) {
      case '/shop':
        return 'The Boutique';
      case '/trends':
        return 'Trend Radar';
      case '/beauty':
        return 'Édition Beauté';
      case '/lifestyle':
        return 'Art de Vivre';
      case '/quiz':
        return 'Atelier Quiz';
      case '/dossier':
        return 'Private Dossier';
      case '/salon':
        return 'Member Salon';
      default:
        return 'Maison Édition';
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Trends', path: '/trends' },
    { label: 'Boutique', path: '/shop' },
    { label: 'Beauty', path: '/beauty' },
    { label: 'Maison & Lifestyle', path: '/lifestyle' },
    { label: 'Style Quiz', path: '/quiz' },
    { label: 'Member Salon', path: '/salon' },
  ];

  return (
    <header className="fixed top-0 w-full z-40 pt-safe-bar bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(122,107,105,0.08)] border-b border-outline-variant/30">
      {/* 1. Haute Couture Marquee Ticker */}
      <div className="bg-secondary-fixed text-on-secondary-fixed overflow-hidden py-1 px-4 flex items-center justify-center">
        <div className="animate-marquee gap-8 items-center flex whitespace-nowrap">
          <span className="font-label-sm text-label-sm uppercase tracking-widest">Paris Fashion Week Highlights</span>
          <span className="text-primary text-xs">✦</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest">Spring/Summer '25 Capsule</span>
          <span className="text-primary text-xs">✦</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest">Free Editorial Delivery Over $150</span>
          <span className="text-primary text-xs">✦</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest">Paris Fashion Week Highlights</span>
          <span className="text-primary text-xs">✦</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest">Spring/Summer '25 Capsule</span>
          <span className="text-primary text-xs">✦</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest">Free Editorial Delivery Over $150</span>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="h-16 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Logo */}
        <Link to="/" className="flex items-center gap-space-sm group">
          <img
            alt="Femme Vogue Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1Wijo08oYjqikDWopT6ZBGdO784Yxh04jQesjf9hzWh20YVgjfQ3xprfbICPJ68uil66qfWM6AraR3w3GIAo372VgQraTDyL59y-hrEqeypySFdG7-2cAkCZmeVKyy5e0GZGqKBw_R74isXbqHCMwqxrMVNSbcqm7ta4bpDyRyxBjYIjlrGaTdhdJXz-c7d_Oz5kH-X2hrZlZHdXASDWruCfZwBSkxoHembVYGmxsfz7iG1k7MvuTwS6mzc"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface leading-none group-hover:text-primary transition-colors">
              Femme Vogue
            </span>
            <span className="font-label-sm text-label-sm uppercase text-primary tracking-widest text-[9px] mt-0.5">
              {getSubLabel()}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-label-md text-label-md uppercase tracking-wider transition-colors py-1 relative ${
                  isActive
                    ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Trends, Boutique & Articles"
            className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Wishlist Trigger */}
          <Link
            to="/salon"
            aria-label="Curated Wishlist"
            className="relative w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors rounded-full hover:bg-surface-container"
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={wishlistCount > 0 ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              favorite
            </span>
            {wishlistCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[16px] h-4 px-1 rounded-full bg-secondary text-white font-label-sm text-[9px] flex items-center justify-center font-bold ring-2 ring-surface">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Bag / Cart Trigger */}
          <button
            onClick={openCart}
            aria-label="Shopping Bag"
            className="relative w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {itemsCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[16px] h-4 px-1 rounded-full bg-primary text-on-primary font-label-sm text-[9px] flex items-center justify-center font-bold ring-2 ring-surface">
                {itemsCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <Link
            to="/salon"
            aria-label="Profile Account"
            className="w-10 h-10 flex items-center justify-center pl-0.5"
          >
            <img
              alt="Editorial Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/40 hover:ring-primary transition-all shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJAKBvjwQjVRSiSzeHmIqJVJRQ6MAdSBz-sTZba8lgymR8FVVgXXCDVpdW-d5IuPyrBa-wPIU3zgw9H9PYxy9rv8DsZ09sEVO_9Aunf8A9y6PwAfVy2utXRDl69-a_wrn9ETEypwNbD1onYknvpVuul6qOqOJp-cc2Bb0C0Iu5D2zlrXRdCfsMYwJfLK51db5czqaBenrANwvtzSr0hYkPN4TEyeP-wNYutwYeIHtVVAqEmq9f07MYEQ"
            />
          </Link>

          {/* Drawer Menu Button (Mobile & Desktop) */}
          <button
            onClick={onOpenDrawer}
            aria-label="Open Navigation Drawer"
            className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[24px]">menu_book</span>
          </button>
        </div>
      </div>
    </header>
  );
}
