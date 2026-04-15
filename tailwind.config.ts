import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff4d00',
          ink: '#1e1a16',
          paper: '#f6f2eb',
          muted: '#6e655b',
        },
      },
      boxShadow: {
        soft: '0 14px 40px rgba(20, 16, 12, 0.08)',
      },
      borderRadius: {
        xl2: '1.3rem',
      },
      fontFamily: {
        heading: ['Iowan Old Style', 'Palatino Linotype', 'Palatino', 'Book Antiqua', 'serif'],
        body: ['Avenir Next', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};

export default config;
