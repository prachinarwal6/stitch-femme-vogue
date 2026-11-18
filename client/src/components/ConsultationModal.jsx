import React, { useState } from 'react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ConsultationModal({ isOpen, onClose }) {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: 'Éléonore de Saint-Germain',
    email: 'eleonore@maison-vogue.fr',
    phone: '+33 1 42 68 55 00',
    stylist: 'Clémence Roy',
    type: 'Virtual Video Atelier (45 mins)',
    preferredDate: 'This Friday at 15:00 CET',
    notes: 'Looking for a bespoke capsule tailored for Paris Fashion Week galas and day-to-night transitions.'
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.bookConsultation(formData);
      showToast(`Styling consultation reserved with ${formData.stylist}!`);
      onClose();
    } catch (err) {
      showToast(`Consultation request submitted! Our concierge will email you.`);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div>
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-semibold">
                Rue Saint-Honoré Concierge
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Private Styling Consultation</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider mb-1">
                Fashion Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider mb-1">
                Selected Stylist
              </label>
              <select
                value={formData.stylist}
                onChange={(e) => setFormData({ ...formData, stylist: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="Clémence Roy">Clémence Roy (Senior Fashion Editor)</option>
                <option value="Hélène Dubois">Hélène Dubois (Fashion Director)</option>
                <option value="Simone Galli">Simone Galli (Milan Bureau Chief)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider mb-1">
                Consultation Format
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="Virtual Video Atelier">Virtual Video Atelier (45m)</option>
                <option value="Private Salon Visit (Paris)">Private Salon Visit (Paris)</option>
                <option value="WhatsApp Editorial Direct">WhatsApp Editorial Direct</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider mb-1">
              Preferred Date &amp; Time
            </label>
            <input
              type="text"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider mb-1">
              Styling Objectives &amp; Size Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-1 focus:ring-primary outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-label-md text-label-md uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Booking Atelier Slot...' : 'Confirm Appointment with Stylist'}
          </button>
        </form>
      </div>
    </div>
  );
}
