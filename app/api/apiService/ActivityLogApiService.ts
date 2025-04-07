// Updated service file
import { useQuery } from '@apollo/client';
import { GET_ACTIVITY_LOGS } from '../../../graphQl/queries/getActivityLogs';

interface ActivityLogUser {
  name: string;
  email: string;
}

interface ActivityLog {
  id: string;
  user: ActivityLogUser;
  action: string;
  entityType: string;
  entityID: string;
  changedAt: string;
  oldData?: string; 
  newData?: string;
}

interface ActivityLogsResponse {
  getActivityLogs: ActivityLog[];
}

export const useActivityLogs = (entityType: string, entityID: string) => {
  const { data, loading, error,refetch } = useQuery<ActivityLogsResponse>(GET_ACTIVITY_LOGS, {
    variables: { entityType, entityID },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only'
  });
  
  return {
    activityLogs: data?.getActivityLogs || [],
    loading,
    error: error?.message,
    refetch
  };
};