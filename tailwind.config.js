/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        test: 'rgb(var(--color-test) / <alpha-value>)',
        body: 'rgb(var(--color-body) / <alpha-value>)',
        module: 'rgb(var(--color-module) / <alpha-value>)',
        box: 'rgb(var(--color-box) / <alpha-value>)',
        piece: 'rgb(var(--color-piece) / <alpha-value>)',
        detail: 'rgb(var(--color-detail) / <alpha-value>)',
        font: 'rgb(var(--color-font) / <alpha-value>)',
        heading: 'rgb(var(--color-heading) / <alpha-value>)',
        placeholder: 'rgb(var(--color-placeholder) / <alpha-value>)',
        main: 'rgb(var(--color-main) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
