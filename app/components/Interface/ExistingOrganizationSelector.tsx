// src/components/Lead/ExistingOrganizationSelector.tsx
import React, { useState, useEffect } from "react";
import { FieldErrors } from "react-hook-form";
import { LeadFormData, Organization } from "./AddLeadModalInterface";
import { useQuery, gql } from "@apollo/client";
import { GET_ORGANIZATIONS } from "../../../graphQl/queries/getOrganization.queries";

// Define GraphQL query


interface ExistingOrganizationSelectorProps {
  selectedOrganization: Organization | null;
  onOrganizationSelect: (id: string, name: string, website: string) => void;
  errors: FieldErrors<LeadFormData>;
}

const ExistingOrganizationSelector: React.FC<ExistingOrganizationSelectorProps> = ({
  selectedOrganization,
  onOrganizationSelect,
  errors
}) => {
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [orgSearchTerm, setOrgSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(orgSearchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [orgSearchTerm]);
  
  // Fetch organizations from API
  const { loading, error, data } = useQuery(GET_ORGANIZATIONS, {
    variables: { search: debouncedSearchTerm },
    skip: debouncedSearchTerm === "",
    // Fetch when dropdown is opened and there's a search term
    fetchPolicy: "network-only"
  });

  // Map API data to organizations
  const organizations = data?.getOrganizations?.items?.map((org: any) => ({
    id: org.organizationID,
    name: org.organizationName,
    website: org.organizationWebsite || "www.example.com"
  })) || [];

  // If there's exactly one organization and it exactly matches the search,
  // auto-select it
  useEffect(() => {
    if (
      organizations.length === 1 && 
      !selectedOrganization &&
      orgSearchTerm.toLowerCase() === organizations[0].name.toLowerCase()
    ) {
      const org = organizations[0];
      onOrganizationSelect(org.id ?? "", org.name, org.website);
      setIsOrgDropdownOpen(false);
    }
  }, [organizations, selectedOrganization, orgSearchTerm, onOrganizationSelect]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="relative">
        <label className="block text-sm text-bg-blue-12 mb-2">
          Organization Name
        </label>
        <div 
          className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none cursor-pointer flex justify-between items-center ${
            selectedOrganization ? 'text-black' : 'text-gray-400'
          }`}
          onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
        >
          <span>{selectedOrganization?.name || "Select an organization"}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {isOrgDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search organizations..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={orgSearchTerm}
                onChange={(e) => setOrgSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {loading && (
                <div className="px-3 py-2 text-gray-500">Loading...</div>
              )}
              
              {error && (
                <div className="px-3 py-2 text-red-500">Error fetching organizations</div>
              )}
              
              {!loading && !error && organizations.length > 0 && organizations.map((org: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; website: string; }) => (
                <div
                  key={org.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onOrganizationSelect(String(org.id ?? ""), String(org.name ?? ""), org.website);
                    setIsOrgDropdownOpen(false);
                  }}
                >
                  {org.name}
                </div>
              ))}
              
              {!loading && !error && organizations.length === 0 && (
                <div className="px-3 py-2 text-gray-500">No organizations found</div>
              )}
            </div>
          </div>
        )}
        
        {!selectedOrganization && errors.organizationID && (
          <span className="text-red-500 text-sm">
            Please select an organization
          </span>
        )}
      </div>
    </div>
  );
};

export default ExistingOrganizationSelector;