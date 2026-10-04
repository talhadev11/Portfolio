import express from 'express';
import { Project } from '../models/Project.js';
import { initialProjectsData } from '../config/seed.js';

const router = express.Router();

/**
 * @route GET /api/projects
 * @desc Get all projects
 */
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    if (!projects || projects.length === 0) {
      const seeded = await Project.insertMany(initialProjectsData);
      return res.status(200).json({ success: true, data: seeded });
    }
    return res.status(200).json({ success: true, data: projects });
  } catch (err) {
    console.error('Error fetching projects:', err);
    return res.status(200).json({ success: true, data: initialProjectsData, fallback: true });
  }
});

/**
 * @route POST /api/projects
 * @desc Create a new project
 */
router.post('/', async (req, res) => {
  try {
    const count = await Project.countDocuments();
    const id = req.body.id || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProject = new Project({ ...req.body, id, order: count });
    await newProject.save();
    return res.status(201).json({ success: true, data: newProject });
  } catch (err) {
    console.error('Error creating project:', err);
    return res.status(500).json({ success: false, message: 'Failed to create project' });
  }
});

/**
 * @route PUT /api/projects/:id
 * @desc Update a project by MongoDB _id or custom id string
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let updated;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
    } else {
      updated = await Project.findOneAndUpdate({ id }, req.body, { new: true });
    }
    if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('Error updating project:', err);
    return res.status(500).json({ success: false, message: 'Failed to update project' });
  }
});

/**
 * @route DELETE /api/projects/:id
 * @desc Delete a project by _id or custom id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let deleted;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await Project.findByIdAndDelete(id);
    } else {
      deleted = await Project.findOneAndDelete({ id });
    }
    if (!deleted) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
});

export default router;
