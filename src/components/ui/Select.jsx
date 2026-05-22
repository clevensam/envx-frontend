export default function Select({ label, options, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-primary">{label}</label>
      )}
      <select
        className={`w-full rounded-md border bg-canvas-inset px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-link focus:border-transparent ${
          error ? 'border-danger' : 'border-border-default'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}
