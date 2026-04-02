import { useState } from 'react'
import Toast from '../components/Toast'

const FAQ = [
  { q: 'Can I upload my own recipes?', a: 'Yes! Sign in and visit the Upload Recipe page to share your creations with our community.' },
  { q: 'Can I edit my recipes after uploading?', a: 'Absolutely. Go to My Recipes and click the edit button on any of your recipes.' },
  { q: 'Is this app free to use?', a: 'Yes, My Bakery is completely free. Create an account and start baking!' },
  { q: 'How do I delete a recipe?', a: 'Visit My Recipes and click the red delete button on the recipe card you want to remove.' },
  { q: 'Can I add images to my recipes?', a: 'Yes! When uploading a recipe, use the image upload area to add a photo of your creation.' },
]

export default function ContactPage() {
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) {
      setToast('Please fill in all fields.')
      return
    }
    setToast('Message sent! We\'ll get back to you soon 🧁')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="fade-in">
      {toast && <Toast message={toast} onClose={() => setToast('')} />}

      <div className="py-8 px-4 text-center" style={{ background: 'linear-gradient(to right, #4A3528, #6B4F3A)' }}>
        <h1 className="font-playfair text-3xl" style={{ color: '#F5E6D3' }}>Contact & FAQ</h1>
        <p className="mt-2 text-sm" style={{ color: 'rgba(245,230,211,0.75)' }}>We'd love to hear from you!</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact form */}
        <div className="bg-white rounded-2xl p-7 shadow-md border" style={{ borderColor: '#F5E6D3' }}>
          <h2 className="font-playfair text-xl mb-5" style={{ color: '#4A3528' }}>Get in Touch 🍪</h2>

          <label className="block text-sm font-bold mb-1" style={{ color: '#4A3528' }}>Your Name</label>
          <input className="form-input mb-4" placeholder="Baker's name"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />

          <label className="block text-sm font-bold mb-1" style={{ color: '#4A3528' }}>Email</label>
          <input className="form-input mb-4" type="email" placeholder="you@email.com"
            value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />

          <label className="block text-sm font-bold mb-1" style={{ color: '#4A3528' }}>Message</label>
          <textarea
            className="form-input mb-6" rows={4}
            placeholder="Share your thoughts, feedback, or questions..."
            style={{ resize: 'vertical' }}
            value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          />

          <button className="btn-primary w-full" onClick={handleSend}>Send Message</button>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-7 shadow-md border" style={{ borderColor: '#F5E6D3' }}>
          <h2 className="font-playfair text-xl mb-5" style={{ color: '#4A3528' }}>FAQ 🎂</h2>
          <div className="space-y-5">
            {FAQ.map(({ q, a }, i) => (
              <div key={i}>
                <p className="font-bold text-sm mb-1" style={{ color: '#4A3528' }}>{q}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#8B7355' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
