import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] rounded-lg border border-border-default bg-canvas shadow-xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-border-muted px-4 py-3 shrink-0">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <button onClick={onClose} className="text-text-tertiary hover:text-text-primary cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <div className="px-4 py-4 overflow-y-auto">{children}</div>
        {footer && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 border-t border-border-muted px-4 py-3 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
