import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function SalonPage({ onOpenConsultation }) {
  const { addToCart, showToast } = useCart();
  const { wishlist, toggleWishlist, toggleAlert } = useWishlist();

  const [profile, setProfile] = useState(null);
  const [activeWishlistFilter, setActiveWishlistFilter] = useState('all');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(null);
  const [editSettingModal, setEditSettingModal] = useState(null);
  const [customSettingVal, setCustomSettingVal] = useState('');

  useEffect(() => {
    api.getMemberProfile()
      .then(res => setProfile(res.data))
      .catch(() => {});
  }, []);

  if (!profile) return null;

  const filteredWishlist = activeWishlistFilter === 'all'
    ? wishlist
    : wishlist.filter(item => item.category && item.category.toLowerCase().includes(activeWishlistFilter.toLowerCase()));

  const handleSaveSetting = async () => {
    if (editSettingModal === 'sizes') {
      profile.profileSettings.sizes = customSettingVal;
    } else if (editSettingModal === 'address') {
      profile.profileSettings.primaryAddress = customSettingVal;
    } else if (editSettingModal === 'dispatch') {
      profile.profileSettings.dispatchPrefs = customSettingVal;
    }
    await api.updateProfileSettings({ [editSettingModal]: customSettingVal }).catch(() => {});
    showToast('Atelier profile preference updated.');
    setEditSettingModal(null);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-2xl gap-space-lg">
      {/* Privé Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-high p-space-md md:p-space-lg shadow-sm border border-outline-variant/30 mt-2">
        <div className="absolute -right-12 -top-12 w-52 h-52 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="text-primary text-xs">✦</span>
            <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-semibold">
              Maison Member Salon • Privé
            </span>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] tracking-wider uppercase font-semibold">
            {profile.tierBadge || 'Tier 3 Exclusivité'}
          </span>
        </div>

        {/* VIP Profile Card Inside Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-space-xs">
          <div className="flex items-start gap-space-md">
            <div className="relative shrink-0">
              <img
                alt={profile.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-sm ring-2 ring-primary-container"
                src={profile.avatar}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface truncate">
                {profile.name}
              </h1>
              <p className="font-label-md text-sm text-primary font-medium tracking-wide">
                {profile.tier}
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-body-sm text-xs">
                <span className="material-symbols-outlined text-[16px] text-secondary">support_agent</span>
                <span className="truncate">
                  Assigned Stylist: <strong className="font-semibold text-on-surface">{profile.assignedStylist}</strong>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="self-start sm:self-auto py-2.5 px-4 rounded-xl bg-inverse-surface text-surface hover:bg-primary font-label-md text-xs uppercase tracking-wider transition-colors shadow-sm font-semibold"
          >
            Direct Stylist Chat
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface-container shadow-xs text-center border border-outline-variant/20">
          <span className="font-headline-sm text-xl md:text-2xl text-primary leading-tight font-semibold">
            {wishlist.length}
          </span>
          <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant mt-0.5 font-semibold">
            Saved Looks
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface-container shadow-xs text-center border border-outline-variant/20">
          <span className="font-headline-sm text-xl md:text-2xl text-secondary leading-tight font-semibold">
            {profile.stats.capsule}
          </span>
          <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant mt-0.5 font-semibold">
            Capsules
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface-container shadow-xs text-center border border-outline-variant/20">
          <span className="font-headline-sm text-xl md:text-2xl text-on-surface leading-tight font-semibold">
            {profile.stats.activeOrders}
          </span>
          <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant mt-0.5 font-semibold">
            Active Ord.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface-container shadow-xs text-center border border-outline-variant/20">
          <span className="font-headline-sm text-xl md:text-2xl text-primary leading-tight font-semibold">
            {profile.stats.atelierPoints}
          </span>
          <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant mt-0.5 font-semibold">
            Atelier Pts
          </span>
        </div>
      </div>

      {/* Live Atelier Order Tracking */}
      <section className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Active Delivery</h2>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
            {profile.activeOrder.carrier}
          </span>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">
                {profile.activeOrder.title}
              </span>
              <p className="font-headline-sm text-lg text-on-surface font-medium">Order #{profile.activeOrder.orderNumber}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs uppercase font-semibold">
              {profile.activeOrder.status}
            </span>
          </div>

          {/* Timeline Component */}
          <div className="relative py-2 mt-1">
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary w-2/3 rounded-full transition-all duration-700"></div>
            </div>
            <div className="flex justify-between items-center text-center mt-3">
              <div className="flex flex-col items-center min-w-0 max-w-[80px]">
                <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] mb-1 font-bold">
                  ✓
                </div>
                <span className="font-label-sm text-[9px] uppercase text-on-surface font-medium leading-tight">
                  Atelier Wrapped
                </span>
              </div>
              <div className="flex flex-col items-center min-w-0 max-w-[80px]">
                <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] mb-1 font-bold">
                  ✓
                </div>
                <span className="font-label-sm text-[9px] uppercase text-on-surface font-medium leading-tight">
                  Dispatched Paris
                </span>
              </div>
              <div className="flex flex-col items-center min-w-0 max-w-[80px]">
                <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] mb-1 font-bold animate-pulse">
                  ●
                </div>
                <span className="font-label-sm text-[9px] uppercase text-primary font-bold leading-tight">
                  White-Glove Courier
                </span>
              </div>
              <div className="flex flex-col items-center min-w-0 max-w-[80px]">
                <div className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center text-[10px] mb-1">
                  ○
                </div>
                <span className="font-label-sm text-[9px] uppercase text-on-surface-variant leading-tight">
                  Delivery Complete
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
              <span className="font-body-sm text-xs text-on-surface-variant">
                Estimated Arrival: <strong className="text-on-surface">{profile.activeOrder.estimatedTime}</strong>
              </span>
            </div>
            <button
              onClick={() => setShowOrderModal(true)}
              className="font-label-sm text-xs text-primary uppercase font-bold hover:underline"
            >
              Order Details
            </button>
          </div>
        </div>
      </section>

      {/* Curated Wishlist & Moodboard Section */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Saved &amp; Curated Looks</h2>
          </div>
          <span className="font-label-sm text-xs text-on-surface-variant font-semibold">
            {wishlist.length} Selections
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['all', 'runway', 'boutique', 'beauty'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveWishlistFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider shrink-0 transition-all font-semibold ${
                activeWishlistFilter === tab
                  ? 'bg-inverse-surface text-inverse-on-surface shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {tab === 'all' ? `All (${wishlist.length})` : tab}
            </button>
          ))}
        </div>

        {/* Wishlist Items Grid */}
        {filteredWishlist.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-xs text-on-surface-variant">
            No items in this curated category yet. Explore the boutique to save bespoke looks.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {filteredWishlist.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-xl bg-surface-container-lowest p-2.5 shadow-sm relative group border border-outline-variant/30"
              >
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.title}
                  />
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-secondary hover:text-error transition-colors"
                    aria-label="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                  </button>
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-[9px] uppercase tracking-wider font-semibold">
                    {item.stock || 'In Stock'}
                  </span>
                </div>

                <div className="flex flex-col mt-2 min-w-0 flex-1 justify-between">
                  <div>
                    <span className="font-label-sm text-[9px] uppercase text-primary tracking-widest truncate block font-semibold">
                      {item.brand || 'Maison Édition'}
                    </span>
                    <h3 className="font-headline-sm text-sm leading-snug text-on-surface truncate font-medium">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-sm text-on-surface font-semibold">${item.price}</span>
                      <button
                        onClick={() => toggleAlert(item.id)}
                        className={`flex items-center gap-0.5 transition-colors ${
                          item.hasAlert ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                        }`}
                        title={item.hasAlert ? 'Price alert active' : 'Set price alert'}
                      >
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={item.hasAlert ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                          {item.hasAlert ? 'notifications_active' : 'notifications'}
                        </span>
                      </button>
                    </div>

                    <button
                      onClick={() => addToCart({ id: item.id, title: item.title, price: item.price, image: item.image })}
                      className="mt-2 w-full py-1.5 px-2 bg-on-surface text-surface rounded-lg font-label-sm text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-primary transition-colors font-semibold"
                    >
                      <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Private Invitations & VIP Access */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">confirmation_number</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">VIP Privé Access</h2>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
            {profile.invitations.length} Invitations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.invitations.map((inv, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl p-5 shadow-sm border ${
                idx === 0
                  ? 'bg-inverse-surface text-inverse-on-surface border-primary/20'
                  : 'bg-surface-container-high text-on-surface border-outline-variant/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full font-label-sm text-[10px] uppercase tracking-wider font-semibold ${
                    idx === 0 ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-fixed text-on-secondary-fixed'
                  }`}
                >
                  {inv.type}
                </span>
                <span className="font-label-sm text-[10px] tracking-wider uppercase opacity-80">{inv.time}</span>
              </div>
              <h3 className="font-headline-sm text-lg font-medium leading-tight">{inv.title}</h3>
              <p className="font-body-sm text-xs opacity-85 mt-1 leading-relaxed">{inv.description}</p>
              <div className="flex items-center justify-between mt-4 pt-2 border-t border-outline-variant/20">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[16px]">verified_user</span>
                  <span className="font-label-sm text-[11px] tracking-wide text-primary-fixed">{inv.passCode}</span>
                </div>
                <button
                  onClick={() => {
                    setShowInvitationModal(inv);
                    showToast(`Seat reserved with Pass ${inv.passCode}`);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg font-label-sm text-xs uppercase tracking-wider font-bold transition-colors ${
                    idx === 0
                      ? 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-container'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-white'
                  }`}
                >
                  {inv.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Concierge & Wardrobe Room Settings */}
      <section className="flex flex-col gap-space-sm mb-space-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">room_service</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Concierge &amp; Profile Preferences</h2>
        </div>

        <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-sm divide-y divide-surface-container overflow-hidden border border-outline-variant/30">
          {/* Direct Stylist */}
          <button
            onClick={onOpenConsultation}
            className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-sm font-semibold text-on-surface">Direct Stylist Consultation</span>
                <span className="font-body-sm text-xs text-on-surface-variant">Active chat with Clémence Roy</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">chevron_right</span>
            </div>
          </button>

          {/* Sizing Profile */}
          <button
            onClick={() => {
              setEditSettingModal('sizes');
              setCustomSettingVal(profile.profileSettings.sizes);
            }}
            className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">straighten</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-sm font-semibold text-on-surface">Bespoke Size &amp; Fit Profile</span>
                <span className="font-body-sm text-xs text-on-surface-variant">{profile.profileSettings.sizes}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">edit</span>
          </button>

          {/* Address Book */}
          <button
            onClick={() => {
              setEditSettingModal('address');
              setCustomSettingVal(profile.profileSettings.primaryAddress);
            }}
            className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">place</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-sm font-semibold text-on-surface">Curated Address Book</span>
                <span className="font-body-sm text-xs text-on-surface-variant">{profile.profileSettings.primaryAddress}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">edit</span>
          </button>

          {/* Dispatch Preferences */}
          <button
            onClick={() => {
              setEditSettingModal('dispatch');
              setCustomSettingVal(profile.profileSettings.dispatchPrefs);
            }}
            className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-sm font-semibold text-on-surface">Editorial Dispatch Frequency</span>
                <span className="font-body-sm text-xs text-on-surface-variant">{profile.profileSettings.dispatchPrefs}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">edit</span>
          </button>
        </div>
      </section>

      {/* Settings Edit Modal */}
      {editSettingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md">
          <div className="bg-surface-container-lowest p-6 rounded-2xl max-w-sm w-full shadow-2xl space-y-4 border border-outline-variant/30">
            <h3 className="font-headline-sm text-base text-on-surface uppercase tracking-wider font-semibold">
              Edit {editSettingModal}
            </h3>
            <input
              type="text"
              value={customSettingVal}
              onChange={(e) => setCustomSettingVal(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-sm focus:ring-1 focus:ring-primary outline-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditSettingModal(null)}
                className="px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-on-surface"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSetting}
                className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md">
          <div className="bg-surface-container-lowest p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-3 border border-outline-variant/30">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-primary uppercase tracking-widest font-semibold">Order Tracking Dossier</span>
              <button onClick={() => setShowOrderModal(false)} className="text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h3 className="font-headline-sm text-xl text-on-surface">Order #{profile.activeOrder.orderNumber}</h3>
            <p className="text-xs text-on-surface-variant">
              Courier: {profile.activeOrder.carrier} • Status: {profile.activeOrder.status}
            </p>
            <div className="bg-surface-container p-3 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Saint-Germain Gabardine Trench</span>
                <span className="font-semibold">$320</span>
              </div>
              <div className="flex justify-between">
                <span>Printed Silk Twill Carré</span>
                <span className="font-semibold">$115</span>
              </div>
              <div className="flex justify-between">
                <span>Ribbed Aureole Hoops</span>
                <span className="font-semibold">$110</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-surface-container-high font-bold text-on-surface">
                <span>Total</span>
                <span>$480</span>
              </div>
            </div>
            <button
              onClick={() => setShowOrderModal(false)}
              className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
