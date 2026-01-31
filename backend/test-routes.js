const routes = [
  'auth', 'user', 'symptoms', 'recommendations', 'medicalHistory', 'consultations',
  'doctors', 'doctor', 'contact', 'admin', 'medicines', 'prescriptions', 'medicalReports'
];

routes.forEach(route => {
  try {
    require(`./routes/${route}`);
    console.log(`✅ ${route} routes OK`);
  } catch (e) {
    console.error(`❌ ${route} routes failed:`, e.message);
  }
});

console.log('Route testing completed');