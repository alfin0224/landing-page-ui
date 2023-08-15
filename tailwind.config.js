/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Add custom colors here
        primary: '#FF0000',
        secondary: '#00FF00',
        tertiary: '#0000FF',
      },
    },
  },
  variants: {},
  plugins: [],
}

