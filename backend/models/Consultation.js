const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User' },
  scheduledAt: Date,
  status: { type: String, enum: ['pending','confirmed','completed','cancelled'], default: 'pending' },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Consultation', ConsultationSchema);
