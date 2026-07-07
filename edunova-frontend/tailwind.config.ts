import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — from EduNova brand guidelines
        primary: {
          DEFAULT: '#1E3A8A', // Academic Blue
          50: '#EEF2FC',
          100: '#DCE4F8',
          200: '#B4C4EE',
          300: '#8CA3E4',
          400: '#4A67C4',
          500: '#1E3A8A',
          600: '#1A3178',
          700: '#152860',
          800: '#101E48',
          900: '#0B1530',
        },
        secondary: {
          DEFAULT: '#10B981', // Education Green
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#0D9668',
        },
        accent: {
          DEFAULT: '#F97316', // Learning Orange
          50: '#FFF4EB',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA6A0C',
        },
        highlight: {
          DEFAULT: '#FBBF24', // Academic Gold
          50: '#FEFBEA',
          400: '#FCD34D',
          500: '#FBBF24',
        },
        surface: '#122559',      // Card surface (deep academic blue glass)
        ink: {
          DEFAULT: '#FFFFFF',    // Text Primary — white, per brand direction
          soft: '#C3CEEA',       // Text Secondary — soft ice-blue
        },
        night: '#060B22',        // Dark Background — deep silk blue-black
        deep: {
          50: '#EAF0FF',
          100: '#0A1440',
          200: '#0D1B52',
          300: '#122559',
          400: '#16306E',
          500: '#1B3B85',
        },
        success: '#22C55F',
        danger: '#DC2626',
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sub: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        num: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '90rem',
      },
      boxShadow: {
        card: '0 2px 14px 0 rgb(4 10 35 / 0.35), 0 1px 2px 0 rgb(4 10 35 / 0.25)',
        'card-hover': '0 20px 45px -12px rgb(30 58 138 / 0.55)',
        glow: '0 0 0 1px rgb(255 255 255 / 0.08), 0 20px 60px -10px rgb(30 58 138 / 0.5)',
        'inner-glass': 'inset 0 1px 0 0 rgb(255 255 255 / 0.08)',
      },
      backgroundImage: {
        'pixel-sunrise':
          'radial-gradient(circle at 15% 20%, rgba(59,130,246,0.30), transparent 40%), radial-gradient(circle at 85% 0%, rgba(16,185,129,0.22), transparent 45%), radial-gradient(circle at 50% 100%, rgba(30,58,138,0.30), transparent 50%)',
        'silk-blue':
          'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(59,130,246,0.22), transparent 55%), radial-gradient(ellipse 70% 60% at 85% 15%, rgba(16,185,129,0.14), transparent 50%), radial-gradient(ellipse 80% 70% at 50% 100%, rgba(30,58,138,0.35), transparent 55%), linear-gradient(180deg, #0A1440 0%, #0D1B52 45%, #081030 100%)',
        'silk-blue-soft':
          'radial-gradient(ellipse 70% 60% at 10% 10%, rgba(59,130,246,0.16), transparent 50%), radial-gradient(ellipse 60% 60% at 90% 90%, rgba(16,185,129,0.12), transparent 50%), linear-gradient(180deg, #0D1B52 0%, #122559 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        'gradient-slide': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'orbit-3d': {
          '0%': { transform: 'perspective(900px) rotateX(12deg) rotateY(0deg) translateZ(0px)' },
          '50%': { transform: 'perspective(900px) rotateX(-8deg) rotateY(180deg) translateZ(30px)' },
          '100%': { transform: 'perspective(900px) rotateX(12deg) rotateY(360deg) translateZ(0px)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(20px, -30px, 0) scale(1.06)' },
          '66%': { transform: 'translate3d(-24px, 18px, 0) scale(0.96)' },
        },
        'drift-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-30px, 24px, 0) scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'gradient-slide': 'gradient-slide 8s linear infinite',
        'orbit-3d': 'orbit-3d 16s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        'drift-slow': 'drift-slow 18s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
