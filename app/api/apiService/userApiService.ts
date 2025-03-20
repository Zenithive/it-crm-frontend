import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_RESOURCE_PROFILE } from "../../../graphQl/queries/getUsers.queries";

export interface User {
  userID: string;
  name: string;
  email: string;
  role: string;
  campaigns: {
    campaignID: string;
    campaignName: string;
    campaignCountry: string;
    industryTargeted: string;
  }[];
}

interface UserQueryParams {
  filter?: {
    role?: string;
    email?: string;
    name?: string;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
  sort?: {
    field: string;
    order: "ASC" | "DESC";
  };
}

export const useUserApiService = ({
  filter,
  pagination,
  sort,
}: UserQueryParams) => {
  const user = useSelector((state: RootState) => state.auth);

  const { data, loading, error, refetch } = useQuery(GET_RESOURCE_PROFILE, {
    variables: {
      filter: filter && Object.keys(filter).length > 0 ? filter : undefined,
      pagination,
      sort: sort || { field: "name", order: "ASC" }, // Default sort
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const users: User[] = data?.getUsers?.items || [];
  const totalCount: number = data?.getUsers?.totalCount || 0;

  return {
    users,
    totalCount,
    loading,
    error: error?.message || null,
    refetch,
  };
};