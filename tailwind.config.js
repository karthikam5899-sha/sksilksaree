/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        silk: {
          50: "#fffaf5",
          100: "#fdf0df",
          200: "#f5d9b5",
          300: "#e7b77f",
          400: "#d99a52",
          500: "#b8752d",
          600: "#8f531d",
          700: "#6f3e18",
          800: "#4a2815",
          900: "#2b160d"
        },
        wine: {
          500: "#8f1d3d",
          600: "#75142f",
          700: "#5c1026"
        }
      },
      boxShadow: {
        luxury: "0 20px 60px rgba(87, 48, 20, 0.14)"
      }
    }
  },
  plugins: []
};