import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#F7931A',
        'brand-dark': '#0D0D0D',
        'surface-card': '#1A1A1A',
        'surface-border': '#2A2A2A',
      },
    },
  },
  plugins: [],
};

export default config;
