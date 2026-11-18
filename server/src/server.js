import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, getDBStatus } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import trendRoutes from './routes/trendRoutes.js';
import beautyRoutes from './routes/beautyRoutes.js';
import lifestyleRoutes from './routes/lifestyleRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import seedRoutes from './routes/seedRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server .env or root .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas (with graceful fallback)
connectDB();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/trends', trendRoutes);
app.use('/api/beauty', beautyRoutes);
app.use('/api/lifestyle', lifestyleRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/seed', seedRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Femme Vogue Editorial & Boutique API',
    edition: 'Printemps / Été 2025 Haute Couture',
    database: getDBStatus(),
    timestamp: new Date().toISOString()
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Femme Vogue Haute Couture API Server is running.',
    endpoints: [
      '/api/health',
      '/api/products',
      '/api/trends',
      '/api/beauty',
      '/api/lifestyle',
      '/api/quiz/questions',
      '/api/member/profile',
      '/api/orders'
    ]
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Maison Atelier encountered an unexpected internal error',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✨ Femme Vogue API running gracefully on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});
