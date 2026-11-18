import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function DossierPage({ onOpenConsultation }) {
  const { addToCart, showToast } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [dossier, setDossier] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);

  useEffect(() => {
    api.getDossier()
      .then(res => setDossier(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let interval = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioSeconds(prev => {
          if (prev >= 102) { // 01:42
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleDownloadPDF = () => {
    window.print();
    showToast('Preparing haute couture editorial PDF printout...');
  };

  if (!dossier) return null;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-gutter-mobile pb-safe space-y-space-xl">
      {/* Top Metadata & Curatorial Attribution Bar */}
      <div className="flex flex-col space-y-space-xs mt-space-sm">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed">
            <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
            <span className="font-label-sm text-xs uppercase tracking-widest font-semibold">
              Private Dossier #{dossier.id}
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="font-label-sm text-xs uppercase font-semibold">94% Compatibility</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-on-surface-variant pt-1 text-xs">
          <span className="font-label-sm uppercase tracking-wider text-tertiary">
            Curated by {dossier.curator}
          </span>
          <span className="font-label-sm uppercase tracking-wider text-outline">
            {dossier.salon}
          </span>
        </div>
      </div>

      {/* Hero Reveal Card: Archetype Reveal */}
      <div className="relative w-full rounded-2xl bg-surface-container-lowest shadow-xl overflow-hidden border border-outline-variant/30">
        <div className="relative h-96 md:h-[460px] w-full">
          <img
            className="w-full h-full object-cover object-top"
            src={dossier.image}
            alt={dossier.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-space-lg md:p-space-xl flex flex-col space-y-space-xs text-on-primary">
            <div className="inline-flex items-center self-start gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs uppercase font-semibold tracking-wider shadow-sm">
              <span>Primary Archetype</span>
            </div>
            <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-primary tracking-tight font-medium leading-none drop-shadow-sm">
              {dossier.title}
            </h1>
            <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-inverse-on-surface leading-relaxed opacity-95 pt-1 max-w-xl">
              {dossier.description}
            </p>
          </div>
        </div>

        {/* Key Resonance Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-space-md bg-surface-container-low text-on-surface border-t border-outline-variant/30">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-lowest shadow-xs text-center">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-tertiary">Silhouettes</span>
            <span className="font-headline-sm text-base md:text-lg text-primary font-medium mt-0.5">
              {dossier.metrics.silhouettes}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-lowest shadow-xs text-center">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-tertiary">Palette Base</span>
            <span className="font-headline-sm text-base md:text-lg text-on-surface font-medium mt-0.5">
              {dossier.metrics.paletteBase}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-lowest shadow-xs text-center">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-tertiary">Hardware</span>
            <span className="font-headline-sm text-base md:text-lg text-primary font-medium mt-0.5">
              {dossier.metrics.hardware}
            </span>
          </div>
        </div>
      </div>

      {/* Senior Stylist Audio Briefing */}
      <div className="rounded-2xl bg-surface-container-high p-space-md md:p-space-lg shadow-md space-y-space-sm text-on-surface border border-outline-variant/30">
        <div className="flex items-center gap-space-sm">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm ring-2 ring-primary/30">
            <img className="w-full h-full object-cover" src={dossier.audioMemo.stylistAvatar} alt={dossier.audioMemo.stylist} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-lg text-label-lg font-semibold truncate text-on-surface">Stylist Audio Memo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            </div>
            <span className="font-label-sm text-xs text-secondary uppercase tracking-wider">
              {dossier.audioMemo.stylist} • {dossier.audioMemo.duration} mins
            </span>
          </div>
        </div>

        {/* Audio Player Card */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20">
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0"
            aria-label="Play stylist memo"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlayingAudio ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Soundwave Bars */}
          <div className="flex items-center gap-1 flex-1 h-8 px-1">
            {[12, 20, 28, 16, 24, 32, 20, 12, 24, 32, 16, 28, 8, 20].map((h, i) => {
              const active = i <= (audioSeconds % 14);
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    active ? 'bg-primary scale-y-110' : 'bg-primary/30'
                  }`}
                  style={{ height: `${isPlayingAudio ? (h + Math.sin(i + audioSeconds) * 6) : h}px` }}
                />
              );
            })}
          </div>
          <span className="font-label-sm text-xs text-tertiary tabular-nums shrink-0 font-medium">
            {formatTimer(audioSeconds)}
          </span>
        </div>

        <p className="font-body-sm text-sm text-on-surface-variant italic px-1 leading-relaxed">
          {dossier.audioMemo.quote}
        </p>
      </div>

      {/* Signature Color Harmony Palette */}
      <div className="flex flex-col space-y-space-md">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
              Tonal Architecture
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Signature Color Harmony</h2>
          </div>
          <span className="font-label-sm text-xs uppercase tracking-wider text-outline font-semibold">
            {dossier.swatches.length} Swatches
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {dossier.swatches.map((swatch, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-surface-container-low flex sm:flex-col items-center gap-3 border border-outline-variant/20 shadow-xs"
            >
              <span
                className="w-10 h-10 sm:w-full sm:h-16 rounded-lg shadow-inner ring-1 ring-outline-variant/30"
                style={{ backgroundColor: swatch.colorHex }}
              />
              <div className="flex flex-col sm:text-center min-w-0">
                <span className="font-headline-sm text-sm text-on-surface font-medium truncate">{swatch.name}</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">
                  {swatch.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Capsule Wardrobe */}
      <div className="flex flex-col space-y-space-md">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              Curated Capsule Formulations
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Recommended Wardrobe Core</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {dossier.recommendedCapsule.map((piece, idx) => {
            const isLiked = isInWishlist(piece.title);
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest rounded-xl p-3 shadow-sm border border-outline-variant/30 flex flex-col group"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-container mb-2.5">
                  <img src={piece.image} alt={piece.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button
                    onClick={() => toggleWishlist(piece)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface flex items-center justify-center shadow hover:text-secondary active:scale-90 transition-all"
                  >
                    <span className={`material-symbols-outlined text-[16px] ${isLiked ? 'text-secondary' : ''}`} style={isLiked ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      favorite
                    </span>
                  </button>
                </div>
                <h4 className="font-headline-sm text-base text-on-surface font-medium truncate">{piece.title}</h4>
                <p className="font-body-sm text-xs text-on-surface-variant">{piece.subtitle}</p>
                <div className="mt-auto pt-2 flex items-center justify-between border-t border-surface-container">
                  <span className="font-headline-sm text-sm text-on-surface font-semibold">${piece.price}</span>
                  <button
                    onClick={() => addToCart({ id: `capsule-${idx}`, title: piece.title, price: piece.price, image: piece.image })}
                    className="py-1 px-3 rounded-lg bg-on-surface text-surface font-label-sm text-xs hover:bg-primary transition-colors flex items-center gap-1"
                  >
                    <span>Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Triggers */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-surface-container">
        <button
          onClick={onOpenConsultation}
          className="flex-1 py-3.5 px-6 rounded-xl bg-inverse-surface hover:bg-primary text-surface font-label-md text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2 font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">support_agent</span>
          <span>Book Fitting Session with Clémence Roy</span>
        </button>
        <button
          onClick={handleDownloadPDF}
          className="py-3.5 px-6 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          <span>Print Private Dossier</span>
        </button>
      </div>
    </div>
  );
}
