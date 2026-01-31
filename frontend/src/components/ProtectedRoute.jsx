import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, roles }){
  const { user } = useContext(AuthContext)
  if (!user) return <Navigate to="/login" />
  if (roles && !roles.includes(user.role)) return <div>Access denied</div>
  return children
}
