/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0B1E3D",
          700: "#16294A",
          600: "#1E3358",
        },
        orange: {
          500: "#FF6A1A",
          100: "#FFE3D1",
        },
        cream: {
          50: "#F7F4EE",
        },
        slate: {
          400: "#8792A6",
          600: "#5B6472",
        },
        brandgreen: "#22A06B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
