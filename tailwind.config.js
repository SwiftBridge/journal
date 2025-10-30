/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed',
        card: '#1a1a1a',
        border: '#2a2a2a',
        primary: {
          50: '#fef2f2',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
        },
      },
    },
  },
  plugins: [],
}
