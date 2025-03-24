// import React from "react";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
//   // Navigation items for sidebar
//   const navItems = [
//     { name: "Contacts", icon: "sideCallicon.svg",link:"/contact" },
//     { name: "Leads", icon: "customer-engagement.svg" ,link:"/individuallead"},
//     { name: "Deals", icon: "handshake.svg",link:"/deal" },
//     { name: "Resources", icon: "utilization.svg",link:"/resourcelist" },
//     { name: "Vendors", icon: "vendor.svg",link:"/overallvendorprofile" },
//     { name: "Case-Studies", icon: "case-studies.svg",link:"/overallcasestudy" },
//     { name: "To-Do List", icon: "todo.svg",link:"/todolist" },
//     { name: "Meeting", icon: "online-community.svg",link:"/individualmeetingscreen" },
//   ];

//   return (
//     <>
//       {/* Overlay to close sidebar when clicked outside */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={onClose}
//         ></div>
//       )}
      
//       {/* Sidebar component */}
//       <div 
//         className={`fixed top-0  left-0 h-screen bg-white shadow-custom rounded-tr-3xl  rounded-br-3xl w-72 transform transition-transform duration-300 ease-in-out z-30 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >


//         <div className="flex flex-col p-9">
//         <div className="p-4 flex items-center justify-between gap-4">
            
//         <img src="/logo.svg" alt="logo" className="h-6" />
        
//         </div>
//         <div className="overflow-y-auto h-[calc(100vh-64px)]">
//           <ul className="py-4">
//             {navItems.map((item, index) => (
//               <li key={index} className="px-4 py-4 border-b  text-black font-semibold ">
//                 <a 
//                   href={item.link} 
//                   className="flex items-center hover:text-indigo-600 "
//                 >
//                   <span className="inline-flex items-center justify-center w-8 h-8 mr-3 ">
//                    <img src={item.icon} alt="icon" className="h-6  " />
//                   </span>
//                   <span className="opacity-50 text-lg">{item.name}</span>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Navigation items for sidebar
  const navItems = [
    { name: "Contacts", icon: "sideCallicon.svg", link: "/contact" },
    { name: "Leads", icon: "customer-engagement.svg", link: "/individuallead" },
    { name: "Deals", icon: "handshake.svg", link: "/deal" },
    { name: "Resources", icon: "utilization.svg", link: "/resourcelist" },
    { name: "Vendors", icon: "vendor.svg", link: "/overallvendorprofile" },
    { name: "Case-Studies", icon: "case-studies.svg", link: "/overallcasestudy" },
    { name: "To-Do List", icon: "todo.svg", link: "/todolist" },
    { name: "Meeting", icon: "online-community.svg", link: "/individualmeetingscreen" },
  ];

  return (
    <>
      {/* Overlay to close sidebar when clicked outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar component */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg rounded-tr-3xl rounded-br-3xl 
        w-60 sm:w-64 md:w-72 transform transition-transform duration-300 ease-in-out z-30 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col p-4 sm:p-6 md:p-9 h-full">
          <div className="flex items-center justify-between mb-6">
            <img src="/logo.svg" alt="logo" className="h-5 sm:h-6" />
            {/* Add close button for mobile */}
           
          </div>
          
          <div className="overflow-y-auto flex-grow">
            <ul className="py-2">
              {navItems.map((item, index) => (
                <li 
                  key={index} 
                  className="px-2 sm:px-3 md:px-4 py-3 md:py-4 border-b last:border-b-0 text-black font-semibold"
                >
                  <a
                    href={item.link}
                    className="flex items-center hover:text-indigo-600 transition-colors duration-200"
                  >
                    <span className="inline-flex items-center justify-center w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 mr-2 md:mr-3">
                      <img src={item.icon} alt="icon" className="h-5 sm:h-6" />
                    </span>
                    <span className="opacity-50 text-base sm:text-lg truncate">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;