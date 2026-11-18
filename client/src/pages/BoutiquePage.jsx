import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { fallbackProducts, fallbackBundle } from '../data/fallbackData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function BoutiquePage({ onOpenConsultation }) {
  const { addToCart, addBundleToCart, applyCoupon } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [products, setProducts] = useState(fallbackProducts);
  const [bundle, setBundle] = useState(fallbackBundle);
  const [activeCategory, setActiveCategory] = useState('New In');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    api.getProducts()
      .then(res => { if (res && res.data) setProducts(res.data); })
      .catch(() => {});

    api.getFeaturedBundle()
      .then(res => { if (res && res.data) setBundle(res.data); })
      .catch(() => {});
  }, []);

  const categories = [
    'New In',
    'Capsule Wardrobe',
    'Silk & Knitwear',
    'Sculpted Jewelry',
    'Bags & Footwear',
    'Archival Sale'
  ];

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    api.getProducts(cat === 'New In' ? {} : { category: cat })
      .then(res => setProducts(res.data))
      .catch(() => {});
  };

  // Sort and filter processing
  let filteredProducts = [...products];
  if (selectedSize !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.sizes && p.sizes.includes(selectedSize));
  }
  if (selectedSort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === 'rating') {
    filteredProducts.sort((a, b) => (b.rating || 5) - (a.rating || 5));
  }

  const handleColorSelect = (productId, colorName) => {
    setSelectedColor(prev => ({ ...prev, [productId]: colorName }));
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-safe">
      {/* Boutique Header */}
      <section className="px-gutter-mobile pt-3 pb-4">
        <div className="flex items-center gap-space-xs mb-1.5">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shadow-xs">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Curated by Fashion Director Hélène Dubois
          </span>
        </div>
        <h1 className="font-headline-xl-mobile md:font-display-lg text-headline-xl-mobile md:text-display-lg text-on-surface tracking-tight">
          The Boutique
        </h1>
        <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant mt-1 leading-relaxed max-w-2xl">
          Curated seasonal capsules, independent designer exclusives, and verified heirloom essentials. Handcrafted in European ateliers.
        </p>
      </section>

      {/* Featured Capsule Editorial Spotlight Card */}
      <section className="px-gutter-mobile mb-5">
        <div className="relative overflow-hidden rounded-2xl bg-surface-container shadow-md">
          <div
            className="relative w-full h-64 md:h-80 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbkcTmvC5daUTpl_IMJiKyuh4T8OJYcj3UKHYRbCJNnLNYaCBGNz4q6HDqCB6fmskinOivuyHDaJXaP7R7PIfhBwwQV1_Ohtw-KTLlAPxiQ-NWT6x6nkmIrOoqhN3RtHu7gSdXjOSn692wJmIBFNiaT_ImufS5dF4GyIN1hYKSCWloXo3JmiVnypfoWHni71ZvMkiV0cgtfKetPUcX3t7F1FhfIz2_qQ_sObI9ZBCpdj41hZgU-H-PoA')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent"></div>
            <div className="absolute top-3 left-3">
              <span className="py-1 px-2.5 rounded-full bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">stars</span>
                Limited Édition
              </span>
            </div>
            <div className="absolute bottom-4 inset-x-4 md:inset-x-8 text-inverse-on-surface">
              <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">Printemps-Été 2025</p>
              <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-surface-container-lowest mt-0.5">
                The Riviera &amp; Nocturne Capsule
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                <button
                  onClick={() => applyCoupon('NOCTURNE15')}
                  className="font-label-md text-label-md bg-surface-container-lowest/20 backdrop-blur-md px-3 py-1 rounded text-surface-bright hover:bg-surface-container-lowest/30 transition-colors"
                >
                  Use code <strong className="text-primary-fixed tracking-wider">NOCTURNE15</strong> for 15% Off
                </button>
                <button
                  onClick={() => handleCategorySelect('Capsule Wardrobe')}
                  className="flex items-center gap-1 py-2 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow hover:bg-surface-bright active:scale-95 transition-all"
                >
                  <span>Explore 12 Outfits</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter, Sort & Categories (Sticky Row) */}
      <section className="sticky top-16 md:top-20 z-30 bg-surface/95 backdrop-blur-md shadow-xs py-2.5 border-y border-outline-variant/30">
        <div className="flex items-center gap-2 px-gutter-mobile overflow-x-auto no-scrollbar pb-1">
          {/* Filter Modal Trigger */}
          <button
            onClick={() => setShowFilterModal(!showFilterModal)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-on-surface text-surface font-label-md text-label-md shrink-0 active:scale-95 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Filters {selectedSize !== 'All' ? '(Active)' : ''}</span>
          </button>

          {/* Sort Selector */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="py-1.5 px-3 rounded-full bg-surface-container text-on-surface-variant font-label-md text-xs shrink-0 hover:bg-surface-container-high outline-none cursor-pointer border-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Size Selector */}
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="py-1.5 px-3 rounded-full bg-surface-container text-on-surface-variant font-label-md text-xs shrink-0 hover:bg-surface-container-high outline-none cursor-pointer border-none"
          >
            <option value="All">All Sizes</option>
            <option value="FR 34">Size: FR 34</option>
            <option value="FR 36">Size: FR 36</option>
            <option value="FR 38">Size: FR 38</option>
            <option value="FR 40">Size: FR 40</option>
            <option value="FR 42">Size: FR 42</option>
          </select>
        </div>

        {/* Category Carousel */}
        <div className="flex items-center gap-2 px-gutter-mobile overflow-x-auto no-scrollbar pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`py-1 px-3.5 rounded-full font-label-sm text-label-sm shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary shadow-sm font-semibold'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="px-gutter-mobile py-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            {filteredProducts.length} Atelier Pieces Available
          </span>
          <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse"></span>
            Ready to Ship
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 md:gap-6">
          {filteredProducts.map((product) => {
            const isLiked = isInWishlist(product.id || product.title);
            const currentColor = selectedColor[product.id] || (product.colorVariants ? product.colorVariants[0]?.name : '');

            return (
              <article
                key={product.id}
                className="flex flex-col bg-surface-container-lowest rounded-xl p-3 shadow-sm border border-outline-variant/30 group hover:shadow-md transition-shadow relative"
              >
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 py-0.5 px-2.5 rounded-full bg-inverse-surface/80 backdrop-blur-sm text-surface-bright font-label-sm text-[9px] uppercase tracking-wider font-semibold">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface flex items-center justify-center shadow hover:text-secondary active:scale-90 transition-all"
                    aria-label="Wishlist toggle"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${isLiked ? 'text-secondary' : ''}`}
                      style={isLiked ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="pt-3 pb-1 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold">{product.rating}</span>
                    <span className="font-label-sm text-xs text-outline-variant font-normal">
                      ({product.reviewsCount})
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-base md:text-lg leading-snug text-on-surface mt-1 font-medium line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    {currentColor || product.subtitle}
                  </p>

                  {/* Color Swatches */}
                  {product.colorVariants && (
                    <div className="flex items-center gap-1.5 my-2.5">
                      {product.colorVariants.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => handleColorSelect(product.id, c.name)}
                          className={`w-4 h-4 rounded-full shadow-xs transition-transform ${
                            currentColor === c.name ? 'ring-2 ring-primary scale-110' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.colorHex }}
                          title={c.name}
                          aria-label={c.name}
                        />
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-2 flex items-center justify-between border-t border-surface-container">
                    <span className="font-headline-sm text-lg text-on-surface font-semibold">${product.price}</span>
                    <button
                      onClick={() => addToCart(product, 1, { color: currentColor })}
                      className="py-1.5 px-3 rounded-lg bg-on-surface text-surface font-label-sm text-xs hover:bg-primary transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[15px]">add</span>
                      <span>Bag</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Complete the Look Bundle Section */}
      {bundle && (
        <section className="px-gutter-mobile py-4">
          <div className="bg-surface-container rounded-2xl p-5 md:p-6 shadow-sm relative overflow-hidden border border-outline-variant/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                Capsule Ensemble
              </span>
              <span className="py-0.5 px-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                {bundle.badge}
              </span>
            </div>
            <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface mb-1">
              {bundle.title}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 max-w-xl">
              {bundle.subtitle}
            </p>

            {/* Bundle Items Stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-4">
              {bundle.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-14 h-14 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant/30">
                      <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <p className="font-body-sm text-xs text-on-surface font-medium line-clamp-1">{item.title}</p>
                      <p className="font-label-sm text-[10px] text-on-surface-variant">{item.meta}</p>
                    </div>
                  </div>
                  <span className="font-body-sm text-xs text-on-surface font-semibold pl-2">${item.price}</span>
                </div>
              ))}
            </div>

            {/* Bundle Total and CTA */}
            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
              <div>
                <span className="font-label-sm text-xs text-on-surface-variant block">Bundle Special</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-sm text-xl text-on-surface font-semibold">${bundle.bundlePrice}</span>
                  <span className="font-body-sm text-xs text-on-surface-variant line-through">${bundle.originalPrice}</span>
                </div>
              </div>
              <button
                onClick={() => addBundleToCart(bundle)}
                className="py-3 px-5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-wider shadow hover:bg-primary-fixed active:scale-95 transition-all flex items-center gap-2 font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Add Complete Set</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* VIP Concierge / Personal Shopper Drawer Card */}
      <section className="px-gutter-mobile py-2">
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start gap-4 border border-outline-variant/30">
          <div className="w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">support_agent</span>
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-headline-sm text-lg text-on-surface">Parisian Atelier Concierge</h3>
              <span className="w-2 h-2 rounded-full bg-primary-container inline-block animate-pulse"></span>
            </div>
            <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed max-w-xl">
              Need sizing advice or tailored styling recommendations? Chat live with our Rue Saint-Honoré atelier stylists or reserve a private video fitting.
            </p>
            <button
              onClick={onOpenConsultation}
              className="mt-3 inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-surface-container text-on-surface font-label-md text-xs uppercase tracking-wider hover:bg-surface-container-high active:scale-95 transition-all font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
              <span>Start Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Boutique Guarantees Badges */}
      <section className="px-gutter-mobile pt-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[24px] mb-1">local_shipping</span>
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface font-semibold">Courier Delivery</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5">Carbon-Neutral</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[24px] mb-1">published_with_changes</span>
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface font-semibold">30-Day Returns</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5">Effortless &amp; Free</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[24px] mb-1">verified</span>
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface font-semibold">Provenance</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5">Certified Origin</span>
          </div>
        </div>
      </section>
    </div>
  );
}
