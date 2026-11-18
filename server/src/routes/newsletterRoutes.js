import express from 'express';

const router = express.Router();
let newsletterEmails = new Set();

router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid fashion email address.' });
  }

  newsletterEmails.add(email.toLowerCase());

  res.json({
    success: true,
    message: 'Welcome to the Maison Trend Council. Your private editorial dispatch invitation is on its way.',
    count: newsletterEmails.size
  });
});

export default router;
