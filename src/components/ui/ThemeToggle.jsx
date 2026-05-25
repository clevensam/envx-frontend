import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

function getTheme() {
  return localStorage.getItem('envx_theme') || 'light'
}

function setTheme(theme) {
  localStorage.setItem('envx_theme', theme)
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

export default function ThemeToggle() {
  const [theme, setThemeState] = useState(getTheme)

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  const toggle = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-canvas-subtle transition-colors cursor-pointer"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
