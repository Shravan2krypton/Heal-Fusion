import React, { useContext, useState, Suspense, lazy } from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy-loaded pages — each becomes its own chunk for faster initial load
const Login             = lazy(() => import('./pages/Login'))
const Register          = lazy(() => import('./pages/Register'))
const Home              = lazy(() => import('./pages/Home'))
const Symptoms          = lazy(() => import('./pages/Symptoms'))
const MedicalHistory    = lazy(() => import('./pages/MedicalHistory'))
const Consultations     = lazy(() => import('./pages/Consultations'))
const UserPanel         = lazy(() => import('./pages/UserPanel'))
const DoctorPanel       = lazy(() => import('./pages/DoctorPanel'))
const AdminPanel        = lazy(() => import('./pages/AdminPanel'))
const Articles          = lazy(() => import('./pages/Articles'))
const Contact           = lazy(() => import('./pages/Contact'))
const About             = lazy(() => import('./pages/About'))
const Medicine          = lazy(() => import('./pages/Medicine'))
const MedicalReports    = lazy(() => import('./pages/MedicalReports'))
const VideoConsultation = lazy(() => import('./pages/VideoConsultation'))

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
    <div className="spinner" />
  </div>
)

export default function App() {
  const { user, logout } = useContext(AuthContext)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const closeMobileNav = () => setIsMobileNavOpen(false)

  const linkClassName = ({ isActive }) =>
    `nav-link${isActive ? ' active' : ''}`

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-brand">
            <Link to="/" className="logo-link" onClick={closeMobileNav}>
              <div className="logo-container">
                <div className="logo-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="url(#gradient1)" stroke="white" strokeWidth="2"/>
                    <path d="M12 10L20 10L18 14L22 14L16 22L10 14L14 14L12 10Z" fill="white"/>
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#2563eb' }}/>
                        <stop offset="100%" style={{ stopColor: '#7c3aed' }}/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="logo-text">
                  <span className="logo-main">HealFusion</span>
                  <span className="logo-tag">AI Healthcare</span>
                </div>
              </div>
            </Link>
          </div>

          <button
            className="nav-toggle"
            type="button"
            aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            <span className="nav-toggle-line" />
            <span className="nav-toggle-line" />
            <span className="nav-toggle-line" />
          </button>

          <div className={`nav-links ${isMobileNavOpen ? 'open' : ''}`}>
            {!user && (
              <>
                <NavLink to="/login" className={linkClassName} onClick={closeMobileNav}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClassName} onClick={closeMobileNav}>
                  Register
                </NavLink>
              </>
            )}

            {user && (
              <>
                <NavLink to="/symptoms" className={linkClassName} onClick={closeMobileNav}>
                  Diagnose
                </NavLink>
                <NavLink to="/medicine" className={linkClassName} onClick={closeMobileNav}>
                  Medicine
                </NavLink>
                <NavLink to="/video-consultation" className={linkClassName} onClick={closeMobileNav}>
                  Video Call
                </NavLink>
                <NavLink to="/medical-reports" className={linkClassName} onClick={closeMobileNav}>
                  Reports
                </NavLink>
                <NavLink to="/doctors" className={linkClassName} onClick={closeMobileNav}>
                  Doctors
                </NavLink>
                <NavLink to="/articles" className={linkClassName} onClick={closeMobileNav}>
                  Articles
                </NavLink>
                <NavLink to="/panel" className={linkClassName} onClick={closeMobileNav}>
                  Panel
                </NavLink>
                <button
                  type="button"
                  className="nav-link nav-link-logout"
                  onClick={() => {
                    closeMobileNav()
                    logout()
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <NavLink to="/contact" className={linkClassName} onClick={closeMobileNav}>
                Contact
              </NavLink>
            )}

            <NavLink to="/about" className={linkClassName} onClick={closeMobileNav}>
              About
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/symptoms" element={<ProtectedRoute><Symptoms/></ProtectedRoute>} />
              <Route path="/medicine" element={<ProtectedRoute><Medicine/></ProtectedRoute>} />
              <Route path="/video-consultation" element={<ProtectedRoute><VideoConsultation/></ProtectedRoute>} />
              <Route path="/medical-reports" element={<ProtectedRoute><MedicalReports/></ProtectedRoute>} />
              <Route path="/medical-history" element={<ProtectedRoute><MedicalHistory/></ProtectedRoute>} />
              <Route path="/doctors" element={<ProtectedRoute><Consultations/></ProtectedRoute>} />
              <Route path="/articles" element={<Articles/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/panel" element={<ProtectedRoute>
                {user?.role === 'doctor' ? <DoctorPanel/> : user?.role === 'admin' ? <AdminPanel/> : <UserPanel/>}
              </ProtectedRoute>} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>

      <Footer/>
    </div>
  )
}
