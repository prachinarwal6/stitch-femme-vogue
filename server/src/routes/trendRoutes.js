import express from 'express';
import { seedTrendsRadar } from '../data/seedData.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { category } = req.query;
  const radar = { ...seedTrendsRadar };

  if (category && category !== 'All Trends') {
    radar.runwayDeepDive = radar.runwayDeepDive.filter(item => 
      item.category.toLowerCase().includes(category.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(category.toLowerCase())
    );
  }

  res.json({ success: true, data: radar });
});

export default router;
