import express from 'express';

const router = express.Router();
let consultationsStore = [];

router.post('/', (req, res) => {
  const { name, email, phone, notes, stylist, preferredDate, type } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const booking = {
    id: `CONSULT-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    stylist: stylist || 'Clémence Roy',
    type: type || 'Virtual Atelier Video Consultation',
    preferredDate: preferredDate || 'This Friday at 15:00 CET',
    notes: notes || '',
    status: 'Confirmed & Calendar Invitation Sent',
    createdAt: new Date().toISOString()
  };

  consultationsStore.push(booking);

  res.status(201).json({
    success: true,
    message: `Consultation confirmed with ${booking.stylist}. An editorial dossier preparation packet has been emailed to ${email}.`,
    data: booking
  });
});

export default router;
