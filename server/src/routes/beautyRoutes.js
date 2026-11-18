import express from 'express';
import { seedBeauty } from '../data/seedData.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { category } = req.query;
  res.json({ success: true, data: seedBeauty });
});

router.post('/sample', (req, res) => {
  const { fragranceName, email, address } = req.body;
  res.json({
    success: true,
    message: `Discovery sample for ${fragranceName || 'Haute Fragrance'} ordered successfully! Dispatched from Grasse Atelier.`,
    orderNumber: `SAMP-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

export default router;
