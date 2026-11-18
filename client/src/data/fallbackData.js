/**
 * Femme Vogue — Instant Fallback Data
 * Ensures 100% visible rendering immediately upon load even before backend connects.
 */

export const fallbackProducts = [
  {
    id: "prod-1",
    title: "Aurelia Silk Wrap",
    subtitle: "Champagne Sand",
    price: 185,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 128,
    category: "Silk & Knitwear",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsAWFSSzoOcAhziE1dPvku2Y6NtrPe35Cvfe7how-i5HzxZODD2fqtIjbBvtbS_Ttmj9rUcHkcu-aHIXuP1q_d2bdWXL-Lggqc5uc9bN01lae8oIJ16KzTJSUrixXVamiM1apDzN9e_k8M7GHOOMWr-Wt5BhNomxGZtxVdEVo-xPP_kVIiCbR2m15_8qf-_qzOSSGsZtDBl4-9_du6LOgCZRwUkYpaDR85_9bj--Tu8hTocH_hT-7PAw",
    badge: "Exclusive",
    inStock: true,
    colorVariants: [
      { name: "Champagne Sand", colorHex: "#f2e7d8" },
      { name: "Noir Ink", colorHex: "#3d322b" },
      { name: "Terracotta Rouge", colorHex: "#7a473d" }
    ],
    sizes: ["FR 34", "FR 36", "FR 38", "FR 40"],
    description: "Handcrafted in Lyon from weighted 22-momme pure mulberry silk. Features a self-tie architectural waist belt and softly gathered blouson cuffs."
  },
  {
    id: "prod-2",
    title: "Palazzo Linen Pant",
    subtitle: "Desert Khaki",
    price: 210,
    originalPrice: 250,
    rating: 4.8,
    reviewsCount: 94,
    category: "Capsule Wardrobe",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtgyvluw7rPj7XmOSqNAigXBUvJVoj805TZ0K_192QswO15_es-OlhiGXu5IERB1Sapfwp-pHqSuxFCicIEq1jCeXxvNUcM96GHLLRGRPmB8cgXMOCBCj702Y3nDTFarx178XwUMski1zZg5gOywELd7SIiz9hlFuT5doUr4s9lyfySV6Wpggc7zEJyYzQ8Tuv3fCV5Ryj_GUC2SZKBcABTkMkJ_VtaHwj9biW55KjtkP7tQvDMg-w0w",
    badge: "Bestseller",
    inStock: true,
    colorVariants: [
      { name: "Desert Khaki", colorHex: "#d0c5af" },
      { name: "Noir Ink", colorHex: "#1c1c19" },
      { name: "Alabaster White", colorHex: "#ebe8e3" }
    ],
    sizes: ["FR 34", "FR 36", "FR 38", "FR 40", "FR 42"],
    description: "Tailored with a sculptural high waist and cascading wide-leg pleats from premium Normandy linen treated for minimal creasing."
  },
  {
    id: "prod-3",
    title: "Baroque Pearl Drops",
    subtitle: "18k Vermeil",
    price: 95,
    originalPrice: 130,
    rating: 5.0,
    reviewsCount: 215,
    category: "Sculpted Jewelry",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGYlMog9ZE2VUw2Pd87B4N_3k5xesbedpP_s4M2OKSlm1y8r5rUvHs3yK_Cf8lxUClp7RX96fKwAZDte72J_ibKQRV0sxJavxrWGjgdpaLUQjdnn6hEeeWTLROszOyRbXojm9wrss07NgKOn5F_nCD0RaZ_S4aT9ZxIGPlqv64BiBpkQQ_PO-Iyj-F8s-xnKvTPYL7mjpBzdiEvWDsmndoMGs6AGTuoWsKfQ2fMklfBB92SPaPRaCZoA",
    badge: "Best Seller",
    inStock: true,
    colorVariants: [
      { name: "18k Champagne Vermeil", colorHex: "#d4af37" },
      { name: "Brushed Sterling Silver", colorHex: "#e5e2dd" }
    ],
    sizes: ["One Size"],
    description: "Each genuine freshwater baroque pearl carries an entirely singular organic silhouette, suspended from textured 18k recycled gold vermeil studs."
  },
  {
    id: "prod-4",
    title: "Woven Leather Tote",
    subtitle: "Cognac Veau",
    price: 340,
    originalPrice: 395,
    rating: 4.9,
    reviewsCount: 67,
    category: "Bags & Footwear",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5892EB2HnAW6Khn8pE_Y1vQ8s_n3fttRDYfs5UejYaGvapjIknPNNAhkpLO12-RSmxd-vjMbIMA7yH1xRWLJ4aCckqUfOxzicgc5IPQn881PSLiKKDqivrL8AGCF3nOnLFogIpAaizzBE8BAV6eUzihKIxW82vSw7WNQ-BemM_5zpPLzkfymHu0Ktuk2RE8eG1aEMn1QNLxVQrB6-jLu0wKlZBfYQK1LDW5SKCtBgCbtBUte6_Nu4ZQ",
    badge: "Atelier Made",
    inStock: true,
    colorVariants: [
      { name: "Cognac Brown", colorHex: "#865046" },
      { name: "Noir Ink", colorHex: "#1c1c19" }
    ],
    sizes: ["Large (fits 15\" MacBook)"],
    description: "Hand-braided supple calfskin strips sculpted into an architectural basket tote with structured top handles and detachable zip pouch."
  }
];

