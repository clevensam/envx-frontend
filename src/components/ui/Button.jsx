import { Spinner } from './Spinner'

const variants = {
  primary:
    'bg-accent text-accent-fg hover:bg-accent-hover border border-accent',
  secondary:
    'bg-transparent text-text-primary hover:bg-canvas-subtle border border-border-default',
  danger:
    'bg-danger text-danger-fg hover:bg-danger-hover border border-danger',
  ghost:
    'bg-transparent text-text-primary hover:bg-canvas-subtle border border-transparent',
}

const sizes = {
  sm: 'px-3 py-1.5 min-h-8 text-sm',
  md: 'px-4 py-2 min-h-10 text-sm',
  lg: 'px-6 py-2.5 min-h-12 text-base',
}

export default function Button({ variant = 'secondary', size = 'md', loading, children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-md font-medium transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  )
}
