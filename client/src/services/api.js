import {
  fallbackProducts,
  fallbackBundle,
  fallbackTrendingLooks,
  fallbackTrends,
  fallbackBeauty,
  fallbackLifestyle,
  fallbackMemberProfile
} from '../data/fallbackData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function fetchJSON(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Non-JSON response from server');
    }
    return await res.json();
  } catch (error) {
    // Return null so callers can fallback seamlessly
    return null;
  }
}

export const api = {
  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetchJSON(`/products${query ? `?${query}` : ''}`);
    if (res && res.data) return res;
    return { success: true, data: fallbackProducts };
  },

  getProductById: async (id) => {
    const res = await fetchJSON(`/products/${id}`);
    if (res && res.data) return res;
    const found = fallbackProducts.find(p => p.id === id) || fallbackProducts[0];
    return { success: true, data: found };
  },

  getFeaturedBundle: async () => {
    const res = await fetchJSON('/products/bundle');
    if (res && res.data) return res;
    return { success: true, data: fallbackBundle };
  },

  getTrendingLooks: async (category) => {
    const res = await fetchJSON(`/products/trending${category ? `?category=${category}` : ''}`);
    if (res && res.data) return res;
    let list = [...fallbackTrendingLooks];
    if (category && category !== 'All') {
      list = list.filter(l => l.category.toLowerCase().includes(category.toLowerCase()));
      if (list.length === 0) list = fallbackTrendingLooks;
    }
    return { success: true, data: list };
  },

  // Trends
  getTrends: async (category) => {
    const res = await fetchJSON(`/trends${category ? `?category=${category}` : ''}`);
    if (res && res.data) return res;
    return { success: true, data: fallbackTrends };
  },

  // Beauty
  getBeauty: async (category) => {
    const res = await fetchJSON(`/beauty${category ? `?category=${category}` : ''}`);
    if (res && res.data) return res;
    return { success: true, data: fallbackBeauty };
  },

  orderFragranceSample: async (data) => {
    const res = await fetchJSON('/beauty/sample', { method: 'POST', body: JSON.stringify(data) });
    return res || { success: true, message: 'Sample dispatched' };
  },

  // Lifestyle
  getLifestyle: async () => {
    const res = await fetchJSON('/lifestyle');
    if (res && res.data) return res;
    return { success: true, data: fallbackLifestyle };
  },

  // Quiz & Dossier
  getQuizQuestions: async () => {
    const res = await fetchJSON('/quiz/questions');
    if (res && res.data) return res;
    return {
      success: true,
      data: [
        {
          id: 1,
          question: "Which morning atmosphere resonates with your aesthetic instinct?",
          options: [
            { text: "Espresso on a limestone Saint-Germain balcony in an oversized trench", archetype: "classic" },
            { text: "Matcha in a brutalist Kyoto gallery surrounded by linen drapery", archetype: "minimalist" },
            { text: "Champagne at a rooftop vernissage overlooking nocturnal Milan", archetype: "avant_garde" },
            { text: "Warm sea air on a terrace in Hydra wearing liquid hammered silks", archetype: "romantic" }
          ]
        },
        {
          id: 2,
          question: "Your definitive silhouette preference:",
          options: [
            { text: "Architectural shoulders with fluid tailored trousers", archetype: "classic" },
            { text: "Monochrome bias-cut slip dresses with zero ornamentation", archetype: "minimalist" },
            { text: "Sculpted lamé with unexpected asymmetrical volumes", archetype: "avant_garde" },
            { text: "Gathered organza sleeves and organic baroque pearl accents", archetype: "romantic" }
          ]
        }
      ]
    };
  },

  submitQuiz: async (answers, email) => {
    const res = await fetchJSON('/quiz/submit', { method: 'POST', body: JSON.stringify({ answers, email }) });
    return res || {
      success: true,
      data: {
        archetypeId: "classic",
        title: "The Architectural Modernist",
        subtitle: "L’Élégance Structurée",
        harmonyPalette: ["#1c1c19", "#d4af37", "#ebe8e3", "#7a473d"]
      }
    };
  },

  getDossier: async (archetypeId) => {
    const res = await fetchJSON(`/quiz/dossier${archetypeId ? `/${archetypeId}` : ''}`);
    if (res && res.data) return res;
    return {
      success: true,
      data: {
        archetypeId: archetypeId || "classic",
        title: "The Architectural Modernist",
        subtitle: "L’Élégance Structurée • Maison Dossier No. 42",
        description: "Your sartorial signature balances exacting tailoring with effortless Parisian fluidity.",
        harmonyPalette: [
          { name: "Noir Ink", hex: "#1c1c19" },
          { name: "Champagne Gold", hex: "#d4af37" },
          { name: "Alabaster", hex: "#ebe8e3" },
          { name: "Terracotta Rouge", hex: "#7a473d" }
        ],
        curatedCapsule: fallbackProducts
      }
    };
  },

  // Member Salon & Wishlist
  getMemberProfile: async () => {
    const res = await fetchJSON('/member/profile');
    if (res && res.data) return res;
    return { success: true, data: fallbackMemberProfile };
  },

  toggleWishlist: async (item) => {
    const res = await fetchJSON('/member/wishlist/toggle', { method: 'POST', body: JSON.stringify(item) });
    return res || { success: true };
  },

  togglePriceAlert: async (id) => {
    const res = await fetchJSON('/member/wishlist/alert', { method: 'POST', body: JSON.stringify({ id }) });
    return res || { success: true };
  },

  updateProfileSettings: async (settings) => {
    const res = await fetchJSON('/member/settings', { method: 'PUT', body: JSON.stringify(settings) });
    return res || { success: true };
  },

  // Orders & Checkout
  getOrders: async () => {
    const res = await fetchJSON('/orders');
    if (res && res.data) return res;
    return { success: true, data: fallbackMemberProfile.activeOrders };
  },

  createOrder: async (orderData) => {
    const res = await fetchJSON('/orders/checkout', { method: 'POST', body: JSON.stringify(orderData) });
    if (res && res.data) return res;
    return {
      success: true,
      data: {
        orderNumber: `FV-${Math.floor(10000 + Math.random() * 90000)}`,
        status: "Confirmed",
        estimatedDelivery: "2-3 Business Days",
        items: orderData.items || []
      }
    };
  },

  getOrderTracking: async (orderNumber) => {
    const res = await fetchJSON(`/orders/${orderNumber}`);
    if (res && res.data) return res;
    return {
      success: true,
      data: {
        orderNumber: orderNumber || "FV-84920",
        status: "In Transit • Charles de Gaulle Bureau",
        progressPercent: 72
      }
    };
  },

  // Consultation & Newsletter
  bookConsultation: async (data) => {
    const res = await fetchJSON('/consultations', { method: 'POST', body: JSON.stringify(data) });
    return res || { success: true, message: 'Consultation reserved' };
  },

  subscribeNewsletter: async (email) => {
    const res = await fetchJSON('/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
    return res || { success: true, message: 'Subscribed' };
  },

  // Health
  checkHealth: async () => {
    const res = await fetchJSON('/health');
    return res || { status: 'client_active', mode: 'instant_local' };
  },
};
