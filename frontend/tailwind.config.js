module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#141414',
        border: 'rgba(255,255,255,0.1)',
        accent: '#7c3aed',
        'accent-hover': '#6d28d9',
        ink: '#ffffff',
        muted: 'rgba(255,255,255,0.5)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
      },
      borderColor: {
        accent: '#7c3aed',
      },
    },
  },
  plugins: [],
}