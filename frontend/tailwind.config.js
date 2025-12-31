import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      {
        black: {
          ...require("daisyui/src/theming/themes")["black"],
          "primary": "#4f46e5", // Indigo 600 - Deep Royal
          "secondary": "#3b82f6", // Blue 500 - Professional Blue
          "accent": "#8b5cf6", // Violet 500 - Rich Violet
          "neutral": "#27272a", // Zinc 800
          "base-100": "#050505", // Softened Pure Black
          "base-200": "#0A0A0A", // Deep Matte Grey
          "base-300": "#1A1A1A", // Lighter Matte
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#eab308",
          "error": "#ef4444",
        },
      },
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
