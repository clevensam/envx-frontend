import { Link, useNavigate } from 'react-router-dom'
import { Key, Terminal, Shield, Users, Eye, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

const pains = [
  {
    icon: Terminal,
    title: '.env files everywhere',
    desc: 'Secrets scattered across repos, Slack messages, and sticky notes. No single source of truth — just chaos.',
  },
  {
    icon: Eye,
    title: 'No audit trail',
    desc: 'A secret changes and production breaks. Who changed it? When? No way to know — no traceability.',
  },
  {
    icon: Users,
    title: 'Manual onboarding',
    desc: 'Every new teammate means hunting down and sharing secrets one-by-one. Tedious, error-prone, insecure.',
  },
]

const solutions = [
  {
    icon: Shield,
    title: 'Centralized vault',
    desc: 'AES-256-GCM encrypted storage with a Git-style CLI. One `envx pull` and your .env is always in sync.',
  },
  {
    icon: Eye,
    title: 'Full audit log',
    desc: 'Every create, update, and delete is logged with who did it, what changed, and when — no more guesswork.',
  },
  {
    icon: Users,
    title: 'Team roles',
    desc: 'Invite teammates as admins or members. Granular access control so the right people have the right access.',
  },
]

const features = [
  { icon: Shield, label: 'AES-256-GCM encryption' },
  { icon: Terminal, label: 'CLI-first workflow' },
  { icon: Users, label: 'Team collaboration' },
  { icon: Eye, label: 'Audit trail' },
]

export default function Landing() {
  const navigate = useNavigate()
  const token = localStorage.getItem('envx_token')

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border-default bg-canvas/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Key size={20} className="text-accent" />
            <span className="text-lg font-semibold text-text-primary">EnvX</span>
          </div>
          <div className="flex items-center gap-3">
            {token ? (
              <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Sign in
                </Link>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-border-default">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-canvas-subtle px-4 py-1.5 text-sm text-text-secondary mb-8">
            <Key size={14} className="text-accent" />
            Open source secret management
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary max-w-3xl mx-auto leading-tight">
            Stop managing secrets in <span className="text-accent">.env files</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            EnvX centralizes your API keys, database credentials, and configuration —
            encrypted at rest, accessible via CLI, and auditable by your team.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
              Get started free <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })}>
              See how it works
            </Button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="border-b border-border-default">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-3">The problem</h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
            Managing secrets without a dedicated tool is painful — and risky.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {pains.map((p) => (
              <div key={p.title} className="rounded-lg border border-border-default bg-canvas-subtle p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-default bg-canvas mb-4">
                  <p.icon size={18} className="text-text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="border-b border-border-default">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-3">How EnvX solves it</h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
            A simple, secure workflow for your entire team.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((s) => (
              <div key={s.title} className="rounded-lg border border-accent/30 bg-accent/5 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 mb-4">
                  <s.icon size={18} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLI DOCUMENTATION */}
      <section id="docs" className="border-b border-border-default">
        <div className="mx-auto max-w-4xl px-4 md:px-6 py-20 md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 text-center">CLI reference</h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
            Everything you need to integrate EnvX into your workflow.
          </p>

          {/* Install */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Install</h3>
            <div className="rounded-lg border border-border-default bg-canvas-inset p-4">
              <code className="text-sm text-text-primary">
                curl -fsSL https://raw.githubusercontent.com/clevensam/envx-cli/main/install.sh | sh
              </code>
            </div>
          </div>

          {/* Commands table */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Commands</h3>
            <div className="overflow-hidden rounded-lg border border-border-default">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-canvas-subtle border-b border-border-default">
                    <th className="text-left px-4 py-2.5 font-medium text-text-secondary w-48">Command</th>
                    <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {[
                        ['envx login', 'Authenticate with your account'],
                        ['envx logout', 'Clear stored credentials'],
                        ['envx init', 'Link current directory to a project'],
                        ['envx pull [env]', 'Fetch secrets and write .env file'],
                        ['envx push [env]', 'Read .env file and upload secrets'],
                        ['envx list projects', 'List all projects'],
                        ['envx list environments', 'List environments for the current project'],
                      ].map(([cmd, desc]) => (
                        <tr key={cmd} className="hover:bg-canvas-subtle transition-colors">
                          <td className="px-4 py-2.5">
                            <code className="text-link text-xs">{cmd}</code>
                          </td>
                          <td className="px-4 py-2.5 text-text-secondary">{desc}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Workflow */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Daily workflow</h3>
            <div className="rounded-lg border border-border-default bg-canvas-inset p-5 overflow-x-auto">
              <pre className="text-sm text-text-primary leading-relaxed">
                <code>{`# First-time setup
envx login              # Sign in with email + password
envx init               # Select a project to link

# Daily usage
envx pull staging       # Pull staging secrets → .env
# ... edit .env locally
envx push staging       # Push local changes

# Deploy
envx pull production    # Fetch production secrets`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border-default">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">Ready to get started?</h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Stop sharing secrets over Slack. Start using EnvX.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
            Create your account <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        <div className="flex items-center justify-between text-sm text-text-tertiary">
          <span>EnvX — Open source secret management</span>
          <span>Built with Go + React</span>
        </div>
      </footer>
    </div>
  )
}
