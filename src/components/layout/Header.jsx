import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, LogOut, User } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import ThemeToggle from '@/components/ui/ThemeToggle'
import useStore from '@/store/useStore'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout } = useStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border-default bg-canvas px-4 md:px-6">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-text-primary">EnvX</span>
      </div>

      <div className="flex-1" />

      <ThemeToggle />

      <div className="relative hidden sm:flex items-center">
        <Search size={16} className="absolute left-3 text-text-tertiary" />
        <input
          placeholder="Search projects..."
          className="w-64 rounded-md border border-border-default bg-canvas-inset pl-9 pr-3 py-1.5 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-link focus:border-transparent"
        />
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-canvas-subtle cursor-pointer"
        >
          <Avatar name={user?.name} size={24} />
          <span className="hidden md:inline text-sm text-text-primary">{user?.name || 'User'}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-border-default bg-canvas shadow-lg py-1">
            <div className="px-3 py-2 border-b border-border-muted">
              <p className="text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="text-xs text-text-tertiary">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-canvas-subtle hover:text-text-primary cursor-pointer"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
