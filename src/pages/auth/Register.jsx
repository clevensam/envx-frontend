import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Key } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useStore from '@/store/useStore'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
            <Key size={24} className="text-accent" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary">Create your account</h1>
          <p className="text-sm text-text-secondary mt-1">Start managing your secrets securely</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-md border border-border-default bg-canvas-subtle p-6">
          {error && (
            <div className="mb-4 rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={password.length > 0 && password.length < 8 ? 'Minimum 8 characters' : ''}
            />
          </div>

          <Button variant="primary" className="w-full mt-5" loading={loading} type="submit">
            Create account
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-link hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
