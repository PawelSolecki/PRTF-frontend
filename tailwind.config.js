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
        secondary: "#D1DEE5",
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
