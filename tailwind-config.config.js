import common from './tailwind.config.js';

/** @type { import('tailwindcss').Config } */
export default {
  ...common,
  content: ['./src/components/**/*.{ts,tsx}', './src/lib/**/*.{ts,tsx}', './src/config/**/*.{ts,tsx}'],
};
