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
    firstName?: string | null;
    status?: string | null;
    vendorID?: string | null;
    skillIDs?: string[];
    search?: string | null;
}

export const useResourceList = (variables: ResourceListApiVariables) => {
    const cleanVariables = {
        ...variables,
        search: variables.search && variables.search.trim() ? variables.search.trim() : null,
    };

    const { data, loading, error, refetch } = useQuery<GetResourceProfilesResponse>(
        GET_RESOURCE_PROFILES_QUERY,
        { 
            variables: cleanVariables,
            // Adding fetchPolicy to ensure we always get fresh data when parameters change
            fetchPolicy: "network-only"
        }
    );

    return { 
        data, 
        loading, 
        error,
        totalItems: data?.getResourceProfiles?.totalCount || 0,
        refetch
    };
};