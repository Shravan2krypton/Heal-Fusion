import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('hf_token'))

  useEffect(() => {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete axios.defaults.headers.common['Authorization']
  }, [token])

  useEffect(() => {
    // try to fetch profile when token present
    const fetchMe = async () => {
      if (!token) return;
      try {
        const res = await axios.get('/api/user/me');
        setUser(res.data);
      } catch (err) { console.error(err); }
    }
    fetchMe();
  }, [token])

  const login = async ({ email, password }) => {
    const res = await axios.post('/api/auth/login', { email, password });
    if (res.data.token){
      localStorage.setItem('hf_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    }
    return res.data;
  }

  const register = async ({ name, email, password, role }) => {
    const res = await axios.post('/api/auth/register', { name, email, password, role });
    if (res.data.token){
      localStorage.setItem('hf_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    }
    return res.data;
  }

  const logout = () => {
    localStorage.removeItem('hf_token');
    setToken(null); setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
