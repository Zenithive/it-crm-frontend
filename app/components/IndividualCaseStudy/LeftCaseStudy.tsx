import React, { useState, useEffect } from "react";
import { CaseStudy } from "../../api/apiService/overallcasestudyApiService";
import { individualcasestudyECommerceJson } from "../../api/jsonService/individualcasestudyJsonServices";
// Import Iconify Icon component
import { Icon } from "@iconify/react";

interface CompanyData {
  owner_client: string;
  location: string;
  duration: string;
  industry: string;
  livelink: string;
}

interface ProjectData {
  summary: string;
}

interface Technology {
  name: string;
  logo: string; // Iconify icon identifier (e.g., "simple-icons:react")
}

const useDummyData =
  process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

// Mapping of tech names to Iconify Simple Icons identifiers
const techIconMap: { [key: string]: string } = {
  react: "simple-icons:react",
  "node.js": "simple-icons:nodedotjs",
  javascript: "simple-icons:javascript",
  python: "simple-icons:python",
  java: "simple-icons:java",
  angular: "simple-icons:angular",
  vue: "simple-icons:vuejs",
  mongodb: "simple-icons:mongodb",
  mysql: "simple-icons:mysql",
  postgresql: "simple-icons:postgresql",
  git: "simple-icons:git",
  docker: "simple-icons:docker",
  golang: "simple-icons:go", // Correct Go logo
  go: "simple-icons:go", // Alternative name
  redis: "simple-icons:redis", // Official Redis logo
  kafka: "simple-icons:apachekafka", // Official Kafka logo
  // Add more mappings as needed
};

const LeftCaseStudy = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  console.log(`caseStudy234`, caseStudy);

  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;

        if (useDummyData) {
          data = await individualcasestudyECommerceJson(); // Use dummy data
        } else {
          data = caseStudy; // Use passed caseStudy data
        }

        if (data) {
          setCompanyData({
            owner_client: (data as CaseStudy).clientName || "N/A",
            location: "N/A", // No location in data, add if available
            duration: (data as CaseStudy).projectDuration || "N/A",
            industry: (data as CaseStudy).industryTarget || "N/A",
            livelink: (data as CaseStudy).document || "N/A",
          });

          setProject({
            summary: (data as CaseStudy).keyOutcomes || "No summary available.",
          });

          setTechnologies(
            (data as CaseStudy).techStack
              ? (data as CaseStudy).techStack.split(", ").map((tech) => {
                  const techName = tech.toLowerCase().trim(); // Normalize tech name
                  const iconId = techIconMap[techName] || "simple-icons:javascript"; // Fallback to JS icon
                  return {
                    name: tech,
                    logo: iconId,
                  };
                })
              : []
          );
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [caseStudy]);

  if (!caseStudy && !useDummyData)
    return <p className="text-gray-500 text-center">Loading details...</p>;

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      {/* Contact Details */}
      <div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-4 w-full md:w-1/2">
            <div className="flex items-center space-x-3">
              <img src="/individual_icon_1.svg" alt="Client" className="h-5 w-5" />
              <div className="text-sm text-bg-blue-12 font-semibold">Owner Client :</div>
              <div className="text-black">{companyData?.owner_client}</div>
            </div>

            <div className="flex items-center space-x-3">
              <img src="/individual_icon_2.svg" alt="Location" className="h-5 w-5" />
              <div className="text-sm text-bg-blue-12 font-semibold">Location :</div>
              <div className="text-black">{companyData?.location}</div>
            </div>

            <div className="flex items-center space-x-3">
              <img src="/individual_icon_3.svg" alt="Duration" className="h-5 w-5" />
              <div className="text-sm text-bg-blue-12 font-semibold">Duration :</div>
              <div className="text-black">{companyData?.duration}</div>
            </div>
          </div>

          <div className="hidden md:block border-l border-content-border"></div>

          <div className="space-y-4 w-full md:w-1/2">
            <div className="flex items-center space-x-3">
              <img src="/individual_icon_4.svg" alt="Industry" className="h-5 w-5" />
              <div className="text-sm text-bg-blue-12 font-semibold">Industry :</div>
              <div className="text-black">{companyData?.industry}</div>
            </div>

            <div className="flex items-center space-x-3">
              <img src="/individual_icon_5.svg" alt="Live-Link" className="h-5 w-5" />
              <div className="text-sm text-bg-blue-12 font-semibold">Live-Link :</div>
              <a
                href={companyData?.livelink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Document
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-content-border"></div>

      {/* Project Summary */}
      <div>
        <h3 className="text-lg font-semibold text-bg-blue-12 mb-3">Project Summary</h3>
        <p className="text-black leading-relaxed">{project?.summary}</p>
      </div>

      <div className="border border-content-border"></div>

      {/* Technologies */}
      <div>
        <h3 className="text-lg font-semibold text-bg-blue-12 mb-3">Technologies</h3>
        <div className="flex flex-wrap gap-4">
          {technologies.length > 0 ? (
            technologies.map((tech, index) => (
              <div key={index} className="shadow-custom rounded-lg flex items-center p-2">
                <Icon icon={tech.logo} width={24} height={24} color="#1E3A8A" /> 
                <div className="px-2 text-md font-semibold text-bg-blue-12">{tech.name}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No technologies listed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftCaseStudy;