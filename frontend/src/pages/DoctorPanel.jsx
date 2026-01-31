import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function DoctorPanel() {
  const { user, logout } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [profile, setProfile] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    loadDoctorData()
  }, [])

  const loadDoctorData = async () => {
    try {
      setLoading(true)
      const [profileRes, apptRes] = await Promise.all([
        fetch('/api/doctor/profile'),
        fetch('/api/consultations/doctor')
      ])

      if (profileRes.ok) setProfile(await profileRes.json())
      if (apptRes.ok) setAppointments(await apptRes.json())
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      setUpdatingStatus(appointmentId)
      const response = await fetch(`/api/consultations/${appointmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        loadDoctorData()
        alert(`✅ Appointment ${newStatus} successfully!`)
      } else {
        alert('❌ Error updating appointment status')
      }
    } catch (err) {
      alert('❌ Error updating appointment status')
    } finally {
      setUpdatingStatus(null)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProfile(formData)
      setEditMode(false)
      alert('✅ Profile updated successfully!')
    } catch (err) {
      alert('❌ Error updating profile')
    } finally {
      setSaving(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'var(--success)'
      case 'confirmed': return 'var(--info)'
      case 'pending': return 'var(--warning)'
      case 'cancelled':
      case 'rejected': return 'var(--error)'
      default: return 'var(--gray-400)'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return '✅'
      case 'confirmed': return '📅'
      case 'pending': return '⏳'
      case 'cancelled':
      case 'rejected': return '❌'
      default: return '📋'
    }
  }

  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status?.toLowerCase() === 'pending').length,
    confirmedAppointments: appointments.filter(a => a.status?.toLowerCase() === 'confirmed').length,
    completedAppointments: appointments.filter(a => a.status?.toLowerCase() === 'completed').length,
    todayAppointments: appointments.filter(a => {
      const today = new Date().toDateString()
      return new Date(a.date).toDateString() === today
    }).length
  }

  const quickActions = [
    {
      icon: '📅',
      title: 'View Schedule',
      description: 'Check your appointments',
      action: () => setActiveTab('appointments'),
      color: 'var(--primary)'
    },
    {
      icon: '👤',
      title: 'Update Profile',
      description: 'Manage your information',
      action: () => setActiveTab('profile'),
      color: 'var(--secondary)'
    },
    {
      icon: '📊',
      title: 'Patient Records',
      description: 'View consultation history',
      action: () => alert('Feature coming soon!'),
      color: 'var(--success)'
    },
    {
      icon: '💬',
      title: 'Messages',
      description: 'Patient communications',
      action: () => alert('Feature coming soon!'),
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
          }}>👨‍⚕️</div>
          <h3 style={{
            color: 'var(--white)',
            margin: '0 0 0.5rem 0',
            fontSize: '1.25rem'
          }}>
            Doctor Dashboard
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
            onClick={() => setActiveTab('appointments')}
            className={activeTab === 'appointments' ? 'active' : ''}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              background: activeTab === 'appointments' ? 'var(--primary)' : 'transparent',
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
            Appointments
            {stats.pendingAppointments > 0 && (
              <span style={{
                background: 'var(--error)',
                color: 'var(--white)',
                borderRadius: '50%',
                padding: '0.2rem 0.5rem',
                fontSize: '0.8rem',
                fontWeight: '700',
                marginLeft: 'auto'
              }}>
                {stats.pendingAppointments}
              </span>
            )}
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
                    Welcome back, Dr. {profile?.name || 'Doctor'}! 👋
                  </h1>
                  <p style={{
                    color: 'var(--gray-400)',
                    margin: 0,
                    fontSize: '1.1rem'
                  }}>
                    Here's an overview of your practice and recent activities.
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
                      {stats.totalAppointments}
                    </div>
                    <div style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Total Appointments</div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      <span style={{color: 'var(--success)'}}>✓ {stats.completedAppointments} completed</span>
                      <span style={{color: 'var(--warning)'}}>⏳ {stats.pendingAppointments} pending</span>
                    </div>
                  </div>

                  <div className="stat-card" style={{
                    background: 'var(--gray-900)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📋</div>
                    <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--white)'}}>
                      {stats.confirmedAppointments}
                    </div>
                    <div style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Confirmed</div>
                    <div style={{color: 'var(--info)', fontSize: '0.9rem'}}>
                      Ready for consultation
                    </div>
                  </div>

                  <div className="stat-card" style={{
                    background: 'var(--gray-900)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '2rem', marginBottom: '1rem'}}>⭐</div>
                    <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--white)'}}>
                      {profile?.rating?.toFixed(1) || 'N/A'}
                    </div>
                    <div style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Rating</div>
                    <div style={{color: 'var(--warning)', fontSize: '0.9rem'}}>
                      Patient satisfaction
                    </div>
                  </div>

                  <div className="stat-card" style={{
                    background: 'var(--gray-900)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '2rem', marginBottom: '1rem'}}>💰</div>
                    <div style={{fontSize: '2rem', fontWeight: '700', color: 'var(--white)'}}>
                      ${profile?.consultationFee || 'N/A'}
                    </div>
                    <div style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Consultation Fee</div>
                    <div style={{color: 'var(--success)', fontSize: '0.9rem'}}>
                      Per session
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
                      <button
                        key={index}
                        onClick={action.action}
                        style={{
                          background: 'var(--gray-900)',
                          padding: '1.5rem',
                          borderRadius: 'var(--radius-xl)',
                          border: '1px solid var(--gray-700)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all var(--transition-normal)',
                          display: 'block'
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
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Appointments */}
                <div>
                  <h2 style={{
                    color: 'var(--white)',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>
                    Recent Appointments
                  </h2>
                  <div style={{
                    background: 'var(--gray-900)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)'
                  }}>
                    {appointments.length === 0 ? (
                      <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: 'var(--gray-400)'
                      }}>
                        <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📅</div>
                        <p>No appointments yet. Your schedule will appear here once patients book consultations.</p>
                      </div>
                    ) : (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1rem'
                      }}>
                        {appointments.slice(0, 6).map((appt, index) => (
                          <div key={appt._id || index} style={{
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
                              <span>👤</span>
                              <div>
                                <div style={{color: 'var(--white)', fontWeight: '600'}}>
                                  {appt.patientId?.name || 'Patient'}
                                </div>
                                <div style={{color: 'var(--gray-400)', fontSize: '0.9rem'}}>
                                  {new Date(appt.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div style={{
                              color: getStatusColor(appt.status),
                              fontSize: '0.9rem',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}>
                              <span>{getStatusIcon(appt.status)}</span>
                              {appt.status || 'Pending'}
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
                    👨‍⚕️ My Profile
                  </h1>
                  <p style={{
                    color: 'var(--gray-400)',
                    margin: 0,
                    fontSize: '1.1rem'
                  }}>
                    Manage your professional information and practice details.
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
                            Professional Information
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
                                  fontSize: '1.25rem'
                                }}>
                                  Dr. {profile.name}
                                </h3>
                                <p style={{
                                  color: 'var(--gray-400)',
                                  margin: 0,
                                  fontSize: '0.9rem'
                                }}>
                                  Medical Professional
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
                              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>🏥</div>
                              <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Specialization</div>
                              <div style={{color: 'var(--white)', fontWeight: '500'}}>{profile.specialization || 'Not set'}</div>
                            </div>
                            <div style={{
                              background: 'var(--gray-800)',
                              padding: '1rem',
                              borderRadius: 'var(--radius-lg)',
                              textAlign: 'center'
                            }}>
                              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>🎓</div>
                              <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Experience</div>
                              <div style={{color: 'var(--white)', fontWeight: '500'}}>{profile.experience || 'N/A'} years</div>
                            </div>
                            <div style={{
                              background: 'var(--gray-800)',
                              padding: '1rem',
                              borderRadius: 'var(--radius-lg)',
                              textAlign: 'center'
                            }}>
                              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>💰</div>
                              <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Consultation Fee</div>
                              <div style={{color: 'var(--white)', fontWeight: '500'}}>${profile.consultationFee || 'N/A'}</div>
                            </div>
                            <div style={{
                              background: 'var(--gray-800)',
                              padding: '1rem',
                              borderRadius: 'var(--radius-lg)',
                              textAlign: 'center'
                            }}>
                              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>⭐</div>
                              <div style={{color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.25rem'}}>Rating</div>
                              <div style={{color: 'var(--white)', fontWeight: '500'}}>{profile.rating?.toFixed(1) || 'N/A'}</div>
                            </div>
                          </div>
                        </div>

                        <div style={{
                          marginTop: '2rem',
                          padding: '1rem',
                          background: 'var(--gray-800)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--gray-700)'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.5rem'
                          }}>
                            <span>📧</span>
                            <div>
                              <div style={{color: 'var(--gray-400)', fontSize: '0.8rem'}}>Email Address</div>
                              <div style={{color: 'var(--white)'}}>{profile.email}</div>
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
                          ✏️ Edit Professional Profile
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
                              🏥 Specialization
                            </label>
                            <input
                              type="text"
                              value={formData.specialization || ''}
                              onChange={e => setFormData({...formData, specialization: e.target.value})}
                              placeholder="E.g., Cardiology, Pediatrics, General Medicine"
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
                              🎓 Years of Experience
                            </label>
                            <input
                              type="number"
                              value={formData.experience || ''}
                              onChange={e => setFormData({...formData, experience: e.target.value})}
                              placeholder="Years of medical practice"
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
                              💰 Consultation Fee ($)
                            </label>
                            <input
                              type="number"
                              value={formData.consultationFee || ''}
                              onChange={e => setFormData({...formData, consultationFee: e.target.value})}
                              placeholder="Fee per consultation session"
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
                    <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👨‍⚕️</div>
                    <p style={{color: 'var(--gray-400)'}}>Loading profile information...</p>
                  </div>
                )}
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
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
                    📅 Appointment Management
                  </h1>
                  <p style={{
                    color: 'var(--gray-400)',
                    margin: 0,
                    fontSize: '1.1rem'
                  }}>
                    Review and manage your consultation requests and appointments.
                  </p>
                </div>

                {appointments.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    background: 'var(--gray-900)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-700)'
                  }}>
                    <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📅</div>
                    <h3 style={{color: 'var(--white)', marginBottom: '1rem'}}>No Appointments Yet</h3>
                    <p style={{color: 'var(--gray-400)', marginBottom: '2rem'}}>
                      You haven't received any appointment requests yet. They will appear here once patients book consultations with you.
                    </p>
                    <div style={{
                      background: 'var(--gray-800)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--gray-700)',
                      display: 'inline-block'
                    }}>
                      <div style={{color: 'var(--gray-400)', fontSize: '0.9rem'}}>
                        💡 Tip: Keep your profile updated to attract more patients
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {appointments.map((appt, index) => (
                      <div
                        key={appt._id || index}
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
                          }}>👤</div>
                          <div>
                            <h3 style={{
                              color: 'var(--white)',
                              margin: '0 0 0.25rem 0',
                              fontSize: '1.1rem'
                            }}>
                              {appt.patientId?.name || 'Patient'}
                            </h3>
                            <p style={{
                              color: 'var(--gray-400)',
                              margin: 0,
                              fontSize: '0.9rem'
                            }}>
                              {new Date(appt.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            color: getStatusColor(appt.status),
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <span>{getStatusIcon(appt.status)}</span>
                            {appt.status || 'Pending'}
                          </div>
                        </div>

                        {appt.notes && (
                          <div style={{
                            background: 'var(--gray-800)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: '1rem',
                            border: '1px solid var(--gray-700)'
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
                              Patient Notes
                            </div>
                            <div style={{color: 'var(--white)'}}>{appt.notes}</div>
                          </div>
                        )}

                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap'
                        }}>
                          {appt.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(appt._id, 'confirmed')}
                                disabled={updatingStatus === appt._id}
                                style={{
                                  padding: '0.5rem 1rem',
                                  background: 'var(--success)',
                                  color: 'var(--white)',
                                  border: 'none',
                                  borderRadius: 'var(--radius-lg)',
                                  cursor: updatingStatus === appt._id ? 'not-allowed' : 'pointer',
                                  fontSize: '0.9rem',
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  transition: 'all var(--transition-normal)'
                                }}
                                onMouseEnter={(e) => {
                                  if (updatingStatus !== appt._id) e.target.style.background = 'var(--success-hover)'
                                }}
                                onMouseLeave={(e) => {
                                  if (updatingStatus !== appt._id) e.target.style.background = 'var(--success)'
                                }}
                              >
                                {updatingStatus === appt._id ? (
                                  <>
                                    <div className="spinner" style={{
                                      width: '12px',
                                      height: '12px',
                                      border: '1px solid var(--white)',
                                      borderTop: '1px solid var(--gray-400)',
                                      borderRadius: '50%',
                                      animation: 'spin 1s linear infinite'
                                    }}></div>
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <span>✅</span>
                                    Accept
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(appt._id, 'rejected')}
                                disabled={updatingStatus === appt._id}
                                style={{
                                  padding: '0.5rem 1rem',
                                  background: 'var(--error)',
                                  color: 'var(--white)',
                                  border: 'none',
                                  borderRadius: 'var(--radius-lg)',
                                  cursor: updatingStatus === appt._id ? 'not-allowed' : 'pointer',
                                  fontSize: '0.9rem',
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  transition: 'all var(--transition-normal)'
                                }}
                                onMouseEnter={(e) => {
                                  if (updatingStatus !== appt._id) e.target.style.background = 'var(--error-hover)'
                                }}
                                onMouseLeave={(e) => {
                                  if (updatingStatus !== appt._id) e.target.style.background = 'var(--error)'
                                }}
                              >
                                <span>❌</span>
                                Reject
                              </button>
                            </>
                          )}
                          {appt.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(appt._id, 'completed')}
                              disabled={updatingStatus === appt._id}
                              style={{
                                padding: '0.5rem 1rem',
                                background: 'var(--info)',
                                color: 'var(--white)',
                                border: 'none',
                                borderRadius: 'var(--radius-lg)',
                                cursor: updatingStatus === appt._id ? 'not-allowed' : 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                transition: 'all var(--transition-normal)'
                              }}
                              onMouseEnter={(e) => {
                                if (updatingStatus !== appt._id) e.target.style.background = '#0d8bf0'
                              }}
                              onMouseLeave={(e) => {
                                if (updatingStatus !== appt._id) e.target.style.background = 'var(--info)'
                              }}
                            >
                              {updatingStatus === appt._id ? (
                                <>
                                  <div className="spinner" style={{
                                    width: '12px',
                                    height: '12px',
                                    border: '1px solid var(--white)',
                                    borderTop: '1px solid var(--gray-400)',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                  }}></div>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <span>✔️</span>
                                  Mark Complete
                                </>
                              )}
                            </button>
                          )}
                        </div>
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
