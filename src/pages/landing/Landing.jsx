import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Key, Terminal, Shield, Users, Eye, ArrowRight,
  ChevronDown, Copy, Check, GitBranch, Star,
  Lock, Clock, Download, RefreshCw, Server,
  Menu, X,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'

const painSolutionCards = [
  {
    pain: { icon: Terminal, title: "Where's the right .env file?", desc: 'Your database password lives in a Slack message, a GitHub repo, and a sticky note. You don\'t know which is current.' },
    solution: { icon: Shield, title: 'One source of truth', desc: 'All secrets live in a central vault. Run `envx pull` and your whole team gets the same values. Instantly.' },
  },
  {
    pain: { icon: Eye, title: 'Who changed the password?', desc: 'Something breaks and you have no idea who changed it. Or when. Or why.' },
    solution: { icon: Eye, title: 'Full audit trail', desc: 'Every create, update, and delete is logged with user, timestamp, and details. Always know what happened.' },
  },
  {
    pain: { icon: Users, title: 'Let me send you the secrets', desc: 'Every new teammate means DMing credentials one by one. Slow, messy, easy to mess up.' },
    solution: { icon: Users, title: 'Invite and control access', desc: 'Add teammates as admin or member. Role-based access — give people only what they need.' },
  },
]

const howItWorks = [
  { step: 1, title: 'Install', cmd: 'curl -fsSL https://raw.githubusercontent.com/clevensam/envx-cli/main/install.sh | sh', desc: 'One-line install. Works on macOS, Linux, and CI.' },
  { step: 2, title: 'Init', cmd: 'envx init', desc: 'Link your project. Pick an environment — done.' },
  { step: 3, title: 'Pull', cmd: 'envx pull staging', desc: 'Secrets land in your .env file. Ready to use.' },
]

const features = [
  { icon: Lock, title: 'Encrypted at rest', desc: 'AES-256-GCM encryption. Your secrets are never stored in plaintext.' },
  { icon: Terminal, title: 'One-command sync', desc: '`envx pull` to download, `envx push` to upload. That\'s your entire workflow.' },
  { icon: Users, title: 'Team-ready', desc: 'Invite members as admin or member. Granular permissions out of the box.' },
  { icon: Clock, title: 'Full audit trail', desc: 'Every change is logged with who, what, and when. No more mystery edits.' },
]

const commandGroups = [
  {
    label: 'Setup',
    icon: Download,
    commands: [
      ['envx login', 'Sign in with your email and password'],
      ['envx init', 'Link the current directory to a project'],
    ],
  },
  {
    label: 'Daily workflow',
    icon: RefreshCw,
    defaultOpen: true,
    commands: [
      ['envx pull [env]', 'Download secrets to your .env file'],
      ['envx push [env]', 'Upload .env changes to the cloud'],
    ],
  },
  {
    label: 'Management',
    icon: Server,
    commands: [
      ['envx logout', 'Disconnect from your account'],
      ['envx list projects', 'See all your projects'],
      ['envx list environments', 'See all environments in a project'],
    ],
  },
]

