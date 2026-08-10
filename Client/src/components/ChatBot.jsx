import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const CHAT_TOKEN = 'munni-badnaam-hue-tere-liye'

export default function ChatBot() {
  const { isCustomer, isLoggedIn } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! 👋 How can I help you with your reservation today?', sender: 'bot' }
  ])
  const [inputText, setInputText] = useState('')
  const [botTyping, setBotTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, botTyping])

  if (!isLoggedIn || !isCustomer) return null

  const handleSend = async () => {
    const text = inputText.trim()
    if (!text || botTyping) return

    const userMsg = { id: Date.now(), text, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setBotTyping(true)

    try {
      const url = `http://103.235.106.55:8000/chat?token=${CHAT_TOKEN}&message=${encodeURIComponent(text)}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`)
      }

      const data = await response.json()
      const replyText = typeof data === 'string' ? data : (data.response || data.message || "I couldn't get a response from the server.")

      const botMsg = { id: Date.now() + 1, text: replyText, sender: 'bot' }
      setMessages(prev => [...prev, botMsg])
    } catch (error) {
      console.error('ChatBot API error:', error)
      const errorMsg = {
        id: Date.now() + 1,
        text: "Sorry, I couldn't reach the support server.",
        sender: 'bot'
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setBotTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden" style={{ height: '420px' }}>
          <div className="bg-brand-500 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💬</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Customer Support</p>
                <p className="text-red-100 text-xs">{botTyping ? 'Typing...' : 'Online'}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-lg leading-none">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-500 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {botTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-2.5">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={botTyping}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-500 disabled:opacity-60"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || botTyping}
              className="bg-brand-500 text-white px-3 py-2 rounded-xl text-sm hover:bg-brand-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              →
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-500 text-white rounded-full shadow-lg hover:bg-brand-600 transition-all hover:scale-105 flex items-center justify-center text-2xl"
        title="Customer Support Chat">
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  )
}
