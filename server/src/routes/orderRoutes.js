import express from 'express';
import { seedMemberProfile } from '../data/seedData.js';

const router = express.Router();
let ordersStore = [
  {
    orderNumber: "FV-90214",
    title: "Spring Capsule Delivery",
    carrier: "Priority Air • White-Glove",
    status: "White-Glove Courier",
    stageIndex: 2,
    stages: [
      { name: "Atelier Wrapped", completed: true },
      { name: "Dispatched Paris", completed: true },
      { name: "White-Glove Courier", current: true },
      { name: "Delivery Complete", upcoming: true }
    ],
    estimatedTime: "Tomorrow, 14:00 CET",
    totalAmount: 480,
    items: [
      { title: "Saint-Germain Gabardine Trench", price: 320, qty: 1 },
      { title: "Printed Silk Twill Carré", price: 115, qty: 1 },
      { title: "Ribbed Aureole Hoops", price: 110, qty: 1 }
    ]
  }
];

router.get('/', (req, res) => {
  res.json({ success: true, count: ordersStore.length, data: ordersStore });
});

router.post('/checkout', (req, res) => {
  const { items, totalAmount, discountCode, shippingAddress } = req.body;
  const orderNumber = `FV-${Math.floor(10000 + Math.random() * 90000)}`;

  const newOrder = {
    orderNumber,
    title: "Editorial Boutique Order",
    carrier: "Priority Air • White Glove",
    status: "Atelier Wrapped",
    stageIndex: 0,
    stages: [
      { name: "Atelier Wrapped", current: true },
      { name: "Dispatched Paris", upcoming: true },
      { name: "White-Glove Courier", upcoming: true },
      { name: "Delivery Complete", upcoming: true }
    ],
    estimatedTime: "Within 48 hours",
    totalAmount: totalAmount || 240,
    discountCode: discountCode || '',
    shippingAddress: shippingAddress || '7ème Arrondissement, Paris',
    items: items || [],
    createdAt: new Date().toISOString()
  };

  ordersStore.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: "Thank you for your acquisition. Your order is being atelier-wrapped in Paris.",
    data: newOrder
  });
});

router.get('/:orderNumber', (req, res) => {
  const order = ordersStore.find(o => o.orderNumber.toUpperCase() === req.params.orderNumber.toUpperCase());
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  res.json({ success: true, data: order });
});

export default router;
