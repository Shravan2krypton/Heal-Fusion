const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  date: { type: Date, default: Date.now },
  symptoms: [String],
  diagnosis: String,
  treatments: [String],
  medications: [String],
  doctor: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: String
}, { _id: false });

const MedicalHistorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  entries: [EntrySchema]
}, { timestamps: true });

module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);
