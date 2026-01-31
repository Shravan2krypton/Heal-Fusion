const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalReportSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  title: { type: String, required: true },
  type: { type: String, enum: ['diagnosis', 'lab', 'imaging', 'prescription', 'other'], default: 'diagnosis' },
  content: String, // detailed report content
  attachments: [String], // URLs or file paths
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft', 'final', 'archived'], default: 'final' }
}, { timestamps: true });

module.exports = mongoose.model('MedicalReport', MedicalReportSchema);
