import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { fallbackLifestyle } from '../data/fallbackData';
import { useCart } from '../context/CartContext';

export default function LifestylePage() {
  const { addToCart, showToast } = useCart();
  const [lifestyleData, setLifestyleData] = useState(fallbackLifestyle);
  const [activeTheme, setActiveTheme] = useState('Tous les Thèmes');
  const [showTourModal, setShowTourModal] = useState(false);

  useEffect(() => {
    api.getLifestyle()
      .then(res => { if (res && res.data) setLifestyleData(res.data); })
      .catch(() => {});
  }, []);

  const themes = [
    'Tous les Thèmes',
    'Sanctuaries',
    'Arts de la Table',
    'Slow Escapes',
    'Rituals'
  ];

  const data = lifestyleData || fallbackLifestyle;
  const { sanctuary } = data;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-safe">
      {/* Masthead */}
      <div className="px-margin-mobile pt-3 pb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
            Art de Vivre
          </span>
          <span className="text-primary text-[10px]">•</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
            Édition Printemps
          </span>
        </div>
        <h1 className="font-headline-xl-mobile md:font-display-lg text-headline-xl-mobile md:text-display-lg text-on-surface tracking-tight">
          Maison &amp; Lifestyle
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl leading-relaxed">
          Curated sanctuaries, slow hospitality escapes, sensory living rituals, and architectural table settings.
        </p>
      </div>

      {/* Theme Pills */}
      <div className="px-margin-mobile flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setActiveTheme(theme)}
            className={`px-4 py-2 rounded-full font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTheme === theme
                ? 'bg-primary text-on-primary shadow-sm font-semibold'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Featured Sanctuary Section */}
      <section className="px-margin-mobile pt-4 pb-8">
        <div className="bg-surface-container-lowest rounded-2xl p-5 md:p-8 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs uppercase tracking-widest font-semibold">
              {sanctuary.tag}
            </span>
            <span className="font-label-sm text-xs text-tertiary uppercase tracking-wider font-semibold">
              {sanctuary.location}
            </span>
          </div>

          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-xl overflow-hidden bg-surface-container">
            <img className="w-full h-full object-cover" src={sanctuary.image} alt={sanctuary.title} />
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-sm text-xs text-on-surface tracking-wider uppercase font-semibold">
                Private Archive
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface leading-snug">
              {sanctuary.title}
            </h2>
            <div className="bg-surface-container-low rounded-xl p-4 my-1 border border-outline-variant/20">
              <p className="font-headline-sm text-base md:text-lg italic text-on-surface-variant leading-relaxed">
                {sanctuary.quote}
              </p>
              <span className="block mt-2 font-label-sm text-xs uppercase tracking-widest text-primary font-semibold">
                — {sanctuary.author}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 py-2">
            <div className="bg-surface-container p-3 rounded-xl text-center flex flex-col justify-center">
              <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider">Period</span>
              <span className="font-body-md text-sm text-on-surface font-semibold mt-0.5">{sanctuary.period}</span>
            </div>
            <div className="bg-surface-container p-3 rounded-xl text-center flex flex-col justify-center">
              <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider">Material</span>
              <span className="font-body-md text-sm text-on-surface font-semibold mt-0.5">{sanctuary.material}</span>
            </div>
            <div className="bg-surface-container p-3 rounded-xl text-center flex flex-col justify-center">
              <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider">Light Axis</span>
              <span className="font-body-md text-sm text-on-surface font-semibold mt-0.5">{sanctuary.lightAxis}</span>
            </div>
          </div>

          <button
            onClick={() => setShowTourModal(true)}
            className="w-full py-3.5 rounded-xl bg-inverse-surface text-inverse-on-surface font-label-md text-label-md uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-2 font-semibold shadow-sm"
          >
            <span>Explore the Full Private Tour</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* The Sensory Table */}
      <section className="py-8 bg-surface-container-low border-y border-outline-variant/30">
        <div className="px-margin-mobile flex flex-col gap-1 mb-5">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              Curated Épicerie &amp; Maison
            </span>
            <span className="font-label-sm text-xs text-tertiary">2 Objets d'Émotion</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">The Sensory Table</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Tactile implements for lingering Mediterranean luncheons.
          </p>
        </div>

        <div className="px-margin-mobile grid grid-cols-1 md:grid-cols-2 gap-4">
          {sanctuary.sensoryObjects.map((obj, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col border border-outline-variant/20">
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-surface-container mb-3">
                <img className="w-full h-full object-cover" src={obj.image} alt={obj.title} />
              </div>
              <span className="font-label-sm text-xs text-primary tracking-wider uppercase mb-0.5 font-semibold">
                {obj.maker}
              </span>
              <h3 className="font-headline-sm text-base md:text-lg text-on-surface font-medium line-clamp-1">
                {obj.title}
              </h3>
              <p className="font-body-sm text-xs text-tertiary mb-3">{obj.meta} • ${obj.price}</p>
              <button
                onClick={() => addToCart({ id: `lifestyle-${idx}`, title: obj.title, price: obj.price, image: obj.image })}
                className="mt-auto w-full py-2.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-xs uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1.5 font-semibold"
              >
                <span>Acquire Object (${obj.price})</span>
                <span className="material-symbols-outlined text-[15px]">shopping_bag</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Private Tour Modal */}
      {showTourModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md">
          <div className="bg-surface-container-lowest p-6 rounded-2xl max-w-lg w-full shadow-2xl space-y-4 border border-outline-variant/30 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-xs text-primary uppercase tracking-widest font-semibold">Private Bastide Archive</span>
              <button onClick={() => setShowTourModal(false)} className="text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h3 className="font-headline-sm text-xl text-on-surface">{sanctuary.title}</h3>
            <img src={sanctuary.image} alt="Bastide" className="w-full h-60 object-cover rounded-xl" />
            <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
              <p>
                Restored over seven years using reclaimed chaux plaster and local Luberon sandstone, Léa Moreau’s studio Bastide embodies slow Provence minimalism. Large southern windows welcome unfiltered morning glare, illuminating raw terracotta amphorae and hand-turned stoneware plates.
              </p>
              <p>
                “We chose not to glaze the perimeter surfaces, permitting the stone to breathe with seasonal humidity changes,” remarks Moreau.
              </p>
            </div>
            <button
              onClick={() => {
                setShowTourModal(false);
                showToast('Private Tour Dossier added to your reader profile.');
              }}
              className="w-full py-3 rounded-lg bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold"
            >
              Save Sanctuary to Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
