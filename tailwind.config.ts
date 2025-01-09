import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "#121212",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
    fontSize: {
      sm: ["0.7rem", "1rem"],
      base: ["0.875rem", "1.25rem"],
      lg: ["1.25rem", "1.75rem"],
      xl: ["1.625rem", "2.125rem"],
    },
    fontWeight: {
      thin: "100",
      normal: "300",
      bold: "600",
    },
  },
  plugins: [],
} satisfies Config;
