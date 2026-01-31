const mongoose = require('mongoose');
const Disease = require('../models/Disease');
require('dotenv').config();

async function seed() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healfusion';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const diseases = [
      {
        name: 'Common Cold',
        symptoms: ['runny nose', 'sore throat', 'cough', 'sneezing', 'congestion', 'mild fever'],
        causes: 'Viral infection, usually rhinovirus or coronavirus',
        prevention: ['Wash hands frequently', 'Avoid close contact with sick people', 'Cover mouth when coughing', 'Maintain healthy immune system'],
        homeRemedies: ['Rest and sleep', 'Drink plenty of fluids', 'Use humidifier', 'Salt water gargle', 'Honey and lemon tea', 'Steam inhalation'],
        treatments: {
          modern: ['Decongestants', 'Pain relievers like acetaminophen', 'Antihistamines', 'Cough syrups'],
          ayurvedic: ['Tulsi tea', 'Ginger tea', 'Turmeric milk', 'Honey with black pepper']
        },
        severity: 'low'
      },
      {
        name: 'Influenza (Flu)',
        symptoms: ['high fever', 'chills', 'body aches', 'fatigue', 'cough', 'headache', 'sore throat'],
        causes: 'Influenza viruses (types A, B, C)',
        prevention: ['Annual flu vaccination', 'Hand hygiene', 'Avoid crowds during flu season', 'Cover mouth when coughing'],
        homeRemedies: ['Rest in bed', 'Stay hydrated', 'Warm soups and broths', 'Use humidifier', 'Warm compress for aches'],
        treatments: {
          modern: ['Antiviral medications (oseltamivir)', 'Pain relievers', 'Fever reducers', 'Rest and fluids'],
          ayurvedic: ['Giloy juice', 'Tulsi and ginger tea', 'Ashwagandha', 'Turmeric with milk']
        },
        severity: 'moderate'
      },
      {
        name: 'Migraine',
        symptoms: ['severe headache', 'nausea', 'vomiting', 'sensitivity to light', 'sensitivity to sound', 'aura'],
        causes: 'Genetic factors, hormonal changes, stress, certain foods, environmental factors',
        prevention: ['Identify and avoid triggers', 'Regular sleep schedule', 'Stress management', 'Regular exercise', 'Healthy diet'],
        homeRemedies: ['Lie down in dark quiet room', 'Cold compress on forehead', 'Ginger tea', 'Peppermint oil on temples', 'Magnesium-rich foods'],
        treatments: {
          modern: ['Triptans', 'NSAIDs', 'Anti-nausea medications', 'Beta-blockers for prevention'],
          ayurvedic: ['Brahmi', 'Shankhpushpi', 'Jatamansi', 'Yoga and meditation']
        },
        severity: 'moderate'
      },
      {
        name: 'Diabetes Type 2',
        symptoms: ['frequent urination', 'increased thirst', 'fatigue', 'blurred vision', 'slow healing wounds', 'tingling in hands/feet'],
        causes: 'Insulin resistance, genetics, obesity, sedentary lifestyle, poor diet',
        prevention: ['Maintain healthy weight', 'Regular exercise', 'Balanced diet', 'Regular health checkups'],
        homeRemedies: ['Fenugreek seeds', 'Bitter melon', 'Cinnamon', 'Indian gooseberry (Amla)', 'Turmeric'],
        treatments: {
          modern: ['Metformin', 'Insulin therapy', 'Blood sugar monitoring', 'Lifestyle modifications'],
          ayurvedic: ['Methi seeds', 'Jamun seeds', 'Gurmar', 'Triphala', 'Yoga and pranayama']
        },
        severity: 'moderate'
      },
      {
        name: 'Hypertension (High Blood Pressure)',
        symptoms: ['usually asymptomatic', 'headaches', 'dizziness', 'chest pain', 'shortness of breath'],
        causes: 'Genetics, obesity, high salt intake, stress, lack of exercise, smoking',
        prevention: ['Reduce salt intake', 'Regular exercise', 'Maintain healthy weight', 'Limit alcohol', 'Quit smoking'],
        homeRemedies: ['Garlic', 'Beetroot juice', 'Hibiscus tea', 'Banana', 'Dark chocolate (in moderation)'],
        treatments: {
          modern: ['ACE inhibitors', 'Beta-blockers', 'Diuretics', 'Calcium channel blockers', 'Lifestyle changes'],
          ayurvedic: ['Arjuna', 'Sarpagandha', 'Brahmi', 'Ashwagandha', 'Meditation and yoga']
        },
        severity: 'moderate'
      },
      {
        name: 'Asthma',
        symptoms: ['wheezing', 'shortness of breath', 'chest tightness', 'coughing', 'difficulty breathing'],
        causes: 'Genetic factors, environmental allergens, air pollution, respiratory infections',
        prevention: ['Avoid triggers', 'Use air purifiers', 'Regular cleaning', 'Allergy management'],
        homeRemedies: ['Steam inhalation', 'Honey and lemon', 'Ginger tea', 'Turmeric milk', 'Eucalyptus oil'],
        treatments: {
          modern: ['Inhaled corticosteroids', 'Bronchodilators', 'Leukotriene inhibitors', 'Immunotherapy'],
          ayurvedic: ['Vasaka', 'Pushkarmool', 'Kantakari', 'Pranayama', 'Yoga asanas']
        },
        severity: 'moderate'
      },
      {
        name: 'Gastritis',
        symptoms: ['abdominal pain', 'nausea', 'vomiting', 'loss of appetite', 'bloating', 'indigestion'],
        causes: 'H. pylori infection, NSAIDs, alcohol, stress, spicy foods, smoking',
        prevention: ['Eat smaller meals', 'Avoid trigger foods', 'Manage stress', 'Quit smoking', 'Limit alcohol'],
        homeRemedies: ['Ginger tea', 'Banana', 'Rice water', 'Coconut water', 'Fennel seeds', 'Cumin water'],
        treatments: {
          modern: ['Antacids', 'H2 blockers', 'Proton pump inhibitors', 'Antibiotics for H. pylori'],
          ayurvedic: ['Licorice root', 'Aloe vera juice', 'Triphala', 'Ginger', 'Turmeric']
        },
        severity: 'low'
      },
      {
        name: 'Anemia',
        symptoms: ['fatigue', 'weakness', 'pale skin', 'shortness of breath', 'dizziness', 'cold hands/feet'],
        causes: 'Iron deficiency, vitamin B12 deficiency, blood loss, chronic diseases',
        prevention: ['Iron-rich diet', 'Vitamin C intake', 'Regular health checkups', 'Treat underlying causes'],
        homeRemedies: ['Spinach', 'Beetroot', 'Pomegranate', 'Dates', 'Apple cider vinegar', 'Sesame seeds'],
        treatments: {
          modern: ['Iron supplements', 'Vitamin B12 injections', 'Folic acid', 'Blood transfusions if severe'],
          ayurvedic: ['Spinach juice', 'Beetroot juice', 'Dates with milk', 'Pomegranate', 'Triphala']
        },
        severity: 'moderate'
      },
      {
        name: 'Arthritis',
        symptoms: ['joint pain', 'stiffness', 'swelling', 'reduced range of motion', 'warmth around joints'],
        causes: 'Osteoarthritis, Rheumatoid arthritis, Age, genetics, injury, autoimmune disorders',
        prevention: ['Maintain healthy weight', 'Regular exercise', 'Protect joints', 'Balanced diet'],
        homeRemedies: ['Turmeric', 'Ginger', 'Epsom salt baths', 'Cold/hot compresses', 'Castor oil massage'],
        treatments: {
          modern: ['NSAIDs', 'Disease-modifying antirheumatic drugs', 'Corticosteroids', 'Physical therapy'],
          ayurvedic: ['Shallaki (Boswellia)', 'Guggulu', 'Ashwagandha', 'Turmeric', 'Yoga and meditation']
        },
        severity: 'moderate'
      },
      {
        name: 'Dengue Fever',
        symptoms: ['high fever', 'severe headache', 'pain behind eyes', 'joint pain', 'rash', 'bleeding'],
        causes: 'Dengue virus transmitted by Aedes mosquitoes',
        prevention: ['Use mosquito repellents', 'Wear protective clothing', 'Eliminate breeding sites', 'Use mosquito nets'],
        homeRemedies: ['Papaya leaf juice', 'Giloy juice', 'Tulsi tea', 'Coconut water', 'Orange juice'],
        treatments: {
          modern: ['Supportive care', 'Pain relievers', 'Fluid replacement', 'Hospitalization for severe cases'],
          ayurvedic: ['Giloy', 'Papaya leaves', 'Tulsi', 'Neem', 'Turmeric']
        },
        severity: 'severe'
      },
      {
        name: 'COVID-19',
        symptoms: ['fever', 'cough', 'fatigue', 'loss of taste/smell', 'sore throat', 'difficulty breathing'],
        causes: 'SARS-CoV-2 virus',
        prevention: ['Vaccination', 'Mask wearing', 'Social distancing', 'Hand hygiene', 'Avoid crowds'],
        homeRemedies: ['Rest and isolation', 'Stay hydrated', 'Steam inhalation', 'Honey and ginger', 'Turmeric milk'],
        treatments: {
          modern: ['Antiviral medications', 'Monoclonal antibodies', 'Supportive care', 'Oxygen therapy'],
          ayurvedic: ['Giloy', 'Ashwagandha', 'Tulsi', 'Turmeric', 'Yoga and pranayama']
        },
        severity: 'severe'
      },
      {
        name: 'Thyroid Disorders',
        symptoms: ['Hypothyroidism: fatigue, weight gain, cold intolerance, dry skin', 'Hyperthyroidism: weight loss, rapid heartbeat, anxiety, heat intolerance'],
        causes: 'Autoimmune disorders, iodine deficiency, genetics, certain medications',
        prevention: ['Iodine-rich diet', 'Regular thyroid checkups', 'Stress management'],
        homeRemedies: ['Iodine-rich foods', 'Selenium-rich foods', 'Zinc supplements', 'Vitamin D', 'Coconut oil'],
        treatments: {
          modern: ['Thyroxine replacement', 'Anti-thyroid medications', 'Radioactive iodine', 'Surgery'],
          ayurvedic: ['Kanchanar', 'Guggulu', 'Punarnava', 'Varuna', 'Yoga and meditation']
        },
        severity: 'moderate'
      },
      {
        name: 'Depression',
        symptoms: ['persistent sadness', 'loss of interest', 'fatigue', 'sleep disturbances', 'appetite changes', 'difficulty concentrating'],
        causes: 'Genetic factors, brain chemistry, stress, trauma, medical conditions',
        prevention: ['Regular exercise', 'Healthy diet', 'Adequate sleep', 'Stress management', 'Social support'],
        homeRemedies: ['Regular exercise', 'Meditation', 'Healthy diet', 'Adequate sleep', 'Journaling'],
        treatments: {
          modern: ['Antidepressants', 'Therapy (CBT)', 'Lifestyle changes', 'Support groups'],
          ayurvedic: ['Ashwagandha', 'Brahmi', 'Jatamansi', 'Shankhpushpi', 'Yoga and meditation']
        },
        severity: 'moderate'
      },
      {
        name: 'Acne',
        symptoms: ['pimples', 'blackheads', 'whiteheads', 'cysts', 'oily skin', 'scarring'],
        causes: 'Hormonal changes, excess oil production, bacteria, clogged pores',
        prevention: ['Clean skin regularly', 'Avoid touching face', 'Healthy diet', 'Manage stress'],
        homeRemedies: ['Tea tree oil', 'Aloe vera', 'Honey mask', 'Lemon juice', 'Turmeric paste'],
        treatments: {
          modern: ['Topical retinoids', 'Antibiotics', 'Benzoyl peroxide', 'Hormonal treatments'],
          ayurvedic: ['Neem', 'Turmeric', 'Sandalwood', 'Aloe vera', 'Triphala']
        },
        severity: 'low'
      },
      {
        name: 'Allergies',
        symptoms: ['sneezing', 'runny nose', 'itchy eyes', 'skin rash', 'congestion', 'cough'],
        causes: 'Pollen, dust mites, pet dander, certain foods, environmental factors',
        prevention: ['Identify triggers', 'Keep home clean', 'Use air purifiers', 'Avoid allergens'],
        homeRemedies: ['Local honey', 'Nasal saline rinse', 'Steam inhalation', 'Ginger tea', 'Turmeric'],
        treatments: {
          modern: ['Antihistamines', 'Nasal corticosteroids', 'Decongestants', 'Immunotherapy'],
          ayurvedic: ['Tulsi', 'Ginger', 'Turmeric', 'Neem', 'Triphala']
        },
        severity: 'low'
      },
      {
        name: 'Insomnia',
        symptoms: ['difficulty falling asleep', 'frequent waking', 'early morning awakening', 'daytime fatigue'],
        causes: 'Stress, anxiety, depression, caffeine, screen time, irregular schedule',
        prevention: ['Consistent sleep schedule', 'Relaxation techniques', 'Limit caffeine', 'Create sleep-friendly environment'],
        homeRemedies: ['Chamomile tea', 'Warm milk', 'Valerian root', 'Lavender oil', 'Magnesium-rich foods'],
        treatments: {
          modern: ['Sleep medications', 'Cognitive behavioral therapy', 'Relaxation techniques'],
          ayurvedic: ['Ashwagandha', 'Brahmi', 'Jatamansi', 'Shankhpushpi', 'Meditation']
        },
        severity: 'low'
      }
    ];

    await Disease.deleteMany({});
    await Disease.insertMany(diseases);
    console.log(`✅ Seeded ${diseases.length} diseases successfully`);

  } catch (error) {
    console.error('❌ Error seeding diseases:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
