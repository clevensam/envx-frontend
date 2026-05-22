import { Link, useNavigate } from 'react-router-dom'
import { Key, Terminal, Shield, Users, Eye, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

const pains = [
  {
    icon: Terminal,
    title: "Where's the right file?",
    desc: 'Your database password is probably in a Slack message, a GitHub repo, and a sticky note on someone\'s desk. You don\'t know which one is up to date.',
  },
  {
    icon: Eye,
    title: 'Who changed this?',
    desc: 'Something breaks and you have no idea who changed that password last. Or when. Or why.',
  },
  {
    icon: Users,
    title: 'Let me send you the password',
    desc: 'Every new person on your team means DMing them secrets one by one. It\'s slow, messy, and easy to mess up.',
  },
]

const solutions = [
  {
    icon: Shield,
    title: 'Everything in one place',
    desc: 'All your secrets live in a safe, central vault. Run `envx pull` and you get the same values as everyone else. No more "it works on my machine."',
  },
  {
    icon: Eye,
    title: 'Know what happened',
    desc: 'Every time someone adds, changes, or deletes a secret, EnvX keeps a log. You can always see who did what.',
  },
  {
    icon: Users,
    title: "You're in control",
    desc: 'Invite teammates as "admin" or "member." Give people access to what they need — nothing more.',
  },
]

const features = [
  { icon: Shield, label: 'Encrypted by default' },
  { icon: Terminal, label: 'One command sync' },
  { icon: Users, label: 'Team-ready' },
  { icon: Eye, label: 'Full history' },
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
            Stop sending passwords over chat
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary max-w-3xl mx-auto leading-tight">
            Stop sharing passwords the <span className="text-accent">hard way</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            EnvX keeps your API keys, database URLs, and login info in one safe place.
            One command syncs them to your team — no more copying and pasting.
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
          <h2 className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-3">The old way is painful</h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
            If any of this sounds familiar, you're not alone.
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
          <h2 className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-3">EnvX makes it simple</h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
            No more hunting for passwords. No more guessing who changed what.
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
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 text-center">How to get started</h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
            You'll be up and running in 2 minutes.
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
                        ['envx login', 'Sign in with email and password'],
                        ['envx logout', 'Disconnect from your account'],
                        ['envx init', 'Link this folder to a project'],
                        ['envx pull [env]', 'Download secrets to your .env file'],
                        ['envx push [env]', 'Upload .env changes to the cloud'],
                        ['envx list projects', 'See all your projects'],
                        ['envx list environments', 'See all environments in a project'],
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
envx login              # Log in with your email and password
envx init               # Pick a project to connect

# Daily workflow
envx pull staging       # Download staging secrets to .env
# ... edit your .env file
envx push staging       # Upload your changes

# Deploy
envx pull production    # Get production secrets`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border-default">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">Ready to try it?</h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Stop sending passwords over chat. Start using EnvX — it's free.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
            Get started <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        <div className="flex items-center justify-between text-sm text-text-tertiary">
          <span>EnvX — Keep your secrets safe</span>
          <span>Built with Go + React</span>
        </div>
      </footer>
    </div>
  )
}
