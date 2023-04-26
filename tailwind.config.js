/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "white-overlay": "rgba(255, 255, 255, 0.3)",
        "black-overlay": "rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        display: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        "white-glow": "3px 3px 10px 0px rgb(255,255,255,0.4)",
      },
    },
  },
  plugins: [],
};
