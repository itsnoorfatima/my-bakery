/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brown: { DEFAULT: '#6B4F3A', dark: '#4A3528', light: '#8B6F5A' },
        cream: { DEFAULT: '#F5E6D3', light: '#FDF6EE' },
        sage: '#A8C686',
        blush: '#F7C8C8',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
