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
    vendorName?: string | null; // Maps to vendorID or search
    totalExperience?: string | null; // Handled client-side
    skills?: string | null; // Maps to skillIDs
}

export const useResourceList = (variables: ResourceListApiVariables) => {
    const { page, pageSize, search, vendorName, totalExperience, skills } = variables;

    // Clean search parameter
    const cleanSearch = search && search.trim() ? search.trim() : null;

    // Map filters to query variables
    const queryVariables: any = {
        page,
        pageSize,
        firstName: null,
        status: null,
        vendorID: null,
        skillIDs: [],
        search: cleanSearch,
    };

    // Vendor Name: Use search for now; replace with vendorID if you have a mapping
    if (vendorName && !cleanSearch) {
        queryVariables.search = vendorName; // Fallback to search
        // If you have a vendorID mapping:
        // queryVariables.vendorID = mapVendorNameToID(vendorName);
    }

    // Skills: Convert skillsFilter to skillIDs (assuming filter IDs match skill names for simplicity)
    if (skills) {
        queryVariables.skillIDs = [skills]; // Replace with actual skillID mapping if needed
    }

    const { data, loading, error, refetch } = useQuery<GetResourceProfilesResponse>(
        GET_RESOURCE_PROFILES_QUERY,
        {
            variables: queryVariables,
            fetchPolicy: "network-only",
        }
    );

    // Client-side filtering for totalExperience
    const filteredItems = data?.getResourceProfiles?.items
        .filter((resource: ResourceProfile) => {
            if (!totalExperience) return true;

            const expRange = totalExperience.split("-");
            if (totalExperience === "5+") {
                return resource.totalExperience >= 5;
            }
            const [min, max] = expRange.map(Number);
            return resource.totalExperience >= min && (max ? resource.totalExperience <= max : true);
        }) || [];

    console.log(`useResourceList variables:`, queryVariables);
    console.log(`useResourceList response:`, { data, filteredItems });

    return {
        data: filteredItems,
        loading,
        error,
        totalItems: data?.getResourceProfiles?.totalCount || 0, // Note: totalCount won't reflect totalExperience filter
        refetch,
    };
};



