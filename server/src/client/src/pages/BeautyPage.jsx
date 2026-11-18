import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

export default function BeautyPage() {
  const { addToCart, showToast } = useCart();
  const [beautyData, setBeautyData] = useState(null);
  const [activeChip, setActiveChip] = useState('All Beauty');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    api.getBeauty()
      .then(res => setBeautyData(res.data))
      .catch(() => {});
  }, []);

  const chips = [
    'All Beauty',
    'Skincare Protocols',
    'Makeup Edits',
    'Hair & Scalp',
    'Fragrance & Scent',
    'Wellness & Mind'
  ];

  const handleOrderSample = async (fragrance) => {
    try {
      await api.orderFragranceSample({ fragranceName: fragrance.title });
      showToast(`Discovery sample for "${fragrance.title}" ($12) ordered from Grasse!`);
    } catch {
      showToast(`Discovery sample ordered!`);
    }
  };

  if (!beautyData) return null;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-safe">
      {/* Editorial Header Section */}
      <section className="px-margin-mobile pt-4 pb-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
            Édition Beauté
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
          <span className="font-label-sm text-label-sm text-secondary tracking-wider font-semibold">Printemps 2025</span>
        </div>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">
          Beauty &amp; Rituals
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl leading-relaxed">
          Evidence-backed skincare protocols, runway makeup tutorials, and sensory morning rituals curated for luminous living.
        </p>

        {/* Scrollable Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 -mx-margin-mobile px-margin-mobile">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all ${
                activeChip === chip
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* Hero Feature: Glazed Cloud Skin Protocol */}
      <section className="px-margin-mobile pb-10">
        <div className="bg-surface-container-lowest rounded-2xl p-5 md:p-8 shadow-sm flex flex-col gap-5 border border-outline-variant/30">
          <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden bg-surface-container">
            <img
              className="w-full h-full object-cover"
              src={beautyData.heroProtocol.image}
              alt={beautyData.heroProtocol.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex flex-col justify-end p-5">
              <span className="font-label-sm text-xs text-primary-fixed uppercase tracking-widest mb-1 font-semibold">
                Dermatologist Curated
              </span>
              <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-inverse-on-surface leading-tight">
                {beautyData.heroProtocol.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold">
                <span className="font-headline-sm text-sm">{beautyData.heroProtocol.initials}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-sm text-on-surface font-semibold">{beautyData.heroProtocol.curatedBy}</span>
                <span className="font-body-sm text-xs text-on-surface-variant">{beautyData.heroProtocol.role}</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-xs font-semibold">
              {beautyData.heroProtocol.duration}
            </span>
          </div>

          <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant leading-relaxed">
            {beautyData.heroProtocol.description}
          </p>

          {/* Interactive 4-Step List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {beautyData.heroProtocol.steps.map((st) => (
              <div
                key={st.number}
                className="bg-surface-container-low rounded-xl p-4 flex items-start gap-3 transition-transform hover:scale-[1.01] border border-outline-variant/20"
              >
                <div className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 font-label-sm text-xs font-bold mt-0.5">
                  {st.number}
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-sm text-on-surface font-semibold">{st.title}</span>
                    <span className="font-label-sm text-[10px] text-secondary tracking-widest uppercase font-semibold">
                      {st.tag}
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              addToCart({
                id: 'beauty-kit-1',
                title: 'Glazed Cloud Skin Protocol Kit',
                price: beautyData.heroProtocol.kitPrice,
                image: beautyData.heroProtocol.image
              })
            }
            className="w-full py-3.5 px-4 rounded-lg bg-inverse-surface text-inverse-on-surface font-label-md text-label-md tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-primary transition-colors shadow-sm font-semibold"
          >
            <span>Shop Protocol Kit (${beautyData.heroProtocol.kitPrice})</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Makeup Masterclasses */}
      <section className="px-margin-mobile pb-10 flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
              Atelier Masterclasses
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Runway Makeup Edits</h2>
          </div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider underline cursor-pointer">
            View All
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beautyData.masterclasses.map((mc, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/30"
            >
              <div className="relative w-full h-56 bg-surface-container">
                <img className="w-full h-full object-cover" src={mc.image} alt={mc.title} />
                <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                  <span className="font-label-sm text-xs text-on-surface font-semibold">{mc.duration}</span>
                </div>
                <div className="absolute top-3 right-3 bg-secondary-fixed/90 backdrop-blur-md rounded-full px-3 py-1">
                  <span className="font-label-sm text-xs text-on-secondary-fixed font-semibold">{mc.difficulty}</span>
                </div>
                {idx === 1 && (
                  <button
                    onClick={() => setSelectedVideo(mc)}
                    className="absolute inset-0 bg-inverse-surface/20 flex items-center justify-center group"
                  >
                    <div className="w-12 h-12 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[28px] pl-0.5">play_arrow</span>
                    </div>
                  </button>
                )}
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                <div>
                  <h3 className="font-headline-sm text-base md:text-lg text-on-surface font-medium">{mc.title}</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">{mc.description}</p>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-primary">brush</span>
                    <span className="font-label-sm text-xs text-on-surface font-medium">{mc.productName}</span>
                  </div>
                  <button
                    onClick={() =>
                      addToCart({
                        id: `mc-set-${idx}`,
                        title: mc.productName,
                        price: mc.price,
                        image: mc.image
                      })
                    }
                    className="font-label-md text-xs text-primary font-semibold hover:underline"
                  >
                    ${mc.price} Set • Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Hair & Scalp Studio */}
      <section className="px-margin-mobile pb-10">
        <div className="bg-surface-container rounded-2xl p-5 md:p-8 flex flex-col gap-4 border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
              Hair &amp; Scalp Studio
            </span>
            <span className="material-symbols-outlined text-primary text-[20px]">air</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-headline-md text-headline-md text-on-surface">{beautyData.hairStudio.title}</h2>
            <span className="font-label-md text-label-md text-secondary font-medium">{beautyData.hairStudio.subtitle}</span>
          </div>
          <div className="w-full h-56 md:h-72 rounded-xl overflow-hidden bg-surface-container-high">
            <img className="w-full h-full object-cover" src={beautyData.hairStudio.image} alt={beautyData.hairStudio.title} />
          </div>
          <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
            {beautyData.hairStudio.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
            {beautyData.hairStudio.products.map((p, i) => (
              <div key={i} className="bg-surface-container-lowest p-3 rounded-xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    {i === 0 ? 'local_fire_department' : 'magic_button'}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs text-on-surface font-semibold">{p.name}</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">{p.detail}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart({ id: `hair-${i}`, title: p.name, price: p.price, image: beautyData.hairStudio.image })}
                  className="font-label-md text-xs text-primary font-semibold hover:underline"
                >
                  ${p.price} • Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Fragrance Wardrobe */}
      <section className="px-margin-mobile pb-10 flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
            Haute Parfumerie
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Olfactory Notes of the Season</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Scent landscapes bottled in Grasse, designed to evoke memory and allure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {beautyData.fragrances.map((frag, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-28 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-outline-variant/20">
                  <img className="w-full h-full object-cover" src={frag.image} alt={frag.title} />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-label-sm text-[10px] text-primary uppercase tracking-widest font-semibold">
                      {frag.edition}
                    </span>
                    <h3 className="font-headline-sm text-base text-on-surface font-medium leading-snug mt-0.5">
                      {frag.title}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant italic mt-1">{frag.quote}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-headline-sm text-sm text-primary font-semibold">
                      ${frag.price} / {frag.size}
                    </span>
                    <button
                      onClick={() => addToCart({ id: `frag-${idx}`, title: frag.title, price: frag.price, image: frag.image })}
                      className="py-1 px-2.5 rounded bg-surface-container hover:bg-surface-dim text-on-surface text-xs font-semibold"
                    >
                      Bag
                    </button>
                  </div>
                </div>
              </div>

              {/* Scent Pyramid */}
              <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5 border border-outline-variant/20">
                <div className="flex items-center text-xs">
                  <span className="w-14 font-label-sm text-on-surface-variant text-[10px] uppercase font-semibold">Top</span>
                  <span className="text-on-surface font-body-sm text-xs">{frag.top}</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-14 font-label-sm text-on-surface-variant text-[10px] uppercase font-semibold">Heart</span>
                  <span className="text-on-surface font-body-sm text-xs">{frag.heart}</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-14 font-label-sm text-on-surface-variant text-[10px] uppercase font-semibold">Base</span>
                  <span className="text-on-surface font-body-sm text-xs">{frag.base}</span>
                </div>
              </div>

              <button
                onClick={() => handleOrderSample(frag)}
                className="w-full py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-xs hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-1.5 font-semibold mt-auto"
              >
                <span className="material-symbols-outlined text-[16px]">science</span>
                <span>Order Discovery Sample (${frag.samplePrice})</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md">
          <div className="bg-surface-container-lowest p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-3 border border-outline-variant/30">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-primary uppercase tracking-widest font-semibold">Atelier Masterclass</span>
              <button onClick={() => setSelectedVideo(null)} className="text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h3 className="font-headline-sm text-lg text-on-surface">{selectedVideo.title}</h3>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img src={selectedVideo.image} alt={selectedVideo.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute flex flex-col items-center text-white gap-2">
                <span className="material-symbols-outlined text-4xl animate-pulse">play_circle</span>
                <span className="text-xs uppercase tracking-wider font-semibold">Backstage Video Feed Active</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Step-by-step masterclass demonstrating sheer terracotta pigment layering and upward brow lamination fibers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
