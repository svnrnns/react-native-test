import { vars } from 'nativewind';

const hexToRgb = (hex: string) => {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Expand 3-digit hex to 6-digit if necessary
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Parse hex to RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r} ${g} ${b}`;
};

const light = {
  body: '#fff',
  module: '#fff',
  box: '#f6f6f6',
  piece: '#efefef',
  detail: '#ececec',
  font: '#737373',
  heading: '#282828',
  placeholder: '#b1b7ba',
  main: '#5b51d8',
  success: '#4edd76',
  warning: '#fb923c',
  danger: '#e62c2c',
  info: '#0198ff',
};

const dark = {
  body: '#0c0d0e',
  module: '#111213',
  box: '#1b1b1f',
  piece: '#272930',
  detail: '#1c1f26',
  font: '#a3a4a0',
  heading: '#f5f5f5',
  placeholder: '#5d5d62',
  main: '#5b51d8',
  success: '#22b453',
  warning: '#e6a037',
  danger: '#e65d51',
  info: '#47a6e6',
};

const themes = {
  light: vars(
    Object.entries(light).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--color-${key}`]: hexToRgb(value),
      }),
      {}
    )
  ),
  dark: vars(
    Object.entries(dark).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--color-${key}`]: hexToRgb(value),
      }),
      {}
    )
  ),
};

export { dark, light, themes };
