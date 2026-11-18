import mongoose from 'mongoose';

const memberProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Éléonore de Saint-Germain' },
  email: { type: String, default: 'eleonore@maison-vogue.fr' },
  avatar: { type: String, default: 'https://lh3.googleusercontent.com/aida/AEtjO1VygpjCrfu0MZoB5aJIllD_xvc_UUYwhDlBYNLmOGFVNVttdNclpoVeMfMcrrP6sHBXRcaBPYqlva-IsGwMEJ7FcgwnNG7TaGEG-UBQzJtvp5WsfXgj8NpuaKvl7tVTkFZb4E2Ah_Bqjcg3Kb0j1XVVRDVLdnbBKiE_lKEdAQZTbYOrHIU4TSV5vJNkdQ_xMe7f-Hh2sX5W_aApkb02HGooLtwMSjk65VejjdG8YzzxSqol7oAQ3cv1omE' },
  tier: { type: String, default: "L'Étoile VIP Member" },
  tierLevel: { type: String, default: 'Tier 3 Exclusivité' },
  assignedStylist: {
    name: { type: String, default: 'Clémence Roy' },
    role: { type: String, default: 'Senior Fashion Editor & Stylist' },
    avatar: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3yKnsC68pSFayjnI3409Oqp-o-qjleRdWIDjoYdJ4PlqmslUmgAJ_XXBFpj5gnZR57_JfiCsnOae-xhcDu9CJy_aF5sObEoiptUKY3M0BzKHzejsO3Ac2XimHQbq5bTjx64qO2nrs9vX1ux_En6esitee_RKX4huiQDKd89ug3zCInVSx8_OTHNvPklmb_V8erpAPYZ8BI6DJOgX-glJhNE9jbD39gEfqg6DBxU3jDXy25VQ0C2Z3pA' }
  },
  stats: {
    savedLooks: { type: Number, default: 14 },
    capsules: { type: Number, default: 6 },
    activeOrders: { type: Number, default: 1 },
    atelierPoints: { type: String, default: '1.2k' }
  },
  sizes: {
    garment: { type: String, default: 'FR 36' },
    ring: { type: String, default: '52' },
    shoes: { type: String, default: 'IT 38.5' }
  },
  primaryAddress: { type: String, default: '7ème Arrondissement, Paris' },
  dispatchPreferences: { type: String, default: 'Weekly Curations & Private Invitations' },
  invitations: [{
    title: String,
    type: String,
    time: String,
    description: String,
    passCode: String,
    status: String,
    buttonText: String
  }],
  wishlist: [{
    id: String,
    title: String,
    category: String,
    price: Number,
    image: String,
    badge: String,
    hasPriceAlert: { type: Boolean, default: false }
  }]
}, { timestamps: true });

export const MemberProfile = mongoose.models.MemberProfile || mongoose.model('MemberProfile', memberProfileSchema);
