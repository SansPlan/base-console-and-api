/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        header: 'var(--site-header-height)',
        navbar: 'var(--site-tab-bar-height)',
        pageHeight: 'calc(100vh - var(--site-header-height))',
        pageHeight2: 'calc(100vh - var(--site-header-height) - var(--site-tab-bar-height))',
      },
      colors: {
        background: 'var(--site-background)',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
}
