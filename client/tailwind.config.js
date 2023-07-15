/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "mi-sombra": "0rem 0.3rem 1rem rgba(132, 139, 200, 0.18)",
      },
      fontFamily: {
        "lamia": "'Poppins', sans-serif;",
      },
    },
  },
  plugins: [require("daisyui")],
};
