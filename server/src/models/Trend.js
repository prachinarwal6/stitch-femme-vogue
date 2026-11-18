import mongoose from 'mongoose';

const trendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  quote: { type: String },
  quoteAuthor: { type: String },
  image: { type: String, required: true },
  alt: { type: String },
  wearabilityScore: { type: String },
  badge: { type: String },
  season: { type: String, default: 'AW 2025' },
  suggestedMaterials: { type: String },
  location: { type: String },
  isSpotlight: { type: Boolean, default: false }
}, { timestamps: true });

export const Trend = mongoose.models.Trend || mongoose.model('Trend', trendSchema);
