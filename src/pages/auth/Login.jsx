import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Key, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useStore from '@/store/useStore'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-canvas px-4">
      <Link to="/" className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-1 text-sm text-text-tertiary hover:text-text-primary transition-colors">
        <ArrowLeft size={14} />
        Back to home
      </Link>
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
            <Key size={24} className="text-accent" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary">Sign in to EnvX</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your secrets and environment variables</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-md border border-border-default bg-canvas-subtle p-6">
          {error && (
            <div className="mb-4 rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mt-1 text-xs text-link hover:underline cursor-pointer"
              >
                {showPassword ? 'Hide password' : 'Show password'}
              </button>
            </div>
          </div>

          <Button variant="primary" className="w-full mt-5" loading={loading} type="submit">
            Sign in
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-text-secondary">
          New to EnvX?{' '}
          <Link to="/register" className="text-link hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
