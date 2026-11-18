import express from 'express';
import { seedMemberProfile } from '../data/seedData.js';

const router = express.Router();
let currentProfile = JSON.parse(JSON.stringify(seedMemberProfile));

router.get('/profile', (req, res) => {
  res.json({ success: true, data: currentProfile });
});

router.post('/wishlist/toggle', (req, res) => {
  const { id, title, category, price, image, brand } = req.body;
  const existingIndex = currentProfile.curatedWishlist.findIndex(item => item.id === id || item.title === title);

  if (existingIndex > -1) {
    currentProfile.curatedWishlist.splice(existingIndex, 1);
    currentProfile.stats.savedLooks = Math.max(0, currentProfile.stats.savedLooks - 1);
    return res.json({
      success: true,
      action: 'removed',
      message: `Removed ${title} from saved looks`,
      wishlist: currentProfile.curatedWishlist
    });
  } else {
    const newItem = {
      id: id || `item-${Date.now()}`,
      title,
      category: category || 'boutique',
      brand: brand || 'Maison Édition',
      price: price || 195,
      stock: 'In Stock',
      hasAlert: false,
      image: image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsAWFSSzoOcAhziE1dPvku2Y6NtrPe35Cvfe7how-i5HzxZODD2fqtIjbBvtbS_Ttmj9rUcHkcu-aHIXuP1q_d2bdWXL-Lggqc5uc9bN01lae8oIJ16KzTJSUrixXVamiM1apDzN9e_k8M7GHOOMWr-Wt5BhNomxGZtxVdEVo-xPP_kVIiCbR2m15_8qf-_qzOSSGsZtDBl4-9_du6LOgCZRwUkYpaDR85_9bj--Tu8hTocH_hT-7PAw'
    };
    currentProfile.curatedWishlist.unshift(newItem);
    currentProfile.stats.savedLooks += 1;
    return res.json({
      success: true,
      action: 'added',
      message: `Added ${title} to saved looks`,
      wishlist: currentProfile.curatedWishlist
    });
  }
});

router.post('/wishlist/alert', (req, res) => {
  const { id } = req.body;
  const item = currentProfile.curatedWishlist.find(i => i.id === id);
  if (item) {
    item.hasAlert = !item.hasAlert;
    return res.json({
      success: true,
      hasAlert: item.hasAlert,
      message: item.hasAlert ? 'Price alert activated' : 'Price alert deactivated'
    });
  }
  res.status(404).json({ success: false, message: 'Item not found in wishlist' });
});

router.put('/settings', (req, res) => {
  const { sizes, primaryAddress, dispatchPrefs } = req.body;
  if (sizes) currentProfile.profileSettings.sizes = sizes;
  if (primaryAddress) currentProfile.profileSettings.primaryAddress = primaryAddress;
  if (dispatchPrefs) currentProfile.profileSettings.dispatchPrefs = dispatchPrefs;

  res.json({ success: true, message: 'Profile settings updated', data: currentProfile.profileSettings });
});

export default router;
