/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B2A4A",
        accent: "#2563EB",
        bg: "#F5F7FB",
        border: "#E5E7EB",
        muted: "#6B7280"
      },
      borderRadius: {
        xl: "14px"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
