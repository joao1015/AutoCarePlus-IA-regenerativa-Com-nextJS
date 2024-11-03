const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#3B82F6',
        textGray: '#333',
        textDark: '#000',
        borderGray: '#ddd',
        bgGray: '#f5f5f5',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  safelist: [
    'bg-white', 'text-black', 'text-blue-500', 'border-blue-500', 'bg-primary', 'bg-secondary', 
    'hover:text-blue-500', 'hover:border-blue-500', 'hover:bg-green-600', 'hover:bg-blue-600', 
    'text-red-500', 'text-green-500', 'text-lg', 'mt-4', 'text-center', 'focus:border-blue-700',
    'md:flex', 'lg:flex', 'lg:gap-12', 'md:gap-8', 'lg:h-24', 'md:h-20', 'hidden', 'block',
    'cursor-pointer', 'font-bold', 'transition-colors', 'duration-300', 'rounded-lg', 'py-2',
    'px-4', 'bg-gray-100', 'bg-gray-200', 'border-gray-300', 'border', 'rounded-md', 'shadow-md',
  ],
  plugins: [forms],
};
