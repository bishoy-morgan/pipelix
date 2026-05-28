module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#111111',
        'surface-2': '#1a1a1a',
        accent: '#22c55e',
        'accent-hover': '#16a34a',
        'accent-glow': 'rgba(34,197,94,0.15)',
        'accent-subtle': 'rgba(34,197,94,0.08)',
        ink: '#ffffff',
        muted: 'rgba(255,255,255,0.45)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(34,197,94,0.15)',
        'glow-md': '0 0 24px rgba(34,197,94,0.20)',
        'glow-lg': '0 0 40px rgba(34,197,94,0.25)',
        'glass': '0 10px 40px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
}