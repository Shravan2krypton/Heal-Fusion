import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = () => {
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
      await login(formData)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials and try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
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
        maxWidth: '450px',
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
          }}>🔐</div>
          <h1 style={{
            margin: '0',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>Welcome Back</h1>
          <p style={{
            margin: '0',
            opacity: '0.9',
            fontSize: '1rem'
          }}>Sign in to your HealFusion account</p>
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
              🔒 Password
            </label>
            <div style={{position: 'relative'}}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
                Signing you in...
              </>
            ) : (
              <>
                <span style={{marginRight: '0.5rem'}}>🚀</span>
                Sign In
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
              Don't have an account?
              <Link
                to="/register"
                style={{
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  marginLeft: '0.5rem'
                }}
              >
                Create one here
              </Link>
            </div>

            <div style={{
              color: 'var(--gray-500)',
              fontSize: '0.9rem'
            }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  padding: '0'
                }}
                onClick={() => alert('Password reset feature coming soon! Contact support@healfusion.in')}
              >
                Forgot your password?
              </button>
            </div>
          </div>

          {/* Indian Support Info */}
          <div className="alert alert-info" style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            background: 'linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%)',
            border: '1px solid var(--gray-200)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>🇮🇳</div>
            <strong>Need Help?</strong><br/>
            Call our toll-free number: <strong>+91-1800-XXX-HEAL</strong><br/>
            Email: <strong>support@healfusion.in</strong><br/>
            Available in Hindi, English & Regional Languages
          </div>
        </form>
      </div>
    </div>
  )
}
