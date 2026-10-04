import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, enum: ['web', 'mobile'], required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, default: '' },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    stats: { type: mongoose.Schema.Types.Mixed, default: {} },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    gradient: { type: String, default: 'from-blue-600 via-indigo-600 to-violet-700' },
    badge: { type: String, default: 'Web App' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
