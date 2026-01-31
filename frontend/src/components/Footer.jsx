import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/symptoms', label: 'Symptom Diagnosis', icon: '🔍' },
    { to: '/consultations', label: 'Find Doctors', icon: '👨‍⚕️' },
    { to: '/articles', label: 'Health Articles', icon: '📖' },
    { to: '/contact', label: 'Contact Us', icon: '📞' }
  ]

  const services = [
    { label: 'AI Diagnosis', icon: '🤖' },
    { label: 'Doctor Consultations', icon: '👨‍⚕️' },
    { label: 'Medical History', icon: '📋' },
    { label: 'Health Articles', icon: '📰' },
    { label: 'Emergency Support', icon: '🚑' }
  ]

  const resources = [
    { href: '#privacy', label: 'Privacy Policy', icon: '🔒' },
    { href: '#terms', label: 'Terms of Service', icon: '📄' },
    { href: '#disclaimer', label: 'Medical Disclaimer', icon: '⚠️' },
    { href: '#faq', label: 'FAQ', icon: '❓' },
    { href: '#support', label: 'Help Center', icon: '🆘' }
  ]

  const socialLinks = [
    { href: '#facebook', icon: '📘', label: 'Facebook', color: '#1877f2' },
    { href: '#twitter', icon: '🐦', label: 'Twitter', color: '#1da1f2' },
    { href: '#instagram', icon: '📷', label: 'Instagram', color: '#e4405f' },
    { href: '#linkedin', icon: '💼', label: 'LinkedIn', color: '#0077b5' },
    { href: '#youtube', icon: '📺', label: 'YouTube', color: '#ff0000' }
  ]

  return (
    <footer>
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              fontSize: '2rem',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>🏥</div>
            <h3 style={{
              color: 'var(--white)',
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>HealFusion</h3>
          </div>
          <p style={{
            color: 'var(--gray-300)',
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            Your trusted AI-powered medical assistant for intelligent symptom analysis,
            doctor consultations, and comprehensive healthcare management.
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{
              fontSize: '1.25rem',
              marginBottom: '0.5rem'
            }}>📞</div>
            <div style={{
              fontWeight: '600',
              color: 'var(--white)',
              marginBottom: '0.25rem'
            }}>Emergency Support</div>
            <div style={{
              color: 'var(--gray-300)',
              fontSize: '0.9rem'
            }}>
              24/7 Medical Emergency: <strong>911</strong><br/>
              Health Support: <strong>1-800-HEALTH</strong>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 style={{
            color: 'var(--white)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🔗 Quick Links
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {quickLinks.map((link, index) => (
              <li key={index} style={{marginBottom: '0.75rem'}}>
                <Link
                  to={link.to}
                  style={{
                    color: 'var(--gray-300)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all var(--transition-normal)',
                    padding: '0.25rem 0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--primary)'
                    e.target.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--gray-300)'
                    e.target.style.transform = 'translateX(0)'
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4 style={{
            color: 'var(--white)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🏥 Our Services
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {services.map((service, index) => (
              <li key={index} style={{
                color: 'var(--gray-300)',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>{service.icon}</span>
                {service.label}
              </li>
            ))}
          </ul>

          {/* Newsletter Signup */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h5 style={{
              color: 'var(--white)',
              margin: '0 0 0.75rem 0',
              fontSize: '1rem'
            }}>📧 Stay Updated</h5>
            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid var(--gray-600)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--gray-800)',
                  color: 'var(--white)',
                  fontSize: '0.875rem'
                }}
              />
              <button style={{
                padding: '0.5rem 1rem',
                background: 'var(--gradient-primary)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Resources & Social */}
        <div className="footer-section">
          <h4 style={{
            color: 'var(--white)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📚 Resources
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            marginBottom: '2rem'
          }}>
            {resources.map((resource, index) => (
              <li key={index} style={{marginBottom: '0.75rem'}}>
                <a
                  href={resource.href}
                  style={{
                    color: 'var(--gray-300)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color var(--transition-normal)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--gray-300)'}
                >
                  <span>{resource.icon}</span>
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Media */}
          <h4 style={{
            color: 'var(--white)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🌐 Connect With Us
          </h4>
          <div className="social-icons" style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                title={social.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '45px',
                  height: '45px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  color: 'var(--white)',
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  transition: 'all var(--transition-normal)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = social.color
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = 'var(--shadow-lg)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.1)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <p style={{
              margin: 0,
              color: 'var(--gray-400)',
              fontSize: '0.9rem'
            }}>
              © {currentYear} HealFusion. All rights reserved.
            </p>
            <p style={{
              margin: '0.25rem 0 0 0',
              color: 'var(--gray-500)',
              fontSize: '0.8rem'
            }}>
              Made with ❤️ for better healthcare
            </p>
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <span style={{
              color: 'var(--gray-500)',
              fontSize: '0.8rem'
            }}>🔒 SSL Secured</span>
            <span style={{
              color: 'var(--gray-500)',
              fontSize: '0.8rem'
            }}>🛡️ HIPAA Compliant</span>
          </div>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <div style={{fontSize: '1.25rem', color: 'var(--warning)'}}>⚠️</div>
            <div>
              <div style={{
                fontWeight: '600',
                color: 'var(--white)',
                marginBottom: '0.25rem'
              }}>
                Medical Disclaimer
              </div>
              <p style={{
                margin: 0,
                color: 'var(--gray-300)',
                fontSize: '0.85rem',
                lineHeight: '1.4'
              }}>
                HealFusion is an AI-assisted healthcare platform designed to provide general health insights and facilitate doctor consultations.
                <strong> This platform does NOT replace professional medical advice, diagnosis, or treatment.</strong> Always consult qualified healthcare professionals for accurate medical decisions. In case of medical emergencies, contact emergency services immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
