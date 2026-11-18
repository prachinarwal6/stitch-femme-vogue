import express from 'express';
import { seedLifestyle } from '../data/seedData.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: seedLifestyle });
});

export default router;
