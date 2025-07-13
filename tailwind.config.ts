import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Define your warm color palette
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431409',
        },
        secondary: { // Complementary warm tones or a neutral for text
          50: '#FDFCFB',
          100: '#F7F6F5',
          200: '#EAE8E5',
          300: '#DCD9D4',
          400: '#C1BBB4',
          500: '#A7A097',
          600: '#8E867C',
          700: '#756D64',
          800: '#5C544B',
          900: '#443D35',
          950: '#2C2621',
        },
      },
    },
  },
}
