import React, { useState, useEffect } from "react";
import {
  individualcasestudyECommerceApi,
  individualcasestudyProjectApi,
  individualcasestudyTechnologiesApi,
} from "../../api/apiService/individualcasestudyApiServices";

import {
  individualcasestudyECommerceJson,
  individualcasestudyProjectJson,
  individualcasestudyTechnologiesJson,
} from "../../api/jsonService/individualcasestudyJsonServices";

interface CompanyData {
  owner_client: string;
  location: string;
  duration: string;
  industry: string;
  livelink: string;
}

interface ProjectData {
  summary: string;
  // Add other project properties here if needed
}

const LeftCaseStudy = () => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [project, setProject] = useState<ProjectData | null>(null);
  interface Technology {
    name: string;
    logo: string;
  }
  
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyResponse = useDummyData
          ? await individualcasestudyECommerceApi()
          : await individualcasestudyECommerceJson();

        const projectResponse = useDummyData
          ? await individualcasestudyProjectApi()
          : await individualcasestudyProjectJson();

        const techResponse = useDummyData
          ? await individualcasestudyTechnologiesApi()
          : individualcasestudyTechnologiesJson();

          setCompanyData(companyResponse ?? null);
          setProject(projectResponse ?? null);
          setTechnologies(techResponse ?? []);
          
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [useDummyData]);

  if (loading)
    return <p className="text-gray-500 text-center">Loading details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      {/* Contact Details */}
      <div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-4 w-full md:w-1/2">
            <div className="flex items-center space-x-3">
              <img
                src="/individual_icon_1.svg"
                alt="Client"
                className="h-5 w-5"
              />
              <div className="text-sm text-bg-blue-12 font-semibold">
                Owner Client :
              </div>
              <div className="text-black">
                {companyData?.owner_client ?? "N/A"}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <img
                src="/individual_icon_2.svg"
                alt="Location"
                className="h-5 w-5"
              />
              <div className="text-sm text-bg-blue-12 font-semibold">
                Location :
              </div>
              <div className="text-black">{companyData?.location ?? "N/A"}</div>
            </div>

            <div className="flex items-center space-x-3">
              <img
                src="/individual_icon_3.svg"
                alt="Duration"
                className="h-5 w-5"
              />
              <div className="text-sm text-bg-blue-12 font-semibold">
                Duration :
              </div>
              <div className="text-black">{companyData?.duration ?? "N/A"}</div>
            </div>
          </div>

          <div className="hidden md:block border-l border-content-border"></div>

          <div className="space-y-4 w-full md:w-1/2">
            <div className="flex items-center space-x-3">
              <img
                src="/individual_icon_4.svg"
                alt="Email"
                className="h-5 w-5"
              />
              <div className="text-sm text-bg-blue-12 font-semibold">
                Industry :
              </div>
              <div className="text-black truncate">
                {companyData?.industry ?? "N/A"}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <img
                src="/individual_icon_5.svg"
                alt="Phone"
                className="h-5 w-5"
              />
              <div className="text-sm text-bg-blue-12 font-semibold">
                Live-Link :
              </div>
              <div className="text-black">{companyData?.livelink?? "N/A"}</div>
            </div>

            
          </div>
        </div>
      </div>

      <div className="border border-content-border"></div>

      {/* Project Summary */}
      <div>
        <h3 className="text-lg font-semibold text-bg-blue-12 mb-3">
          Project Summary
        </h3>
        <p className="text-black leading-relaxed">
          {project?.summary ?? "No summary available."}
        </p>
      </div>

      <div className="border border-content-border"></div>

      {/* Technologies */}
      <div>
        <h3 className="text-lg font-semibold text-bg-blue-12 mb-3">
          Technologies
        </h3>
        <div className="flex flex-wrap gap-4">
          {technologies?.length > 0 ? (
            technologies.map((tech, index) => (
              <div
                key={index}
                className="shadow-custom rounded-lg flex items-center p-2"
              >
                <img
                  src={`/${tech.logo}`}
                  alt={tech.name}
                  className="w-6 h-6"
                />
                <div className="px-2 text-md font-semibold text-bg-blue-12">
                  {tech.name}
                </div>
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





     