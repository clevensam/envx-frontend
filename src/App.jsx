import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Dashboard from '@/pages/dashboard/Dashboard'
import ProjectDetail from '@/pages/projects/ProjectDetail'
import AppLayout from '@/components/layout/AppLayout'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('envx_token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="projects/:id/*" element={<ProjectDetail />} />
      </Route>
    </Routes>
  )
}