function TerminalWindow({ children, className = '' }) {
  return (
    <div className={`rounded-lg border border-border-default bg-canvas-inset overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-border-default px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-danger" />
        <span className="h-3 w-3 rounded-full bg-warning" />
        <span className="h-3 w-3 rounded-full bg-accent" />
        <span className="ml-2 text-xs text-text-tertiary">terminal</span>
      </div>
      <div className="p-4 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}

function AccordionGroup({ groups }) {
  const [openIndex, setOpenIndex] = useState(
    () => groups.findIndex((g) => g.defaultOpen)
  )

  return (
    <div className="rounded-lg border border-border-default overflow-hidden">
      {groups.map((group, i) => {
        const isOpen = openIndex === i
        return (
          <div key={group.label} className="border-b border-border-default last:border-b-0">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 bg-canvas-subtle px-4 py-3 text-left text-sm font-medium text-text-primary hover:bg-canvas-subtle/80 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <group.icon size={16} className="text-text-tertiary" />
                {group.label}
              </span>
              <ChevronDown size={16} className={`text-text-tertiary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="divide-y divide-border-default">
                {group.commands.map(([cmd, desc]) => (
                  <div key={cmd} className="flex items-center justify-between gap-4 px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <code className="text-xs text-link shrink-0">{cmd}</code>
                      <span className="text-sm text-text-secondary truncate">{desc}</span>
                    </div>
                    <CopyButton text={cmd} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="shrink-0 text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
      title="Copy command"
    >
      {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
    </button>
  )
}

function FadeInSection({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const token = localStorage.getItem('envx_token')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-canvas text-text-primary">

      {/* ═══ NAVBAR ═══ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-canvas/90 backdrop-blur-md border-b border-border-default' : 'bg-transparent'
      }`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Key size={16} className="text-accent-fg" />
            </div>
            <span className="text-lg font-bold text-text-primary">EnvX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              How it works
            </button>
            <button
              onClick={() => document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              CLI Reference
            </button>
              <a
                href="https://github.com/clevensam/envx-cli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <GitBranch size={16} />
                <span>GitHub</span>
              </a>
            </nav>
           <div className="flex items-center gap-1.5 md:gap-2">
               <ThemeToggle />

               {/* Mobile menu button */}
               <button
                 onClick={() => setMenuOpen(!menuOpen)}
                 className="md:hidden flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-canvas-subtle transition-colors cursor-pointer"
                 aria-label="Toggle menu"
               >
                 {menuOpen ? <X size={18} /> : <Menu size={18} />}
               </button>

             <div className="hidden md:flex items-center gap-2">
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
        </div>

         {/* Mobile menu */}
         {menuOpen && (
           <div className="md:hidden border-b border-border-default bg-canvas/95 backdrop-blur-md">
             <div className="px-4 py-4 space-y-1">
               <button
                 onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}
                 className="block w-full text-left text-sm text-text-secondary hover:text-text-primary transition-colors py-2"
               >
                 How it works
               </button>
               <button
                 onClick={() => { document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}
                 className="block w-full text-left text-sm text-text-secondary hover:text-text-primary transition-colors py-2"
               >
                 CLI Reference
               </button>
               <a
                 href="https://github.com/clevensam/envx-cli"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors py-2"
                 onClick={() => setMenuOpen(false)}
               >
                 <GitBranch size={16} /> GitHub
               </a>
               <div className="pt-3 mt-2 border-t border-border-default flex flex-col gap-2">
                 {token ? (
                   <Button variant="primary" size="sm" onClick={() => { navigate('/dashboard'); setMenuOpen(false) }} className="w-full">
                     Dashboard
                   </Button>
                 ) : (
                   <>
                     <Button variant="secondary" size="sm" onClick={() => { navigate('/login'); setMenuOpen(false) }} className="w-full">
                       Sign in
                     </Button>
                     <Button variant="primary" size="sm" onClick={() => { navigate('/register'); setMenuOpen(false) }} className="w-full">
                       Get started
                     </Button>
                   </>
                 )}
               </div>
             </div>
           </div>
         )}
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-accent)_0%,_transparent_60%)] opacity-[0.08] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-canvas-subtle px-4 py-1.5 text-sm text-text-secondary mb-6">
                <Key size={14} className="text-accent" />
                Stop sending passwords over chat
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-tight">
                One command, one{' '}
                <span className="text-accent">source of truth</span>
              </h1>
              <p className="mt-5 text-lg md:text-xl text-text-secondary leading-relaxed max-w-lg">
                EnvX is a centralized vault for API keys, database URLs, and credentials.
                <span className="block mt-2">
                  <code className="text-link">envx pull</code> gives your whole team the same values — every time.
                </span>
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Button variant="primary" size="lg" onClick={() => navigate('/register')} className="w-full sm:w-auto">
                  Get started free <ArrowRight size={18} />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto">
                  See how it works
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-accent" /> No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-accent" /> 2-minute setup
                </span>
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="text-warning" /> 4.9 / 5 from teams
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-2xl blur-2xl" />
              <TerminalWindow className="relative">
                <pre className="text-sm leading-relaxed">
                  <code>
                    <span className="text-accent">$</span>{' '}
                    <span className="text-text-primary">envx pull staging</span>
                    {'\n'}
                    <span className="text-text-tertiary">  ✓ Authenticated as alice@acme.com</span>
                    {'\n'}
                    <span className="text-text-tertiary">  ✓ Project "acme-api" linked</span>
                    {'\n'}
                    <span className="text-text-tertiary">  ✓ Downloaded 12 secrets</span>
                    {'\n'}
                    <span className="text-success">  ✓ .env updated</span>
                    {'\n\n'}
                    <span className="text-text-secondary">DATABASE_URL=postgres://...</span>
                    {'\n'}
                    <span className="text-text-secondary">REDIS_URL=redis://...</span>
                    {'\n'}
                    <span className="text-text-secondary">API_KEY=sk-...</span>
                    {'\n'}
                    <span className="text-text-tertiary">...</span>
                    {'\n'}
                    <span className="animate-pulse text-text-tertiary">_</span>
                  </code>
                </pre>
              </TerminalWindow>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM → SOLUTION ═══ */}
      <section className="border-t border-border-default py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-3">
              The old way is broken
            </h2>
            <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto text-lg">
              If any of this sounds familiar, EnvX was built for you.
            </p>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {painSolutionCards.map((card) => (
              <FadeInSection key={card.pain.title}>
                <div className="rounded-xl border border-border-default bg-canvas-subtle overflow-hidden group hover:border-accent/40 transition-colors duration-300 h-full flex flex-col">
                  <div className="p-6 pb-4 flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-default bg-canvas mb-4">
                      <card.pain.icon size={18} className="text-danger" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{card.pain.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{card.pain.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-2">
                    <div className="h-px flex-1 bg-border-default" />
                    <ArrowRight size={14} className="text-accent shrink-0" />
                    <div className="h-px flex-1 bg-border-default" />
                  </div>
                  <div className="p-6 pt-4 bg-accent/[0.03]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 mb-4">
                      <card.solution.icon size={18} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{card.solution.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{card.solution.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="border-t border-border-default py-24 md:py-32 bg-canvas-subtle/30">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-3">
              How it works
            </h2>
            <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto text-lg">
              Three commands. Two minutes. Your whole team synced.
            </p>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {howItWorks.map((step, i) => (
              <FadeInSection key={step.step}>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 border border-accent/30 text-accent font-bold text-lg shrink-0">
                      {step.step}
                    </div>
                    {i < howItWorks.length - 1 && (
                      <div className="hidden md:block h-px flex-1 bg-border-default ml-4" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
                  <p className="text-sm text-text-secondary mb-4">{step.desc}</p>
                  <TerminalWindow className="text-left">
                    <pre className="text-sm">
                      <code>
                        <span className="text-accent">$</span>{' '}
                        <span className="text-text-primary">{step.cmd}</span>
                      </code>
                    </pre>
                  </TerminalWindow>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="border-t border-border-default py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-3">
              Built for security and speed
            </h2>
            <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto text-lg">
              Everything you need to manage secrets without getting in your way.
            </p>
          </FadeInSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <FadeInSection key={f.title}>
                <div className="rounded-xl border border-border-default bg-canvas-subtle p-6 hover:border-accent/40 transition-colors duration-300 h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-default bg-canvas mb-5">
                    <f.icon size={20} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{f.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLI REFERENCE ═══ */}
      <section id="docs" className="border-t border-border-default py-24 md:py-32 bg-canvas-subtle/30">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-3">
              CLI Reference
            </h2>
            <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto text-lg">
              Everything you need to manage secrets from the terminal.
            </p>
          </FadeInSection>

          <FadeInSection className="mb-10">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Install</h3>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border-default bg-canvas-inset px-4 py-3">
              <code className="text-sm text-text-primary truncate">
                curl -fsSL https://raw.githubusercontent.com/clevensam/envx-cli/main/install.sh | sh
              </code>
              <CopyButton text="curl -fsSL https://raw.githubusercontent.com/clevensam/envx-cli/main/install.sh | sh" />
            </div>
          </FadeInSection>

          <FadeInSection>
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Commands</h3>
            <AccordionGroup groups={commandGroups} />
          </FadeInSection>

          <FadeInSection className="mt-10">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Example workflow</h3>
            <TerminalWindow>
              <pre className="text-sm leading-relaxed">
                <code>{`  # First-time setup
  $ envx login                # Authenticate
  $ envx init                 # Link project

  # Daily workflow
  $ envx pull staging         # Get secrets → .env
  $ vim .env                  # Edit your config
  $ envx push staging         # Upload changes

  # Deploy
  $ envx pull production      # Get production secrets`}</code>
              </pre>
            </TerminalWindow>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-border-default py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent)_0%,_transparent_60%)] opacity-[0.06] pointer-events-none" />
        <div className="mx-auto max-w-3xl px-4 md:px-8 text-center relative">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Ready to stop sharing passwords over chat?
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-lg mx-auto">
              Join teams that use EnvX to keep their secrets safe. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
                Get started free <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
                Sign in
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-text-tertiary">
              <span className="flex items-center gap-1.5">
                <Lock size={14} className="text-accent" /> AES-256-GCM encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <Terminal size={14} className="text-accent" /> One-command sync
              </span>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border-default py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent">
                  <Key size={14} className="text-accent-fg" />
                </div>
                <span className="font-bold text-text-primary">EnvX</span>
              </div>
              <p className="text-sm text-text-tertiary leading-relaxed">
                Centralized secret management for your team. One command, one source of truth.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-text-tertiary hover:text-text-primary transition-colors cursor-pointer">
                    How it works
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-text-tertiary hover:text-text-primary transition-colors cursor-pointer">
                    CLI Reference
                  </button>
                </li>
                <li>
                  <a href="https://github.com/clevensam/envx-cli" target="_blank" rel="noopener noreferrer" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/clevensam/envx-cli" target="_blank" rel="noopener noreferrer" className="text-sm text-text-tertiary hover:text-text-primary transition-colors flex items-center gap-1.5">
                    <GitBranch size={14} /> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://github.com/clevensam/envx-cli/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
                    Report an issue
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><span className="text-sm text-text-tertiary">Privacy Policy</span></li>
                <li><span className="text-sm text-text-tertiary">Terms of Service</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-tertiary">
            <span>&copy; {new Date().getFullYear()} EnvX. All rights reserved.</span>
            <span>Built with Go + React</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
