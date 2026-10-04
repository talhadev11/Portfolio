import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: 'Remote' },
    period: { type: String, required: true },
    type: { type: String, default: 'Full-time' },
    description: { type: String, default: '' },
    achievements: [{ type: String }],
    skills: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = mongoose.model('Experience', experienceSchema);
