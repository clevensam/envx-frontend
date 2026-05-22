import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FolderGit2, Key, Users, History, Settings } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderGit2 },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border-default md:bg-canvas-subtle">
      <div className="flex h-14 items-center gap-2 border-b border-border-default px-4">
        <Key size={20} className="text-accent" />
        <span className="text-base font-semibold text-text-primary">EnvX</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                isActive
                  ? 'bg-canvas text-text-primary font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-canvas'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border-default px-3 py-3">
        <p className="text-xs text-text-tertiary">EnvX v0.1.0</p>
      </div>
    </aside>
  )
}
