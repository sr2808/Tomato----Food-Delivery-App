/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: "Outfit",
      },
      colors: {
        customBlue: '#49557e',
        tomato: '#ff6347',
        grey:"#e2e2e2",
      },
    },
  },
  plugins: [],
};