export const fallbackBundle = {
  id: "bundle-1",
  title: "The Parisian Sunday Uniform",
  subtitle: "Curated 3-piece capsule for effortless Sunday gallery strolls and brunch in the Marais.",
  badge: "Save $65 on Set",
  bundlePrice: 430,
  originalPrice: 495,
  items: [
    {
      title: "Aurelia Silk Wrap",
      meta: "Champagne Sand • Size FR 36",
      price: 185,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsAWFSSzoOcAhziE1dPvku2Y6NtrPe35Cvfe7how-i5HzxZODD2fqtIjbBvtbS_Ttmj9rUcHkcu-aHIXuP1q_d2bdWXL-Lggqc5uc9bN01lae8oIJ16KzTJSUrixXVamiM1apDzN9e_k8M7GHOOMWr-Wt5BhNomxGZtxVdEVo-xPP_kVIiCbR2m15_8qf-_qzOSSGsZtDBl4-9_du6LOgCZRwUkYpaDR85_9bj--Tu8hTocH_hT-7PAw"
    },
    {
      title: "Palazzo Linen Pant",
      meta: "Desert Khaki • Size FR 38",
      price: 210,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtgyvluw7rPj7XmOSqNAigXBUvJVoj805TZ0K_192QswO15_es-OlhiGXu5IERB1Sapfwp-pHqSuxFCicIEq1jCeXxvNUcM96GHLLRGRPmB8cgXMOCBCj702Y3nDTFarx178XwUMski1zZg5gOywELd7SIiz9hlFuT5doUr4s9lyfySV6Wpggc7zEJyYzQ8Tuv3fCV5Ryj_GUC2SZKBcABTkMkJ_VtaHwj9biW55KjtkP7tQvDMg-w0w"
    },
    {
      title: "Baroque Pearl Drops",
      meta: "18k Vermeil • One Size",
      price: 95,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGYlMog9ZE2VUw2Pd87B4N_3k5xesbedpP_s4M2OKSlm1y8r5rUvHs3yK_Cf8lxUClp7RX96fKwAZDte72J_ibKQRV0sxJavxrWGjgdpaLUQjdnn6hEeeWTLROszOyRbXojm9wrss07NgKOn5F_nCD0RaZ_S4aT9ZxIGPlqv64BiBpkQQ_PO-Iyj-F8s-xnKvTPYL7mjpBzdiEvWDsmndoMGs6AGTuoWsKfQ2fMklfBB92SPaPRaCZoA"
    }
  ]
};

export const fallbackTrendingLooks = [
  {
    id: "look-1",
    title: "The Oversized Silk Trench",
    category: "Street Style",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhg3GbXm8Jr9EmpZ4ouOoLvN9u06XDtkso_hI15JFi_O7LNUIeE_75-3TjXl5k5vQJ1G8aQkO77Qn4d69Z_2Z64B2e3Y4X5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D",
    price: 320,
    tag: "Trending"
  },
  {
    id: "look-2",
    title: "Minimalist Monochrome Knit",
    category: "Casual",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuf1WV1HapiUjQE7EwaVLt0UIk4EmzVHFfd3iOA8oDaO7gkL_rF_5m28G6H7J8K9L0M1N2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0L",
    price: 195,
    tag: "Editor's Pick"
  },
  {
    id: "look-3",
    title: "Gilded Pleated Lamé Midi",
    category: "Party Wear",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8ULDZ9v7kqXg0TQBPfGsWOAEWnqKLy7lGf0BMbWSk_CHaSl-vE3gG4H5J6K7L8M9N0P1Q2R3S4T5U6V7W8X9Y0Z1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F3G4H5I6J7K8L",
    price: 410,
    tag: "Runway"
  },
  {
    id: "look-4",
    title: "Sculpted Double-Faced Wool Coat",
    category: "Luxury",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgkUaVfWNcjou2aASqa-vzAKKKcQOmD125NVVkgleXkKwbUE_9fG2H3J4K5L6M7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K",
    price: 580,
    tag: "Atelier"
  }
];

