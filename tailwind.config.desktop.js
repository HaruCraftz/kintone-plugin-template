//@ts-check
import common from './tailwind.config.common.js';

/** @type { import('tailwindcss').Config } */
export default {
  ...common,
  content: ['./src/lib/**/*.{ts,js,jsx,tsx}', './src/desktop/**/*.{ts,js,jsx,tsx}'],
};
