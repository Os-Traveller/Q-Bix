/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
  },
  plugins: [require("tailwindcss-filters")],
};
