/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        header: 'var(--learn-header-height)',
        navbar: 'var(--learn-tab-bar-height)',
        pageHeight: 'calc(100vh - var(--learn-header-height))',
        pageHeight2: 'calc(100vh - var(--learn-header-height) - var(--learn-tab-bar-height))',
      },
      colors: {
        background: 'var(--learn-background)',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
}
