import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerName: { type: String, default: 'Éléonore de Saint-Germain' },
  customerEmail: { type: String, default: 'eleonore@maison-vogue.fr' },
  items: [{
    productId: String,
    title: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    selectedColor: String,
    selectedSize: String,
    image: String
  }],
  totalAmount: { type: Number, required: true },
  discountCode: { type: String },
  discountAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Atelier Wrapped', 'Dispatched Paris', 'White-Glove Courier', 'Delivered'],
    default: 'White-Glove Courier'
  },
  currentStepIndex: { type: Number, default: 2 }, // 0: Atelier Wrapped, 1: Dispatched Paris, 2: White-Glove Courier, 3: Delivered
  carrier: { type: String, default: 'Priority Air • White Glove' },
  estimatedDelivery: { type: String, default: 'Tomorrow, 14:00 CET' },
  shippingAddress: {
    street: { type: String, default: '28 Rue du Faubourg Saint-Honoré' },
    city: { type: String, default: 'Paris' },
    postalCode: { type: String, default: '75008' },
    country: { type: String, default: 'France' }
  }
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
