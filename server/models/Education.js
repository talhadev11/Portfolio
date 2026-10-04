import mongoose from 'mongoose';

const degreeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, default: '' },
  coursework: [{ type: String }],
  icon: { type: String, default: 'GraduationCap' },
});

const certificationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: String, required: true },
  credentialId: { type: String, default: '' },
  description: { type: String, default: '' },
  badge: { type: String, default: 'Verified' },
});

const educationSchema = new mongoose.Schema(
  {
    degrees: [degreeSchema],
    certifications: [certificationSchema],
  },
  { timestamps: true }
);

export const Education = mongoose.model('Education', educationSchema);
