const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvailabilitySchema = new Schema({
  day: String,
  from: String,
  to: String
}, { _id: false });

const DoctorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: [String],
  qualifications: String,
  experienceYears: Number,
  availability: [AvailabilitySchema],
  location: String,
  bio: String
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
