/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      inset: {
        '88vh': '88vh',
        '95vw': '95vw',
      },
    height: {
        '90vh': '91vh',
        '98' : '500px',
        '99' : '510px',
    },
    dropShadow: {
      'blue-drop': '0 2px 2px rgb(59 130 246)',
    }


    
    },
  },
  plugins: [],
}