const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  consultation: { type: Schema.Types.ObjectId, ref: 'Consultation', required: true },
  medicines: [{
    medicine: { type: Schema.Types.ObjectId, ref: 'Medicine' },
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  notes: String,
  issuedDate: { type: Date, default: Date.now },
  validUntil: Date
}, { timestamps: true });

module.exports = mongoose.model('Prescription', PrescriptionSchema);
