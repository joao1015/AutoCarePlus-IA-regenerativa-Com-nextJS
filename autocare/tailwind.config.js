

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  safelist: [
  
      'bg-white', 'text-black', 'text-blue-500', 'border-blue-500', 
      'hover:text-blue-500', 'hover:border-blue-500',
      'md:flex', 'lg:flex', 'lg:gap-12', 'md:gap-8', 'lg:h-24', 'md:h-20',
      'hidden', 'block', 'cursor-pointer', 'font-bold', 'transition-colors', 
      'duration-300', 'rounded-lg', 'py-2', 'px-4',
    
  ],
  plugins: [],
};
