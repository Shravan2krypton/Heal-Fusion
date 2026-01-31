import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function AdminPanel() {
  const { logout } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({ totalUsers: 0, totalDoctors: 0, totalConsultations: 0, totalDiseases: 0 })
  const [users, setUsers] = useState([])
  const [doctors, setDoctors] = useState([])
  const [diseases, setDiseases] = useState([])
  const [newDisease, setNewDisease] = useState({ name: '', description: '', severity: 'medium' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    try {
      setLoading(true)
      setError('')
      const [statsRes, usersRes, doctorsRes, diseasesRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/users'),
        fetch('/api/admin/doctors'),
        fetch('/api/admin/diseases')
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
      if (usersRes.ok) setUsers(await usersRes.json())
      if (doctorsRes.ok) setDoctors(await doctorsRes.json())
      if (diseasesRes.ok) setDiseases(await diseasesRes.json())
    } catch (err) {
      setError('Failed to load admin data. Please try again.')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDisease = async () => {
    if (!newDisease.name.trim()) {
      setError('Please enter disease name')
      return
    }

    try {
      setError('')
      const response = await fetch('/api/admin/diseases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDisease)
      })

      if (response.ok) {
        setNewDisease({ name: '', description: '', severity: 'medium' })
        setSuccess('Disease added successfully!')
        loadAdminData()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to add disease. Please try again.')
      }
    } catch (err) {
      setError('Error adding disease. Please check your connection.')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        setError('')
        const response = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
        if (response.ok) {
          setSuccess('User deleted successfully!')
          loadAdminData()
          setTimeout(() => setSuccess(''), 3000)
        } else {
          setError('Failed to delete user.')
        }
      } catch (err) {
        setError('Error deleting user. Please try again.')
      }
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">⚙️</span>
            <span className="logo-text">Admin Panel</span>
          </div>
          <p className="sidebar-subtitle">System Management</p>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h4 className="nav-section-title">Dashboard</h4>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Overview</span>
            </button>
          </div>

          <div className="nav-section">
            <h4 className="nav-section-title">Management</h4>
            <button
              onClick={() => setActiveTab('users')}
              className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-text">Users</span>
              <span className="nav-badge">{stats.totalUsers}</span>
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`nav-link ${activeTab === 'doctors' ? 'active' : ''}`}
            >
              <span className="nav-icon">👨‍⚕️</span>
              <span className="nav-text">Doctors</span>
              <span className="nav-badge">{stats.totalDoctors}</span>
            </button>
            <button
              onClick={() => setActiveTab('diseases')}
              className={`nav-link ${activeTab === 'diseases' ? 'active' : ''}`}
            >
              <span className="nav-icon">🦠</span>
              <span className="nav-text">Diseases</span>
              <span className="nav-badge">{stats.totalDiseases}</span>
            </button>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="logout-btn">
            <span className="logout-icon">🚪</span>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="content-header">
          <div className="header-info">
            <h1 className="page-title">
              {activeTab === 'dashboard' && 'System Overview'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'doctors' && 'Doctor Management'}
              {activeTab === 'diseases' && 'Disease Database'}
            </h1>
            <p className="page-subtitle">
              {activeTab === 'dashboard' && 'Monitor system performance and key metrics'}
              {activeTab === 'users' && 'Manage user accounts and permissions'}
              {activeTab === 'doctors' && 'Oversee healthcare providers'}
              {activeTab === 'diseases' && 'Maintain medical knowledge base'}
            </p>
          </div>
          <div className="header-actions">
            <button onClick={loadAdminData} className="refresh-btn" disabled={loading}>
              <span className="refresh-icon">{loading ? '⏳' : '🔄'}</span>
              Refresh
            </button>
          </div>
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
            <span className="alert-text">{success}</span>
            <button onClick={() => setSuccess('')} className="alert-close">×</button>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            {loading ? (
              <div className="loading-container">
                <div className="spinner-large"></div>
                <p>Loading dashboard data...</p>
              </div>
            ) : (
              <>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                      <h3 className="stat-number">{stats.totalUsers.toLocaleString()}</h3>
                      <p className="stat-label">Total Users</p>
                      <div className="stat-trend positive">↗️ Active</div>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">👨‍⚕️</div>
                    <div className="stat-content">
                      <h3 className="stat-number">{stats.totalDoctors.toLocaleString()}</h3>
                      <p className="stat-label">Healthcare Providers</p>
                      <div className="stat-trend positive">↗️ Growing</div>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                      <h3 className="stat-number">{stats.totalConsultations.toLocaleString()}</h3>
                      <p className="stat-label">Total Consultations</p>
                      <div className="stat-trend positive">↗️ This Month</div>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">🦠</div>
                    <div className="stat-content">
                      <h3 className="stat-number">{stats.totalDiseases.toLocaleString()}</h3>
                      <p className="stat-label">Diseases in Database</p>
                      <div className="stat-trend neutral">→ Updated</div>
                    </div>
                  </div>
                </div>

                <div className="quick-actions">
                  <h3>Quick Actions</h3>
                  <div className="action-buttons">
                    <button onClick={() => setActiveTab('users')} className="action-btn">
                      <span className="action-icon">👥</span>
                      <span className="action-text">Manage Users</span>
                    </button>
                    <button onClick={() => setActiveTab('doctors')} className="action-btn">
                      <span className="action-icon">👨‍⚕️</span>
                      <span className="action-text">View Doctors</span>
                    </button>
                    <button onClick={() => setActiveTab('diseases')} className="action-btn">
                      <span className="action-icon">🦠</span>
                      <span className="action-text">Update Database</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="management-section">
            <div className="section-header">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h3>No users found</h3>
                <p>{searchTerm ? 'Try adjusting your search terms.' : 'No user accounts have been registered yet.'}</p>
              </div>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User Details</th>
                      <th>Role</th>
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user._id}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                            <div className="user-details">
                              <div className="user-name">{user.name}</div>
                              <div className="user-email">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`role-badge role-${user.role.toLowerCase()}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="action-btn-danger"
                            title="Delete User"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div className="management-section">
            <div className="section-header">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search doctors by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>

            {filteredDoctors.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👨‍⚕️</div>
                <h3>No doctors found</h3>
                <p>{searchTerm ? 'Try adjusting your search terms.' : 'No doctors have been registered yet.'}</p>
              </div>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Doctor Details</th>
                      <th>Specialization</th>
                      <th>Experience</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.map(doctor => (
                      <tr key={doctor._id}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">{doctor.name.charAt(0).toUpperCase()}</div>
                            <div className="user-details">
                              <div className="user-name">{doctor.name}</div>
                              <div className="user-email">{doctor.specialization}</div>
                            </div>
                          </div>
                        </td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.experience} years</td>
                        <td>
                          <div className="rating-display">
                            <span className="rating-stars">⭐</span>
                            <span className="rating-score">{doctor.rating?.toFixed(1) || 'N/A'}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Diseases Tab */}
        {activeTab === 'diseases' && (
          <div className="management-section">
            <div className="section-header">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search diseases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>

            <div className="add-disease-form">
              <h3>Add New Disease</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Disease Name *</label>
                  <input
                    type="text"
                    value={newDisease.name}
                    onChange={e => setNewDisease({...newDisease, name: e.target.value})}
                    placeholder="E.g., COVID-19"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Severity Level</label>
                  <select
                    value={newDisease.severity}
                    onChange={e => setNewDisease({...newDisease, severity: e.target.value})}
                    className="form-select"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={newDisease.description}
                    onChange={e => setNewDisease({...newDisease, description: e.target.value})}
                    placeholder="Detailed description of the disease, symptoms, and treatment..."
                    rows={4}
                    className="form-textarea"
                  />
                </div>
              </div>
              <button onClick={handleAddDisease} className="btn-primary">
                <span className="btn-icon">➕</span>
                Add Disease
              </button>
            </div>

            {filteredDiseases.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🦠</div>
                <h3>No diseases found</h3>
                <p>{searchTerm ? 'Try adjusting your search terms.' : 'No diseases have been added to the database yet.'}</p>
              </div>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Disease Name</th>
                      <th>Severity</th>
                      <th>Description</th>
                      <th>Added Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDiseases.map(disease => (
                      <tr key={disease._id}>
                        <td>
                          <div className="disease-name">
                            <span className="disease-icon">🦠</span>
                            <span className="disease-text">{disease.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`severity-badge severity-${disease.severity}`}>
                            {disease.severity.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div className="disease-description">
                            {disease.description.length > 100
                              ? `${disease.description.substring(0, 100)}...`
                              : disease.description
                            }
                          </div>
                        </td>
                        <td>{new Date(disease.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
