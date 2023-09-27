/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  safelist: [
    "bg-orange-500",
    "bg-orange-400",
    "bg-orange-300",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          750: '#333333',
          850: '#212121',
        }
      }
    },
  },
  plugins: [],
}

