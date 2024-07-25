module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 1s ease-out forwards',
      },
      colors: {
        customBlue: '#49557e',
        tomato: '#ff6347',
        grey:"#e2e2e2",
      },
      fontSize: {
        '18px': '18px',
      },
      fontFamily: {
        'outfit': 'Outfit'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};

