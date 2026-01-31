const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiseaseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  symptoms: [String],
  causes: String,
  prevention: [String],
  homeRemedies: [String],
  treatments: {
    modern: [String],
    ayurvedic: [String]
  },
  severity: { type: String, enum: ['low','moderate','severe'], default: 'moderate' }
}, { timestamps: true });

module.exports = mongoose.model('Disease', DiseaseSchema);
