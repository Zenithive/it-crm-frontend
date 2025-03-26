import React from "react";
import { useRouter } from "next/router";
import leadApiService from "../../api/apiService/individualleadService";
import "../Dashboard/Dashboard.css";

export interface LeftSideProps {
  leadId: string;
}

const LeftSide: React.FC<LeftSideProps> = ({ leadId }) => {
  console.log(`leadId in LeftSide:`, leadId);
  const { lead, loading, error } = leadApiService(leadId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const data = [
    {
      label: "Location",
      value: `${lead?.country || "N/A"}`,
      icon: "/location_icon.svg"
    },
    {
      label: "Assigned Owner",
      value: `${lead?.assignedToName || "N/A"}`
    },
    {
      label: "Email",
      value: `${lead?.email || "N/A"}`,
      icon: "/email_icon.svg"
    },
    {
      label: "Phone",
      value: `${lead?.phone || "N/A"}`,
      icon: "/phone_icon.svg"
    },
    {
      label: "Company",
      value: `${lead?.organizationName || "N/A"}`,
      icon: "/company_icon.svg"
    },
    {
      label: "Industry",
      value: `${lead?.industryTargeted || "N/A"}`
    },
    {
      label: "Employee Count",
      value: 35
    },
    {
      label: "LinkedIn",
      value: (
        <a
          href={lead?.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bg-blue-12 hover:underline"
        >
          {lead?.linkedIn?.split('/').pop() || "N/A"}
        </a>
      ),
    },
    ...(lead?.organizationLinkedIn ? [{
      label: "Company LinkedIn",
      value: (
        <a
          href={lead.organizationLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bg-blue-12 hover:underline"
        >
          {lead.organizationLinkedIn}
        </a>
      ),
    }] : []),
    ...(lead?.organizationWebsite ? [{
      label: "Company Website",
      value: (
        <a
          href={lead.organizationWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bg-blue-12 hover:underline"
        >
          {lead.organizationWebsite}
        </a>
      ),
    }] : []),
    {
      label: "Created Date",
      value: lead?.initialContactDate
        ? new Date(lead.initialContactDate).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          })
        : "N/A"
    },
  ].filter(Boolean); 

  return (
    <div className="rounded-lg shadow-custom bg-white p-1">
      <div className="scrollbar-custom overflow-y-auto h-screen">
        <div className="space-y-4 mt-3">
          {data.map((item, index) => (
            <div key={index} className="ml-4">
              <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">{item.label}</h2>
              <div className="flex items-center gap-2 text-gray-700">
                {item.icon && <img src={item.icon} alt={item.label} className="w-5 h-5" />}
                <div>{item.value || "N/A"}</div>
              </div>
              <div className="border border-content-border mt-4 mr-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;