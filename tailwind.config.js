/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neonPink: '#FF4DFF',
        neonGreen: '#39FF14',
        neonBlue: '#00FFFF',
        neonYellow: '#FFD600',
        darkBg: '#0A0A23',
        glassDark: 'rgba(10,10,35,0.8)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 8px #39FF14, 0 0 16px #FF4DFF',
      },
      backgroundImage: {
        'aurora': 'linear-gradient(135deg, #0A0A23 0%, #1a1a40 50%, #FF4DFF 100%)',
      },
    },
  },
  plugins: [],
}; 