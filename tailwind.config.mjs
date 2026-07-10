/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-canvas": "#020617",
        "app-surface": "#0f172a",
        "app-surface-raised": "#111c2f",
        "brand-lime": "#ccff00",
        "brand-cyan": "#22d3ee",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "lime-glow": "0 0 28px rgb(204 255 0 / 0.16)",
        surface:
          "0 24px 80px rgb(0 0 0 / 0.32), inset 0 1px 0 rgb(255 255 255 / 0.04)",
      },
      maxWidth: {
        app: "48rem",
      },
    },
  },
};

export default config;
