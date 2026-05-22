import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import ToastContainer from '@/components/ui/Toast'
import useStore from '@/store/useStore'
import { PageSpinner } from '@/components/ui/Spinner'

export default function AppLayout() {
  const { user, token, loadUser } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (token && !user) {
      loadUser().catch(() => navigate('/login'))
    }
  }, [token, user])

  if (!user) return <PageSpinner />

  return (
    <div className="flex h-screen flex-col bg-canvas">
      <Header />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  )
}
