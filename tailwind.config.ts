import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        jedi: {
          blue: '#1a4b84',    // Jedi Robe Blue
          gold: '#ffd700',    // Lightsaber Gold
          green: '#00ff00',   // Jedi Lightsaber Green
          red: '#ff0000',     // Sith Lightsaber Red
          purple: '#800080',  // Mace Windu's Purple
        },
        starwars: {
          dark: '#000000',    // Space Black
          gray: '#333333',    // Death Star Gray
          light: '#f0f0f0',   // Stormtrooper White
          yellow: '#ffe81f',  // Star Wars Yellow
        },
      },
      backgroundImage: {
        'stars': "url('/images/stars-bg.jpg')",
        'death-star': "url('/images/death-star-bg.jpg')",
      },
      fontFamily: {
        'starwars': ['Star Jedi', 'sans-serif'],
      },
      animation: {
        'lightsaber': 'lightsaber 1s ease-in-out infinite',
        'force-push': 'forcePush 0.5s ease-out',
      },
      keyframes: {
        lightsaber: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        forcePush: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config 