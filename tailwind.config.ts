import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        fg: "rgb(var(--color-fg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        overlay: "rgb(var(--color-overlay) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        subtle: "rgb(var(--color-subtle) / <alpha-value>)",
        highlightLow: "rgb(var(--color-highlight-low) / <alpha-value>)",
        highlightMed: "rgb(var(--color-highlight-med) / <alpha-value>)",
        highlightHigh: "rgb(var(--color-highlight-high) / <alpha-value>)",
        love: "rgb(var(--color-love) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        rose: "rgb(var(--color-rose) / <alpha-value>)",
        pine: "rgb(var(--color-pine) / <alpha-value>)",
        foam: "rgb(var(--color-foam) / <alpha-value>)",
        iris: "rgb(var(--color-iris) / <alpha-value>)",
      },
      fontFamily: {
        MPlus: ["Poppins"],
      },
    },
  },
  plugins: [],
} satisfies Config;
