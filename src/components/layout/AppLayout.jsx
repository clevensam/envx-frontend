import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import ToastContainer from '@/components/ui/Toast'
import useStore from '@/store/useStore'
import { PageSpinner } from '@/components/ui/Spinner'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, token, loadUser } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (token && !user) {
      loadUser().catch(() => navigate('/login'))
    }
  }, [token, user])

  if (!user) return <PageSpinner />

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full bg-canvas-subtle border-r border-border-default">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  )
}
