


import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  nav?: {
    name: string;
    designation: string;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, nav }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const hiddenNavbarPaths = ["/login"];


  const shouldHideNavbar = hiddenNavbarPaths.includes(pathname);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen ">
      {/* Navbar */}

     { !shouldHideNavbar &&
      <Navbar 
        nav={nav || { name: "", designation: "" }} 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
      />
     }
      <div className="flex-1 flex relative">
       
        <div 
          className={`flex-1 overflow-auto transition-all duration-300 ease-in-out  mx-auto container ${
            isSidebarOpen ? "filter blur-sm " : ""
          }`}
        >
          {children}
        </div>
        
        {/* Sidebar Component */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar} 
        />
      </div>
    </div>
  );
};

export default Layout;