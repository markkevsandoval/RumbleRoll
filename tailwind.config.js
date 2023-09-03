/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["src/*"],
  theme: {
    fontFamily: {
      bangers: ["Bangers", "cursive"],
    },
    extend: {
      backgroundImage: {
        dark: "url('./assets/svg/background-dark.svg')",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
