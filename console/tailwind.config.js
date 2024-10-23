/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      height: {
        header: 'var(--learn-header-height)',
        navbar: 'var(--learn-tab-bar-height)',
      },
      colors: {
        background: 'var(--learn-background)',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
}
