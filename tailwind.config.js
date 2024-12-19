/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/**/*.ejs',  // Incluye todas las vistas .ejs en /views
    './src/public/js/**/*.js', // Incluye todos los scripts en la carpeta public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

