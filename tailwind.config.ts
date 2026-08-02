import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Australian natural palette: eucalyptus green, coral, sand
        primary: {
          DEFAULT: '#2D6A4F', // Forest/Eucalyptus green
          50: '#EDF5F0',
          100: '#D1E7DB',
          200: '#A7D1BA',
          300: '#74B693',
          400: '#4D9A72',
          500: '#2D6A4F',
          600: '#245540',
          700: '#1B4030',
          800: '#122B20',
          900: '#091610',
        },
        secondary: {
          DEFAULT: '#F4A261', // Warm sand/gold
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
          DEFAULT: '#E76F51', // Coral/Terracotta
          50: '#FDEFEB',
          100: '#FCDDD3',
          200: '#F9BBA9',
          300: '#F5987F',
          400: '#E76F51',
          500: '#D45A3C',
          600: '#B34830',
          700: '#863624',
          800: '#5A2418',
          900: '#2D120C',
        },
        earth: {
          DEFAULT: '#8E6E53',
          light: '#C4A882',
          dark: '#5C4735',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
