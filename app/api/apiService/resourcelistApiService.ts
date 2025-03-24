

import { useQuery } from "@apollo/client";
import { GET_RESOURCE_PROFILES_QUERY } from "../../../graphQl/queries/getAllResources.queries";

export interface Vendor {
  vendorID: string;
  companyName: string;
}

interface Skill {
  skillID: string;
  name: string;
  description: string;
  skilltype: string;
}

interface ResourceSkill {
  skill: Skill;
  experienceYears: number;
}

interface PastProject {
  pastProjectID: string;
  createdAt: string;
  updatedAt: string;
  resourceProfileID: string;
  projectName: string;
  description: string;
}

export interface ResourceProfile {
  resourceProfileID: string;
  type: string;
  firstName: string;
  lastName: string;
  totalExperience: number;
  contactInformation: string;
  googleDriveLink: string;
  status: string;
  vendorID: string;
  vendor: Vendor;
  resourceSkills: ResourceSkill[];
  pastProjects: PastProject[];
}

interface GetResourceProfilesResponse {
  getResourceProfiles: {
    items: ResourceProfile[];
    totalCount: number;
  };
}

interface ResourceListApiVariables {
  page: number;
  pageSize: number;
  search?: string | null;
  vendorName?: string | null;
  totalExperience?: string | null;
  skills?: string | null;
}

interface ExperienceRange {
  min: number | null;
  max: number | null;
}

export const useResourceList = (variables: ResourceListApiVariables) => {
  const { page, pageSize, search, vendorName, totalExperience, skills } = variables;


  const parseExperienceFilter = (filter: string | null): ExperienceRange => {
    if (!filter) return { min: null, max: null };

 
    if (filter.endsWith('+')) {
      return {
        min: parseFloat(filter.slice(0, -1)),
        max: null
      };
    }

    if (filter.includes('-')) {
      const [minStr, maxStr] = filter.split('-');
      return {
        min: parseFloat(minStr),
        max: parseFloat(maxStr)
      };
    }

 
    const exactValue = parseFloat(filter);
    return {
      min: exactValue,
      max: exactValue,
      // data: filteredItems,
      //   loading,
      //   error,
      //   totalItems: data?.getResourceProfiles?.totalCount || 0, 
      //   refetch,
    };
  };


  const cleanSearch = search && search.trim() ? search.trim() : null;
  

  const experienceRange = parseExperienceFilter(totalExperience || null);

  
  const queryVariables = {
    page,
    pageSize,
    firstName: null,
    status: null,
    vendorID: null,
    skillIDs: [] as string[],
    search: cleanSearch,
  };

  if (vendorName) {
  
    if (!cleanSearch) {
      queryVariables.search = vendorName;
    }
   
  }

  if (skills) {
    queryVariables.skillIDs = [skills];
  }

  // If we're filtering by experience, increase the page size to ensure we have enough results after filtering
  const adjustedPageSize = totalExperience ? pageSize * 3 : pageSize;
  queryVariables.pageSize = adjustedPageSize;

  const { data, loading, error, refetch } = useQuery<GetResourceProfilesResponse>(
    GET_RESOURCE_PROFILES_QUERY,
    {
      variables: queryVariables,
      fetchPolicy: "network-only",
    }
  );

  // Apply client-side filtering for experience if needed
  let filteredItems: ResourceProfile[] = [];
  
  if (data?.getResourceProfiles?.items) {
    filteredItems = data.getResourceProfiles.items.filter(item => {
      // If no experience filter is applied, include all items
      if (!totalExperience) return true;
      
      const { min, max } = experienceRange;
      
      // Apply minimum experience filter
      if (min !== null && item.totalExperience < min) {
        return false;
      }
      
      // Apply maximum experience filter (if specified)
      if (max !== null && item.totalExperience > max) {
        return false;
      }
      
      return true;
    });
  }

  // Calculate pagination indicators for client-side filtered results
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  // Get the current page slice of filtered items
  const currentPageItems = filteredItems.slice(startIndex, endIndex);
  
  // Calculate total count after filtering
  const filteredTotalCount = filteredItems.length;



  return {
    data: currentPageItems,
    loading,
    error,
    totalItems: filteredTotalCount,
    refetch,
  };
};