import express from 'express';
import { seedQuizQuestions, seedArchetypeDossier } from '../data/seedData.js';

const router = express.Router();

router.get('/questions', (req, res) => {
  res.json({ success: true, data: seedQuizQuestions });
});

router.post('/submit', (req, res) => {
  const { answers, email } = req.body;
  
  // Calculate predominant archetype from answers
  let counts = { minimalist: 0, romantic: 0, 'avant-garde': 0, coastal: 0 };
  if (answers && typeof answers === 'object') {
    Object.values(answers).forEach(val => {
      if (counts[val] !== undefined) counts[val]++;
    });
  }

  let selectedArchetype = 'minimalist';
  let maxCount = -1;
  Object.keys(counts).forEach(key => {
    if (counts[key] > maxCount) {
      maxCount = counts[key];
      selectedArchetype = key;
    }
  });

  // Tailor dossier response
  const dossier = { ...seedArchetypeDossier };
  dossier.compatibility = Math.min(99, 88 + Math.floor(Math.random() * 10));

  res.json({
    success: true,
    data: {
      submissionId: `DOSSIER-${Math.floor(1000 + Math.random() * 9000)}`,
      archetype: selectedArchetype,
      dossier
    }
  });
});

router.get('/dossier/:archetypeId?', (req, res) => {
  res.json({ success: true, data: seedArchetypeDossier });
});

export default router;
