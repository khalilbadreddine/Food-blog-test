/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fdfbf7',
          100: '#f7f2e8',
          200: '#eee3cf',
          300: '#e1cca9',
          400: '#d2b07e',
          500: '#c5955a',
          600: '#b77e4b',
          700: '#98613d',
          800: '#7b4e37',
          900: '#644130',
          950: '#362117',
        },
        blueprint: {
          bg: '#0a192f',
          paper: '#0f2b48',
          grid: 'rgba(64, 153, 255, 0.15)',
          accent: '#38bdf8',
          line: '#60a5fa',
          glow: '#00f0ff',
          text: '#e0f2fe',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'blueprint-grid': "linear-gradient(to right, rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.1) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
