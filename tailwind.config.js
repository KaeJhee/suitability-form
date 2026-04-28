/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ghost: {
          950: "#0a0a0f",
          900: "#12121a",
          800: "#1a1a26",
          700: "#252535",
          accent: "#6366f1",
          gold: "#d4af37",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Inter",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
