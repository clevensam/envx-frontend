export default function Table({ columns, data, onRowClick, emptyState }) {
  if (!data || data.length === 0) {
    return emptyState || <p className="py-8 text-center text-text-secondary text-sm">No data</p>
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border-default">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-default bg-canvas-subtle">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-2.5 text-left font-medium text-text-secondary ${col.className || ''}`}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className={`border-b border-border-muted transition-colors duration-100 ${
                onRowClick ? 'cursor-pointer hover:bg-canvas-subtle' : ''
              }`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-2.5 text-text-primary ${col.cellClass || ''}`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
