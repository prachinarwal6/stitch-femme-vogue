import express from 'express';
import { Product } from '../models/Product.js';
import { seedProducts, seedBundle, seedTrendingLooks } from '../data/seedData.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// GET all products with filtering
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const dbStatus = getDBStatus();

    let products = [];
    if (dbStatus.connected) {
      const filter = {};
      if (category && category !== 'All' && category !== 'New In') {
        filter.category = category;
      }
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { subtitle: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      products = await Product.find(filter);
      if (!products || products.length === 0) {
        products = seedProducts;
      }
    } else {
      // In-memory fallback
      products = seedProducts.filter(p => {
        let matchCategory = true;
        let matchSearch = true;
        if (category && category !== 'All' && category !== 'New In') {
          matchCategory = p.category.toLowerCase().includes(category.toLowerCase());
        }
        if (search) {
          const q = search.toLowerCase();
          matchSearch = p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        }
        return matchCategory && matchSearch;
      });
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: seedProducts });
  }
});

// GET the featured bundle
router.get('/bundle', (req, res) => {
  res.json({ success: true, data: seedBundle });
});

// GET trending looks for homepage
router.get('/trending', (req, res) => {
  const { category } = req.query;
  let items = seedTrendingLooks;
  if (category && category !== 'All') {
    items = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }
  res.json({ success: true, data: items });
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();
    let product = null;

    if (dbStatus.connected) {
      product = await Product.findOne({ $or: [{ _id: id }, { id }] }).catch(() => null);
    }
    
    if (!product) {
      product = seedProducts.find(p => p.id === id || p._id === id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
