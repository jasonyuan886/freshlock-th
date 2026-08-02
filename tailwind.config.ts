import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Thai-inspired palette: bamboo green, Thai gold, warm cream
        primary: {
          DEFAULT: '#3A7D44', // Bamboo green
          50: '#EDF7EE',
          100: '#D1ECD4',
          200: '#A8D9AE',
          300: '#7BC585',
          400: '#52B25F',
          500: '#3A7D44',
          600: '#2E6638',
          700: '#234E2B',
          800: '#17361D',
          900: '#0B1E0F',
        },
        secondary: {
          DEFAULT: '#F4A261', // Warm sand/gold (kept)
          50: '#FEF6EC',
          100: '#FDE8C8',
          200: '#FBD19A',
          300: '#F9B96C',
          400: '#F4A261',
          500: '#E8913A',
          600: '#C47A30',
          700: '#936024',
          800: '#624018',
          900: '#31200C',
        },
        accent: {
          DEFAULT: '#D4A017', // Thai gold (royal/Buddhist)
          50: '#FDF8E8',
          100: '#FAEDC4',
          200: '#F5DB8A',
          300: '#F0C950',
          400: '#D4A017',
          500: '#B88810',
          600: '#946D0C',
          700: '#6E5209',
          800: '#483706',
          900: '#221C03',
        },
        earth: {
          DEFAULT: '#8E6E53',
          light: '#C4A882',
          dark: '#5C4735',
        },
      },
      fontFamily: {
        sans: ['Noto Sans Thai', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
