import { useUserApiService } from './userApiService'; 
import leadsApiService from './leadsApiService';
import useDealsApiService from './dealsApiService';

interface SalesTeamPerformance {
  name: string;
  deals: number;
  amount: string;
  userID: string;
}

interface TeamMember {
  name: string;
  totalLead: number;
  totalWon: number;
  totalLost: number;
  averageCloseRate: string;
  totalRevenue: string;
}

interface PerformanceMap {
  [userID: string]: TeamMember;
}

export const useSalesTeamData = (page: number, pageSize: number) => {
  const {
    users,
    totalCount,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useUserApiService({
    pagination: {
      page,
      pageSize,
    },
    sort: { field: 'name', order: 'ASC' },
  });

  const { loading: leadsLoading, error: leadsError, teamPerformance } = leadsApiService(1, 1000, true);
  const { deals, loading: dealsLoading, error: dealsError } = useDealsApiService();

  const isLoading = usersLoading || leadsLoading || dealsLoading;
  const error = usersError || leadsError || dealsError;

  let salesTeamData: SalesTeamPerformance[] = [];

  if (!isLoading && users) {
    const performanceByUserID: PerformanceMap = {};
    teamPerformance.forEach((member) => {
      const userID = users.find((user) => user.name === member.name)?.userID || '';
      if (userID) {
        performanceByUserID[userID] = member;
      }
    });

    salesTeamData = users.map((user) => {
      const performance =
        performanceByUserID[user.userID] ||
        teamPerformance.find((member) => member.name === user.name);

      return {
        name: user.name,
        userID: user.userID,
        deals: performance?.totalWon || 0,
        amount: performance?.totalRevenue || '$0',
      };
    });
  }

  return { salesTeamData, totalCount, isLoading, error, refetchUsers };
};
