/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Playwrite AU VIC", "sans-serif"], // Default sans-serif font family
        roboto: ["Roboto", "sans-serif"],
        playwrite: ["Playwrite AU NSW", "sans-serif"],
      },
    },
  },
  plugins: [],
};
