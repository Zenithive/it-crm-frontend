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
           "bg-gray-14":"  #F6F6FF",
           "bg-gray-15":"#838383",
        "bg-blue-14":"#CECBFF" ,
        "bg-gray-11":"#F6F5FF",
        "blue-111": "#F6F5FF",
        "bg-red":"#FFE5E4",
        "text-red":"#E53935",
        "follow_ups_yellow":"#FFC107",
        "follow_ups_green":"#28A745" ,
        "green-11":"#28A745"
      
      },
      scale: {
        '102.5': '1.008', 
      },
    },
  },
  plugins: [],
} satisfies Config;
