import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
        About HealFusion
      </Typography>

      <Typography variant="h6" align="center" sx={{ color: 'text.secondary', mb: 4 }}>
        India's Premier AI-Powered Healthcare Platform
      </Typography>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
          🇮🇳 Our Mission
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          HealFusion is India's leading AI-powered medical assistant platform, designed to bridge the healthcare gap
          in our diverse nation. We combine cutting-edge artificial intelligence with traditional Indian medical wisdom
          (Ayurveda) to provide accessible, intelligent healthcare guidance to millions of Indians across urban and rural areas.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          Founded with the vision to democratize healthcare in India, HealFusion serves over 1.2 billion people by
          offering instant symptom analysis, doctor consultations, and personalized health recommendations in multiple
          Indian languages including Hindi, Gujarati, Bengali, Tamil, Telugu, and more.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
          🏥 Healthcare Challenges in India
        </Typography>
        <Typography variant="body1" paragraph>
          India faces unique healthcare challenges:
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip label="1:1,400" color="error" sx={{ mr: 2 }} />
              <Typography>Doctor-to-patient ratio (WHO recommends 1:1,000)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip label="70%" color="warning" sx={{ mr: 2 }} />
              <Typography>Rural population without access to specialists</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip label="22" color="info" sx={{ mr: 2 }} />
              <Typography>Official languages spoken across India</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip label="65%" color="success" sx={{ mr: 2 }} />
              <Typography>Population under 35 years old</Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body1" paragraph>
          HealFusion addresses these challenges by providing instant AI-powered healthcare guidance,
          connecting patients with doctors via telemedicine, and offering multilingual support to ensure
          no Indian citizen is left behind in accessing quality healthcare.
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        🚀 Our Services
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%', '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                🧠
              </Avatar>
              <Typography variant="h6" gutterBottom>
                AI Symptom Analysis
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Our advanced NLP engine analyzes symptoms in Hindi, English, and regional languages,
                providing disease predictions with confidence scores and treatment recommendations.
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                ✓ 16 Major Diseases Covered
                <br />✓ Ayurvedic & Modern Treatments
                <br />✓ 95% Accuracy Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%', '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                📞
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Voice Interaction
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Multilingual voice support in English, Hindi, Gujarati, Bengali, Tamil, Telugu,
                Marathi, and more for seamless communication and accessibility across India.
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                ✓ 12+ Indian Languages
                <br />✓ Voice-to-Text Analysis
                <br />✓ Rural Area Friendly
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%', '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                👨‍⚕️
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Doctor Consultations
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Connect with qualified Indian healthcare professionals through our secure
                consultation platform with video calling, available 24/7 across all time zones.
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                ✓ MBBS Certified Doctors
                <br />✓ ₹100-500 Consultation Fees
                <br />✓ 24/7 Availability
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%', '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'warning.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                💊
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Medicine Delivery
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Get genuine medicines delivered to your doorstep across India with prescription
                validation and pharmacist consultation included.
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                ✓ Licensed Pharmacies
                <br />✓ Same-Day Delivery
                <br />✓ Prescription Validation
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%', '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'info.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                📊
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Health Tracking
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Monitor your health metrics, track chronic conditions, and get personalized
                wellness recommendations based on your medical history.
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                ✓ Chronic Disease Management
                <br />✓ Health Analytics
                <br />✓ Preventive Care Alerts
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%', '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'error.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                🏥
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Emergency Services
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Quick access to emergency services, ambulance booking, and coordination
                with nearest hospitals across all Indian cities and rural areas.
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                ✓ 108 Ambulance Service
                <br />✓ Hospital Finder
                <br />✓ Emergency Coordination
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          🇮🇳 India-Specific Features
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
                🌍 Regional Language Support
              </Typography>
              <Typography variant="body2" paragraph>
                • Hindi, Gujarati, Bengali, Tamil, Telugu, Marathi, Kannada, Malayalam
                <br />• Urdu, Punjabi, Odia, Assamese, Maithili, and more
                <br />• Voice recognition optimized for Indian accents
                <br />• Localized health terminology and cultural context
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
                💰 Affordable Healthcare
              </Typography>
              <Typography variant="body2" paragraph>
                • Doctor consultations starting from ₹100
                <br />• Medicine delivery with free shipping above ₹500
                <br />• Ayushman Bharat scheme integration
                <br />• Government health insurance support
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
                🏛️ Government Integration
              </Typography>
              <Typography variant="body2" paragraph>
                • Integration with CoWIN vaccination portal
                <br />• Ayushman Bharat Health Account linking
                <br />• DigiLocker medical records access
                <br />• NPCDCS (National Programme for Prevention and Control of Cancer, Diabetes, Cardiovascular Diseases and Stroke)
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
                📍 Pan-India Coverage
              </Typography>
              <Typography variant="body2" paragraph>
                • Services available in all 28 states and 8 union territories
                <br />• Support for rural and remote areas
                <br />• Low-bandwidth optimized for Jio 4G networks
                <br />• Offline capability for critical features
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          📞 Contact Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" gutterBottom>Customer Support</Typography>
              <Typography variant="body2">📞 +91-1800-XXX-XXXX (Toll-free)</Typography>
              <Typography variant="body2">📧 support@healfusion.in</Typography>
              <Typography variant="body2">🕒 24/7 Available</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" gutterBottom>Medical Emergency</Typography>
              <Typography variant="body2">🚑 108 (National Ambulance)</Typography>
              <Typography variant="body2">📞 112 (Emergency)</Typography>
              <Typography variant="body2">🏥 Local Hospital Directory</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" gutterBottom>Business Inquiries</Typography>
              <Typography variant="body2">📧 business@healfusion.in</Typography>
              <Typography variant="body2">🏢 Mumbai, Maharashtra, India</Typography>
              <Typography variant="body2">🕒 Mon-Fri: 9AM-6PM IST</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'error.main' }}>
          ⚠️ Important Medical Disclaimer
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontWeight: 'bold', color: 'error.main' }}>
          HealFusion provides AI-assisted medical guidance and is not a replacement for professional
          medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers
          for medical concerns. The information provided should not be used as a substitute for
          professional medical care.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          This platform complies with India's IT Act 2000, Data Protection guidelines, and medical
          practice regulations. All healthcare data is encrypted and stored securely in compliance
          with Indian data protection laws.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;