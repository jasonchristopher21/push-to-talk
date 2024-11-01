/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'solid': '0px 5px 0 #809bce, 0px 5px 0 1px #000000',
        'solid-hover': '0px 3px 0 #809bce, 0px 3px 0 1px #000000'
      }
    },
  },
  plugins: [],
}

