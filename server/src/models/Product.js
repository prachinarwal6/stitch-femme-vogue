import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  category: { type: String, default: 'Atelier' },
  image: { type: String, required: true },
  alt: { type: String, default: '' },
  colorVariants: [{ name: String, colorHex: String }],
  sizes: [{ type: String }],
  badge: { type: String, default: '' },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 10 },
  provenance: { type: String, default: 'Paris Atelier Made' },
  description: { type: String, default: '' }
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
