// import React from "react";
// import Content from "../../microComponents/Content";

// const RecentMeetings = () => {
//   const recent_meetings = [
//     {
//       profileImage: "profileLogo.svg",
//       name: "Client Meeting",
//       time: "Yesterday, 3:00 PM",
//     },
//     {
//       profileImage: "profileLogo.svg",
//       name: "Client Meeting",
//       time: "Yesterday, 3:00 PM",
//     },
//     {
//       profileImage: "profileLogo.svg",
//       name: "Client Meeting",
//       time: "Yesterday, 3:00 PM",
//     },
//   ];

//   return (
//     <div className="h-full">
//       <div className="bg-[#F6F5FF] border border-bg-blue-11 rounded-lg h-full">
//         <div className="p-3 sm:p-4">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2">
//               <img src="icon_1.svg" alt="Recent Meetings" className="w-5 h-5 sm:w-6 sm:h-6" />
//               <span className="text-sm sm:text-base font-medium">Recent Meetings</span>
//             </div>
//           </div>
          
//           <div className="divide-y divide-bg-blue-11">
//             {recent_meetings.map((profile, index) => (
//               <div key={index} className="py-3 sm:py-4">
//                 <div className="flex items-center justify-between gap-2">
//                   <Content
//                     profileImage={profile.profileImage}
//                     name={profile.name}
//                     designation={profile.time}
//                     nameStyle="text-sm font-medium line-clamp-1"
//                     otherStyle="text-xs text-gray-600"
//                   />
//                   <button className="text-bg-blue-11 text-xs sm:text-sm hover:underline whitespace-nowrap">
//                     View Notes
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default RecentMeetings;