export const fallbackTrends = {
  stats: {
    reportsFiled: 142,
    runwayShows: 68,
    forecastIndex: "98.4%"
  },
  heroTrend: {
    tag: "Macro Silhouette • AW25",
    title: "The Architectural Trench & Nocturne Drapes",
    subtitle: "Paris Bureau • Édition Spéciale",
    description: "Volume returns with unapologetic precision. Dispatches from Paris and Milan confirm the oversized silk trench as the definitive silhouette of the upcoming transition.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpB-2eunoUIg7wDUhd0PpoPNkAP8qi2ErpQ6YlJ-eTWGx19pGRjH3tWVQf1z6zdBbzW10q2vDenFRobPETuNyDnC7u9vqBrzdnr3X0aZLbTfsJFfnzaGEyTj-6DOOpKlm2zvzxBLfb8njul8u8tiyc8AyC8FHD9PS6fUzQFTwReOqRypJOznreTZvyIMAcNV9EMjTHZ2QSyHSmEqA4Wcmqa2vqDAcRHM0c7SAhktpC0CUUOwV4XhvAGw",
    stylistNotes: "Pair architectural shoulders with fluid silk trousers to strike effortless tension between structure and softness."
  },
  audioNote: {
    stylistName: "Hélène Dubois",
    stylistRole: "Fashion Director, Paris Bureau",
    stylistAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJAKBvjwQjVRSiSzeHmIqJVJRQ6MAdSBz-sTZba8lgymR8FVVgXXCDVpdW-d5IuPyrBa-wPIU3zgw9H9PYxy9rv8DsZ09sEVO_9Aunf8A9y6PwAfVy2utXRDl69-a_wrn9ETEypwNbD1onYknvpVuul6qOqOJp-cc2Bb0C0Iu5D2zlrXRdCfsMYwJfLK51db5czqaBenrANwvtzSr0hYkPN4TEyeP-wNYutwYeIHtVVAqEmq9f07MYEQ",
    audioDuration: "04:18",
    title: "Audio Dispatch: The Fluid Tailoring Revolution"
  },
  forecastRadar: [
    { title: "Fluid Linen Tailoring", velocity: "+42%", stage: "Mainstream Adoption", category: "Runway Reports" },
    { title: "Nocturne Champagne Silks", velocity: "+88%", stage: "Early Adopter Wave", category: "Color Direction" },
    { title: "Sculpted Baroque Pearl", velocity: "+64%", stage: "Peak Runway Saturation", category: "Accessories" }
  ],
  runwayReports: [
    {
      id: "report-1",
      title: "Saint-Germain Monochrome: The Return to Noir & Alabaster",
      bureau: "Paris Fashion Week",
      date: "October 2025",
      readTime: "4 min read",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuf1WV1HapiUjQE7EwaVLt0UIk4EmzVHFfd3iOA8oDaO7gkL_rF_5m28G6H7J8K9L0M1N2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0L",
      excerpt: "A radical return to pure contrast. Parisian ateliers abandon micro-trends in favor of exacting monochrome tailoring and structured capes."
    }
  ]
};

