module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        'surface-2': '#1a1a1a',
        border: 'rgba(255,255,255,0.08)',
        accent: '#22c55e',
        'accent-hover': '#16a34a',
        'accent-glow': 'rgba(34,197,94,0.15)',
        ink: '#ffffff',
        muted: 'rgba(255,255,255,0.45)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [],
}