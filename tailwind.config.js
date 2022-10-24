/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...defaultTheme.colors,
      background: '#DEE3E9',
      'text-blur': '#5361DC',
      'text-black': '#83829B',
      'text-dark-black': '#152446',
      white: '#FFFFFF',
      'dark-green': '#56DC53',
      green: '#2CA588',
      'dark-red': '#DC5353',
      divider: '#DFE2EB',
    },
    extend: {},
  },
  plugins: [],
};