export const fallbackBeauty = {
  heroProtocol: {
    tag: "Morning Ritual • 10 Mins",
    title: "Glazed Cloud Skin Protocol",
    subtitle: "Formulated with French Marine Botanicals",
    description: "Achieve the signature runway glow: translucent, intensely hydrated, and softly blurred without heavy foundation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbkcTmvC5daUTpl_IMJiKyuh4T8OJYcj3UKHYRbCJNnLNYaCBGNz4q6HDqCB6fmskinOivuyHDaJXaP7R7PIfhBwwQV1_Ohtw-KTLlAPxiQ-NWT6x6nkmIrOoqhN3RtHu7gSdXjOSn692wJmIBFNiaT_ImufS5dF4GyIN1hYKSCWloXo3JmiVnypfoWHni71ZvMkiV0cgtfKetPUcX3t7F1FhfIz2_qQ_sObI9ZBCpdj41hZgU-H-PoA",
    steps: [
      "Mist with alpine rose hydrosol",
      "Press 3 drops of squalane elixir into damp skin",
      "Sculpt cheekbones with chilled rose quartz roller",
      "Dust ethereal luminous finishing balm"
    ]
  },
  fragranceBar: [
    {
      id: "scent-1",
      title: "Nocturne Figue",
      house: "Maison Grasse",
      notes: "Wild Fig • Crushed Cypress • Ambergris",
      price: 190,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrAVpG5JQR2CAxGIAszA4BXVdrTt7qAkK4FqWJ5y4QP4I-fUzOSDMhNp-60-inHM3f44Jdvh9ICMZ68AYCeSN__WIFWzDVoBE0e7_B71QPaNccZDh3-NNZRDer8K81v_n0KHsGKRf88XcKS2JpiGcGQXI6s339rfjRXk_S_rQdAdFG7MhoL-fFoLDNj5GQiWTfEouRAOkoeUv8m1bpNwF9AEAdPqm6b3_u8l3T0q5XGzd_-N8Lr--fpw"
    }
  ],
  beautyProducts: [
    {
      id: "b-prod-1",
      title: "Huile Botanique Précieuse",
      brand: "L'Atelier Beauté",
      price: 84,
      rating: 4.9,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrAVpG5JQR2CAxGIAszA4BXVdrTt7qAkK4FqWJ5y4QP4I-fUzOSDMhNp-60-inHM3f44Jdvh9ICMZ68AYCeSN__WIFWzDVoBE0e7_B71QPaNccZDh3-NNZRDer8K81v_n0KHsGKRf88XcKS2JpiGcGQXI6s339rfjRXk_S_rQdAdFG7MhoL-fFoLDNj5GQiWTfEouRAOkoeUv8m1bpNwF9AEAdPqm6b3_u8l3T0q5XGzd_-N8Lr--fpw"
    }
  ]
};

export const fallbackLifestyle = {
  sanctuary: {
    title: "Le Marais Light Sanctuary",
    location: "Rue de Turenne, Paris 3e",
    architect: "Studio Camille Oberkampf",
    description: "An 18th-century limestone atelier reimagined with monolithic travertine islands, custom Belgian linen draping, and warm indirect cove illumination.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbkcTmvC5daUTpl_IMJiKyuh4T8OJYcj3UKHYRbCJNnLNYaCBGNz4q6HDqCB6fmskinOivuyHDaJXaP7R7PIfhBwwQV1_Ohtw-KTLlAPxiQ-NWT6x6nkmIrOoqhN3RtHu7gSdXjOSn692wJmIBFNiaT_ImufS5dF4GyIN1hYKSCWloXo3JmiVnypfoWHni71ZvMkiV0cgtfKetPUcX3t7F1FhfIz2_qQ_sObI9ZBCpdj41hZgU-H-PoA",
    palette: [
      { name: "Limestone", hex: "#ebe8e3" },
      { name: "Raw Umber", hex: "#7a473d" },
      { name: "Aged Brass", hex: "#d4af37" }
    ]
  }
};

export const fallbackMemberProfile = {
  name: "Camille Laurent",
  tier: "Haute Privé VIP",
  memberId: "FV-9284-PARIS",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJAKBvjwQjVRSiSzeHmIqJVJRQ6MAdSBz-sTZba8lgymR8FVVgXXCDVpdW-d5IuPyrBa-wPIU3zgw9H9PYxy9rv8DsZ09sEVO_9Aunf8A9y6PwAfVy2utXRDl69-a_wrn9ETEypwNbD1onYknvpVuul6qOqOJp-cc2Bb0C0Iu5D2zlrXRdCfsMYwJfLK51db5czqaBenrANwvtzSr0hYkPN4TEyeP-wNYutwYeIHtVVAqEmq9f07MYEQ",
  points: 4850,
  tierProgress: 82,
  profileSettings: {
    sizes: "FR 36 (Top) • FR 38 (Pants)",
    primaryAddress: "14 Rue de Castiglione, 75001 Paris",
    dispatchPrefs: "Carbon-neutral white glove courier"
  },
  activeOrders: [
    {
      orderNumber: "FV-84920",
      itemTitle: "The Oversized Silk Trench (Champagne)",
      status: "In Transit • Charles de Gaulle Bureau",
      progressPercent: 72,
      estimatedDelivery: "Tomorrow, 14:00"
    }
  ]
};
