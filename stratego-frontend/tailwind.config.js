/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cell-light': '#ffccaa',
        'cell-dark': '#a05a2c',
        'cell-pointer': '#ffe6d5ff'
      },
    },
  },
  plugins: [],
}

