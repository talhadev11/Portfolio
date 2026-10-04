import mongoose from 'mongoose';

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, default: 'Proficient' },
  icon: { type: String, default: 'Code2' },
});

const skillCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Layout' },
    accent: { type: String, default: 'from-blue-500 to-cyan-500' },
    glow: { type: String, default: 'rgba(59, 130, 246, 0.25)' },
    skills: [skillItemSchema],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
