import express from 'express';
import getJobMatches from '../controllers/aiController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/recommendations', authMiddleware, getJobMatches);

export default router;