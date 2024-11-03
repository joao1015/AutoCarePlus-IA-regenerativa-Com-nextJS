// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBg: "#181661",
      },
    },
  },
  safelist: [
    'bg-white', 'text-blue-500', 'border-2', 'border-blue-500',
    'hover:bg-blue-500', 'hover:text-white', 'rounded-lg', 'py-2', 'px-4',
    'font-bold', 'transition-colors', 'duration-300'
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
