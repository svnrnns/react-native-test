/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        body: 'var(--color-body)',
        module: 'var(--color-module)',
        box: 'var(--color-box)',
        piece: 'var(--color-piece)',
        detail: 'var(--color-detail)',
        font: 'var(--color-font)',
        heading: 'var(--color-heading)',
        placeholder: 'var(--color-placeholder)',
        main: 'var(--color-main)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)',
      },
    },
  },
  plugins: [],
};
