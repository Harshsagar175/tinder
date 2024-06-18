/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff4757",
        primaryLight: "#ff6b81",
      },
      fontFamily: {
        concertOne: ["Concert One", "sans-serif"],
        ropaSans: ["Ropa Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
