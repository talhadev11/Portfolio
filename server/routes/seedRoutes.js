import express from 'express';
import { seedDatabase } from '../config/seed.js';

const router = express.Router();

/**
 * @route POST /api/seed
 * @desc Force seed MongoDB database with initial portfolio data
 */
router.post('/', async (req, res) => {
  try {
    await seedDatabase(true);
    return res.status(200).json({ success: true, message: 'Database seeded successfully!' });
  } catch (err) {
    console.error('Error seeding database via API:', err);
    return res.status(500).json({ success: false, message: 'Failed to seed database' });
  }
});

export default router;
