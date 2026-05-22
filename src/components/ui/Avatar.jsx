export default function Avatar({ src, name, size = 32, className = '' }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '??'

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-canvas-subtle border border-border-default text-text-secondary font-medium overflow-hidden shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  )
}
