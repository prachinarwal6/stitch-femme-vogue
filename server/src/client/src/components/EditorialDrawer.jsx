import React from 'react';
import { NavLink } from 'react-router-dom';

export default function EditorialDrawer({ isOpen, onClose, onOpenAuth }) {
  const drawerLinks = [
    { label: 'Home', path: '/' },
    { label: 'Trends Radar', path: '/trends' },
    { label: 'Boutique Shop', path: '/shop' },
    { label: 'Beauty & Rituals', path: '/beauty' },
    { label: 'Maison & Lifestyle', path: '/lifestyle' },
    { label: 'AI Style Quiz', path: '/quiz' },
    { label: 'Private Style Dossier', path: '/dossier' },
    { label: 'Member Salon & Privé', path: '/salon' },
  ];

  return (
    <aside
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-surface-container-lowest shadow-[0_16px_40px_-8px_rgba(30,30,30,0.15)] flex flex-col justify-between p-6 transform transition-transform duration-300 overflow-y-auto border-l border-outline-variant/30 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-surface-container">
            <span className="font-headline-sm text-headline-sm italic text-on-surface">
              Collections &amp; Edits
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors"
              aria-label="Close Drawer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 pt-4">
            {drawerLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `py-3 px-2 tracking-wide transition-colors flex items-center justify-between font-headline-sm text-headline-sm ${
                    isActive ? 'text-primary font-bold bg-surface-container/60 rounded-lg' : 'text-on-surface hover:text-primary'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-sm text-outline-variant">arrow_forward</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-8 mt-6 border-t border-surface-container">
          <button
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            className="w-full flex items-center justify-center py-3.5 px-6 rounded-lg bg-inverse-surface text-surface font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors shadow-sm"
          >
            Sign In / Register
          </button>
          <div className="flex justify-center gap-4 mt-4 text-outline">
            <span className="font-label-sm text-label-sm tracking-widest text-[10px] uppercase text-on-surface-variant">
              Autumn / Winter '25 Edition
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
