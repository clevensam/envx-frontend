const variants = {
  production: 'bg-green-900/30 text-success border border-green-800',
  staging: 'bg-yellow-900/30 text-warning border border-yellow-800',
  development: 'bg-blue-900/30 text-link border border-blue-800',
  admin: 'bg-purple-900/30 text-purple-400 border border-purple-800',
  member: 'bg-gray-800 text-text-secondary border border-border-default',
  default: 'bg-canvas-subtle text-text-secondary border border-border-default',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  )
}
