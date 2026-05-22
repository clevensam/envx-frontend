export default function Card({ children, hover, className = '', ...props }) {
  return (
    <div
      className={`rounded-md border border-border-default bg-canvas ${hover ? 'transition-colors duration-150 hover:bg-canvas-subtle cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
