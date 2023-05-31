/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'qu-',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'cactus-dark': '#164A41',
        'cactus-medium': '#4D774E',
        'cactus-light': '#9DC88D',
        'cactus-yellow': '#F1B24A',
      },
      fontFamily: {
        impact: ['Impact', 'Haettenschweiler', '"Arial Narrow Bold"', 'sans-serif'],
      },
      zIndex: {
        infinity: '99999',
      },
    },
    screens: {
      xs: '281px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
