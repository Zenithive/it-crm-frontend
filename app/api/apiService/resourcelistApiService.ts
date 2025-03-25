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

  const queryVariables = {
    page,
    pageSize,
    firstName: null,
    status: null,
    vendorID: null,
    skillIDs: [] as string[],
    search: cleanSearch,
    totalExperienceMin: experienceRange.min,
    totalExperienceMax: experienceRange.max
  };
  if (vendorName) {
    if (!cleanSearch) {
      queryVariables.search = vendorName;
    }
  }
  if (skills) {
    queryVariables.skillIDs = [skills];
  }
  const { data, loading, error, refetch } = useQuery<GetResourceProfilesResponse>(
    GET_RESOURCE_PROFILES_QUERY,
    {
      variables: queryVariables,
      fetchPolicy: "network-only",
    }
  );
  return {
    data: data?.getResourceProfiles?.items || [],
    loading,
    error,
    totalItems: data?.getResourceProfiles?.totalCount || 0,
    refetch,
  };
};







