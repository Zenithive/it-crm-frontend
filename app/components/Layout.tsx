"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; 
import { nav } from "./Path/TaskData";
import "./Dashboard/Dashboard.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  

  const hiddenNavbarPaths = ["/login"];

 
  const shouldHideNavbar = hiddenNavbarPaths.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
     
      {!shouldHideNavbar && <Navbar nav={nav[0]} />}
      
      <main className="flex-1 mx-auto container">
        {children}
      </main>
    
    </div>
  );
};

export default Layout;
