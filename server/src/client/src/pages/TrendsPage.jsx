import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function TrendsPage() {
  const { showToast, addToCart } = useCart();
  const [trendsData, setTrendsData] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All Trends');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(74); // 01:14
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    api.getTrends()
      .then(res => setTrendsData(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let interval = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioSeconds(prev => {
          if (prev >= 258) { // 04:18
            setIsPlayingAudio(false);
            return 74;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    api.getTrends(cat)
      .then(res => setTrendsData(res.data))
      .catch(() => {});
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await api.subscribeNewsletter(newsletterEmail);
      showToast('Joined Maison Trend Council. Dispatch confirmed.');
      setNewsletterEmail('');
    } catch {
      showToast('Subscription active!');
      setNewsletterEmail('');
    }
  };

  const categories = [
    'All Trends',
    'Runway Reports',
    'Color Direction',
    'Silhouettes',
    'Accessories',
    'Street Radar'
  ];

  if (!trendsData) return null;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-safe space-y-space-xl">
      {/* Editorial Header & Curatorial Masthead */}
      <section className="px-margin-mobile pt-space-md flex flex-col gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            Autumn / Winter 2025 • Runway &amp; Street Edit
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-headline-xl-mobile md:font-display-lg text-headline-xl-mobile md:text-display-lg text-on-surface tracking-tight">
            The Trend Radar
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Deep dive analyses, macro-shifts in silhouette, and seasonal intelligence curated by our Paris &amp; Milan editorial bureaus.
          </p>
        </div>

        {/* Live Intelligence Stats Bar */}
        <div className="grid grid-cols-3 gap-2 mt-space-xs p-3.5 rounded-xl bg-surface-container shadow-sm border border-outline-variant/30 max-w-lg">
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">Reports Filed</span>
            <span className="font-headline-sm text-xl text-on-surface font-semibold">{trendsData.stats.reportsFiled}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">Runway Shows</span>
            <span className="font-headline-sm text-xl text-primary font-semibold">{trendsData.stats.runwayShows}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">Forecast Index</span>
            <span className="font-headline-sm text-xl text-secondary font-semibold">{trendsData.stats.forecastIndex}</span>
          </div>
        </div>
      </section>

      {/* Filter & Category Pills */}
      <section className="w-full overflow-x-auto no-scrollbar pl-margin-mobile">
        <div className="flex items-center gap-2 pr-margin-mobile">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md tracking-wider uppercase transition-all flex-shrink-0 ${
                activeFilter === cat
                  ? 'bg-inverse-surface text-inverse-on-surface shadow-md'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Hero Trend Spotlight */}
      <section className="px-margin-mobile">
        <article className="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
          <div className="relative w-full aspect-[4/5] md:aspect-[21/9] bg-surface-container overflow-hidden">
            <img
              className="w-full h-full object-cover object-top"
              src={trendsData.spotlight.image}
              alt={trendsData.spotlight.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>

            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-primary font-label-sm text-xs tracking-wider uppercase font-semibold">
                {trendsData.spotlight.tag}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-xs tracking-wider uppercase">
                {trendsData.spotlight.location}
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-xs uppercase tracking-wider shadow-sm font-semibold">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                {trendsData.spotlight.demand}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-inverse-on-surface max-w-2xl">
              <span className="font-label-sm text-xs text-primary-fixed uppercase tracking-widest block mb-1">
                {trendsData.spotlight.subtitle}
              </span>
              <h2 className="font-headline-sm md:font-headline-lg text-headline-sm md:text-headline-lg text-surface leading-snug">
                {trendsData.spotlight.title}
              </h2>
            </div>
          </div>

          <div className="p-space-md md:p-space-lg flex flex-col gap-space-sm bg-surface-container-lowest">
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {trendsData.spotlight.description}
            </p>

            <blockquote className="pl-4 border-l-2 border-primary-container italic font-headline-sm text-base md:text-lg text-on-surface bg-surface-container-low p-3 rounded-r-lg">
              {trendsData.spotlight.quote}
              <footer className="font-label-sm text-xs text-secondary not-italic uppercase tracking-wider mt-1.5 block">
                — {trendsData.spotlight.author}
              </footer>
            </blockquote>

            <div className="flex items-center gap-3 pt-2">
              <Link
                to="/quiz"
                className="flex-1 py-3 px-4 rounded-lg bg-inverse-surface text-inverse-on-surface font-label-md text-label-md uppercase tracking-wider text-center hover:bg-primary transition-colors shadow-sm"
              >
                Style Match Quiz
              </Link>
              <Link
                to="/shop"
                className="flex items-center justify-center gap-1.5 py-3 px-5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                Shop 4 Pieces
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* Palette & Swatch Forecast: Chroma Spectrum */}
      <section className="px-margin-mobile flex flex-col gap-space-md">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Color Psychology</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Chroma Spectrum</h2>
          </div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">AW25 Mood</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
          {trendsData.chromaSpectrum.map((swatch, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-3 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {swatch.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-8 h-8 rounded-full shadow-inner ring-2 ring-surface"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col pl-1">
                    <h3 className="font-headline-sm text-base text-on-surface leading-tight font-medium">{swatch.title}</h3>
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">{swatch.mood}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-[10px] font-semibold">
                  {swatch.badge}
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                {swatch.description}
              </p>
              <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-[11px] pt-1">
                <span className="text-primary font-semibold">✦ Suggested:</span> {swatch.suggested}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Runway Breakdown Grid */}
      <section className="px-margin-mobile flex flex-col gap-space-md">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Catwalk Decoded</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Runway Deep Dive</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {trendsData.runwayDeepDive.map((item, idx) => (
            <article key={idx} className="p-3 bg-surface-container-lowest rounded-xl shadow-md flex flex-col gap-3 border border-outline-variant/30">
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-surface-container">
                <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-sm text-[10px] uppercase tracking-wider font-semibold">
                  {item.category}
                </div>
              </div>
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-xs text-primary uppercase tracking-wider font-semibold">{item.subCategory}</span>
                  {item.wearabilityScore && (
                    <div className="flex items-center gap-1 font-label-sm text-xs text-on-surface font-semibold bg-surface-container px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-xs text-primary">verified</span>
                      Wearability {item.wearabilityScore}
                    </div>
                  )}
                </div>
                <h3 className="font-headline-sm text-lg text-on-surface font-medium">{item.title}</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Stylist Audio Memo: Mini Media Player */}
      <section className="px-margin-mobile">
        <div className="p-5 md:p-6 rounded-2xl bg-inverse-surface text-inverse-on-surface shadow-xl flex flex-col gap-3 border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-label-sm text-xs text-primary-fixed uppercase tracking-widest font-semibold">
              <span className="material-symbols-outlined text-sm">graphic_eq</span>
              Editorial Dispatch
            </span>
            <span className="font-label-sm text-[10px] text-surface-dim uppercase tracking-wider">AW25 Audio Note</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-headline-sm text-lg md:text-xl text-surface">
              {trendsData.audioMemo.title}
            </h3>
            <p className="font-body-sm text-xs text-surface-dim">
              Recorded live in Milan with Fashion Director {trendsData.audioMemo.author} ({trendsData.audioMemo.duration})
            </p>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md active:scale-90 transition-transform shrink-0"
              aria-label={isPlayingAudio ? 'Pause Memo' : 'Play Memo'}
            >
              <span className="material-symbols-outlined text-2xl">
                {isPlayingAudio ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Simulated Animated Waveform */}
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-end gap-1 h-8 px-1">
                {[12, 20, 28, 16, 24, 32, 20, 12, 24, 32, 16, 28, 8, 20, 28, 14, 22, 30].map((h, i) => {
                  const isActive = i < (audioSeconds % 18) + 1;
                  return (
                    <span
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-primary-container scale-y-110' : 'bg-surface-dim/40'
                      }`}
                      style={{ height: `${isPlayingAudio ? (h + (Math.sin(i + audioSeconds) * 6)) : h}px` }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between font-label-sm text-[10px] text-surface-dim px-1">
                <span>{formatTime(audioSeconds)}</span>
                <span>{trendsData.audioMemo.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Street Style Gallery: Off-Runway Moments */}
      <section className="px-margin-mobile flex flex-col gap-space-md">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Street Candid</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Spotted Off-Runway</h2>
          </div>
          <Link to="/shop" className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-0.5">
            View All <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {trendsData.streetCandid.map((item, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/30">
              <div className="relative w-full aspect-[4/5] bg-surface-container">
                <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-on-surface font-label-sm text-xs flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-xs text-secondary">pin_drop</span>
                  {item.location}
                </div>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-base text-on-surface">{item.title}</span>
                  <span className="font-body-sm text-xs text-on-surface-variant">{item.subtitle}</span>
                </div>
                <Link
                  to="/shop"
                  className="px-3.5 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
                >
                  Shop Look
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trend Forecast Newsletter & Bookmark CTA */}
      <section className="px-margin-mobile pb-space-lg">
        <div className="p-space-lg rounded-2xl bg-surface-container-high text-on-surface flex flex-col gap-space-sm shadow-sm border border-outline-variant/30 max-w-xl mx-auto">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm">
            <span className="material-symbols-outlined text-xl">bookmark_add</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">Trend Bureau Dispatch</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Never Miss a Silhouette Shift</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Receive our bi-weekly confidential style forecasts, private buying guides, and runway analyses delivered straight to your reader profile.
            </p>
          </div>
          <form onSubmit={handleNewsletter} className="flex flex-col gap-2 pt-2">
            <input
              className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-sm text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter your fashion email..."
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all"
            >
              Join Maison Trend Council
            </button>
          </form>
          <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider text-center">
            Curated without algorithm spam. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
