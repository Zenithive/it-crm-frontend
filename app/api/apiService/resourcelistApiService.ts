// import { useQuery } from "@apollo/client";
// import { GET_RESOURCE_PROFILES_QUERY } from "../../../graphQl/queries/getAllResources.queries";
// export interface Vendor {
//   vendorID: string;
//   companyName: string;
// }
// interface Skill {
//   skillID: string;
//   name: string;
//   description: string;
//   skilltype: string;
// }
// interface ResourceSkill {
//   skill: Skill;
//   experienceYears: number;
// }
// interface PastProject {
//   pastProjectID: string;
//   createdAt: string;
//   updatedAt: string;
//   resourceProfileID: string;
//   projectName: string;
//   description: string;
// }
// export interface ResourceProfile {
//   resourceProfileID: string;
//   type: string;
//   firstName: string;
//   lastName: string;
//   totalExperience: number;
//   contactInformation: string;
//   googleDriveLink: string;
//   status: string;
//   vendorID: string;
//   vendor: Vendor;
//   resourceSkills: ResourceSkill[];
//   pastProjects: PastProject[];
// }
// interface GetResourceProfilesResponse {
//   getResourceProfiles: {
//     items: ResourceProfile[];
//     totalCount: number;
//   };
// }
// interface ResourceListApiVariables {
//     page: number;
//     pageSize: number;
//     search?: string | null;
//     vendorName?: string | null; // Maps to vendorID or search
//     totalExperience?: string | null; // Handled client-side
//     skills?: string | null; // Maps to skillIDs 
// }

// export const useResourceList = (variables: ResourceListApiVariables) => {
//   const { page, pageSize, search, vendorName, totalExperience, skills } = variables;

//   const parseExperienceFilter = (filter: string | null): { min: number | null; max: number | null } => {
//     if (!filter) return { min: null, max: null };

//     if (filter.endsWith('+')) {
//       return {
//         min: parseFloat(filter.slice(0, -1)),
//         max: null
//       };
//     }
//     if (filter.includes('-')) {
//       const [minStr, maxStr] = filter.split('-');
//       return {
//         min: parseFloat(minStr),
//         max: parseFloat(maxStr)
//       };
//     }
//     const exactValue = parseFloat(filter);

//     const { data, loading, error, refetch } = useQuery<GetResourceProfilesResponse>(
//         GET_RESOURCE_PROFILES_QUERY,
//         {
//             variables: queryVariables,
//             fetchPolicy: "network-only",
//             pollInterval: 1000,
//         }
//     );

   
//     const filteredItems = data?.getResourceProfiles?.items
//         .filter((resource: ResourceProfile) => {
//             if (!totalExperience) return true;

//             const expRange = totalExperience.split("-");
//             if (totalExperience === "5+") {
//                 return resource.totalExperience >= 5;
//             }
//             const [min, max] = expRange.map(Number);
//             return resource.totalExperience >= min && (max ? resource.totalExperience <= max : true);
//         }) || [];

//     console.log(`useResourceList variables:`, queryVariables);
//     console.log(`useResourceList response:`, { data, filteredItems });

//     return {
//       min: exactValue,
//       max: exactValue
//     };
//   };

//   const cleanSearch = search && search.trim() ? search.trim() : null;
//   const experienceRange = parseExperienceFilter(totalExperience || null);

//   const queryVariables = {
//     page,
//     pageSize,
//     firstName: null,
//     status: null,
//     vendorID: null,
//     skillIDs: [] as string[],
//     search: cleanSearch,
//     totalExperienceMin: experienceRange.min,
//     totalExperienceMax: experienceRange.max
//   };
//   if (vendorName) {
//     if (!cleanSearch) {
//       queryVariables.search = vendorName;
//     }
//   }
//   if (skills) {
//     queryVariables.skillIDs = [skills];
//   }
//   const { data, loading, error, refetch } = useQuery<GetResourceProfilesResponse>(
//     GET_RESOURCE_PROFILES_QUERY,
//     {
//       variables: queryVariables,
//       fetchPolicy: "network-only",
//     }
//   );
//   return {
//     data: data?.getResourceProfiles?.items || [],
//     loading,
//     error,
//     totalItems: data?.getResourceProfiles?.totalCount || 0,
//     refetch,
//   };
// };







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

  // Prepare vendor filter - handle it through search if it's the only filter
  // or prepare for backend filtering if your API supports it
  let vendorSearch = null;
  if (vendorName) {
    if (vendorName.includes(',')) {
      // Multiple vendors selected
      // Note: Adjust this based on your API's capability for filtering by multiple vendors
      const vendors = vendorName.split(',').map(v => v.trim()).filter(Boolean);
      // If your API supports array of vendor IDs or names, use this format
      // Otherwise, you might need client-side filtering
    } else {
      // Single vendor - can use as search term if no other search term exists
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

  // Apply client-side filtering for multiple vendors if needed
  const filteredItems = data?.getResourceProfiles?.items.filter((resource: ResourceProfile) => {
    // Filter by multiple vendors if needed and not supported by backend
    if (vendorName && vendorName.includes(',') && resource.vendor) {
      const vendorNames = vendorName.split(',').map(v => v.trim().toLowerCase());
      return vendorNames.some(v => 
        resource.vendor.companyName.toLowerCase().includes(v)
      );
    }
    return true;
  }) || [];

  // Client-side experience filtering if needed
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