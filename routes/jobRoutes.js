import express from 'express';
import getJobs from '../controllers/jobController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getJobs);

export default router;
