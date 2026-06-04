import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:    '#F7F4EF',
        ivory:    '#FDFBF8',
        gold:     '#B8966E',
        'gold-light': '#EDE4D8',
        charcoal: '#1C1C1A',
        mid:      '#6B6860',
        border:   '#DDD8D0',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Jost', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
        widest3: '0.3em',
      },
    },
  },
  plugins: [],
}
export default config
