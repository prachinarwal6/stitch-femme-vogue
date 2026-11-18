import mongoose from 'mongoose';

const quizSubmissionSchema = new mongoose.Schema({
  answers: { type: Map, of: String },
  archetype: {
    id: String,
    title: String,
    tagline: String,
    description: String,
    compatibility: Number,
    metrics: {
      silhouettes: String,
      paletteBase: String,
      hardware: String
    },
    audioMemo: {
      stylist: String,
      duration: String,
      transcript: String
    },
    colorPalette: [{ name: String, colorHex: String, role: String }],
    capsulePieces: [{ title: String, subtitle: String, price: Number, image: String }]
  },
  userEmail: { type: String, default: 'anonymous@femmevogue.com' }
}, { timestamps: true });

export const QuizSubmission = mongoose.models.QuizSubmission || mongoose.model('QuizSubmission', quizSubmissionSchema);
