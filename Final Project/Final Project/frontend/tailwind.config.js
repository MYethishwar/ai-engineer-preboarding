// tailwind.config.js
// tells Tailwind which files to scan for class names
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // scan all JS files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}