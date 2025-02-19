import React from "react";
import Navbar from "./Navbar"; // Import your Navbar component
import { nav } from "./Path/TaskData";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col ">
       <Navbar nav={nav[0]}/>
      <main className="flex-1  mx-auto container">{children}</main>
    </div>
  );
};

export default Layout;