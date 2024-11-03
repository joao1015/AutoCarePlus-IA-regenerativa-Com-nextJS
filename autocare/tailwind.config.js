// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-white', 'text-blue-500', 'border-blue-500', 
    'md:flex', 'lg:ml-4', 'hover:border-blue-500',
  ],
  plugins: [],
};
