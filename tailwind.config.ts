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
<<<<<<< HEAD
        "bg-blue-14":"#CECBFF" ,
        "bg-gray-11":"#F6F5FF"
        
=======
        "bg-blue-14":"#CECBFF",
        "bg-red":"#FFE5E4",
        "text-red":"#E53935",
        "follow_ups_yellow":"#FFC107",
        "follow_ups_green":"#28A745"
>>>>>>> a79f9dff93ec3b874dcab66990b2ef7f42b6f726
      },
      scale: {
        '102.5': '1.008', 
      },
    },
  },
  plugins: [],
} satisfies Config;
