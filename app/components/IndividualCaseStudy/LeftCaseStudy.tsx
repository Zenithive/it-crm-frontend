import React from "react";

const LeftCaseStudy = ({ companydata, project, technologies }) => {
  const { owner_client, location, contact, email, phone, duration } = companydata || {};
  const { summary } = project || {};
  const { logo, name } = technologies;
  return (
    <>
      <div className="w-full lg:w-1/2 space-y-6">
        {/* Contact Details */}
        <div className="">
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
                <div className="text-black">{companydata.owner_client}</div>
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
                <div className="text-black">{companydata.location}</div>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src="/individual_icon_3.svg"
                  alt="Contact"
                  className="h-5 w-5"
                />
                <div className="text-sm text-bg-blue-12 font-semibold">
                  Primary Contact :
                </div>
                <div className="text-black">{companydata.contact}</div>
              </div>
            </div>

            <div className="hidden md:block border-l border-bg-blue-12"></div>

            <div className="space-y-4 w-full md:w-1/2">
              <div className="flex items-center space-x-3">
                <img
                  src="/individual_icon_4.svg"
                  alt="Email"
                  className="h-5 w-5"
                />
                <div className="text-sm text-bg-blue-12 font-semibold">
                  Email :
                </div>
                <div className="text-black truncate">{companydata.email}</div>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src="/individual_icon_5.svg"
                  alt="Phone"
                  className="h-5 w-5"
                />
                <div className="text-sm text-bg-blue-12 font-semibold">
                  Phone :
                </div>
                <div className="text-black ">{companydata.phone}</div>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src="/individual_icon_6.svg"
                  alt="Duration"
                  className="h-5 w-5"
                />
                <div className="text-sm text-bg-blue-12 font-semibold">
                  Duration :
                </div>
                <div className="text-black">{companydata.duration}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-bg-blue-12-[1.19px]"></div>

        {/* Project Summary */}
        <div>
          <h3 className="text-lg font-semibold text-bg-blue-12 mb-3">
            Project Summary
          </h3>
          <p className="text-black leading-relaxed">{project.summary}</p>
        </div>

        <div className="border border-bg-blue-12-[1.19px]"></div>

        {/* Technologies */}
        <div>
          <h3 className="text-lg font-semibold text-bg-blue-12 mb-3">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-4">
            {technologies.map((tech, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftCaseStudy;
