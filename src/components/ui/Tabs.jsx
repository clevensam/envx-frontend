export default function Tabs({ items, activeTab, onChange }) {
  return (
    <div className="border-b border-border-default">
      <nav className="flex gap-0 -mb-px">
        {items.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150 cursor-pointer ${
                isActive
                  ? 'border-link text-link'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-text-tertiary'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                  isActive ? 'bg-link/20 text-link' : 'bg-canvas-subtle text-text-secondary'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
