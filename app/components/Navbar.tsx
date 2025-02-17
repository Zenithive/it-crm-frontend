import React, { useState } from "react";
import { Search } from "lucide-react";
import {nav} from '../components/Path/TaskData'

const Navbar = ({nav}) => {
  const {name,designation} = nav || {}; 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm h-[100px] p-4">
      {/* Main navbar */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left section with logo and search */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="">
            <img src="logo.svg" alt="logo" className="h-6" />
          </div>

          {/* Search bar */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-[413px] rounded-xl border border-bg-blue-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Hamburger for mobile view */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {/* <img src="hamburger.svg" alt="menu" className="h-6 w-6" /> */}
          </button>
        </div>

        {/* Right section with icons and profile */}
        <div className="hidden sm:flex items-center space-x-2">
          {/* Navigation icons */}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="nav_icon1.svg" alt="Navbar" className="w-5 h-5"></img>
          </button>
          <div
            className="h-8 w-px"
            style={{
              borderLeft: "1px solid",
              borderImage:
                "linear-gradient(180deg, #ffffff 0%, #6158FF 46%, #ffffff 100%) 1",
            }}
          ></div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="nav_icon3.svg" alt="Navbar" className="w-7 h-7"></img>
          </button>
          <div
            className="h-8 w-px"
            style={{
              borderLeft: "1px solid",
              borderImage:
                "linear-gradient(180deg, #ffffff 0%, #6158FF 46%, #ffffff 100%) 1",
            }}
          ></div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="location.svg" alt="Navbar" className="w-6 h-6"></img>
          </button>

          {/* Profile section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="ml-2">
                <p className="text-sm font-semibold text-gray-700">
                  {nav.name}
                </p>
                <p className="text-xs text-gray-500">{nav.designation}</p>
              </div>
              <div className="flex items-center ml-4">
                <img
                  src="dropdown.svg"
                  alt="Profile"
                  className="h-4 w-4 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-4 p-4 bg-gray-50 absolute top-[100px] left-0 w-full z-10">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="nav_icon1.svg" alt="Navbar"></img>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="nav_icon2.svg" alt="Navbar"></img>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="nav_icon3.svg" alt="Navbar"></img>
          </button>

          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center">
              <img
                src="avatar.svg"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-700">
                  Johny Larsen
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
