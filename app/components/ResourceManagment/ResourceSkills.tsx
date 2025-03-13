// "use client";
// import React, { useState, useEffect } from "react";
// import { resourcemanagmentApi } from "../../api/apiService/resourcemanagmentApiService";
// import { resourcemanagment } from "../../api/jsonService/resourcemanagmentJsonService";

// interface Experience {
//   designation: string;
//   duration: string;
// }

// interface ResourceData {
//   skills: string[]; // Skills as an array
//   experience: Experience[];
// }

// const ResourceSkills: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"details">("details");
//   const [resourceData, setResourceData] = useState<ResourceData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const useDummyData =
//     process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

//   useEffect(() => {
//     const fetchVendorData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = useDummyData
//           ? await resourcemanagmentApi()
//           : await resourcemanagment();
//         setResourceData(response);
//       } catch (err) {
//         console.error("Error fetching resources:", err);
//         setError("Failed to load resources. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVendorData();
//   }, [useDummyData]);

//   return (
//     <div className="">
//       <div className="flex justify-between items-center">
//         <div className="">
//           {activeTab === "details" && (
//             <div className="flex mr-6 mt-4">
//               <div className="bg-white rounded-2xl p-4 shadow-custom w-full h-[500px]">
//                 <div className="grid grid-cols-2 gap-6">
//                   {/* Skills Section */}
//                   <div className="p-4 border-r border-content-border ">
//                     <h3 className="text-blue-600 mb-4 text-2xl font-semibold">
//                       Technical Skills
//                     </h3>
//                     <ul className="flex flex-wrap gap-2">
//                       {resourceData?.skills?.length ? (
//                         resourceData.skills.map((skill, index) => (
//                           <li
//                             key={index}
//                             className="bg-blue_shadow px-4 py-2 inline-flex justify-center items-center rounded-lg text-bg-blue-12 font-semibold min-w-fit whitespace-nowrap"
//                           >
//                             {skill}
//                           </li>
//                         ))
//                       ) : (
//                         <p>No skills available</p>
//                       )}
//                     </ul>
//                   </div>

//                   {/* Experience Section */}
//                   <div className="p-4">
//                     <h3 className="text-blue-600 mb-4 text-2xl font-semibold">
//                       Experience Level
//                     </h3>
//                     <ul className="">
//                       {resourceData?.experience?.length ? (
//                         resourceData.experience.map((exp, index) => (
//                           <div key={index} className="pb-4">
//                             {/* Experience Row */}
//                             <div className="flex justify-between items-center">
//                               <p className="">{exp.designation}</p>
//                               <p className="text-bg-blue-12 font-semibold">
//                                 {exp.duration}
//                               </p>
//                             </div>

//                             {/* Border Bottom for all except last item */}
//                             {index !== resourceData.experience.length - 1 && (
//                               <div className="border-b border-content-border mt-4"></div>
//                             )}
//                           </div>
//                         ))
//                       ) : (
//                         <p>No experience available</p>
//                       )}
//                     </ul>
//                   </div>
//                 </div>{" "}
//                 {/* End of Grid */}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResourceSkills;



"use client";
import React, { useState } from "react";

interface ResourceSkillsProps {
  resourceData: {
    resourceSkills?: Array<{
      skill: {
        skillID: string;
        name: string;
        description: string;
        skilltype: string;
      };
      experienceYears: number;
    }>;
    pastProjects?: Array<{
      pastProjectID: string;
      projectName: string;
      description: string;
    }>;
  } | null;
}

const ResourceSkills: React.FC<ResourceSkillsProps> = ({ resourceData }) => {
  const [activeTab] = useState<"details">("details");

  // Extract skills from resourceData
  const skills = resourceData?.resourceSkills?.map(item => item.skill.name) || [];
  
  // Create experience from pastProjects and resourceSkills
  const experience = resourceData?.pastProjects?.map(project => ({
    designation: project.projectName,
    duration: getExperienceDuration(project.projectName, resourceData?.resourceSkills)
  })) || [];

  // Helper function to determine experience duration based on skill matching with project name
  function getExperienceDuration(projectName: string, skills?: Array<any>): string {
    const matchingSkill = skills?.find(s => 
      projectName.toLowerCase().includes(s.skill.name.toLowerCase())
    );
    return matchingSkill ? `${matchingSkill.experienceYears} years` : "N/A";
  }

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="">
          {activeTab === "details" && (
            <div className="flex mr-6 mt-4">
              <div className="bg-white rounded-2xl p-4 shadow-custom w-full h-[500px]">
                <div className="grid grid-cols-2 gap-6">
                  {/* Skills Section */}
                  <div className="p-4 border-r border-content-border ">
                    <h3 className="text-blue-600 mb-4 text-2xl font-semibold">
                      Technical Skills
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {skills.length > 0 ? (
                        skills.map((skill, index) => (
                          <li
                            key={index}
                            className="bg-blue_shadow px-4 py-2 inline-flex justify-center items-center rounded-lg text-bg-blue-12 font-semibold min-w-fit whitespace-nowrap"
                          >
                            {skill}
                          </li>
                        ))
                      ) : (
                        <p>No skills available</p>
                      )}
                    </ul>
                  </div>

                  {/* Experience Section */}
                  <div className="p-4">
                    <h3 className="text-blue-600 mb-4 text-2xl font-semibold">
                      Experience Level
                    </h3>
                    <ul className="">
                      {experience.length > 0 ? (
                        experience.map((exp, index) => (
                          <div key={index} className="pb-4">
                            {/* Experience Row */}
                            <div className="flex justify-between items-center">
                              <p className="">{exp.designation}</p>
                              <p className="text-bg-blue-12 font-semibold">
                                {exp.duration}
                              </p>
                            </div>

                            {/* Border Bottom for all except last item */}
                            {index !== experience.length - 1 && (
                              <div className="border-b border-content-border mt-4"></div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>No experience available</p>
                      )}
                    </ul>
                  </div>
                </div>{" "}
                {/* End of Grid */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceSkills;