import React, { useState, useEffect } from 'react'

export default function MedicalHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [newEntry, setNewEntry] = useState({
    condition: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    medicines: '',
    severity: 'mild',
    category: 'general'
  })
  const [showForm, setShowForm] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/medical-history')
      if (!response.ok) throw new Error('Failed to fetch history')
      const data = await response.json()
      setHistory(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEntry = async () => {
    if (!newEntry.condition.trim()) {
      alert('❌ Please enter a condition')
      return
    }

    try {
      setSaving(true)
      const response = await fetch('/api/medical-history/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      })

      if (!response.ok) throw new Error('Failed to add entry')

      setNewEntry({
        condition: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        medicines: '',
        severity: 'mild',
        category: 'general'
      })
      setShowForm(false)
      fetchHistory()
      alert('✅ Medical history entry added successfully!')
    } catch (err) {
      alert(`❌ Error: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const filteredHistory = history.filter(entry => {
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory
    const matchesSearch = !searchTerm ||
      entry.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.medicines.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = [...new Set(history.map(entry => entry.category))]

  const stats = {
    totalEntries: history.length,
    thisMonth: history.filter(entry => {
      const entryDate = new Date(entry.date)
      const now = new Date()
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear()
    }).length,
    categories: categories.length,
    severeConditions: history.filter(entry => entry.severity === 'severe').length
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return 'var(--success)'
      case 'moderate': return 'var(--warning)'
      case 'severe': return 'var(--error)'
      default: return 'var(--gray-400)'
    }
  }

  const getCategoryIcon = (category) => {
    const icons = {
      general: '🏥',
      cardiovascular: '❤️',
      respiratory: '🫁',
      digestive: '🍽️',
      neurological: '🧠',
      musculoskeletal: '🦴',
      dermatological: '🧴',
      mental: '🧘',
      endocrine: '⚡',
      other: '📋'
    }
    return icons[category] || '📋'
  }

  return (
    <div className="medical-history-page">
      {/* Hero Section */}
      <div className="page-hero" style={{
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        color: 'var(--white)',
        padding: '3rem 0',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          animation: 'float 3s ease-in-out infinite'
        }}>📚</div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem'
        }}>
          Your Health Journey
        </h1>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          opacity: '0.9',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Track your medical history, monitor conditions, and maintain comprehensive health records
          for better healthcare decisions.
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
            <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>📋</div>
            <div style={{fontSize: '1.5rem', fontWeight: '700'}}>{stats.totalEntries}</div>
            <div style={{fontSize: '0.9rem', opacity: '0.8'}}>Total Records</div>
          </div>
          <div className="stat-card" style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>📅</div>
            <div style={{fontSize: '1.5rem', fontWeight: '700'}}>{stats.thisMonth}</div>
            <div style={{fontSize: '0.9rem', opacity: '0.8'}}>This Month</div>
          </div>
          <div className="stat-card" style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>🏥</div>
            <div style={{fontSize: '1.5rem', fontWeight: '700'}}>{stats.categories}</div>
            <div style={{fontSize: '0.9rem', opacity: '0.8'}}>Categories</div>
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

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '0.75rem 1.5rem',
            background: showForm ? 'var(--error)' : 'var(--gradient-primary)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all var(--transition-normal)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {showForm ? <><span>❌</span> Cancel</> : <><span>➕</span> Add New Entry</>}
        </button>

        {history.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="🔍 Search records..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid var(--gray-600)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gray-800)',
                color: 'var(--white)',
                fontSize: '1rem',
                minWidth: '200px'
              }}
            />
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid var(--gray-600)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gray-800)',
                color: 'var(--white)',
                fontSize: '1rem'
              }}
            >
              <option value="all">🏥 All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {getCategoryIcon(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <div className="add-entry-form" style={{
          background: 'var(--gray-900)',
          padding: '2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--gray-700)',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            color: 'var(--white)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>🏥</span>
            Add Medical History Entry
          </h3>

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
                🏥 Condition/Illness *
              </label>
              <input
                type="text"
                value={newEntry.condition}
                onChange={e => setNewEntry({...newEntry, condition: e.target.value})}
                placeholder="E.g., Hypertension, Diabetes, Common Cold"
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
                📅 Date of Diagnosis/Treatment
              </label>
              <input
                type="date"
                value={newEntry.date}
                onChange={e => setNewEntry({...newEntry, date: e.target.value})}
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
                📋 Category
              </label>
              <select
                value={newEntry.category}
                onChange={e => setNewEntry({...newEntry, category: e.target.value})}
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
                <option value="general">🏥 General Medicine</option>
                <option value="cardiovascular">❤️ Cardiovascular</option>
                <option value="respiratory">🫁 Respiratory</option>
                <option value="digestive">🍽️ Digestive</option>
                <option value="neurological">🧠 Neurological</option>
                <option value="musculoskeletal">🦴 Musculoskeletal</option>
                <option value="dermatological">🧴 Dermatological</option>
                <option value="mental">🧘 Mental Health</option>
                <option value="endocrine">⚡ Endocrine</option>
                <option value="other">📋 Other</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--gray-300)',
                fontWeight: '500'
              }}>
                ⚠️ Severity Level
              </label>
              <select
                value={newEntry.severity}
                onChange={e => setNewEntry({...newEntry, severity: e.target.value})}
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
                <option value="mild">🟢 Mild</option>
                <option value="moderate">🟡 Moderate</option>
                <option value="severe">🔴 Severe</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{marginTop: '1.5rem'}}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--gray-300)',
              fontWeight: '500'
            }}>
              💊 Medicines/Treatments
            </label>
            <input
              type="text"
              value={newEntry.medicines}
              onChange={e => setNewEntry({...newEntry, medicines: e.target.value})}
              placeholder="E.g., Amlodipine 5mg daily, Physical therapy sessions"
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

          <div className="form-group" style={{marginTop: '1.5rem'}}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--gray-300)',
              fontWeight: '500'
            }}>
              📝 Additional Notes
            </label>
            <textarea
              value={newEntry.notes}
              onChange={e => setNewEntry({...newEntry, notes: e.target.value})}
              placeholder="Describe symptoms, treatment progress, doctor's recommendations, or any other relevant details..."
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-600)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gray-800)',
                color: 'var(--white)',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleAddEntry}
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
              onMouseEnter={(e) => {
                if (!saving) e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                if (!saving) e.target.style.transform = 'translateY(0)'
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
                  Save Entry
                </>
              )}
            </button>
            <button
              onClick={() => setShowForm(false)}
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

      {/* Medical History Timeline */}
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
          <p style={{color: 'var(--gray-400)', fontSize: '1.1rem'}}>Loading your health records...</p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="empty-state" style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'var(--gray-900)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--gray-700)'
        }}>
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📋</div>
          <h3 style={{color: 'var(--white)', marginBottom: '1rem'}}>
            {history.length === 0 ? 'No Medical History Yet' : 'No Records Found'}
          </h3>
          <p style={{color: 'var(--gray-400)', marginBottom: '2rem'}}>
            {history.length === 0
              ? 'Start building your health history by adding your first medical record above.'
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
          {history.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
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
              Add Your First Record
            </button>
          )}
        </div>
      ) : (
        <div className="history-timeline" style={{
          position: 'relative',
          paddingLeft: '2rem'
        }}>
          <div style={{
            position: 'absolute',
            left: '1rem',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--gradient-primary)',
            borderRadius: '1px'
          }}></div>

          {filteredHistory.map((entry, index) => (
            <div
              key={entry._id}
              className="timeline-entry"
              style={{
                position: 'relative',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'var(--gray-900)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--gray-700)',
                marginLeft: '1rem'
              }}
            >
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute',
                left: '-2.5rem',
                top: '2rem',
                width: '1rem',
                height: '1rem',
                background: getSeverityColor(entry.severity),
                borderRadius: '50%',
                border: '3px solid var(--gray-900)',
                boxShadow: '0 0 0 2px var(--gray-700)'
              }}></div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h4 style={{
                    color: 'var(--white)',
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>{getCategoryIcon(entry.category)}</span>
                    {entry.condition}
                  </h4>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: 'var(--gray-400)',
                      fontSize: '0.9rem'
                    }}>
                      <span>📅</span>
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div style={{
                      background: getSeverityColor(entry.severity),
                      color: 'var(--white)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {entry.severity.charAt(0).toUpperCase() + entry.severity.slice(1)}
                    </div>
                    <div style={{
                      background: 'var(--gray-800)',
                      color: 'var(--gray-300)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      textTransform: 'capitalize'
                    }}>
                      {entry.category}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                {entry.medicines && (
                  <div style={{
                    background: 'var(--gray-800)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--gray-700)'
                  }}>
                    <div style={{
                      fontWeight: '600',
                      color: 'var(--white)',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>💊</span>
                      Medicines & Treatments
                    </div>
                    <div style={{color: 'var(--gray-300)'}}>{entry.medicines}</div>
                  </div>
                )}

                {entry.notes && (
                  <div style={{
                    background: 'var(--gray-800)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--gray-700)'
                  }}>
                    <div style={{
                      fontWeight: '600',
                      color: 'var(--white)',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>📝</span>
                      Notes & Details
                    </div>
                    <div style={{color: 'var(--gray-300)'}}>{entry.notes}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Health Insights */}
      {history.length > 0 && (
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'var(--gray-900)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--gray-700)'
        }}>
          <h3 style={{
            color: 'var(--white)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>📊</span>
            Health Insights
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              background: 'var(--gray-800)',
              padding: '1rem',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>📈</div>
              <div style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--white)'}}>
                {Math.round((stats.thisMonth / Math.max(stats.totalEntries, 1)) * 100)}%
              </div>
              <div style={{fontSize: '0.9rem', color: 'var(--gray-400)'}}>
                Recent Activity
              </div>
            </div>
            <div style={{
              background: 'var(--gray-800)',
              padding: '1rem',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>🏥</div>
              <div style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--white)'}}>
                {stats.categories}
              </div>
              <div style={{fontSize: '0.9rem', color: 'var(--gray-400)'}}>
                Health Categories
              </div>
            </div>
            <div style={{
              background: 'var(--gray-800)',
              padding: '1rem',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>⚠️</div>
              <div style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--white)'}}>
                {stats.severeConditions}
              </div>
              <div style={{fontSize: '0.9rem', color: 'var(--gray-400)'}}>
                Severe Conditions
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

