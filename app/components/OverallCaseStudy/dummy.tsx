// "use client"
// import React, { useState } from "react";
// import Pagination from "../../microComponents/Pagination";

// const ResourceContainer = () => {
//   const resources = Array(20).fill({
//     title: "Zenithive",
//     company: "Tech Solution Inc",
//     tags: ["E-commerce", "UI/UX", "SWD"],
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = resources.slice(startIndex, endIndex);
//   return (
//     <div>
//       <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
//         <div className="bg-white shadow-custom rounded-[18px]">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8">
//             {currentItems.map((resource, index) => (
//               <div
//                 key={index}
//                 className="bg-blue_shadow p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow 
//                              w-full min-h-[170px]"
//               >
//                 {/* Title */}
//                 <h3 className="text-bg-blue-12 text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
//                   {resource.title}
//                 </h3>

//                 {/* Content Container */}
//                 <div className="flex flex-col h-[calc(100%-64px)]">
//                   {/* Tags Container */}
//                   <div className="flex flex-wrap gap-2 mb-auto">
//                     {resource.tags.map((tag, tagIndex) => (
//                       <span
//                         key={tagIndex}
//                         className="px-2 sm:px-3 py-1 sm:py-2 bg-white text-bg-blue-12 
//                                    rounded-lg text-md font-semibold whitespace-nowrap min-w-[120px] 
//                                    flex items-center justify-center"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Bottom Row - Aligned with last tag */}
//                   <div className="flex justify-between items-center mt-4 w-full">
//                     <span className="text-xs sm:text-sm font-normal text-black">
//                       {resource.company}
//                     </span>
//                     <button className="text-black flex items-center space-x-1 font-normal text-sm sm:text-md">
//                       <span>View</span>
//                       <img
//                         className="mt-1 w-4 sm:w-5"
//                         src="arrow_bold.svg"
//                         alt="arrow"
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Pagination
//         totalItems={resources.length}
//         initialItemsPerPage={itemsPerPage}
//         onPageChange={(page) => setCurrentPage(page)}
//         onItemsPerPageChange={(newItemsPerPage) => {
//           setItemsPerPage(newItemsPerPage);
//           setCurrentPage(1);
//         }}
//       />
//     </div>
//   );
// };

// export default ResourceContainer;









//individual

// import React from "react";
// import Title from "../microComponents/Title";
// import Navbar from "./Navbar";
// import Content from "../microComponents/Content";
// import Container from "../microComponents/Container";
// import {nav} from './Path/TaskData'


// const Individual = () => {
//   const profile = [
//     {
//       profileImage: "profileLogo.svg",
//       name: "Sachin Tend",
//       subtitle: "VP of sales at Zen Corporation",
//     },
//     {
//       profileImage: "individual_email.svg",
//       name: "Email",
//       subtitle: "Sent follow-up email regarding proposal",
//     },
//     {
//       profileImage: "individual_call.svg",
//       name: "Call",
//       subtitle: "Discussed project requirements",
//     },
//     {
//       profileImage: "individual_clock.svg",
//       name: "Meeting",
//       subtitle: "Product demo scheduled",
//     },
//     {
//       profileImage: "individual_clock.svg",
//       name: "Note Added",
//       subtitle: "Added meeting notes and action items",
//     },
//     {
//       name: "Lead Type",
//       subtitle: "Qualified Lead",
//     },
//     {
//       name: "Assigned Owner",
//       subtitle: "Johnson",
//     },
//     {
//       name: "Created Date",
//       subtitle: "Jan 15,2024",
//     },
//   ];

//   const title = [
//     {
//       titleName: "Individual Lead",
//       button: "",
//     },
//   ];

//   const container = {
//     title1: "Contact Details",
//     logo1: "edit_icon.svg",
//     title2: "Pipeline Stages",
//     logo2: "plus_icon.svg",
//     title3: "Activity Timeline",
//     title4: "Lead Information",
//     title5: "Documents",
//     title6: "Notes",
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar  nav={nav[0]}/>
//       <div className="px-4 sm:px-6 lg:px-8">
//         <Title title={title[0].titleName}  />
        
