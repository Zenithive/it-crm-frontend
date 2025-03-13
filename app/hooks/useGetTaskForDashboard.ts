import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store"; // Adjust the path as needed
import { GET_TASKS_QUERY } from "../../graphQl/queries/taskQueries"; // Adjust the path as needed

interface Task {
  taskID: string;
  title: string;
  dueTime: string;
  completed: boolean;
  priority: string;
}

interface TasksResponse {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useTasksData = (): TasksResponse => {
  const { token } = useSelector((state: RootState) => state.auth);
  
  // Format today's date as YYYY-MM-DD for the query
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  
  const { data, loading, error, refetch } = useQuery(GET_TASKS_QUERY, {
    variables: { dueDate: formattedDate },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    skip: !token, // Skip the query if there's no token
  });

  // Transform the data to match our Task interface
  const tasks: Task[] = data?.getTasksByUser?.items.map((task: any) => ({
    taskID: task.taskID,
    title: task.title,
    dueTime: new Date(task.dueDate).toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    }),
    completed: task.status === "COMPLETED",
    priority: task.priority
  })) || [];

  return { 
    tasks,
    loading,
    error: error ? error.message : null,
    refetch 
  };
};

export default useTasksData;