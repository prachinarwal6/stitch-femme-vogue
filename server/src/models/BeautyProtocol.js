import mongoose from 'mongoose';

const beautyProtocolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  category: { type: String, required: true },
  author: {
    name: String,
    title: String,
    initials: String
  },
  timeMinutes: { type: Number, default: 10 },
  stepsCount: { type: Number, default: 4 },
  description: { type: String },
  image: { type: String, required: true },
  steps: [{
    number: String,
    title: String,
    tag: String,
    description: String
  }],
  kitPrice: { type: Number, default: 145 },
  products: [{
    name: String,
    detail: String,
    price: Number
  }]
}, { timestamps: true });

export const BeautyProtocol = mongoose.models.BeautyProtocol || mongoose.model('BeautyProtocol', beautyProtocolSchema);
