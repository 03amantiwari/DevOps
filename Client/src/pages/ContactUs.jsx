// Contact Us page — support channels and feedback form
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ContactUs() {
  // Feedback form field values
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  // Shows "not connected" notice after form submit
  const [submitted, setSubmitted] = useState(false)

  // Handles dummy form submit — backend API not yet connected
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-500 text-lg">We're here to help — reach out anytime</p>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-2xl mb-2">📞</p>
            <p className="font-semibold text-gray-900 mb-1">Support Phone</p>
            <p className="text-brand-500 font-medium">+91 1800-123-4567</p>
            <p className="text-xs text-gray-400 mt-1">Mon–Sat, 9 AM – 9 PM</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-2xl mb-2">✉️</p>
            <p className="font-semibold text-gray-900 mb-1">Support Email</p>
            <p className="text-brand-500 font-medium">support@easyseat.com</p>
            <p className="text-xs text-gray-400 mt-1">Response within 24 hours</p>
          </div>
        </div>

        {/* Social links */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Follow Us</h2>
          <div className="flex gap-4">
            {[
              { name: 'Instagram', icon: '📸', color: 'hover:text-pink-600' },
              { name: 'X (Twitter)', icon: '🐦', color: 'hover:text-blue-500' },
              { name: 'Facebook', icon: '👤', color: 'hover:text-blue-700' },
              { name: 'LinkedIn', icon: '💼', color: 'hover:text-blue-600' },
            ].map(s => (
              <button key={s.name}
                onClick={() => alert(`${s.name} — coming soon!`)}
                className={`flex items-center gap-2 text-sm text-gray-600 ${s.color} transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-200`}>
                <span className="text-lg">{s.icon}</span>
                <span className="hidden sm:block">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Send Us a Message</h2>

          {/* Backend-pending notice */}
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs px-4 py-2.5 rounded-xl mb-4">
            ⚠️ Backend API Pending Integration — form submission shows a demo response only.
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <p className="text-3xl mb-3">✅</p>
              <p className="font-semibold text-gray-900">Message received (demo)</p>
              <p className="text-sm text-gray-500 mt-1">In production, this would send to our support team.</p>
              <button onClick={() => { setForm({ name:'', email:'', message:'' }); setSubmitted(false) }}
                className="mt-4 text-brand-500 text-sm hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Name</label>
                <input type="text" value={form.name} required
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Email</label>
                <input type="email" value={form.email} required
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Message</label>
                <textarea value={form.message} required rows={4}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>
              <button type="submit"
                className="w-full bg-brand-500 text-white font-medium py-3 rounded-xl hover:bg-brand-600 transition-colors text-sm">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="text-center">
          <Link to="/" className="text-brand-500 hover:underline text-sm font-medium">← Back to Home</Link>
        </div>

      </div>
    </div>
  )
}
