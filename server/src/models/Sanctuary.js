import mongoose from 'mongoose';

const sanctuarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  location: { type: String, required: true },
  artist: { type: String },
  quote: { type: String },
  image: { type: String, required: true },
  period: { type: String },
  material: { type: String },
  lightAxis: { type: String },
  description: { type: String },
  theme: { type: String, default: 'Sanctuaries' },
  sensoryObjects: [{
    title: String,
    maker: String,
    price: Number,
    description: String,
    image: String
  }]
}, { timestamps: true });

export const Sanctuary = mongoose.models.Sanctuary || mongoose.model('Sanctuary', sanctuarySchema);
