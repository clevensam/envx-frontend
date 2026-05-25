import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1 text-sm">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} className="text-text-tertiary" />}
          {item.href ? (
            <Link to={item.href} className="text-link hover:underline">{item.label}</Link>
          ) : (
            <span className={i === items.length - 1 ? 'text-text-primary font-medium' : 'text-text-secondary'}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
