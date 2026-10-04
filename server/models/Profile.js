import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    experienceYears: { type: String, default: '5+' },
    roles: [{ type: String }],
    tagline: { type: String, default: '' },
    bio: [{ type: String }],
    stats: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    highlights: [{ type: String }],
    contact: {
      email: { type: String },
      phone: { type: String },
      location: { type: String },
      availability: { type: String },
      resumeUrl: { type: String },
    },
    socials: [
      {
        name: { type: String },
        url: { type: String },
        icon: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Profile = mongoose.model('Profile', profileSchema);
