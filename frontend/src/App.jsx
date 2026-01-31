import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Symptoms from './pages/Symptoms'
import MedicalHistory from './pages/MedicalHistory'
import Consultations from './pages/Consultations'
import UserPanel from './pages/UserPanel'
import DoctorPanel from './pages/DoctorPanel'
import AdminPanel from './pages/AdminPanel'
import Articles from './pages/Articles'
import Contact from './pages/Contact'
import About from './pages/About'
import Medicine from './pages/Medicine'
import MedicalReports from './pages/MedicalReports'
import VideoConsultation from './pages/VideoConsultation'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContext } from './contexts/AuthContext'

export default function App() {
  const { user, logout } = useContext(AuthContext)
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="url(#gradient1)" stroke="white" strokeWidth="2"/>
                  <path d="M12 10L20 10L18 14L22 14L16 22L10 14L14 14L12 10Z" fill="white"/>
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#2563eb'}}/>
                      <stop offset="100%" style={{stopColor:'#7c3aed'}}/>
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
        <div className="nav-links">
          {!user && (<><Link to="/login">Login</Link> | <Link to="/register">Register</Link></>)}
          {user && (<>
            <Link to="/symptoms">Diagnose</Link> | 
            <Link to="/medicine">Medicine</Link> | 
            <Link to="/video-consultation">Video Call</Link> | 
            <Link to="/medical-reports">Reports</Link> | 
            <Link to="/doctors">Doctors</Link> | 
            <Link to="/articles">Articles</Link> | 
            <Link to="/panel">Panel</Link> | 
            <a href="#" onClick={(e)=>{e.preventDefault(); logout();}}>Logout</a>
          </>)}
          {!user && <Link to="/contact" style={{marginLeft: '1rem'}}>Contact</Link>}
          <Link to="/about" style={{marginLeft: '1rem'}}>About</Link>
        </div>
      </nav>
      
      <div className="main-content">
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
          <Route path="/consultations" element={<ProtectedRoute><Consultations/></ProtectedRoute>} />
          <Route path="/articles" element={<Articles/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/panel" element={<ProtectedRoute>
            {user?.role === 'doctor' ? <DoctorPanel/> : user?.role === 'admin' ? <AdminPanel/> : <UserPanel/>}
          </ProtectedRoute>} />
        </Routes>
      </div>
      
      <Footer/>
    </div>
  )
}
