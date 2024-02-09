/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'background': '#F5F7F8',
        'main': '#45474B',
        'submain': '#495E57',
        'accent': '#F4CE14',
      },
    },
  },
  plugins: [],
}

