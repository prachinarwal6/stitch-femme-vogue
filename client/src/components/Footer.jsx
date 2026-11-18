import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="pt-10 pb-16 border-t border-surface-container bg-surface flex flex-col space-y-6 px-margin-mobile max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div className="flex flex-col space-y-2 max-w-md">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">Femme Vogue</span>
            <span className="font-label-sm text-[9px] uppercase tracking-widest text-primary px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
              Maison de Haute Couture
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            The definitive digital salon for modern haute couture, evidence-backed beauty protocols, slow living sanctuaries, and bespoke style intelligence.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
          <div className="flex flex-col space-y-2.5">
            <span className="font-bold text-on-surface text-primary">Collections</span>
            <Link to="/trends" className="hover:text-primary transition-colors">Runway Trends</Link>
            <Link to="/shop" className="hover:text-primary transition-colors">Boutique Shop</Link>
            <Link to="/beauty" className="hover:text-primary transition-colors">Beauty Protocols</Link>
            <Link to="/lifestyle" className="hover:text-primary transition-colors">Maison Sanctuary</Link>
          </div>
          <div className="flex flex-col space-y-2.5">
            <span className="font-bold text-on-surface text-primary">Atelier</span>
            <Link to="/quiz" className="hover:text-primary transition-colors">AI Style Quiz</Link>
            <Link to="/dossier" className="hover:text-primary transition-colors">Private Dossier</Link>
            <Link to="/salon" className="hover:text-primary transition-colors">Member Salon</Link>
            <Link to="/salon" className="hover:text-primary transition-colors">Curated Wishlist</Link>
          </div>
          <div className="flex flex-col space-y-2.5 col-span-2 sm:col-span-1">
            <span className="font-bold text-on-surface text-primary">The Maison</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Press &amp; Media</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Editorial Ethics</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Sustainability Provenance</span>
          </div>
        </div>
      </div>

      {/* Social Channels */}
      <div className="flex items-center gap-4 text-on-surface-variant pt-2 border-t border-surface-container">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          <span className="font-label-sm text-label-sm font-bold">IG</span>
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Pinterest"
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          <span className="font-label-sm text-label-sm font-bold">PI</span>
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          <span className="font-label-sm text-label-sm font-bold">TK</span>
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          <span className="font-label-sm text-label-sm font-bold">YT</span>
        </a>
      </div>

      {/* Region & Copyright */}
      <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-2 text-outline font-label-sm text-label-sm text-[11px]">
        <div className="flex items-center gap-4">
          <span>Global Edition • USD ($)</span>
          <span>•</span>
          <span>Paris • Milan • New York</span>
        </div>
        <p>© 2025 Femme Vogue Media Group. All rights reserved.</p>
      </div>
    </footer>
  );
}
