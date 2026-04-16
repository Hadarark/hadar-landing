import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: "#A0522D",
        "terracotta-dark": "#8B4513",
        olive: "#6B7A5A",
        navy: "#2C3E5A",
        gold: "#C8956C",
        "bg-warm": "#F5F4F2",
        "bg-white": "#FFFFFF",
      },
      fontFamily: {
        assistant: ["Assistant", "Rubik", "Heebo", "Arial", "sans-serif"],
      },
      boxShadow: {
        terracotta: "0 0 20px rgba(160, 82, 45, 0.2)",
        "terracotta-md": "0 4px 24px rgba(160, 82, 45, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
