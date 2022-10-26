/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        "pulse": "pulse 1s infinite" 
      },
      keyframes: {
        "pulse": {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          }
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
