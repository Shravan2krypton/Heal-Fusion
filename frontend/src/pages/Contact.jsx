import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
    phone: '',
    priority: 'normal'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('form')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to send message')

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general',
        phone: '',
        priority: 'normal'
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err.message || 'Error sending message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send us a detailed message in Hindi or English',
      contact: 'support@healfusion.in',
      action: 'mailto:support@healfusion.in',
      available: '24/7 Response within 24 hours'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+91-1800-XXX-HEAL (Toll-free)',
      action: 'tel:+911800XXX4325',
      available: 'Mon-Sat: 9AM-9PM IST'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Instant help for quick questions',
      contact: 'Available on website',
      action: '#',
      available: 'Mon-Sat: 9AM-9PM IST'
    },
    {
      icon: '🚑',
      title: 'Medical Emergency',
      description: 'For medical emergencies only',
      contact: '108 (National Ambulance) or 112',
      action: 'tel:108',
      available: '24/7 Emergency Services',
      urgent: true
    }
  ]

  const faqs = [
    {
      question: 'How quickly will I receive a response?',
      answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent medical matters, please contact emergency services immediately at 108 (ambulance) or 112. हम आमतौर पर व्यावसायिक दिनों में सभी पूछताछों का 24 घंटे के भीतर जवाब देते हैं।'
    },
    {
      question: 'Is my personal health information secure?',
      answer: 'Yes, we follow strict Indian IT Act 2000 guidelines and use encrypted communication channels to protect your privacy and medical information. All data is stored securely in compliance with Indian data protection laws. हाँ, हम आपकी गोपनीयता और चिकित्सा जानकारी की रक्षा के लिए सख्त भारतीय आईटी अधिनियम 2000 दिशानिर्देशों का पालन करते हैं।'
    },
    {
      question: 'Can I schedule appointments through this form?',
      answer: 'This contact form is for general inquiries and support. For appointment scheduling, please use our consultation booking system or call our support line at 1800-XXX-HEAL. यह संपर्क फ़ॉर्म सामान्य पूछताछ और सहायता के लिए है। अपॉइंटमेंट शेड्यूलिंग के लिए, कृपया हमारी परामर्श बुकिंग प्रणाली का उपयोग करें।'
    },
    {
      question: 'Do you offer technical support?',
      answer: 'Yes, our technical support team can help with website issues, account problems, and app-related questions during business hours. We also provide support in Hindi and regional languages. हाँ, हमारी तकनीकी सहायता टीम व्यावसायिक घंटों के दौरान वेबसाइट मुद्दों, खाता समस्याओं और ऐप-संबंधित प्रश्नों में मदद कर सकती है।'
    },
    {
      question: 'Do you provide services in rural areas?',
      answer: 'Yes, HealFusion is designed to serve both urban and rural India. Our platform works on low-bandwidth connections and we have partnerships with local healthcare providers across the country. हाँ, हेलफ्यूजन शहरी और ग्रामीण भारत दोनों की सेवा के लिए डिज़ाइन किया गया है।'
    },
    {
      question: 'Can I get consultations in regional languages?',
      answer: 'Yes, we provide consultations in multiple Indian languages including Hindi, Gujarati, Bengali, Tamil, Telugu, Marathi, and more. Our doctors are trained to communicate effectively in regional languages. हाँ, हम हिंदी, गुजराती, बंगाली, तमिल, तेलुगु, मराठी और अन्य सहित कई भारतीय भाषाओं में परामर्श प्रदान करते हैं।'
    }
  ]

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-content">
          <div className="hero-icon">📞</div>
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            Have questions about HealFusion? Need technical support? Want to share feedback?
            We're here to help you with any questions or concerns.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">&lt;24hrs</span>
              <span className="stat-label">Response Time</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Support Channels</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="contact-illustration">
            <div className="illustration-element elem-1">💬</div>
            <div className="illustration-element elem-2">📧</div>
            <div className="illustration-element elem-3">📞</div>
            <div className="illustration-element elem-4">🩺</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="contact-tabs">
        <div className="tabs-container">
          <button
            className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            <span className="tab-icon">📝</span>
            <span className="tab-text">Contact Form</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'methods' ? 'active' : ''}`}
            onClick={() => setActiveTab('methods')}
          >
            <span className="tab-icon">📞</span>
            <span className="tab-text">Contact Methods</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            <span className="tab-icon">❓</span>
            <span className="tab-text">FAQ</span>
          </button>
        </div>
      </div>

      {/* Contact Form Tab */}
      {activeTab === 'form' && (
        <div className="contact-section">
          <div className="section-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="alert alert-error">
              <span className="alert-icon">⚠️</span>
              <span className="alert-text">{error}</span>
              <button onClick={() => setError('')} className="alert-close">×</button>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <span className="alert-icon">✅</span>
              <span className="alert-text">Message sent successfully! We'll get back to you within 24 hours.</span>
              <button onClick={() => setSuccess('')} className="alert-close">×</button>
            </div>
          )}

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number (optional)"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Priority Level</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Account</option>
                    <option value="medical">Medical Question</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief subject line"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide detailed information about your inquiry..."
                  rows={6}
                  className="form-textarea"
                  required
                />
                <div className="char-count">
                  {formData.message.length}/1000 characters
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary btn-large"
              >
                {loading ? (
                  <>
                    <span className="btn-icon">⏳</span>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">📧</span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Contact Methods Tab */}
      {activeTab === 'methods' && (
        <div className="contact-section">
          <div className="section-header">
            <h2>Multiple Ways to Reach Us</h2>
            <p>Choose the contact method that works best for your needs.</p>
          </div>

          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className={`contact-method-card ${method.urgent ? 'urgent' : ''}`}>
                <div className="method-header">
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-title-section">
                    <h3 className="method-title">{method.title}</h3>
                    <p className="method-description">{method.description}</p>
                  </div>
                </div>

                <div className="method-content">
                  <div className="method-contact">
                    <strong>{method.contact}</strong>
                  </div>
                  <div className="method-availability">
                    {method.available}
                  </div>
                </div>

                <div className="method-actions">
                  <a
                    href={method.action}
                    className={`method-action-btn ${method.urgent ? 'urgent' : ''}`}
                    {...(method.action.startsWith('tel:') && { onClick: () => {
                      if (method.urgent) {
                        return confirm('This is for emergencies only. Are you experiencing a medical emergency?')
                      }
                      return true
                    }})}
                  >
                    {method.urgent ? 'Call Emergency' : 'Contact Now'}
                    <span className="action-arrow">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Office Hours */}
          <div className="office-hours">
            <h3>🕐 Office Hours & Availability</h3>
            <div className="hours-grid">
              <div className="hours-item">
                <span className="hours-day">Monday - Friday</span>
                <span className="hours-time">9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Saturday</span>
                <span className="hours-time">10:00 AM - 4:00 PM EST</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Sunday</span>
                <span className="hours-time">Closed</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Holidays</span>
                <span className="hours-time">Limited Support</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="contact-section">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common questions about HealFusion.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question">
                  <span className="faq-icon">❓</span>
                  <h3>{faq.question}</h3>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Notice */}
      <div className="emergency-notice">
        <div className="emergency-content">
          <div className="emergency-icon">🚨</div>
          <div className="emergency-text">
            <h3>Medical Emergency?</h3>
            <p>If you are experiencing a medical emergency, do not use this contact form. Call emergency services immediately:</p>
            <div className="emergency-contacts">
              <a href="tel:911" className="emergency-btn">
                <span className="emergency-flag">🇺🇸</span>
                911 (USA)
              </a>
              <a href="tel:112" className="emergency-btn">
                <span className="emergency-flag">🇪🇺</span>
                112 (Europe)
              </a>
              <a href="tel:999" className="emergency-btn">
                <span className="emergency-flag">🇬🇧</span>
                999 (UK)
              </a>
            </div>
            <p className="emergency-note">Or visit the nearest emergency room or call your local emergency number.</p>
          </div>
        </div>
      </div>

      {/* Social Media & Community */}
      <div className="social-section">
        <h3>Connect With Our Community</h3>
        <p>Follow us for health tips, updates, and community discussions.</p>
        <div className="social-links">
          <a href="#" className="social-link">
            <span className="social-icon">📘</span>
            <span className="social-text">Facebook</span>
          </a>
          <a href="#" className="social-link">
            <span className="social-icon">🐦</span>
            <span className="social-text">Twitter</span>
          </a>
          <a href="#" className="social-link">
            <span className="social-icon">📷</span>
            <span className="social-text">Instagram</span>
          </a>
          <a href="#" className="social-link">
            <span className="social-icon">💼</span>
            <span className="social-text">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  )
}
