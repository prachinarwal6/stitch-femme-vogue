import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  preferredStylist: { type: String, default: 'Clémence Roy' },
  consultationType: { type: String, default: 'Virtual Video Atelier' },
  notes: { type: String, default: '' },
  preferredDate: { type: String },
  status: { type: String, default: 'Confirmed' }
}, { timestamps: true });

export const Consultation = mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema);
