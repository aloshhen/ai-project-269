export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1929',
        },
        gold: {
          100: '#fff8e1',
          200: '#ffecb3',
          300: '#ffe082',
          400: '#ffd54f',
          500: '#ffca28',
          600: '#ffc107',
          700: '#ffb300',
        },
        cream: {
          50: '#faf9f6',
          100: '#f5f2ed',
          200: '#ebe5dc',
        }
      }
    },
  },
  plugins: [],
}