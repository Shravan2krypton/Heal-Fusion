import React, { useState, useEffect } from 'react'

export default function Consultations() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [bookingLoading, setBookingLoading] = useState(null)
  const [sortBy, setSortBy] = useState('rating')

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/doctors')
      if (!response.ok) throw new Error('Failed to fetch doctors')
      const data = await response.json()
      setDoctors(data)
      setFilteredDoctors(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    let filtered = [...doctors]

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(doc => doc.specialization === selectedSpecialty)
    }

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'experience':
          return (b.experience || 0) - (a.experience || 0)
        case 'fee':
          return (a.consultationFee || 0) - (b.consultationFee || 0)
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredDoctors(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [searchTerm, selectedSpecialty, sortBy])

  const handleBookAppointment = async (doctorId) => {
    try {
      setBookingLoading(doctorId)
      const response = await fetch('/api/consultations/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorId })
      })

      if (!response.ok) throw new Error('Failed to book appointment')

      // Show success message
      alert('✅ Appointment request sent successfully! The doctor will contact you soon.')
    } catch (err) {
      alert(`❌ Error: ${err.message}`)
    } finally {
      setBookingLoading(null)
    }
  }

  const specialties = [...new Set(doctors.map(doc => doc.specialization))]

  const stats = {
    totalDoctors: doctors.length,
    specialties: specialties.length,
    avgRating: doctors.length > 0 ? (doctors.reduce((sum, doc) => sum + (doc.rating || 0), 0) / doctors.length).toFixed(1) : 0
  }

  return (
    <div className="consultations-page">
      {/* Hero Section */}
      <div className="page-hero" style={{
        background: 'var(--gradient-primary)',
        color: 'var(--white)',
        padding: '3rem 0',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          animation: 'float 3s ease-in-out infinite'
        }}>👨‍⚕️</div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, var(--white), var(--gray-200))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Find Your Perfect Doctor
        </h1>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          opacity: '0.9',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Connect with verified healthcare professionals for personalized medical consultations.
          Get expert advice from the comfort of your home.
        </p>

        {/* Quick Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          marginTop: '2rem'
        }}>
          <div className="stat-card" style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>👨‍⚕️</div>
            <div style={{fontSize: '1.5rem', fontWeight: '700'}}>{stats.totalDoctors}</div>
            <div style={{fontSize: '0.9rem', opacity: '0.8'}}>Doctors Available</div>
          </div>
          <div className="stat-card" style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>🏥</div>
            <div style={{fontSize: '1.5rem', fontWeight: '700'}}>{stats.specialties}</div>
            <div style={{fontSize: '0.9rem', opacity: '0.8'}}>Specialties</div>
          </div>
          <div className="stat-card" style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>⭐</div>
            <div style={{fontSize: '1.5rem', fontWeight: '700'}}>{stats.avgRating}</div>
            <div style={{fontSize: '0.9rem', opacity: '0.8'}}>Avg Rating</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-error" style={{
          background: 'var(--error-bg)',
          color: 'var(--error)',
          padding: '1rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--error-border)',
          marginBottom: '2rem'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span>❌</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Search & Filter Section */}
      <div className="search-filter-section" style={{
        background: 'var(--gray-900)',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        marginBottom: '2rem',
        border: '1px solid var(--gray-700)'
      }}>
        <h3 style={{
          color: 'var(--white)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🔍 Search & Filter Doctors
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="form-group">
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--gray-300)',
              fontWeight: '500'
            }}>
              🔍 Search by Name, Specialty, or Location
            </label>
            <input
              type="text"
              placeholder="E.g., Dr. Smith, Cardiologist, New York"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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
              🏥 Filter by Specialty
            </label>
            <select
              value={selectedSpecialty}
              onChange={e => setSelectedSpecialty(e.target.value)}
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
              <option value="">All Specialties</option>
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--gray-300)',
              fontWeight: '500'
            }}>
              📊 Sort By
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
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
              <option value="rating">⭐ Highest Rated</option>
              <option value="experience">🎓 Most Experienced</option>
              <option value="fee">💰 Lowest Fee</option>
              <option value="name">📝 Name (A-Z)</option>
            </select>
          </div>
        </div>

        {(searchTerm || selectedSpecialty) && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: 'var(--primary-bg)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--primary-border)'
          }}>
            <div style={{
              color: 'var(--primary)',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>📋</span>
              <span>
                Showing {filteredDoctors.length} of {doctors.length} doctors
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedSpecialty && ` in ${selectedSpecialty}`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Doctors Grid */}
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
          <p style={{color: 'var(--gray-400)', fontSize: '1.1rem'}}>Finding the best doctors for you...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="empty-state" style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'var(--gray-900)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--gray-700)'
        }}>
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🔍</div>
          <h3 style={{color: 'var(--white)', marginBottom: '1rem'}}>No Doctors Found</h3>
          <p style={{color: 'var(--gray-400)', marginBottom: '2rem'}}>
            Try adjusting your search criteria or browse all available doctors.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedSpecialty('')
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--gradient-primary)',
              color: 'var(--white)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Show All Doctors
          </button>
        </div>
      ) : (
        <div className="doctors-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredDoctors.map(doctor => (
            <div
              key={doctor._id}
              className="doctor-card"
              style={{
                background: 'var(--gray-900)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--gray-700)',
                overflow: 'hidden',
                transition: 'all var(--transition-normal)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)'
                e.target.style.boxShadow = 'var(--shadow-xl)'
                e.target.style.borderColor = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
                e.target.style.borderColor = 'var(--gray-700)'
              }}
            >
              <div className="doctor-header" style={{
                background: 'var(--gradient-primary)',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div className="doctor-avatar" style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  display: 'inline-block'
                }}>👨‍⚕️</div>
                <h3 style={{
                  color: 'var(--white)',
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.25rem',
                  fontWeight: '700'
                }}>{doctor.name}</h3>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'var(--white)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  display: 'inline-block'
                }}>
                  {doctor.specialization}
                </div>
                {doctor.rating && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255,255,255,0.9)',
                    color: 'var(--gray-900)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span>⭐</span>
                    {doctor.rating.toFixed(1)}
                  </div>
                )}
              </div>

              <div className="doctor-body" style={{
                padding: '1.5rem'
              }}>
                <div className="doctor-info" style={{
                  marginBottom: '1.5rem'
                }}>
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
                      <div style={{fontSize: '1.25rem', marginBottom: '0.25rem'}}>🎓</div>
                      <div style={{fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: '0.25rem'}}>Experience</div>
                      <div style={{fontWeight: '600', color: 'var(--white)'}}>{doctor.experience || 'N/A'} yrs</div>
                    </div>
                    <div style={{
                      background: 'var(--gray-800)',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-lg)',
                      textAlign: 'center'
                    }}>
                      <div style={{fontSize: '1.25rem', marginBottom: '0.25rem'}}>💰</div>
                      <div style={{fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: '0.25rem'}}>Consultation</div>
                      <div style={{fontWeight: '600', color: 'var(--white)'}}>${doctor.consultationFee || 'N/A'}</div>
                    </div>
                  </div>

                  <div style={{
                    background: 'var(--gray-800)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: 'var(--gray-300)',
                      fontSize: '0.9rem'
                    }}>
                      <span>📧</span>
                      <span>{doctor.email}</span>
                    </div>
                    {doctor.phone && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--gray-300)',
                        fontSize: '0.9rem'
                      }}>
                        <span>📞</span>
                        <span>{doctor.phone}</span>
                      </div>
                    )}
                    {doctor.location && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--gray-300)',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem'
                      }}>
                        <span>📍</span>
                        <span>{doctor.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleBookAppointment(doctor._id)}
                  disabled={bookingLoading === doctor._id}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    background: bookingLoading === doctor._id ? 'var(--gray-600)' : 'var(--gradient-primary)',
                    color: 'var(--white)',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    cursor: bookingLoading === doctor._id ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all var(--transition-normal)'
                  }}
                  onMouseEnter={(e) => {
                    if (bookingLoading !== doctor._id) {
                      e.target.style.transform = 'translateY(-1px)'
                      e.target.style.boxShadow = 'var(--shadow-lg)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  {bookingLoading === doctor._id ? (
                    <>
                      <div className="spinner" style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid var(--gray-400)',
                        borderTop: '2px solid var(--white)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Booking...
                    </>
                  ) : (
                    <>
                      <span>📅</span>
                      Book Appointment
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Additional Info Section */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'var(--gray-900)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--gray-700)',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: 'var(--white)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          🏥 How It Works
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{
            padding: '1.5rem',
            background: 'var(--gray-800)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-700)'
          }}>
            <div style={{fontSize: '2rem', marginBottom: '1rem'}}>1️⃣</div>
            <h4 style={{color: 'var(--white)', marginBottom: '0.5rem'}}>Choose Your Doctor</h4>
            <p style={{color: 'var(--gray-400)', fontSize: '0.9rem'}}>
              Browse verified doctors by specialty, rating, and location to find the perfect match for your needs.
            </p>
          </div>
          <div style={{
            padding: '1.5rem',
            background: 'var(--gray-800)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-700)'
          }}>
            <div style={{fontSize: '2rem', marginBottom: '1rem'}}>2️⃣</div>
            <h4 style={{color: 'var(--white)', marginBottom: '0.5rem'}}>Book Appointment</h4>
            <p style={{color: 'var(--gray-400)', fontSize: '0.9rem'}}>
              Send an appointment request with your preferred time. The doctor will confirm and contact you directly.
            </p>
          </div>
          <div style={{
            padding: '1.5rem',
            background: 'var(--gray-800)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-700)'
          }}>
            <div style={{fontSize: '2rem', marginBottom: '1rem'}}>3️⃣</div>
            <h4 style={{color: 'var(--white)', marginBottom: '0.5rem'}}>Get Consultation</h4>
            <p style={{color: 'var(--gray-400)', fontSize: '0.9rem'}}>
              Connect via video call, phone, or in-person for professional medical advice and treatment guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
