// Help Center page — FAQ accordions with local search filter
import { useState } from 'react'
import { Link } from 'react-router-dom'

// FAQ data — all questions and answers in one place for easy maintenance
const FAQS = [
  {
    q: 'How do I reserve a restaurant table?',
    a: 'Browse restaurants on the Home page, click a restaurant card, then pick a date, time slot, and number of guests. Select an available table from the grid and click "Confirm Booking". You will see a confirmation screen with your booking reference.',
  },
  {
    q: 'Can I cancel or modify my reservation?',
    a: 'Yes. Go to "My Bookings" from the navbar or your dashboard. For any upcoming booking, you will see a "Cancel" button. Cancellations are free. Modifications (date or time changes) are not yet supported — cancel and rebook instead.',
  },
  {
    q: 'What happens if I arrive late for my booked slot?',
    a: 'Most restaurants hold your table for 15 minutes past the booking time. After that, the slot may be released. Contact the restaurant directly if you are running late — their phone number is visible on the booking confirmation screen.',
  },
  {
    q: 'How are per-seat billing charges calculated?',
    a: 'Each table has a Rate per Seat set by the restaurant owner. The estimate on the confirm screen = Rate per Seat × Number of Guests. This is an indicative amount — the final bill is settled directly at the restaurant and may include taxes and service charges.',
  },
  {
    q: 'Who can create a restaurant on EasySeat?',
    a: 'Only users who register with the "Restaurant Owner" role can create restaurants. Owners get access to the Owner Dashboard where they can add restaurants, configure tables, set time slots, and manage bookings.',
  },
  {
    q: 'Is EasySeat free to use?',
    a: 'Yes — booking tables on EasySeat is completely free for customers. There are no booking fees or hidden charges. Restaurants may apply their own policies for cancellations or no-shows.',
  },
]

export default function HelpCenter() {
  // Tracks which FAQ accordion is open (by index, null = all closed)
  const [openIdx, setOpenIdx] = useState(null)
  // Local search query to filter FAQ list
  const [search, setSearch] = useState('')

  // Filter FAQs by search query — compares against both question and answer text
  const filtered = FAQS.filter(
    f => f.q.toLowerCase().includes(search.toLowerCase()) ||
         f.a.toLowerCase().includes(search.toLowerCase())
  )

  // Toggles one accordion open; clicking the open one closes it
  const toggle = (idx) => setOpenIdx(prev => prev === idx ? null : idx)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Help Center</h1>
          <p className="text-gray-500 text-lg">Find answers to common questions</p>
        </div>

        {/* Search bar — filters FAQs locally without an API call */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search help topics..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 bg-white shadow-sm"
          />
        </div>

        {/* FAQ accordion list */}
        <div className="space-y-3 mb-8">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm">No results for "{search}"</p>
              <button onClick={() => setSearch('')} className="mt-2 text-brand-500 text-sm hover:underline">
                Clear search
              </button>
            </div>
          ) : (
            filtered.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Question row — click to expand/collapse */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                  {/* Arrow rotates when open */}
                  <span className={`text-gray-400 text-sm shrink-0 transition-transform duration-200
                    ${openIdx === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {/* Answer — only rendered when this accordion is open */}
                {openIdx === idx && (
                  <div className="px-5 pb-5 border-t border-gray-50">
                    <p className="text-sm text-gray-600 leading-relaxed pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still need help? */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center mb-8">
          <p className="font-semibold text-gray-900 mb-1">Still need help?</p>
          <p className="text-sm text-gray-500 mb-4">Our support team is ready to assist you.</p>
          <Link to="/contact"
            className="inline-block bg-brand-500 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-brand-600 transition-colors">
            Contact Support →
          </Link>
        </div>

        <div className="text-center">
          <Link to="/" className="text-brand-500 hover:underline text-sm font-medium">← Back to Home</Link>
        </div>

      </div>
    </div>
  )
}
