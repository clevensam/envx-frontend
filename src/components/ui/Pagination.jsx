import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="px-3 py-1.5 text-sm rounded-md border border-border-default text-text-secondary hover:bg-canvas-subtle disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`px-3 py-1.5 text-sm rounded-md border cursor-pointer ${
            page === current
              ? 'bg-link text-white border-link'
              : 'border-border-default text-text-secondary hover:bg-canvas-subtle'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="px-3 py-1.5 text-sm rounded-md border border-border-default text-text-secondary hover:bg-canvas-subtle disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
