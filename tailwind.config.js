/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0D171B",
        accent: "#507A94",
        basic: {
          DEFAULT: "#F7FAFA", // Kolor podstawowy
          100: "#EFF2F2", // Nieco ciemniejszy
          200: "#E7EAEA", // Jeszcze ciemniejszy
          300: "#DFE2E2", // Najciemniejszy
        },
        secondary: {
          DEFAULT: "#D1DEE5", // Środkowy odcień
          100: "#E6EFF3", // Najjaśniejszy
          200: "#DCE7ED", // Jaśniejszy
          300: "#B8C7D1", // Ciemniejszy
          400: "#9FAAB5", // Najciemniejszy
        },
        myGreen: "#69B684",
        myRed: "#DC666A",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],

        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
