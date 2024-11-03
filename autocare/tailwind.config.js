// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}" // Inclua os diretórios que usam Tailwind CSS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
