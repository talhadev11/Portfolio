import express from 'express';
import { Experience } from '../models/Experience.js';
import { initialExperienceData } from '../config/seed.js';

const router = express.Router();

/**
 * @route GET /api/experience
 * @desc Get all experience roles
 */
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    if (!experiences || experiences.length === 0) {
      const seeded = await Experience.insertMany(initialExperienceData);
      return res.status(200).json({ success: true, data: seeded });
    }
    return res.status(200).json({ success: true, data: experiences });
  } catch (err) {
    console.error('Error fetching experience:', err);
    return res.status(200).json({ success: true, data: initialExperienceData, fallback: true });
  }
});

/**
 * @route POST /api/experience
 * @desc Create a new experience role
 */
router.post('/', async (req, res) => {
  try {
    const count = await Experience.countDocuments();
    const id = req.body.id || req.body.company.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newExp = new Experience({ ...req.body, id, order: count });
    await newExp.save();
    return res.status(201).json({ success: true, data: newExp });
  } catch (err) {
    console.error('Error creating experience:', err);
    return res.status(500).json({ success: false, message: 'Failed to create experience' });
  }
});

/**
 * @route PUT /api/experience/:id
 * @desc Update experience by _id or custom id
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let updated;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      updated = await Experience.findByIdAndUpdate(id, req.body, { new: true });
    } else {
      updated = await Experience.findOneAndUpdate({ id }, req.body, { new: true });
    }
    if (!updated) return res.status(404).json({ success: false, message: 'Experience item not found' });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('Error updating experience:', err);
    return res.status(500).json({ success: false, message: 'Failed to update experience' });
  }
});

/**
 * @route DELETE /api/experience/:id
 * @desc Delete experience by _id or custom id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let deleted;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await Experience.findByIdAndDelete(id);
    } else {
      deleted = await Experience.findOneAndDelete({ id });
    }
    if (!deleted) return res.status(404).json({ success: false, message: 'Experience item not found' });
    return res.status(200).json({ success: true, message: 'Experience deleted successfully' });
  } catch (err) {
    console.error('Error deleting experience:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete experience' });
  }
});

export default router;
