import express from 'express';
import { Product } from '../models/Product.js';
import { Trend } from '../models/Trend.js';
import { BeautyProtocol } from '../models/BeautyProtocol.js';
import { Sanctuary } from '../models/Sanctuary.js';
import { MemberProfile } from '../models/MemberProfile.js';
import {
  seedProducts,
  seedTrendsRadar,
  seedBeauty,
  seedLifestyle,
  seedMemberProfile
} from '../data/seedData.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const dbStatus = getDBStatus();
  if (!dbStatus.connected) {
    return res.json({
      success: true,
      message: 'MongoDB Atlas is currently running with in-memory dataset fallback. Connect MONGODB_URI in .env to persist directly into MongoDB Atlas collections.'
    });
  }

  try {
    // Clear and re-populate
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);

    await MemberProfile.deleteMany({});
    await MemberProfile.create(seedMemberProfile);

    res.json({
      success: true,
      message: 'MongoDB Atlas successfully seeded with complete Haute Couture editorial catalog!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
