/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eef7ff',
          100: '#d9eaff',
          200: '#bcd8ff',
          300: '#8ebeff',
          400: '#599cff',
          500: '#3579ff',
          600: '#1b5df9',
          700: '#1a4de8',
          800: '#1a3fbc',
          900: '#1c3b94',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      boxShadow: {
        'water': '0 4px 14px 0 rgba(25, 118, 210, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

