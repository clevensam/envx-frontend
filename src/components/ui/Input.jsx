export default function Input({ label, error, icon, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-primary">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-md border bg-canvas-inset px-3 py-1.5 text-sm text-text-primary placeholder-text-tertiary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-link focus:border-transparent ${
            error ? 'border-danger' : 'border-border-default'
          } ${icon ? 'pl-9' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}
