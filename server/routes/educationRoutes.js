import express from 'express';
import { Education } from '../models/Education.js';
import { initialEducationData } from '../config/seed.js';

const router = express.Router();

/**
 * @route GET /api/education
 * @desc Get education degrees and certifications
 */
router.get('/', async (req, res) => {
  try {
    let edu = await Education.findOne();
    if (!edu) {
      edu = await Education.create(initialEducationData);
    }
    return res.status(200).json({ success: true, data: edu });
  } catch (err) {
    console.error('Error fetching education:', err);
    return res.status(200).json({ success: true, data: initialEducationData, fallback: true });
  }
});

/**
 * @route PUT /api/education
 * @desc Update education degrees and certifications
 */
router.put('/', async (req, res) => {
  try {
    let edu = await Education.findOne();
    if (!edu) {
      edu = new Education(req.body);
    } else {
      Object.assign(edu, req.body);
    }
    await edu.save();
    return res.status(200).json({ success: true, data: edu });
  } catch (err) {
    console.error('Error updating education:', err);
    return res.status(500).json({ success: false, message: 'Failed to update education data' });
  }
});

export default router;
