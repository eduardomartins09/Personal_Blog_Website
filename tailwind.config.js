/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "#F4F4F4",
        "dark-black": "#0F0F0F",
        "light-gray": "#555",
        "light-white-two": "#FAFAFA"
      }
    },
  },
  plugins: [],
}
