import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bg-blue-11":"#8780FF",
        "bg-blue-12":"#6158FF",
        "bg-gray-13":"#6B7280",
        "bg-blue-14":"#CECBFF" ,
        "bg-gray-11":"#F6F5FF"
        
      },
      scale: {
        '102.5': '1.008', 
      },
    },
  },
  plugins: [],
} satisfies Config;
