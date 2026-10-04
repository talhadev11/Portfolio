import express from 'express';
import { SkillCategory } from '../models/Skill.js';
import { initialSkillsData } from '../config/seed.js';

const router = express.Router();

/**
 * @route GET /api/skills
 * @desc Get all skill categories with skills
 */
router.get('/', async (req, res) => {
  try {
    const categories = await SkillCategory.find().sort({ order: 1 });
    if (!categories || categories.length === 0) {
      const seeded = await SkillCategory.insertMany(initialSkillsData);
      return res.status(200).json({ success: true, data: seeded });
    }
    return res.status(200).json({ success: true, data: categories });
  } catch (err) {
    console.error('Error fetching skills:', err);
    return res.status(200).json({ success: true, data: initialSkillsData, fallback: true });
  }
});

/**
 * @route POST /api/skills
 * @desc Create a new skill category
 */
router.post('/', async (req, res) => {
  try {
    const count = await SkillCategory.countDocuments();
    const newCategory = new SkillCategory({ ...req.body, order: count });
    await newCategory.save();
    return res.status(201).json({ success: true, data: newCategory });
  } catch (err) {
    console.error('Error creating skill category:', err);
    return res.status(500).json({ success: false, message: 'Failed to create skill category' });
  }
});

/**
 * @route PUT /api/skills/:id
 * @desc Update a skill category
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Category not found' });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('Error updating skill category:', err);
    return res.status(500).json({ success: false, message: 'Failed to update skill category' });
  }
});

/**
 * @route DELETE /api/skills/:id
 * @desc Delete a skill category
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await SkillCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Category not found' });
    return res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Error deleting skill category:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete skill category' });
  }
});

export default router;
