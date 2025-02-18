import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0px 0px rgba(0, 0, 0, 0), 0 0px 3px rgba(0, 0, 0, 0.40)',
        'prim':' 0 0 10px rgba(0, 0, 0, 0.3)'
      },
      backgroundImage:{
        'navbar-custom-gradient': 'linear-gradient(90deg, #ffffff 0%, #6158FF 46%, #ffffff 100%)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bg-blue-11": "#8780FF",
        "bg-blue-12": "#6158FF",  
        "bg-gray-13": "#6B7280",
        "bg-blue-14": "#CECBFF",
        "bg-gray-11": "#F6F5FF",
        "bg-blue-15": "#F6F6FF",
        "bg-blue-16":"#F2F1FF",
        "bg-red": "#FFE5E4",
        "bg-green":"#7ED321",
        "bg-green-light":"#F4FFE8",
        "orange-11":"#F5A623",
        "orange-light-11":"#FFF7E9",
        "green-dark":"#417505",
        "green-light":"#EEFFF2",
        "red-dark":"#D0021B",
        "red-light":"#FFF4F5",
        "text-red": "#E53935",
        "blue-background":"#FBFBFF",
        follow_ups_yellow: "#FFC107",
        follow_ups_green: "#28A745",
        blue_shadow: "#F2F1FF",
      },
     
      scale: {
        "102.5": "1.008",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")]
} satisfies Config;