//         <div className="max-w-7xl mx-auto">
//           {/* Profile Section */}
//           <div className="mt-8">
//             <Content
//               profileImage={profile[0].profileImage}
//               imageHeight="h-16 sm:h-20"
//               imageWidth="w-16 sm:w-20"
//               name={profile[0].name}
//               nameStyle="text-xl sm:text-2xl lg:text-3xl font-bold"
//               designation={profile[0].subtitle}
//               otherStyle="text-sm sm:text-base font-normal"
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap gap-4 mt-4 sm:mt-6">
//             <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
//               <img src="call_icon.svg" alt="Call" className="w-4 h-4" />
//               <span>Call</span>
//             </button>
//             <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
//               <img src="email_icon.svg" alt="Email" className="w-4 h-4" />
//               <span>Email</span>
//             </button>
//             <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
//               <img src="clock_icon.svg" alt="Schedule Meeting" className="w-4 h-4" />
//               <span>Schedule Meeting</span>
//             </button>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
//             {/* Left Column - Takes up 2/3 on large screens */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Contact Details */}
//               <Container
//                 title={container.title1}
//                 logo={container.logo1}
//                 containerWidth="w-full"
//                 containerHeight="auto"
//               >
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
//                   <div>
//                     <div className="text-base font-normal mb-2">Email</div>
//                     <div className="flex items-center">
//                       <img src="email_icon.svg" alt="Email" className="w-4 h-4" />
//                       <span className="text-gray-600 text-sm ml-2">zenithive17@gmail.com</span>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-base font-normal mb-2">Phone</div>
//                     <div className="flex items-center">
//                       <img src="call_icon.svg" alt="Phone" className="w-4 h-4" />
//                       <span className="text-gray-600 text-sm ml-2">+91 256232561</span>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-base font-normal mb-2">Company</div>
//                     <div className="flex items-center">
//                       <img src="company_icon.svg" alt="Company" className="w-4 h-4" />
//                       <span className="text-gray-600 text-sm ml-2">Zen Corporation</span>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-base font-normal mb-2">Location</div>
//                     <div className="flex items-center">
//                       <img src="location_icon.svg" alt="Location" className="w-4 h-4" />
//                       <span className="text-gray-600 text-sm ml-2">India, Ahmedabad</span>
//                     </div>
//                   </div>
//                 </div>
//               </Container>

//               {/* Pipeline Stages */}
//               <Container
//                 title={container.title2}
//                 containerWidth="w-full"
//                 containerHeight="auto min-h-[208px]"
//               />

//               {/* Activity Timeline */}
//               <Container
//                 title={container.title3}
//                 containerWidth="w-full"
//                 containerHeight="auto"
//                 text="View All"
//               >
//                 <div className="space-y-4 p-4">
//                   {profile.slice(1, 5).map((item, index) => (
//                     <Content
//                       key={index}
//                       profileImage={item.profileImage}
//                       name={item.name}
//                       designation={item.subtitle}
//                     />
//                   ))}
//                 </div>
//               </Container>
//             </div>

//             {/* Right Column - Takes up 1/3 on large screens */}
//             <div className="space-y-6">
//               {/* Lead Information */}
//               <Container
//                 title={container.title4}
//                 containerWidth="w-full"
//                 containerHeight="auto"
//               >
//                 <div className="p-4 space-y-4">
//                   {profile.slice(5, 8).map((item, index) => (
//                     <Content
//                       key={index}
//                       name={item.name}
//                       designation={item.subtitle}
//                     />
//                   ))}
//                 </div>
//               </Container>

//               {/* Documents */}
//               <Container
//                 title={container.title5}
//                 logo={container.logo2}
//                 containerWidth="w-full"
//                 containerHeight="auto"
//               >
//                 <div className="divide-y">
//                   {[1, 2, 3].map((_, index) => (
//                     <div key={index} className="flex justify-between items-center p-4">
//                       <div className="flex items-center gap-2">
//                         <img src="proposal_logo.svg" alt="Proposal" className="w-5 h-5" />
//                         <span className="text-black font-normal">Proposal.pdf</span>
//                       </div>
//                       <button className="text-blue-600 font-normal">View</button>
//                     </div>
//                   ))}
//                 </div>
//               </Container>

//               {/* Notes */}
//               <Container
//                 title={container.title6}
//                 logo={container.logo2}
//                 containerWidth="w-full"
//                 containerHeight="auto"
//               >
//                 <div className="p-4">
//                   <textarea
//                     className="w-full h-32 p-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-600 font-normal text-base resize-none"
//                     placeholder="Add a note..."
//                   />
//                 </div>
//               </Container>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Individual;