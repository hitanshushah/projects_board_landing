/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17265C',
        secondary: '#193BB5',
        accent: '#06B6D4',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        success: '#10B981',
        brand: {
          50: "#eef2ff",
          500: "#7C3AED",
          600: "#6D28D9",
        },
        bgd1: "#020913",
        bgd2: "#04345A",
        background: "#121212",
      },
      boxShadow: {
        'glow-blue': '0 0 25px rgba(59,130,246,0.6)',
        'glow-brand': '0 0 25px rgba(124,58,237,0.7)',
      },
    },
  },
  plugins: [],
}
