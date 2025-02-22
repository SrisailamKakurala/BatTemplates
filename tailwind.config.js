/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC0119', // red for text and components
        primaryHover: '#FA0119', // red for text and components
        secondary: '#111827', // for components
        secondaryHover: '#1F2937', // for components
        primaryBg: '#1E1E1E', // light black of body
        primaryBg: '#1E1E1E', // light black of body
        authBg: '#1F1A1A',
        secondaryButton: '#1F2937',
        secondaryButtonHover: '#374151',
        whiteText: '#E9E9E9',
      },
      fontFamily: {
        roboto: ['Roboto', 'serif'],
        lilitaOne: ['Lilita One', 'serif'],
      },
    },
  },
  plugins: [],
}

