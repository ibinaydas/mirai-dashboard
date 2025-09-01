// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors for your charts if needed
        'chart-blue': '#8884d8',
        'chart-green': '#82ca9d',
        'chart-yellow': '#ffc658',
        'chart-orange': '#ff7300',
        'chart-cyan': '#0088fe'
      }
    },
  },
  plugins: [],
}
