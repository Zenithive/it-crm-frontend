import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store"
import { GET_TODOS } from "../../../graphQl/queries/todolist.queries";

interface Task {
  id: string;
  taskID: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
}

const todoListApiService = (currentPage: number, itemsPerPage: number,date?:string,priority?:string,status?:string) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const user = useSelector((state: RootState) => state.auth);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);


    const filter: any = {};
    if (date) {
      filter.dueDate = date;
    }

    if (priority) {
      filter.priority = priority.toUpperCase();;
    }
    if (status) {
      filter.status = status.toUpperCase();
    }
    
    
    try {
      if (!apiUrl) {
        throw new Error("API URL is not defined");
      }
      const response = await axios.post(
        apiUrl,
        {
          query: GET_TODOS,
          variables: { page: currentPage, pageSize: itemsPerPage,filter: filter},
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.errors) {   
        throw new Error(response.data.errors[0].message);
      }

      setTodos(response.data.data.getTasks.items);
      setTotalItems(response.data.data.getTasks.totalCount);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch tasks");
      } else {
        setError("Failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchTasks();
  // }, [currentPage, itemsPerPage, user.token]);

  useEffect(() => {
    fetchTasks();
  }, [currentPage, itemsPerPage, user.token, date, priority, status]);

  useEffect(() => {
    console.log("Received todos in component:", todos);
  }, [todos]);

  // Return refetch along with other data
  return { todos, loading, error, totalItems, refetch: fetchTasks };
};

export default todoListApiService;

// import { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";
// import { GET_TODOS } from "../../../graphQl/queries/todolist.queries";


// interface Task {
//   id: string;
//   taskID: string;
//   title: string;
//   status: string;
//   priority: string;
//   dueDate: string;
// }

// const todoListApiService = (
//   currentPage: number, 
//   itemsPerPage: number,
//   date?: string,
//   priority?: string,
//   status?: string
// ) => {
//   const user = useSelector((state: RootState) => state.auth);
  
//   // Create filter object based on provided parameters
//   const filter: any = {};
  
//   if (date) {
//     filter.dueDate = date;
//   }
  
//   if (priority) {
//     filter.priority = priority.toUpperCase();
//   }
  
//   if (status) {
//     filter.status = status.toUpperCase();
//   }
  
//   // Use Apollo useQuery hook instead of manual axios
//   const { data, loading, error, refetch } = useQuery(GET_TODOS, {
//     variables: { 
//       page: currentPage, 
//       pageSize: itemsPerPage,
//       filter: filter
//     },
//     context: {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     },
  
//   });
  
//   // Extract todos and totalItems from the query result
//   const todos = data?.getTasks?.items || [];
//   const totalItems = data?.getTasks?.totalCount || 0;
  
//   // Log todos when they change (for debugging)
//   useEffect(() => {
//     console.log("Received todos in component:", todos);
//   }, [todos]);
  
//   return { 
//     todos, 
//     loading, 
//     error: error ? error.message : null, 
//     totalItems, 
//     refetch 
//   };
// };

// export default todoListApiService;