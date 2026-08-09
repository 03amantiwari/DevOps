import { useState } from 'react'
import { mockTimeSlots } from '../dummy/dummyData'

export default function BookingForm({ onSearch }) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [timeSlot, setTimeSlot] = useState('')
  const [guests, setGuests] = useState(2)
  const [location, setLocation] = useState('all')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!date || !timeSlot) return
    onSearch({ date, timeSlot, guests, location })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Date</label>
          <input
            type="date"
            min={today}
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Time Slot</label>
          <select
            value={timeSlot}
            onChange={e => setTimeSlot(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          >
            <option value="">Select time</option>
            {mockTimeSlots.filter(s => s.is_available).map(slot => (
              <option key={slot.id} value={slot.label}>{slot.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Guests</label>
          <input
            type="number"
            min={1} max={12}
            value={guests}
            onChange={e => setGuests(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Seating</label>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">Any</option>
            <option value="indoor">Indoor 🏠</option>
            <option value="outdoor">Outdoor 🌿</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-brand-500 text-white font-medium py-3 rounded-xl hover:bg-brand-600 transition-colors text-sm"
      >
        Check Availability →
      </button>
    </form>
  )
}
