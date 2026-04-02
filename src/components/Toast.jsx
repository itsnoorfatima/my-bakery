import { useEffect, useState } from 'react'

export default function Toast({ message, onClose }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 400) }, 2800)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div
      className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl font-bold shadow-xl transition-all duration-400"
      style={{
        background: '#4A3528',
        color: '#F5E6D3',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(80px)',
      }}
    >
      {message}
    </div>
  )
}
