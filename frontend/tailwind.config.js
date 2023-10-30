/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'royalBlue': '#0a66c2',
      'white': '#fff',
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      boxShadow: {
        'bsd-bottom': 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;',
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}

