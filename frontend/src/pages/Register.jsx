import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState('')
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (error) setError('')

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value)
    }
  }

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength('')
      return
    }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    if (strength <= 2) setPasswordStrength('weak')
    else if (strength <= 3) setPasswordStrength('medium')
    else setPasswordStrength('strong')
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required')
      return false
    }
    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email address is required')
      return false
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password.trim()) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (passwordStrength === 'weak') {
      setError('Please choose a stronger password')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        role: formData.role
      })
      navigate('/')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
      console.error('Registration error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'var(--error)'
      case 'medium': return 'var(--warning)'
      case 'strong': return 'var(--success)'
      default: return 'var(--gray-400)'
    }
  }

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return 'Weak'
      case 'medium': return 'Medium'
      case 'strong': return 'Strong'
      default: return ''
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--gradient-light)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'var(--white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--gray-200)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--gradient-primary)',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: 'var(--white)'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>📝</div>
          <h1 style={{
            margin: '0',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>Join HealFusion</h1>
          <p style={{
            margin: '0',
            opacity: '0.9',
            fontSize: '1rem'
          }}>Create your account and start your health journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{padding: '3rem 2rem'}}>
          {error && (
            <div className="alert alert-error" style={{marginBottom: '2rem'}}>
              <span style={{fontSize: '1.25rem'}}>⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--gray-700)',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              👤 Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '2px solid var(--gray-200)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                transition: 'all var(--transition-normal)',
                background: 'var(--gray-50)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--gray-200)'}
            />
          </div>

          <div className="form-group">
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--gray-700)',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              📧 Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '2px solid var(--gray-200)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                transition: 'all var(--transition-normal)',
                background: 'var(--gray-50)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--gray-200)'}
            />
          </div>

          <div className="form-group">
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--gray-700)',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              🎭 Account Type
            </label>
            <div style={{display: 'flex', gap: '1rem'}}>
              <label style={{
                flex: 1,
                padding: '1rem',
                border: `2px solid ${formData.role === 'user' ? 'var(--primary)' : 'var(--gray-200)'}`,
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                background: formData.role === 'user' ? 'rgba(37, 99, 235, 0.05)' : 'var(--gray-50)',
                textAlign: 'center'
              }}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                  style={{display: 'none'}}
                />
                <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>👤</div>
                <div style={{fontWeight: '600', color: 'var(--gray-700)'}}>Patient</div>
                <div style={{fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.25rem'}}>
                  Get diagnosis & consultations
                </div>
              </label>
              <label style={{
                flex: 1,
                padding: '1rem',
                border: `2px solid ${formData.role === 'doctor' ? 'var(--primary)' : 'var(--gray-200)'}`,
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                background: formData.role === 'doctor' ? 'rgba(37, 99, 235, 0.05)' : 'var(--gray-50)',
                textAlign: 'center'
              }}>
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={formData.role === 'doctor'}
                  onChange={handleChange}
                  style={{display: 'none'}}
                />
                <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>👨‍⚕️</div>
                <div style={{fontWeight: '600', color: 'var(--gray-700)'}}>Doctor</div>
                <div style={{fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.25rem'}}>
                  Provide consultations
                </div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--gray-700)',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              🔒 Password
            </label>
            <div style={{position: 'relative'}}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 1rem',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '1rem',
                  transition: 'all var(--transition-normal)',
                  background: 'var(--gray-50)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--gray-200)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--gray-500)',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  padding: '0.25rem'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {passwordStrength && (
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.875rem',
                color: getPasswordStrengthColor(),
                fontWeight: '500'
              }}>
                Password strength: {getPasswordStrengthText()}
              </div>
            )}
          </div>

          <div className="form-group">
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--gray-700)',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              🔒 Confirm Password
            </label>
            <div style={{position: 'relative'}}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 1rem',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '1rem',
                  transition: 'all var(--transition-normal)',
                  background: 'var(--gray-50)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--gray-200)'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--gray-500)',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  padding: '0.25rem'
                }}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              marginTop: '1.5rem',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {loading ? (
              <>
                <span style={{marginRight: '0.5rem'}}>⏳</span>
                Creating your account...
              </>
            ) : (
              <>
                <span style={{marginRight: '0.5rem'}}>🚀</span>
                Create Account
              </>
            )}
          </button>

          {/* Links */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--gray-200)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{
              color: 'var(--gray-600)',
              fontSize: '0.95rem'
            }}>
              Already have an account?
              <Link
                to="/login"
                style={{
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  marginLeft: '0.5rem'
                }}
              >
                Sign in here
              </Link>
            </div>
          </div>

          {/* Info Box */}
          <div className="alert alert-info" style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            background: 'linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%)',
            border: '1px solid var(--gray-200)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{fontSize: '1.25rem', textAlign: 'center'}}>💡</div>
            <div>
              <strong>Account Types:</strong><br/>
              <strong>Patient:</strong> Access AI diagnosis, doctor consultations, and health tracking.<br/>
              <strong>Doctor:</strong> Provide consultations and manage patient appointments.
            </div>
            <div style={{
              borderTop: '1px solid var(--gray-200)',
              paddingTop: '1rem',
              marginTop: '0.5rem'
            }}>
              <strong>🇮🇳 Indian Users:</strong><br/>
              • Toll-free support: +91-1800-XXX-HEAL<br/>
              • Available in 12+ Indian languages<br/>
              • Government health scheme integration
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
