// "use client";
// import Navbar from "./Navbar";
// import { useState } from "react";
// import Card from "../microComponents/Card";
// import LeftCardDetails from "./LeftCardDetails";
// import RecentMeetings from "./RecentMeetings";
// import UnreadMessages from "./UnreadMessages";
// import FollowUps from "./FollowUps";
// import Title from "../microComponents/Title";

// export default function DashboardPage() {
//   const [isChecked, setIsChecked] = useState(false);

//   const title = [
//     {
//       titleName: 'CRM DashBoard',
//       button: "Lead"
//     }
//   ];

//   const handleCheckboxChange = (event:any) => {
//     setIsChecked(event.target.checked);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="px-4 sm:px-6 lg:px-8 py-4">
//         <Title title={title[0].titleName} button={title[0].button} />
//       </div>

//       <div className="px-4 sm:px-6 lg:px-8 ml-20">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* Left sidebar */}
//           <div className="lg:col-span-3">
//             <LeftCardDetails />
//           </div>

//           {/* Main content */}
//           <div className="lg:col-span-8 ">
//             <div className="space-y-6">
//               {/* Top cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {/* Today's Tasks Card */}
//                 <Card
//                   logo={"tabler_checkbox.svg"}
//                   task={"Today's Task"}
//                   lastText={"5 remaining"}
//                 >
//                   <div className="space-y-4">
//                     {[1, 2, 3].map((item) => (
//                       <div key={item} className="flex items-start gap-4 p-2">
//                         <input
//                           type="checkbox"
//                           checked={isChecked}
//                           onChange={handleCheckboxChange}
//                           className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm text-gray-900 font-medium">
//                             Follow up with Client ABC
//                           </p>
//                           <p className="text-sm text-gray-500">Due in 2 hours</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>

//                 {/* Today's Meetings Card */}
//                 <Card
//                   logo={"video.svg"}
//                   task={"Today's Meetings"}
//                   lastText={"View All"}
//                   lastTextColor="text-bg-blue-11"
//                 >
//                   <div className="space-y-4">
//                     {[1, 2, 3].map((item) => (
//                       <div key={item} className="flex items-center gap-4 p-2">
//                         <img src="Frame 423.svg" alt="" className="w-8 h-8" />
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900">
//                             Product Demo - XYZ Corp
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             2:00 PM - 3:00 PM
//                           </p>
//                         </div>
//                         <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
//                           Join
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>

//                 {/* Time Card */}
//                 <Card logo={"cl.svg"} task={"Time"} lastText="">
//                   <div className="space-y-4">
//                     {[
//                       { city: "New York", time: "12:00 PM" },
//                       { city: "London", time: "12:00 PM" },
//                       { city: "Tokyo", time: "12:00 PM" },
//                     ].map((item, index) => (
//                       <div key={index} className="flex justify-between items-center p-2">
//                         <span className="text-sm text-gray-600">{item.city}</span>
//                         <span className="text-sm font-medium">{item.time}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               </div>

//               {/* Bottom cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 <RecentMeetings />
//                 <UnreadMessages />
//                 <FollowUps />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import MonthlyLead from "./Dashboard/MonthlyLead";
import Navbar from "./Navbar";
import Dashboard_Title from "./Dashboard/Dashboard_Title";
import Task from "./Dashboard/Task";
import Meetings from "./Dashboard/Meetings";
import UnreadMessages from "./Dashboard/UnreadMessages";
import TotalLeadLine from "./Dashboard/TotalLeadLine";

const CRMDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-8">
        <Dashboard_Title />

        <div className="mb-6"></div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-6">
            <Task />
            <Meetings />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex space-x-6">
              <div className="w-1/2">
                <MonthlyLead />
              </div>
              <div className="w-1/2">
                <UnreadMessages />
              </div>
            </div>

            <TotalLeadLine />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CRMDashboard;
