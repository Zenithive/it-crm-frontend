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
        'navbar-shadow' : '0px 4px 6px 0px #0000000D',
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
        "blue_shadow": "#F2F1FF",
        "gray-background": "#F9F8FF",
        "blue-shadow-color" : "#F3F3FF",
        "green-shadow-color" : "#E9FFEE",      
        "orange-shadow-color" : "#FFFBED",
        "red-shadow-color":"#FFF4F5",
        "orange-text":"#E3AA00",
        "green-text":"#14A155",
        "red-text":"#E53935",
        "content-border":"rgba(97, 88, 255, 0.5)",
        "blue-shadow":"#F8F8FF",
        "gray-text": "#333333",
        "lead-source-blue":"#3B5998",
        "lead-source-green":"#36C86F",
        "lead-source-orange":"#FF6F61",
        "lead-source-purple":"#8E44AD",
        "map-orange":"#FFAB48",
        "shadow-green":"#C3FFD1",
        "blue-barchart":"#C6D2FD",
        
      },
     
      scale: {
        "102.5": "1.008",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")]
} satisfies Config;
