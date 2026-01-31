import React, { useState, useEffect } from 'react'

export default function Symptoms() {
  const [symptoms, setSymptoms] = useState('')
  const [language, setLanguage] = useState('en')
  const [listening, setListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const [diagnosis, setDiagnosis] = useState(null)
  const [error, setError] = useState('')
  const [charCount, setCharCount] = useState(0)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' }
  ]

  useEffect(() => {
    setCharCount(symptoms.length)
  }, [symptoms])

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('🎤 Voice input is not supported in your browser. Please use Chrome, Edge, or Safari for the best experience.')
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.language = language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'gu-IN'
    recognition.continuous = false
    recognition.interimResults = false

    setListening(true)
    setError('')
    recognition.start()

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setSymptoms(prev => prev + (prev ? ' ' : '') + transcript)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognition.onerror = (err) => {
      setError(`🎤 Voice recognition error: ${err.error}. Please try again or type your symptoms.`)
      setListening(false)
    }
  }

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      setError('📝 Please enter or describe your symptoms before analysis.')
      return
    }

    if (symptoms.trim().length < 10) {
      setError('📝 Please provide more details about your symptoms for accurate analysis.')
      return
    }

    setLoading(true)
    setError('')
    setDiagnosis(null)

    try {
      const token = localStorage.getItem('hf_token');
      const response = await fetch('/api/symptoms/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ text: symptoms.trim() })
      })

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setDiagnosis(data)
    } catch (err) {
      setError(`❌ ${err.message || 'Failed to analyze symptoms. Please try again.'}`)
      console.error('Diagnosis error:', err)
    } finally {
      setLoading(false)
    }
  }

  const clearSymptoms = () => {
    setSymptoms('')
    setDiagnosis(null)
    setError('')
  }

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low': return 'var(--success)'
      case 'medium': return 'var(--warning)'
      case 'high': return 'var(--error)'
      default: return 'var(--gray-500)'
    }
  }

  return (
    <div className="symptoms-page">
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        background: 'var(--white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--gray-200)'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: 'pulse 2s infinite'
        }}>🔍</div>
        <h1 style={{
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem'
        }}>AI Symptom Diagnosis</h1>
        <p style={{
          color: 'var(--gray-600)',
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Describe your symptoms and receive intelligent health insights powered by advanced AI technology.
        </p>
      </div>

      {error && (
        <div className="alert alert-error" style={{marginBottom: '2rem'}}>
          {error}
        </div>
      )}

      {/* Language Selection */}
      <div style={{
        background: 'var(--white)',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--gray-200)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          color: 'var(--primary)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🌍 Choose Your Language
        </h3>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {languages.map((lang) => (
            <label
              key={lang.code}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: `2px solid ${language === lang.code ? 'var(--primary)' : 'var(--gray-200)'}`,
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                background: language === lang.code ? 'rgba(37, 99, 235, 0.05)' : 'var(--gray-50)',
                flex: 1,
                minWidth: '120px',
                justifyContent: 'center'
              }}
            >
              <input
                type="radio"
                name="language"
                value={lang.code}
                checked={language === lang.code}
                onChange={(e) => setLanguage(e.target.value)}
                style={{display: 'none'}}
              />
              <span style={{fontSize: '1.25rem'}}>{lang.flag}</span>
              <span style={{fontWeight: '500'}}>{lang.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Voice Input Section */}
      <div className="voice-input-section" style={{
        background: 'var(--white)',
        padding: '3rem 2rem',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--gray-200)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: 'var(--primary)',
          marginBottom: '1rem'
        }}>
          🎤 Voice Input
        </h3>
        <p style={{
          color: 'var(--gray-600)',
          marginBottom: '2rem'
        }}>
          Click the microphone and describe your symptoms naturally
        </p>

        <button
          type="button"
          className={`microphone-button ${listening ? 'listening' : ''}`}
          onClick={handleVoiceInput}
          disabled={loading}
          style={{
            marginBottom: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        />

        <p style={{
          fontSize: '1rem',
          fontWeight: '500',
          color: listening ? 'var(--error)' : 'var(--gray-600)',
          marginBottom: '1rem'
        }}>
          {listening ? '🎧 Listening... Speak now' : 'Click microphone to start speaking'}
        </p>

        {!('webkitSpeechRecognition' in window) && (
          <div className="alert alert-warning" style={{marginTop: '1rem'}}>
            <strong>⚠️ Browser Compatibility:</strong> Voice input works best in Chrome, Edge, or Safari. You can still type your symptoms below.
          </div>
        )}
      </div>

      {/* Text Input Section */}
      <div style={{
        background: 'var(--white)',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--gray-200)',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h3 style={{
            color: 'var(--primary)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📝 Describe Your Symptoms
          </h3>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '0.875rem',
              color: charCount > 500 ? 'var(--error)' : 'var(--gray-500)'
            }}>
              {charCount}/500
            </span>
            {symptoms && (
              <button
                onClick={clearSymptoms}
                style={{
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  background: 'var(--gray-200)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  color: 'var(--gray-700)'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <textarea
          value={symptoms}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setSymptoms(e.target.value)
            }
          }}
          placeholder={`Example: "I've had a persistent headache for 3 days, accompanied by nausea and sensitivity to light. I also have a mild fever of 100°F and feel fatigued."`}
          rows={6}
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px solid var(--gray-200)',
            borderRadius: 'var(--radius-lg)',
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            background: 'var(--gray-50)',
            transition: 'all var(--transition-normal)',
            marginBottom: '1rem'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--gray-200)'}
        />

        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleAnalyze}
            disabled={loading || !symptoms.trim()}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              opacity: (loading || !symptoms.trim()) ? 0.6 : 1,
              cursor: (loading || !symptoms.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <>
                <span style={{marginRight: '0.5rem'}}>🔄</span>
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <span style={{marginRight: '0.5rem'}}>🔍</span>
                Analyze Symptoms
              </>
            )}
          </button>

          {loading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--primary)',
              fontWeight: '500'
            }}>
              <div className="spinner"></div>
              Processing your symptoms with AI...
            </div>
          )}
        </div>
      </div>

      {/* Diagnosis Results */}
      {diagnosis && (
        <div className="diagnosis-container" style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--gray-200)',
          overflow: 'hidden'
        }}>
          <div className="diagnosis-header" style={{
            background: 'var(--gradient-primary)',
            color: 'var(--white)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>🏥</div>
            <h2 style={{
              color: 'var(--white)',
              margin: '0 0 1rem 0',
              fontSize: '1.75rem'
            }}>
              {diagnosis.disease || 'Analysis Complete'}
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div className={`severity-badge severity-${diagnosis.severity?.toLowerCase() || 'medium'}`}>
                Severity: {diagnosis.severity || 'Medium'}
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-lg)',
                fontWeight: '600'
              }}>
                Confidence: {diagnosis.confidence || '85'}%
              </div>
            </div>
          </div>

          <div style={{padding: '2rem'}}>
            {diagnosis.causes && (
              <div className="diagnosis-info" style={{marginBottom: '2rem'}}>
                <h3 style={{
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🔍 Possible Causes
                </h3>
                <ul style={{
                  background: 'var(--gray-50)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--gray-200)'
                }}>
                  {Array.isArray(diagnosis.causes) ?
                    diagnosis.causes.map((cause, i) => (
                      <li key={i} style={{
                        marginBottom: '0.5rem',
                        paddingLeft: '1rem',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary)'
                        }}>•</span>
                        {cause}
                      </li>
                    )) :
                    <li>{diagnosis.causes}</li>
                  }
                </ul>
              </div>
            )}

            {diagnosis.symptoms && (
              <div className="diagnosis-info" style={{marginBottom: '2rem'}}>
                <h3 style={{
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📋 Associated Symptoms
                </h3>
                <ul style={{
                  background: 'var(--gray-50)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--gray-200)'
                }}>
                  {Array.isArray(diagnosis.symptoms) ?
                    diagnosis.symptoms.map((sym, i) => (
                      <li key={i} style={{
                        marginBottom: '0.5rem',
                        paddingLeft: '1rem',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary)'
                        }}>•</span>
                        {sym}
                      </li>
                    )) :
                    <li>{diagnosis.symptoms}</li>
                  }
                </ul>
              </div>
            )}

            {diagnosis.preventive && (
              <div className="diagnosis-info" style={{marginBottom: '2rem'}}>
                <h3 style={{
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🛡️ Preventive Measures
                </h3>
                <ul style={{
                  background: 'var(--gray-50)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--gray-200)'
                }}>
                  {Array.isArray(diagnosis.preventive) ?
                    diagnosis.preventive.map((measure, i) => (
                      <li key={i} style={{
                        marginBottom: '0.5rem',
                        paddingLeft: '1rem',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary)'
                        }}>•</span>
                        {measure}
                      </li>
                    )) :
                    <li>{diagnosis.preventive}</li>
                  }
                </ul>
              </div>
            )}

            {diagnosis.remedies && (
              <div className="diagnosis-info" style={{marginBottom: '2rem'}}>
                <h3 style={{
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🌿 Home Remedies
                </h3>
                <ul style={{
                  background: 'var(--gray-50)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--gray-200)'
                }}>
                  {Array.isArray(diagnosis.remedies) ?
                    diagnosis.remedies.map((remedy, i) => (
                      <li key={i} style={{
                        marginBottom: '0.5rem',
                        paddingLeft: '1rem',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--primary)'
                        }}>•</span>
                        {remedy}
                      </li>
                    )) :
                    <li>{diagnosis.remedies}</li>
                  }
                </ul>
              </div>
            )}

            <div className="alert alert-info" style={{marginBottom: '2rem'}}>
              <div style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>💡</div>
              <strong>Recommendation:</strong> {diagnosis.recommendation || 'Please consult with a healthcare professional for proper diagnosis and treatment.'}
            </div>

            <div className="alert alert-warning">
              <div style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>⚠️</div>
              <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and does NOT replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for accurate medical decisions. In case of severe symptoms or medical emergencies, seek immediate medical attention.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
