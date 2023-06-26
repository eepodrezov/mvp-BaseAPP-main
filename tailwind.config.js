/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    container: {
      padding: '60px',
      center: true,
    },
    screens: {
      desktop: '768px',
      tablet: '990px',
      main: '1440px',
    },
    fontFamily: {
      source: ['"Source Sans Pro"', 'Arial', 'sans-serif'],
      croogla: ['"Croogla 4F"', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      currentColor: 'currentColor',
      black: 'rgb(var(--black) / <alpha-value>)',
      border: 'rgb(var(--border) / <alpha-value>)',
      text: 'rgb(var(--text) / <alpha-value>)',
      link: 'rgb(var(--link) / <alpha-value>)',
      red: 'rgb(var(--red) / <alpha-value>)',
      green: 'rgb(var(--green) / <alpha-value>)',
      orange: 'rgb(var(--orange) / <alpha-value>)',
      disabled: 'rgb(var(--disabled) / <alpha-value>)',

      main: 'rgb(var(--main) / <alpha-value>)',
      dark: 'rgb(var(--dark) / <alpha-value>)',
      gray: 'rgb(var(--gray) / <alpha-value>)',
      'gray-blue-dark': 'rgb(var(--gray-blue-dark) / <alpha-value>)',
      'gray-blue-light': 'rgb(var(--gray-blue-light) / <alpha-value>)',
      'gray-light': 'rgb(var(--gray-light) / <alpha-value>)',
      white: 'rgb(var(--white) / <alpha-value>)',
      error: 'rgb(var(--error) / <alpha-value>)',
    },
    extend: {
      height: {
        small: '10px',
      },
      minHeight: {
        content: 'calc(100vh - 108px - 186px)',
        'mobile-content': 'calc(100vh - 80px - 375px)',
        'сontent-without-footer': 'calc(100vh - 108px)',
        'mobile-content-without-footer': 'calc(100vh - 84px)',
      },
      gridTemplateColumns: {
        'order-car': '64px 185px 102px 82px 84px 90px 109px 150px 20px',
        'favorite-car': '64px 185px 102px 82px 84px 130px 200px 70px',
        'stoke-car': '64px 185px 55px 80px 60px 250px 200px 20px',
        'order-page-car': '64px 185px 55px 80px 60px 405px 65px',
      },
      width: {
        small: '10px',
      },
      margin: {
        'extra-small': '5px',
        small: '10px',
        base: '15px',
        medium: '25px',
        large: '30px',
      },
      padding: {
        'extra-small': '5px',
        small: '10px',
        base: '15px',
        medium: '25px',
        large: '30px',
      },
      gap: {
        'extra-small': '5px',
        small: '10px',
        base: '15px',
        medium: '25px',
        large: '30px',
      },
      borderRadius: {
        base: '10px',
        large: '20px',
      },
      boxShadow: {
        base: ['0 4px 4px rgba(0, 0, 0, 0.15)', '0 0px 30px rgba(0, 0, 0, 0.11)'],
        button: '0 4px 4px rgba(0, 0, 0, 0.25)',
        'mobile-button': '0px -20px 30px rgba(0, 0, 0, 0.11)',
        panel: '0px 0px 30px rgba(0, 0, 0, 0.11)',
        switch: ['0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)'],
      },
      dropShadow: {
        base: ['0 4px 4px rgba(0, 0, 0, 0.15)', '0 0px 30px rgba(0, 0, 0, 0.11)'],
      },
      cursor: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
