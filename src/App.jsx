import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Landing from '@/pages/landing/Landing'
import Dashboard from '@/pages/dashboard/Dashboard'
import ProjectDetail from '@/pages/projects/ProjectDetail'
import AppLayout from '@/components/layout/AppLayout'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('envx_token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

function GuestRoute({ children }) {
  const token = localStorage.getItem('envx_token')
  if (token) return <Navigate to="/dashboard" replace />
  return children
}

function applyStoredTheme() {
  const theme = localStorage.getItem('envx_theme') || 'light'
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

export default function App() {
  useEffect(() => {
    applyStoredTheme()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="projects/:id/*" element={<ProjectDetail />} />
      </Route>
    </Routes>
  )
}
