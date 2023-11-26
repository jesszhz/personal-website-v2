import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        MPlus: ["Poppins"],
      },
    },
  },
  plugins: [],
} satisfies Config;
