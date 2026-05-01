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
        primary: '#4285F4', // Google Blue
        'google-blue': '#4285F4',
        'google-red': '#EA4335',
        'google-yellow': '#FBBC04',
        'google-green': '#34A853',

        background: '#f8fafc',
        'dark-background': '#111827',
        content: '#ffffff',
        'dark-content': '#1f2937',

        'sidebar-light': '#ffffff',
        'sidebar-light-darker': '#f1f5f9',
        'sidebar-light-text': '#334155',
        'sidebar-light-text-secondary': '#64748b',
        'sidebar-light-border': '#e2e8f0',
        'sidebar-light-hover': '#f1f5f9',

        sidebar: '#1f2937',
        'sidebar-darker': '#111827',
        'sidebar-text': '#cbd5e1',

        border: '#e5e7eb',
        'dark-border': '#374151',
        'text-dark': '#0f172a',
        'dark-text-dark': '#f8fafc',
        'text-medium': '#64748b',
        'dark-text-medium': '#94a3b8',
        'text-light': '#94a3b8',
        'dark-text-light': '#64748b',

        'google-blue-card': '#e8f0fe',
        'dark-google-blue-card': '#17212f',
        'google-red-card': '#fce8e6', 
        'dark-google-red-card': '#2c1515',
        'google-yellow-card': '#fef7e0',
        'dark-google-yellow-card': '#292008',
        'google-green-card': '#e6f4ea',
        'dark-google-green-card': '#0d2814',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'slide-out-up': {
          from: { opacity: '1', transform: 'translateY(0%)' },
          to: { opacity: '0', transform: 'translateY(-50%)' },
        },
        'slide-in-up': {
          from: { opacity: '0', transform: 'translateY(50%)' },
          to: { opacity: '1', transform: 'translateY(0%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.33)', opacity: '1' },
          '80%, 100%': { transform: 'scale(1.5)', opacity: '0' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-out-up': 'slide-out-up 0.3s ease-out forwards',
        'slide-in-up': 'slide-in-up 0.3s ease-in forwards',
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
