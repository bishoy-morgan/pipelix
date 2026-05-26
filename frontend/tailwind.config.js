/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Background system
        bg: {
          DEFAULT: '#050505',
          secondary: '#080808',
          tertiary: '#0D0D0D',
          elevated: '#111111',
          canvas: '#070B08',
        },

        // Emerald accent system
        accent: {
          DEFAULT: '#78FF65',
          soft: '#5BE44A',
          hover: '#8BFF7B',
          muted: 'rgba(120,255,101,0.12)',
          glow: 'rgba(120,255,101,0.18)',
        },

        // Glass surfaces
        glass: {
          DEFAULT: 'rgba(255,255,255,0.03)',
          soft: 'rgba(255,255,255,0.04)',
          strong: 'rgba(255,255,255,0.06)',
          border: 'rgba(255,255,255,0.08)',
          edge: 'rgba(255,255,255,0.12)',
        },

        // Typography
        ink: {
          DEFAULT: '#F5F5F5',
          soft: 'rgba(255,255,255,0.72)',
          muted: 'rgba(255,255,255,0.48)',
          dim: 'rgba(255,255,255,0.28)',
        },

        // Utility colors
        success: '#78FF65',
        warning: '#FACC15',
        danger: '#FF5F57',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '28px',
        pill: '9999px',
      },

      backdropBlur: {
        xs: '2px',
        sm: '6px',
        md: '12px',
        lg: '20px',
        xl: '28px',
      },

      boxShadow: {
        // Main glass shadow
        glass: `
          0 10px 40px rgba(0,0,0,0.42),
          inset 0 1px 0 rgba(255,255,255,0.04)
        `,

        // Subtle emerald glow
        glow: `
          0 0 0 1px rgba(120,255,101,0.16),
          0 0 24px rgba(120,255,101,0.10)
        `,

        // Strong selected glow
        'glow-strong': `
          0 0 0 1px rgba(120,255,101,0.22),
          0 0 40px rgba(120,255,101,0.16)
        `,

        // Floating panels
        panel: `
          0 20px 60px rgba(0,0,0,0.45)
        `,
      },

      backgroundImage: {
        // Ambient fog
        ambient: `
          radial-gradient(
            circle at top,
            rgba(120,255,101,0.08),
            transparent 45%
          )
        `,

        // Dot grid
        grid: `
          radial-gradient(
            rgba(255,255,255,0.08) 1px,
            transparent 1px
          )
        `,
      },

      backgroundSize: {
        grid: '24px 24px',
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      transitionDuration: {
        250: '250ms',
        400: '400ms',
      },
    },
  },

  plugins: [],
}