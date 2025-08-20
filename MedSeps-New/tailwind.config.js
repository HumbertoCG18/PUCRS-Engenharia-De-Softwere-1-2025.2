/** @type {import('tailwindcss').Config} */
export default {
  // A propriedade 'content' é crucial. Ela aponta para todos os arquivos
  // que podem conter classes do Tailwind.
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Inclui todos os arquivos JS/JSX/TS/TSX na pasta src
  ],
  theme: {
    extend: {
      // Aqui colocamos nossas customizações de design system.
      colors: {
        'medical-blue': {
          'light': '#60a5fa',
          'DEFAULT': '#3b82f6',
          'dark': '#1d4ed8',
        },
        'health-green': {
          'DEFAULT': '#10b981',
          'dark': '#047857',
        },
        'alert-orange': '#f97316',
        'alert-red': '#ef4444',
        'dark-background': '#111827',
        'dark-card': '#1f2937',
      },
    },
  },
  plugins: [],
}