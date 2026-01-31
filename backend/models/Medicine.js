const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  category: String, // e.g., 'painkiller', 'antibiotic'
  type: { type: String, enum: ['modern', 'ayurvedic'], default: 'modern' },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  manufacturer: String,
  dosage: String,
  sideEffects: [String],
  indications: [String], // what it's used for
  contraindications: [String]
}, { timestamps: true });

module.exports = mongoose.model('Medicine', MedicineSchema);
