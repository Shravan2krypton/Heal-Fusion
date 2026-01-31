import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function UserPanel() {
  const { user, logout } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [profile, setProfile] = useState(null)
  const [consultations, setConsultations] = useState([])
  const [medicalHistory, setMedicalHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      setLoading(true)
      const [profileRes, consRes, histRes] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/consultations'),
        fetch('/api/medical-history')
      ])

      if (profileRes.ok) setProfile(await profileRes.json())
      if (consRes.ok) setConsultations(await consRes.json())
      if (histRes.ok) setMedicalHistory(await histRes.json())
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setProfile(formData)
        setEditMode(false)
        alert('✅ Profile updated successfully!')
      } else {
        alert('❌ Error updating profile')
      }
    } catch (err) {
      alert('❌ Error updating profile')
    } finally {
      setSaving(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'var(--success)'
      case 'pending': return 'var(--warning)'
      case 'confirmed': return 'var(--info)'
      case 'cancelled': return 'var(--error)'
      default: return 'var(--gray-400)'
    }
  }

  const stats = {
    totalConsultations: consultations.length,
    upcomingConsultations: consultations.filter(c => c.status?.toLowerCase() === 'confirmed').length,
    completedConsultations: consultations.filter(c => c.status?.toLowerCase() === 'completed').length,
    medicalRecords: medicalHistory.length
  }

  const quickActions = [
    {
      icon: '🔍',
      title: 'Find Doctor',
      description: 'Book a new consultation',
      link: '/consultations',
      color: 'var(--primary)'
    },
    {
      icon: '📝',
      title: 'Add Health Record',
      description: 'Update medical history',
      link: '/medical-history',
      color: 'var(--secondary)'
    },
    {
      icon: '🩺',
      title: 'Symptom Check',
      description: 'AI-powered diagnosis',
      link: '/symptoms',
      color: 'var(--success)'
    },
    {
      icon: '📚',
      title: 'Health Articles',
      description: 'Learn about health topics',
      link: '/articles',
      color: 'var(--info)'
    }
  ]

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar" style={{
        background: 'var(--gray-900)',
        padding: '2rem 1rem',
        borderRight: '1px solid var(--gray-700)',
        minHeight: '100vh',
        position: 'sticky',
        top: 0
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--gray-700)'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>👤</div>
          <h3 style={{
            color: 'var(--white)',
            margin: '0 0 0.5rem 0',
            fontSize: '1.25rem'
          }}>
            Patient Dashboard
          </h3>
          <p style={{
            color: 'var(--gray-400)',
            margin: 0,
            fontSize: '0.9rem'
          }}>
            {user?.name || 'Welcome back!'}
          </p>
        </div>

        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={activeTab === 'dashboard' ? 'active' : ''}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              background: activeTab === 'dashboard' ? 'var(--primary)' : 'transparent',
              color: 'var(--white)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all var(--transition-normal)'
            }}
          >
            <span>📊</span>
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'active' : ''}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              background: activeTab === 'profile' ? 'var(--primary)' : 'transparent',
              color: 'var(--white)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all var(--transition-normal)'
            }}
          >
            <span>👤</span>
            Profile
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={activeTab === 'consultations' ? 'active' : ''}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              background: activeTab === 'consultations' ? 'var(--primary)' : 'transparent',
              color: 'var(--white)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all var(--transition-normal)'
            }}
          >
            <span>📅</span>
            Consultations
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={activeTab === 'history' ? 'active' : ''}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              background: activeTab === 'history' ? 'var(--primary)' : 'transparent',
              color: 'var(--white)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all var(--transition-normal)'
            }}
          >
            <span>📚</span>
            Medical History
          </button>
        </nav>

        <div style={{
          marginTop: 'auto',
          paddingTop: '2rem',
          borderTop: '1px solid var(--gray-700)'
        }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              background: 'var(--error)',
              color: 'var(--white)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => e.target.style.background = 'var(--error-hover)'}
            onMouseLeave={(e) => e.target.style.background = 'var(--error)'}
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content" style={{
        flex: 1,
        padding: '2rem',
        background: 'var(--gray-950)'
      }}>
        {loading ? (
          <div className="loading-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem',
            gap: '1rem'
          }}>
            <div className="spinner" style={{
              width: '50px',
              height: '50px',
              border: '4px solid var(--gray-700)',
              borderTop: '4px solid var(--primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{color: 'var(--gray-400)', fontSize: '1.1rem'}}>Loading your dashboard...</p>
          </div>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <div style={{
                  marginBottom: '2rem'
                }}>
                  <h1 style={{
                    color: 'var(--white)',
                    margin: '0 0 0.5rem 0',
                    fontSize: '2rem',
                    fontWeight: '700'
                  }}>
                    Welcome back, {profile?.name || 'Patient'}! 👋
                  </h1>
                  <p style={{
                    color: 'var(--gray-400)',
                    margin: 0,
                    fontSize: '1.1rem'
                  }}>
                    Here's an overview of your health journey and recent activities.
                  </p>
                </div>

                {/* Stats Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div className="stat-card" style={{
                    background: 'var(--gray-900)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📅</div>
                    <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--white)'}}>
                      {stats.totalConsultations}
                    </div>
                    <div style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Total Consultations</div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      <span style={{color: 'var(--success)'}}>✓ {stats.completedConsultations} completed</span>
                      <span style={{color: 'var(--warning)'}}>⏳ {stats.upcomingConsultations} upcoming</span>
                    </div>
                  </div>

                  <div className="stat-card" style={{
                    background: 'var(--gray-900)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📚</div>
                    <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--white)'}}>
                      {stats.medicalRecords}
                    </div>
                    <div style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Health Records</div>
                    <div style={{color: 'var(--info)', fontSize: '0.9rem'}}>
                      Medical history entries
                    </div>
                  </div>

                  <div className="stat-card" style={{
                    background: 'var(--gray-900)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '2rem', marginBottom: '1rem'}}>❤️</div>
                    <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--white)'}}>
                      {profile ? new Date().getFullYear() - (profile.age || 0) : 'N/A'}
                    </div>
                    <div style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Account Age</div>
                    <div style={{color: 'var(--primary)', fontSize: '0.9rem'}}>
                      Member since {new Date().getFullYear()}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div style={{
                  marginBottom: '2rem'
                }}>
                  <h2 style={{
                    color: 'var(--white)',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>
                    Quick Actions
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem'
                  }}>
                    {quickActions.map((action, index) => (
                      <Link
                        key={index}
                        to={action.link}
                        style={{
                          background: 'var(--gray-900)',
                          padding: '1.5rem',
                          borderRadius: 'var(--radius-xl)',
                          border: '1px solid var(--gray-700)',
                          textDecoration: 'none',
                          display: 'block',
                          transition: 'all var(--transition-normal)',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.borderColor = action.color
                          e.target.style.boxShadow = 'var(--shadow-lg)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.borderColor = 'var(--gray-700)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}>
                          <div style={{
                            fontSize: '2rem',
                            background: action.color,
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--white)'
                          }}>
                            {action.icon}
                          </div>
                          <div>
                            <h3 style={{
                              color: 'var(--white)',
                              margin: '0 0 0.25rem 0',
                              fontSize: '1.1rem'
                            }}>
                              {action.title}
                            </h3>
                            <p style={{
                              color: 'var(--gray-400)',
                              margin: 0,
                              fontSize: '0.9rem'
                            }}>
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 style={{
                    color: 'var(--white)',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>
                    Recent Activity
                  </h2>
                  <div style={{
                    background: 'var(--gray-900)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)'
                  }}>
                    {consultations.length === 0 && medicalHistory.length === 0 ? (
                      <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: 'var(--gray-400)'
                      }}>
                        <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📋</div>
                        <p>No recent activity. Start your health journey by booking a consultation or adding your medical history.</p>
                      </div>
                    ) : (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1rem'
                      }}>
                        {consultations.slice(0, 3).map((cons, index) => (
                          <div key={index} style={{
                            background: 'var(--gray-800)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--gray-700)'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              marginBottom: '0.5rem'
                            }}>
                              <span>👨‍⚕️</span>
                              <div>
                                <div style={{color: 'var(--white)', fontWeight: '600'}}>
                                  {cons.doctorId?.name || 'Doctor'}
                                </div>
                                <div style={{color: 'var(--gray-400)', fontSize: '0.9rem'}}>
                                  {cons.doctorId?.specialization || 'Specialist'}
                                </div>
                              </div>
                            </div>
                            <div style={{
                              color: getStatusColor(cons.status),
                              fontSize: '0.9rem',
                              fontWeight: '500'
                            }}>
                              {cons.status || 'Pending'}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div style={{
                  marginBottom: '2rem'
                }}>
                  <h1 style={{
                    color: 'var(--white)',
                    margin: '0 0 0.5rem 0',
                    fontSize: '2rem',
                    fontWeight: '700'
                  }}>
                    👤 My Profile
                  </h1>
                  <p style={{
                    color: 'var(--gray-400)',
                    margin: 0,
                    fontSize: '1.1rem'
                  }}>
                    Manage your personal information and account settings.
                  </p>
                </div>

                {profile ? (
                  <>
                    {!editMode ? (
                      <div style={{
                        background: 'var(--gray-900)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid var(--gray-700)'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '2rem'
                        }}>
                          <h2 style={{
                            color: 'var(--white)',
                            margin: 0,
                            fontSize: '1.5rem'
                          }}>
                            Personal Information
                          </h2>
                          <button
                            onClick={() => {
                              setEditMode(true)
                              setFormData(profile)
                            }}
                            style={{
                              padding: '0.5rem 1rem',
                              background: 'var(--primary)',
                              color: 'var(--white)',
                              border: 'none',
                              borderRadius: 'var(--radius-lg)',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}
                          >
                            <span>✏️</span>
                            Edit Profile
                          </button>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                          gap: '1.5rem'
                        }}>
                          <div style={{
                            background: 'var(--gray-800)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--gray-700)'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem',
                              marginBottom: '1rem'
                            }}>
                              <div style={{
                                fontSize: '2rem',
                                background: 'var(--gradient-primary)',
                                padding: '0.5rem',
                                borderRadius: '50%',
                                color: 'var(--white)'
                              }}>👤</div>
                              <div>
                                <h3 style={{
                                  color: 'var(--white)',
                                  margin: '0 0 0.25rem 0',
                                  fontSize: '1.25rem'
                                }}>
                                  {profile.name}
                                </h3>
                                <p style={{
                                  color: 'var(--gray-400)',
                                  margin: 0,
                                  fontSize: '0.9rem'
                                }}>
                                  Patient Account
                                </p>
                              </div>
                            </div>
                          </div>

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem'
                          }}>
                            <div style={{
                              background: 'var(--gray-800)',
                              padding: '1rem',
                              borderRadius: 'var(--radius-lg)',
                              textAlign: 'center'
                            }}>
                              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>📧</div>
                              <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Email</div>
                              <div style={{color: 'var(--white)', fontWeight: '500'}}>{profile.email}</div>
                            </div>
                            <div style={{
                              background: 'var(--gray-800)',
                              padding: '1rem',
                              borderRadius: 'var(--radius-lg)',
                              textAlign: 'center'
                            }}>
                              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>🎂</div>
                              <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Age</div>
                              <div style={{color: 'var(--white)', fontWeight: '500'}}>{profile.age || 'Not set'}</div>
                            </div>
                            <div style={{
                              background: 'var(--gray-800)',
                              padding: '1rem',
                              borderRadius: 'var(--radius-lg)',
                              textAlign: 'center'
                            }}>
                              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>⚧️</div>
                              <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Gender</div>
                              <div style={{color: 'var(--white)', fontWeight: '500'}}>{profile.gender || 'Not set'}</div>
                            </div>
                            <div style={{
                              background: 'var(--gray-800)',
                              padding: '1rem',
                              borderRadius: 'var(--radius-lg)',
                              textAlign: 'center'
                            }}>
                              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>📞</div>
                              <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Phone</div>
                              <div style={{color: 'var(--white)', fontWeight: '500'}}>{profile.phone || 'Not set'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        background: 'var(--gray-900)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid var(--gray-700)'
                      }}>
                        <h2 style={{
                          color: 'var(--white)',
                          marginBottom: '2rem',
                          fontSize: '1.5rem'
                        }}>
                          ✏️ Edit Profile
                        </h2>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                          gap: '1.5rem'
                        }}>
                          <div className="form-group">
                            <label style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              color: 'var(--gray-300)',
                              fontWeight: '500'
                            }}>
                              👤 Full Name
                            </label>
                            <input
                              type="text"
                              value={formData.name || ''}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--gray-600)',
                                borderRadius: 'var(--radius-lg)',
                                background: 'var(--gray-800)',
                                color: 'var(--white)',
                                fontSize: '1rem'
                              }}
                            />
                          </div>

                          <div className="form-group">
                            <label style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              color: 'var(--gray-300)',
                              fontWeight: '500'
                            }}>
                              🎂 Age
                            </label>
                            <input
                              type="number"
                              value={formData.age || ''}
                              onChange={e => setFormData({...formData, age: e.target.value})}
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--gray-600)',
                                borderRadius: 'var(--radius-lg)',
                                background: 'var(--gray-800)',
                                color: 'var(--white)',
                                fontSize: '1rem'
                              }}
                            />
                          </div>

                          <div className="form-group">
                            <label style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              color: 'var(--gray-300)',
                              fontWeight: '500'
                            }}>
                              ⚧️ Gender
                            </label>
                            <select
                              value={formData.gender || ''}
                              onChange={e => setFormData({...formData, gender: e.target.value})}
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--gray-600)',
                                borderRadius: 'var(--radius-lg)',
                                background: 'var(--gray-800)',
                                color: 'var(--white)',
                                fontSize: '1rem'
                              }}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              color: 'var(--gray-300)',
                              fontWeight: '500'
                            }}>
                              📞 Phone Number
                            </label>
                            <input
                              type="tel"
                              value={formData.phone || ''}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--gray-600)',
                                borderRadius: 'var(--radius-lg)',
                                background: 'var(--gray-800)',
                                color: 'var(--white)',
                                fontSize: '1rem'
                              }}
                            />
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          gap: '1rem',
                          marginTop: '2rem',
                          flexWrap: 'wrap'
                        }}>
                          <button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            style={{
                              padding: '0.875rem 2rem',
                              background: saving ? 'var(--gray-600)' : 'var(--gradient-primary)',
                              color: 'var(--white)',
                              border: 'none',
                              borderRadius: 'var(--radius-lg)',
                              cursor: saving ? 'not-allowed' : 'pointer',
                              fontSize: '1rem',
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              transition: 'all var(--transition-normal)'
                            }}
                          >
                            {saving ? (
                              <>
                                <div className="spinner" style={{
                                  width: '16px',
                                  height: '16px',
                                  border: '2px solid var(--gray-400)',
                                  borderTop: '2px solid var(--white)',
                                  borderRadius: '50%',
                                  animation: 'spin 1s linear infinite'
                                }}></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <span>💾</span>
                                Save Changes
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => setEditMode(false)}
                            style={{
                              padding: '0.875rem 2rem',
                              background: 'var(--gray-700)',
                              color: 'var(--white)',
                              border: '1px solid var(--gray-600)',
                              borderRadius: 'var(--radius-lg)',
                              cursor: 'pointer',
                              fontSize: '1rem',
                              fontWeight: '500',
                              transition: 'all var(--transition-normal)'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'var(--gray-600)'}
                            onMouseLeave={(e) => e.target.style.background = 'var(--gray-700)'}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    background: 'var(--gray-900)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)'
                  }}>
                    <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👤</div>
                    <p style={{color: 'var(--gray-400)'}}>Loading profile information...</p>
                  </div>
                )}
              </div>
            )}

            {/* Consultations Tab */}
            {activeTab === 'consultations' && (
              <div>
                <div style={{
                  marginBottom: '2rem'
                }}>
                  <h1 style={{
                    color: 'var(--white)',
                    margin: '0 0 0.5rem 0',
                    fontSize: '2rem',
                    fontWeight: '700'
                  }}>
                    📅 My Consultations
                  </h1>
                  <p style={{
                    color: 'var(--gray-400)',
                    margin: 0,
                    fontSize: '1.1rem'
                  }}>
                    View and manage your doctor appointments and consultation history.
                  </p>
                </div>

                {consultations.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    background: 'var(--gray-900)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)'
                  }}>
                    <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📅</div>
                    <h3 style={{color: 'var(--white)', marginBottom: '1rem'}}>No Consultations Yet</h3>
                    <p style={{color: 'var(--gray-400)', marginBottom: '2rem'}}>
                      You haven't booked any consultations yet. Find a doctor that suits your needs.
                    </p>
                    <Link
                      to="/consultations"
                      style={{
                        padding: '0.875rem 1.5rem',
                        background: 'var(--gradient-primary)',
                        color: 'var(--white)',
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: '1rem',
                        fontWeight: '500',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>🔍</span>
                      Find a Doctor
                    </Link>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {consultations.map((cons, index) => (
                      <div
                        key={cons._id || index}
                        style={{
                          background: 'var(--gray-900)',
                          padding: '1.5rem',
                          borderRadius: 'var(--radius-xl)',
                          border: '1px solid var(--gray-700)',
                          transition: 'all var(--transition-normal)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = 'var(--shadow-lg)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            fontSize: '2.5rem',
                            background: 'var(--gradient-primary)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--white)'
                          }}>👨‍⚕️</div>
                          <div>
                            <h3 style={{
                              color: 'var(--white)',
                              margin: '0 0 0.25rem 0',
                              fontSize: '1.1rem'
                            }}>
                              {cons.doctorId?.name || 'Doctor'}
                            </h3>
                            <p style={{
                              color: 'var(--gray-400)',
                              margin: 0,
                              fontSize: '0.9rem'
                            }}>
                              {cons.doctorId?.specialization || 'Specialist'}
                            </p>
                          </div>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            background: 'var(--gray-800)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-lg)',
                            textAlign: 'center'
                          }}>
                            <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Date</div>
                            <div style={{color: 'var(--white)', fontWeight: '500'}}>
                              {new Date(cons.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div style={{
                            background: 'var(--gray-800)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-lg)',
                            textAlign: 'center'
                          }}>
                            <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Status</div>
                            <div style={{
                              color: getStatusColor(cons.status),
                              fontWeight: '500',
                              textTransform: 'capitalize'
                            }}>
                              {cons.status || 'Pending'}
                            </div>
                          </div>
                        </div>

                        {cons.notes && (
                          <div style={{
                            background: 'var(--gray-800)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-lg)',
                            marginTop: '1rem'
                          }}>
                            <div style={{
                              color: 'var(--gray-400)',
                              fontSize: '0.8rem',
                              marginBottom: '0.5rem'
                            }}>
                              📝 Notes
                            </div>
                            <div style={{color: 'var(--white)'}}>{cons.notes}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Medical History Tab */}
            {activeTab === 'history' && (
              <div>
                <div style={{
                  marginBottom: '2rem'
                }}>
                  <h1 style={{
                    color: 'var(--white)',
                    margin: '0 0 0.5rem 0',
                    fontSize: '2rem',
                    fontWeight: '700'
                  }}>
                    📚 Medical History
                  </h1>
                  <p style={{
                    color: 'var(--gray-400)',
                    margin: 0,
                    fontSize: '1.1rem'
                  }}>
                    Review your complete medical history and health records.
                  </p>
                </div>

                {medicalHistory.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    background: 'var(--gray-900)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)'
                  }}>
                    <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📋</div>
                    <h3 style={{color: 'var(--white)', marginBottom: '1rem'}}>No Medical Records</h3>
                    <p style={{color: 'var(--gray-400)', marginBottom: '2rem'}}>
                      You haven't added any medical history records yet. Keep track of your health journey.
                    </p>
                    <Link
                      to="/medical-history"
                      style={{
                        padding: '0.875rem 1.5rem',
                        background: 'var(--gradient-primary)',
                        color: 'var(--white)',
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: '1rem',
                        fontWeight: '500',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>➕</span>
                      Add Health Record
                    </Link>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {medicalHistory.map((record, index) => (
                      <div
                        key={record._id || index}
                        style={{
                          background: 'var(--gray-900)',
                          padding: '1.5rem',
                          borderRadius: 'var(--radius-xl)',
                          border: '1px solid var(--gray-700)',
                          transition: 'all var(--transition-normal)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = 'var(--shadow-lg)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            fontSize: '2rem',
                            background: 'var(--gradient-primary)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--white)'
                          }}>🏥</div>
                          <div>
                            <h3 style={{
                              color: 'var(--white)',
                              margin: '0 0 0.25rem 0',
                              fontSize: '1.1rem'
                            }}>
                              {record.condition}
                            </h3>
                            <p style={{
                              color: 'var(--gray-400)',
                              margin: 0,
                              fontSize: '0.9rem'
                            }}>
                              {new Date(record.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {record.medicines && (
                          <div style={{
                            background: 'var(--gray-800)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: '1rem'
                          }}>
                            <div style={{
                              color: 'var(--gray-400)',
                              fontSize: '0.8rem',
                              marginBottom: '0.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              <span>💊</span>
                              Medicines & Treatments
                            </div>
                            <div style={{color: 'var(--white)'}}>{record.medicines}</div>
                          </div>
                        )}

                        {record.notes && (
                          <div style={{
                            background: 'var(--gray-800)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-lg)'
                          }}>
                            <div style={{
                              color: 'var(--gray-400)',
                              fontSize: '0.8rem',
                              marginBottom: '0.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              <span>📝</span>
                              Notes
                            </div>
                            <div style={{color: 'var(--white)'}}>{record.notes}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
