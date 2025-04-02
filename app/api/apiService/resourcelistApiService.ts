



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

export const useResourceList = (variables: ResourceListApiVariables) => {
  const { page, pageSize, search, vendorName, totalExperience, skills } = variables;

  const parseExperienceFilter = (filter: string | null): { min: number | null; max: number | null } => {
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
      max: exactValue
    };
  };

  const cleanSearch = search && search.trim() ? search.trim() : null;
  const experienceRange = parseExperienceFilter(totalExperience || null);

  // Prepare skills filter to handle multiple selections
  const skillsArray: string[] = [];
  if (skills) {
    const skillsSelection = skills.split(',');
    skillsSelection.forEach(skill => {
      if (skill.trim()) {
        skillsArray.push(skill.trim());
      }
    });
  }


  let vendorSearch = null;
  if (vendorName) {
    if (vendorName.includes(',')) {
    
      const vendors = vendorName.split(',').map(v => v.trim()).filter(Boolean);

    } else {
     
      vendorSearch = !cleanSearch ? vendorName.trim() : null;
    }
  }

  const queryVariables = {
    page,
    pageSize,
    firstName: null,
    status: null,
    vendorID: null,
    skillIDs: skillsArray.length > 0 ? skillsArray : [],
    search: cleanSearch || vendorSearch,
    totalExperienceMin: experienceRange.min,
    totalExperienceMax: experienceRange.max
  };

  const { data, loading, error, refetch } = useQuery<GetResourceProfilesResponse>(
    GET_RESOURCE_PROFILES_QUERY,
    {
      variables: queryVariables,
      fetchPolicy: "network-only",
    }
  );

 
  const filteredItems = data?.getResourceProfiles?.items.filter((resource: ResourceProfile) => {

    if (vendorName && vendorName.includes(',') && resource.vendor) {
      const vendorNames = vendorName.split(',').map(v => v.trim().toLowerCase());
      return vendorNames.some(v => 
        resource.vendor.companyName.toLowerCase().includes(v)
      );
    }
    return true;
  }) || [];

  
  const experienceFilteredItems = filteredItems.filter((resource: ResourceProfile) => {
    if (!totalExperience) return true;

    if (totalExperience.endsWith('+')) {
      const minExp = parseFloat(totalExperience.slice(0, -1));
      return resource.totalExperience >= minExp;
    }

    if (totalExperience.includes('-')) {
      const [minStr, maxStr] = totalExperience.split('-');
      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);
      return resource.totalExperience >= min && resource.totalExperience <= max;
    }

    const exactValue = parseFloat(totalExperience);
    return resource.totalExperience === exactValue;
  });

  console.log(`useResourceList variables:`, queryVariables);
  console.log(`useResourceList response:`, { data, filteredItems: experienceFilteredItems });

  return {
    data: experienceFilteredItems,
    loading,
    error,
    totalItems: data?.getResourceProfiles?.totalCount || 0,
    refetch,
  };
};