import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function HomePage({ onOpenConsultation }) {
  const navigate = useNavigate();
  const { addToCart, showToast } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeTrendingFilter, setActiveTrendingFilter] = useState('All');
  const [trendingLooks, setTrendingLooks] = useState([]);
  const [boutiqueProducts, setBoutiqueProducts] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    // Fetch initial trending looks and boutique pieces
    api.getTrendingLooks()
      .then(res => setTrendingLooks(res.data))
      .catch(() => {});

    api.getProducts()
      .then(res => setBoutiqueProducts(res.data.slice(0, 4)))
      .catch(() => {});
  }, []);

  const handleTrendingFilter = (cat) => {
    setActiveTrendingFilter(cat);
    api.getTrendingLooks(cat)
      .then(res => setTrendingLooks(res.data))
      .catch(() => {});
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribing(true);
    try {
      await api.subscribeNewsletter(newsletterEmail);
      showToast('Welcome to the Maison Trend Council. Dispatch confirmed.');
      setNewsletterEmail('');
    } catch {
      showToast('Welcome to the Maison Trend Council!');
      setNewsletterEmail('');
    } finally {
      setIsSubscribing(false);
    }
  };

  const trendingCategories = ['All', 'Street Style', 'Casual', 'Party Wear', 'Office Wear', 'Ethnic', 'Luxury'];

  return (
    <div className="flex flex-col w-full px-margin-mobile max-w-7xl mx-auto space-y-space-xl">
      {/* 1. HERO SECTION */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-surface-container-lowest mt-2">
        <div className="relative w-full aspect-[4/5] md:aspect-[21/9] max-h-[640px] overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            data-alt="Stunning high fashion editorial portrait of a woman wearing an avant-garde champagne silk layered trench, warm natural sunlight glowing from behind, soft Paris balcony background with limestone balustrades, cinematic depth of field, elegant and modern haute couture."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpB-2eunoUIg7wDUhd0PpoPNkAP8qi2ErpQ6YlJ-eTWGx19pGRjH3tWVQf1z6zdBbzW10q2vDenFRobPETuNyDnC7u9vqBrzdnr3X0aZLbTfsJFfnzaGEyTj-6DOOpKlm2zvzxBLfb8njul8u8tiyc8AyC8FHD9PS6fUzQFTwReOqRypJOznreTZvyIMAcNV9EMjTHZ2QSyHSmEqA4Wcmqa2vqDAcRHM0c7SAhktpC0CUUOwV4XhvAGw"
            alt="Haute Couture Preview"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent"></div>

          {/* Top floating editorial badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Issue No. 42 • S/S 2025
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm shadow-sm">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              4.9★ Stylists' Pick
            </span>
          </div>

          {/* Hero Typography & CTAs */}
          <div className="absolute bottom-0 inset-x-0 p-5 md:p-10 flex flex-col gap-3 md:gap-4 max-w-2xl">
            <div className="space-y-1">
              <span className="font-label-sm text-label-sm uppercase text-secondary-fixed tracking-widest font-semibold">
                Haute Couture Preview
              </span>
              <h1 className="font-headline-xl-mobile md:font-display-lg text-headline-xl-mobile md:text-display-lg text-surface leading-tight font-normal">
                Your Style.<br />
                <span className="italic font-normal">Your Statement.</span>
              </h1>
            </div>
            <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-surface-container-high line-clamp-2 md:line-clamp-none max-w-lg">
              Discover curated silhouettes, runway-inspired edits, and timeless beauty rituals crafted for the effortlessly modern woman.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5 pt-1 max-w-md">
              <Link
                to="/trends"
                className="flex-1 flex items-center justify-center py-3 px-4 rounded-lg bg-inverse-surface text-surface font-label-md text-label-md uppercase tracking-wider shadow hover:bg-primary transition-colors text-center"
              >
                Explore Trends
              </Link>
              <Link
                to="/shop"
                className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-md text-label-md uppercase tracking-wider shadow hover:bg-surface-container-lowest transition-colors text-center"
              >
                <span>Shop The Look</span>
                <span className="material-symbols-outlined text-[16px] text-primary">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING NOW SECTION */}
      <section className="flex flex-col space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-primary tracking-widest font-semibold">Curated Daily</span>
            <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">Trending Now</h2>
          </div>
          <Link
            to="/trends"
            className="font-label-sm text-label-sm text-secondary uppercase tracking-widest flex items-center gap-0.5 hover:text-primary transition-colors"
          >
            See All <span className="material-symbols-outlined text-sm">chevron_right</span>
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
          {trendingCategories.map(cat => (
            <button
              key={cat}
              onClick={() => handleTrendingFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTrendingFilter === cat
                  ? 'bg-inverse-surface text-surface shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Slider / Grid */}
        <div className="flex gap-3 overflow-x-auto pb-3 no-scrollbar md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible">
          {trendingLooks.map((look) => {
            const isLiked = isInWishlist(look.id || look.title);
            return (
              <article
                key={look.id}
                className="flex-none w-[72%] max-w-[280px] md:w-full md:max-w-none bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col group border border-outline-variant/30"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={look.image}
                    alt={look.title}
                  />
                  {look.tag && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] uppercase tracking-wider font-semibold">
                      {look.tag}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(look)}
                    aria-label="Save Look"
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-secondary active:scale-90 transition-all shadow-sm"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${isLiked ? 'text-secondary' : ''}`}
                      style={isLiked ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-grow gap-2">
                  <div>
                    <span className="font-label-sm text-[10px] uppercase text-secondary tracking-widest block">
                      {look.category}
                    </span>
                    <h3 className="font-headline-sm text-sm text-on-surface font-medium leading-tight mt-0.5 line-clamp-1">
                      {look.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-headline-sm text-sm text-on-surface">${look.price || 240}</span>
                    <button
                      onClick={() => addToCart({ id: look.id, title: look.title, price: look.price || 240, image: look.image })}
                      className="py-1 px-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-sm text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                      Bag <span className="material-symbols-outlined text-xs">add</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. SPOTLIGHT EDITORIAL EDIT */}
      <section className="bg-surface-container rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-outline-variant/30">
        <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbkcTmvC5daUTpl_IMJiKyuh4T8OJYcj3UKHYRbCJNnLNYaCBGNz4q6HDqCB6fmskinOivuyHDaJXaP7R7PIfhBwwQV1_Ohtw-KTLlAPxiQ-NWT6x6nkmIrOoqhN3RtHu7gSdXjOSn692wJmIBFNiaT_ImufS5dF4GyIN1hYKSCWloXo3JmiVnypfoWHni71ZvMkiV0cgtfKetPUcX3t7F1FhfIz2_qQ_sObI9ZBCpdj41hZgU-H-PoA"
            alt="The Riviera & Nocturne Capsule"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="py-1 px-2.5 rounded-full bg-surface/90 backdrop-blur-md text-primary font-label-sm text-xs shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">stars</span>
              Limited Édition
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-1/2">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Printemps-Été 2025</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            <span className="font-label-sm text-label-sm uppercase text-secondary">Paris Bureau</span>
          </div>
          <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface leading-tight">
            The Riviera &amp; Nocturne Capsule
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Curated by Fashion Director Hélène Dubois. Architectural linen tailoring meets nocturnal liquid silks, bathed in golden Mediterranean light.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/shop"
              className="py-3 px-5 rounded-lg bg-inverse-surface hover:bg-primary text-surface font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm text-center"
            >
              Explore 12 Outfits
            </Link>
            <button
              onClick={onOpenConsultation}
              className="py-3 px-5 rounded-lg bg-surface-container-high hover:bg-surface-dim text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm"
            >
              Book Stylist
            </button>
          </div>
        </div>
      </section>

      {/* 4. BOUTIQUE PREVIEW */}
      <section className="flex flex-col space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-primary tracking-widest font-semibold">Ready to Ship</span>
            <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">The Atelier Boutique</h2>
          </div>
          <Link
            to="/shop"
            className="font-label-sm text-label-sm text-secondary uppercase tracking-widest flex items-center gap-0.5 hover:text-primary transition-colors"
          >
            All Pieces <span className="material-symbols-outlined text-sm">chevron_right</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {boutiqueProducts.map((product) => {
            const isLiked = isInWishlist(product.id || product.title);
            return (
              <article key={product.id} className="flex flex-col bg-surface-container-lowest rounded-xl p-2.5 shadow-sm border border-outline-variant/30 group">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-2 left-2 py-0.5 px-2 rounded-full bg-inverse-surface/80 backdrop-blur-sm text-surface-bright font-label-sm text-[9px] uppercase tracking-wider">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface flex items-center justify-center shadow hover:text-secondary active:scale-90 transition-all"
                  >
                    <span className={`material-symbols-outlined text-[16px] ${isLiked ? 'text-secondary' : ''}`} style={isLiked ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      favorite
                    </span>
                  </button>
                </div>
                <div className="pt-2.5 pb-1 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-label-sm text-label-sm font-semibold">{product.rating}</span>
                    <span className="font-label-sm text-[10px] text-outline-variant font-normal">({product.reviewsCount})</span>
                  </div>
                  <h3 className="font-headline-sm text-sm text-on-surface mt-1 font-medium truncate">{product.title}</h3>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">{product.subtitle}</p>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="font-headline-sm text-base text-on-surface font-semibold">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="py-1 px-2.5 rounded-lg bg-on-surface text-surface font-label-sm text-xs hover:bg-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      <span>Bag</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. AI STYLE QUIZ TEASER */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-high p-6 md:p-10 border border-outline-variant/40 shadow-sm">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              Curated Consultation • 90 Seconds
            </span>
            <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface">
              What’s Your Fashion Archetype?
            </h2>
            <p className="font-body-sm md:font-body-md text-on-surface-variant">
              Answer 5 intuitive aesthetic questions to receive your bespoke private styling dossier, tailored chromatic harmony palettes, and curated silhouettes.
            </p>
          </div>
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-inverse-surface hover:bg-primary text-surface font-label-md text-label-md uppercase tracking-wider shadow-md transition-colors shrink-0"
          >
            <span>Begin Style Quiz</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* 6. NEWSLETTER DISPATCH COUNCIL */}
      <section className="rounded-2xl bg-surface-container-lowest p-6 md:p-10 shadow-sm border border-outline-variant/30 flex flex-col items-center text-center max-w-2xl mx-auto w-full space-y-4">
        <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-2xl">mark_email_read</span>
        </div>
        <div className="space-y-1">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
            Maison Trend Council
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface">Private Editorial Dispatches</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mx-auto">
            Receive our confidential bi-weekly silhouette forecasts, private buying guides, and invitations to Paris runway livestreams.
          </p>
        </div>

        <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 w-full max-w-md pt-2">
          <input
            type="email"
            required
            placeholder="Enter your fashion email..."
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant font-body-sm text-xs focus:ring-1 focus:ring-primary outline-none"
          />
          <button
            type="submit"
            disabled={isSubscribing}
            className="py-3 px-6 rounded-lg bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-label-md text-label-md uppercase tracking-widest shadow-md transition-all shrink-0"
          >
            {isSubscribing ? 'Joining...' : 'Join Council'}
          </button>
        </form>
        <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">
          Curated without algorithm noise. Unsubscribe at any time.
        </span>
      </section>
    </div>
  );
}
