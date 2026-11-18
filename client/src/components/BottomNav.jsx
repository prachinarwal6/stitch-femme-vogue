import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BottomNav({ onOpenDrawer }) {
  const navItems = [
    { label: 'Home', path: '/', icon: 'auto_stories' },
    { label: 'Trends', path: '/trends', icon: 'local_fire_department' },
    { label: 'Shop', path: '/shop', icon: 'shopping_bag' },
    { label: 'Beauty', path: '/beauty', icon: 'spa' },
    { label: 'Quiz', path: '/quiz', icon: 'auto_awesome' },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 w-full z-40 bg-surface/92 backdrop-blur-xl shadow-[0_-8px_30px_-4px_rgba(122,107,105,0.08)] pb-safe border-t border-outline-variant/30 md:hidden"
    >
      <div className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[52px] min-h-[44px] gap-0.5 transition-all ${
                isActive ? 'text-primary font-medium scale-105' : 'text-on-surface-variant hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="font-label-sm text-[10px] tracking-wider uppercase">{item.label}</span>
          </NavLink>
        ))}

        {/* Menu Drawer Button */}
        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center justify-center min-w-[52px] min-h-[44px] gap-0.5 text-on-surface-variant hover:text-primary transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">menu_book</span>
          <span className="font-label-sm text-[10px] tracking-wider uppercase">Menu</span>
        </button>
      </div>
    </nav>
  );
}
