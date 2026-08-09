export default function TableCard({ table, selected, onSelect }) {
  const statusColors = {
    available:   'bg-green-50 border-green-200 text-green-700',
    booked:      'bg-red-50 border-red-200 text-red-700',
    maintenance: 'bg-gray-50 border-gray-200 text-gray-500',
  }
  const isSelectable = table.status === 'available'

  return (
    <button
      onClick={() => isSelectable && onSelect && onSelect(table)}
      disabled={!isSelectable}
      className={`
        w-full p-4 rounded-xl border-2 text-left transition-all duration-200
        ${isSelectable ? 'cursor-pointer hover:border-brand-500 hover:shadow-md' : 'cursor-not-allowed opacity-60'}
        ${selected ? 'border-brand-500 bg-red-50 shadow-md' : 'border-gray-200 bg-white'}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-display font-bold text-gray-900 text-lg">{table.table_number}</span>
        {selected && <span className="text-brand-500 text-lg">✓</span>}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span>👥</span>
          <span>{table.capacity} seats</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span>{table.location === 'indoor' ? '🏠' : '🌿'}</span>
          <span className="capitalize">{table.location}</span>
        </div>
      </div>
      <span className={`mt-2 inline-block text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusColors[table.status]}`}>
        {table.status}
      </span>
    </button>
  )
}
