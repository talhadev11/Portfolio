import express from 'express';
import { Profile } from '../models/Profile.js';
import { initialProfileData } from '../config/seed.js';

const router = express.Router();

/**
 * @route GET /api/profile
 * @desc Get profile data
 */
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(initialProfileData);
    }
    return res.status(200).json({ success: true, data: profile });
  } catch (err) {
    console.error('Error fetching profile:', err);
    return res.status(200).json({ success: true, data: initialProfileData, fallback: true });
  }
});

/**
 * @route PUT /api/profile
 * @desc Update profile data
 */
router.put('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    return res.status(200).json({ success: true, data: profile });
  } catch (err) {
    console.error('Error updating profile:', err);
    return res.status(500).json({ success: false, message: 'Failed to update profile data' });
  }
});

export default router;
