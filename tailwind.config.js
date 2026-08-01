/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          canvas: '#090A0F',
          card: '#12141A',
          border: '#1A1D26',
          text: '#F3F4F6',
          muted: '#9CA3AF',
        },
        light: {
          canvas: '#F3F7FA',
          card: '#FFFFFF',
          border: '#E2E8F0',
          text: '#1F2937',
          muted: '#6B7280',
        },
        accent: {
          cyan: '#00D2C2',
          teal: '#0A9396',
          cyanGlow: 'rgba(0, 210, 194, 0.15)',
          blue: '#2563EB',
          deepblue: '#1D4ED8',
          blueGlow: 'rgba(37, 99, 235, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(0, 210, 194, 0.35)',
        'glow-blue': '0 0 15px rgba(37, 99, 235, 0.35)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
      }
    },
  },
  plugins: [],
}
