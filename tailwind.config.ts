import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Mêmes couleurs que la charte définie dans app/globals.css
        cream:        'var(--paper)',
        ivory:        'var(--white)',
        gold:         'var(--gold)',
        'gold-light': 'var(--paper2)',
        charcoal:     'var(--ink)',
        mid:          'var(--muted)',
        border:       'var(--line)',
        olive:        'var(--olive)',
        'olive-dark': 'var(--olive-dark)',
        error:        'var(--error)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'Arial', 'sans-serif'],
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
