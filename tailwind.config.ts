import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yellow: {
          900: "#8d650a",
          800: "#b3760f",
          700: "#d78c34",
          600: "#f3a64e",
          500: "#fbc678",
          400: "#f7ce87",
          300: "#f9dab9",
          200: "#f7ecda",
          100: "#fdf0db",
          50: "#fef3f3",
        },
        green: {
          900: "#363e2a",
          800: "#4e5f37",
          700: "#6a8245",
          600: "#7cad53",
          500: "#a0d7cf",
          400: "#aec8d5",
          300: "#cef2d0",
          200: "#daf6ce",
          100: "#e7f7f3",
          50: "#fcf2fd",
        },
        blue: {
          900: "#526567",
          800: "#838b89",
          700: "#a4a4ac",
          600: "#c4c9ce",
          500: "#d4e5e5",
          400: "#ebeef1",
          300: "#eef6f8",
          200: "#f4f9f5",
          100: "#f7fdf8",
          50: "#fdfdfc",
        },
        gradient: {
          yellow: "linear-gradient(0deg, #000000 0%, #f0d000 100%)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
