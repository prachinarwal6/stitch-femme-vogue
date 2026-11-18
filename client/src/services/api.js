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
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJSON(`/products${query ? `?${query}` : ''}`);
  },
  getProductById: (id) => fetchJSON(`/products/${id}`),
  getFeaturedBundle: () => fetchJSON('/products/bundle'),
  getTrendingLooks: (category) => fetchJSON(`/products/trending${category ? `?category=${category}` : ''}`),

  // Trends
  getTrends: (category) => fetchJSON(`/trends${category ? `?category=${category}` : ''}`),

  // Beauty
  getBeauty: (category) => fetchJSON(`/beauty${category ? `?category=${category}` : ''}`),
  orderFragranceSample: (data) => fetchJSON('/beauty/sample', { method: 'POST', body: JSON.stringify(data) }),

  // Lifestyle
  getLifestyle: () => fetchJSON('/lifestyle'),

  // Quiz & Dossier
  getQuizQuestions: () => fetchJSON('/quiz/questions'),
  submitQuiz: (answers, email) => fetchJSON('/quiz/submit', { method: 'POST', body: JSON.stringify({ answers, email }) }),
  getDossier: (archetypeId) => fetchJSON(`/quiz/dossier${archetypeId ? `/${archetypeId}` : ''}`),

  // Member Salon & Wishlist
  getMemberProfile: () => fetchJSON('/member/profile'),
  toggleWishlist: (item) => fetchJSON('/member/wishlist/toggle', { method: 'POST', body: JSON.stringify(item) }),
  togglePriceAlert: (id) => fetchJSON('/member/wishlist/alert', { method: 'POST', body: JSON.stringify({ id }) }),
  updateProfileSettings: (settings) => fetchJSON('/member/settings', { method: 'PUT', body: JSON.stringify(settings) }),

  // Orders & Checkout
  getOrders: () => fetchJSON('/orders'),
  createOrder: (orderData) => fetchJSON('/orders/checkout', { method: 'POST', body: JSON.stringify(orderData) }),
  getOrderTracking: (orderNumber) => fetchJSON(`/orders/${orderNumber}`),

  // Consultation & Newsletter
  bookConsultation: (data) => fetchJSON('/consultations', { method: 'POST', body: JSON.stringify(data) }),
  subscribeNewsletter: (email) => fetchJSON('/newsletter', { method: 'POST', body: JSON.stringify({ email }) }),

  // Health
  checkHealth: () => fetchJSON('/health'),
};
