import { Router } from 'express';

const router = Router();

// Basic health check for auth routes
router.get('/health', (req, res) => {
  res.json({ status: 'Auth routes operational' });
});

export default router; 