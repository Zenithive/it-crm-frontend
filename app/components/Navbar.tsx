import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  nav: {
    name: string;
    designation: string;
  };
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ nav, toggleSidebar }) => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/dashboard");
  };
  const { name, designation } = nav || {};
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <div className="bg-white shadow-navbar-shadow h-24 p-4">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center gap-4 justify-center space-x-3">
            <img
              src="/hamburger.svg"
              alt="icon"
              className="h-7 cursor-pointer"
              onClick={toggleSidebar}
            />
            <img
              src="/logo.svg"
              alt="logo"
              className="h-6 cursor-pointer"
              onClick={handleRedirect}
            />
          </div>

          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-[413px] rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <img src="/hamburger.svg" alt="Menu" className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={handleRedirect}
          >
            <img src="/nav_icon1.svg" alt="Navbar" className="w-5 h-5" />
          </button>
          <div className="h-8 w-px border-l border-gray-300"></div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="/nav_icon3.svg" alt="Navbar" className="w-7 h-7" />
          </button>
          <div className="h-8 w-px border-l border-gray-300"></div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="/location.svg" alt="Navbar" className="w-6 h-6" />
          </button>

          <div className="relative flex items-center space-x-3">
            <div className="flex items-center">
              <div className="ml-2">
                <p className="text-sm font-semibold text-gray-700">
                  {name || "User"}
                </p>
                <p className="text-xs text-gray-500">{designation || "Role"}</p>
              </div>
              <div className="flex items-center ml-4">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="focus:outline-none"
                >
                  <img src="/dropdown.svg" alt="Profile" className="h-4 w-4" />
                </button>
              </div>
            </div>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                <ul className="py-2">
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        console.log("Edit Profile clicked");
                        setIsProfileDropdownOpen(false);
                      }}
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        console.log("Logout clicked");
                        setIsProfileDropdownOpen(false);
                        // Add logout logic here
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-4 p-4 bg-gray-50 absolute top-24 left-0 w-full z-10">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="/nav_icon1.svg" alt="Navbar" className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="/nav_icon3.svg" alt="Navbar" className="w-7 h-7" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src="/location.svg" alt="Navbar" className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center">
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-700">
                  {name || "User"}
                </p>
                <p className="text-xs text-gray-500">{designation || "Role"}</p>
              </div>
              <div className="flex items-center ml-4">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="focus:outline-none"
                >
                  <img src="/dropdown.svg" alt="Profile" className="h-4 w-4" />
                </button>
              </div>
            </div>
            {isProfileDropdownOpen && (
              <div className="mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                <ul className="py-2">
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        console.log("Edit Profile clicked");
                        setIsProfileDropdownOpen(false);
                      }}
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        console.log("Logout clicked");
                        setIsProfileDropdownOpen(false);
                        // Add logout logic here
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
