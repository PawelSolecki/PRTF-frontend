/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0D171B",
        accent: "#507A94",
        basic: "#F7FAFA",
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
