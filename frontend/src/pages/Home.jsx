import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const features = [
    {
      icon: '🤖',
      title: 'AI Symptom Analysis',
      description: 'Describe your symptoms via text or voice, and get instant AI-powered insights backed by medical data.',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
    },
    {
      icon: '🔍',
      title: 'Disease Prediction',
      description: 'Receive severity levels, causes, preventive measures, home remedies, and when to see a doctor.',
      color: 'from-purple-500 to-pink-500',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
    },
    {
      icon: '👨‍⚕️',
      title: 'Doctor Consultations',
      description: 'Connect with verified specialists based on your symptoms and book appointments instantly.',
      color: 'from-green-500 to-teal-500',
      gradient: 'linear-gradient(135deg, #10b981, #14b8a6)'
    },
    {
      icon: '📚',
      title: 'Medical History',
      description: 'Track your health records, past consultations, and diagnosis history securely in one place.',
      color: 'from-orange-500 to-red-500',
      gradient: 'linear-gradient(135deg, #f97316, #ef4444)'
    },
    {
      icon: '🗣️',
      title: 'Voice Interaction',
      description: 'Use voice input for diagnosis in English, Hindi, or Gujarati for maximum accessibility.',
      color: 'from-indigo-500 to-purple-500',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
      icon: '📖',
      title: 'Health Articles',
      description: 'Read curated medical articles, health tips, and disease awareness information from experts.',
      color: 'from-pink-500 to-rose-500',
      gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Happy Users', icon: '👥' },
    { number: '500+', label: 'Expert Doctors', icon: '👨‍⚕️' },
    { number: '95%', label: 'Accuracy Rate', icon: '🎯' },
    { number: '24/7', label: 'Available Support', icon: '🕐' }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="home">
      {/* Hero Section */}
      <div className={`hero ${isVisible ? 'animate-in' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-main">HealFusion</span>
            <span className="hero-title-sub">AI Healthcare</span>
          </h1>
          <p className="hero-description">
            Your AI-Powered Medical Assistant for comprehensive healthcare management
          </p>
          <p className="hero-tagline">
            Advanced symptom analysis, personalized disease prediction, and seamless doctor consultations—all in one secure, intelligent platform.
          </p>
          <div className="cta-buttons">
            <button
              className="cta-primary"
              onClick={() => navigate('/symptoms')}
            >
              <span className="cta-icon">🔍</span>
              Start Diagnosis
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate('/consultations')}
            >
              <span className="cta-icon">👨‍⚕️</span>
              Find Doctors
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-illustration">
            <div className="floating-elements">
              <div className="floating-circle circle-1"></div>
              <div className="floating-circle circle-2"></div>
              <div className="floating-circle circle-3"></div>
            </div>
            <div className="hero-icon">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="50" fill="url(#heroGradient)" opacity="0.1"/>
                <circle cx="60" cy="60" r="35" fill="url(#heroGradient)" opacity="0.2"/>
                <path d="M45 35L75 35L67 50L85 50L60 80L35 50L53 50L45 35Z" fill="url(#heroGradient)"/>
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb"/>
                    <stop offset="100%" stopColor="#7c3aed"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-description">
            Everything you need for comprehensive healthcare management
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${index === currentFeature ? 'active' : ''}`}
              style={{'--feature-gradient': feature.gradient}}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-glow"></div>
            </div>
          ))}
        </div>

        <div className="feature-indicators">
          {features.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentFeature ? 'active' : ''}`}
              onClick={() => setCurrentFeature(index)}
            />
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose HealFusion?</h2>
          <p className="section-description">
            Trusted by healthcare professionals and patients worldwide
          </p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your health data is encrypted and protected with industry-standard security measures.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h3>Instant Results</h3>
            <p>Get diagnosis results in seconds, not hours or days. Fast, reliable, and accurate.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>AI-Powered Accuracy</h3>
            <p>Advanced AI trained on extensive medical databases and expert knowledge.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Multilingual Support</h3>
            <p>Access healthcare insights in multiple languages for better accessibility.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access your health data anywhere, anytime with our responsive mobile app.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💼</div>
            <h3>Professional Network</h3>
            <p>Connect with verified doctors and healthcare professionals in your area.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Take Control of Your Health?</h2>
          <p>
            Join thousands of users who trust HealFusion for their healthcare needs. Start your journey to better health today.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-link">
              <button className="cta-primary">Get Started Free</button>
            </Link>
            <Link to="/login" className="cta-link">
              <button className="cta-secondary">Sign In</button>
            </Link>
          </div>
        </div>
        <div className="cta-visual">
          <div className="cta-illustration">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="url(#ctaGradient)" opacity="0.1"/>
              <path d="M70 60L130 60L118 90L150 90L100 140L50 90L82 90L70 60Z" fill="url(#ctaGradient)"/>
              <defs>
                <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb"/>
                  <stop offset="100%" stopColor="#7c3aed"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="disclaimer">
        <div className="disclaimer-icon">⚠️</div>
        <div className="disclaimer-content">
          <strong>Medical Disclaimer:</strong> HealFusion is an AI-assisted tool designed to provide general health insights and does NOT replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for accurate medical decisions. In case of medical emergencies, contact emergency services immediately.
        </div>
      </div>
    </div>
  )
}
