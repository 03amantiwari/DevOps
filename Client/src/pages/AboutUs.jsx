// About Us page — platform mission and tech overview
import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">ES</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">About EasySeat</h1>
          <p className="text-gray-500 text-lg">Making restaurant table booking effortless across India</p>
        </div>

        {/* Mission card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            EasySeat connects diners with great restaurants by making table reservations instant,
            transparent, and hassle-free. We believe the best meal starts before you arrive — with
            a confirmed seat waiting for you.
          </p>
        </div>

        {/* Key features */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '⚡', title: 'Instant Confirmation', desc: 'Your table is confirmed the moment you click.' },
              { icon: '🪑', title: 'Dynamic Slot Booking', desc: 'Pick from real-time available time slots and tables.' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'See per-seat billing before you confirm.' },
            ].map(f => (
              <div key={f.title} className="text-center p-4 bg-gray-50 rounded-xl">
                <span className="text-3xl">{f.icon}</span>
                <p className="font-semibold text-gray-900 mt-2 mb-1 text-sm">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Built With</h2>
          <div className="flex flex-wrap gap-3">
            {['React 18', 'Spring Boot 3', 'MySQL 8', 'Spring Security + JWT', 'Tailwind CSS', 'Axios', 'React Router v6'].map(t => (
              <span key={t} className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link to="/" className="text-brand-500 hover:underline text-sm font-medium">← Back to Home</Link>
        </div>

      </div>
    </div>
  )
}
