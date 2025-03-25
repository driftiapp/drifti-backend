import { Router } from 'express';

const router = Router();

// Basic health check for session routes
router.get('/health', (req, res) => {
  res.json({ status: 'Session routes operational' });
});

export default router; 