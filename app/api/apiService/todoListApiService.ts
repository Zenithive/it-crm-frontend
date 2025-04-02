


import { useState, useEffect } from "react"; 
import axios from "axios"; 
import { useSelector } from "react-redux"; 
import { RootState } from "../../redux/store/store";
import { GET_TODOS } from "../../../graphQl/queries/todolist.queries";     

interface Task {   
  id: string;   
  taskID: string;   
  title: string;   
  status: string;   
  priority: string;   
  dueDate: string; 
}  

const todoListApiService = (   
  currentPage: number,    
  itemsPerPage: number,   
  startDate?: string,
  endDate?: string,
  priority?: string, 
  searchQuery?: string,  
  status?: string 
) => {   
  const [todos, setTodos] = useState<Task[]>([]);   
  const [loading, setLoading] = useState<boolean>(true);   
  const [error, setError] = useState<string | null>(null);   
  const [totalItems, setTotalItems] = useState(0);   
  const user = useSelector((state: RootState) => state.auth);   
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;    

  const fetchTasks = async () => {     
    setLoading(true);     
    setError(null);      
    
    // Build filter object based on the parameters     
    const filter: any = {};          

    // Handle date filtering with both start and end dates
    // if (startDate && endDate) {
    //   filter.fromDate = startDate;
    //   filter.toDate = endDate;
    // } else if (startDate) {
    //   filter.fromDate = startDate;
    // } else if (endDate) {
    //   filter.toDate = endDate;
    // }
     
    // if (priority) {       
    //   filter.priority = priority.toUpperCase();     
    // }          

    // if (status) {       
    //   filter.status = status.toUpperCase();     
    // }      
    // if (searchQuery && searchQuery.trim() !== "") {
    //   filter.search = searchQuery.trim();
    // }


    if (startDate || endDate) {
      const startDates = startDate ? startDate.split(',') : [];
      const endDates = endDate ? endDate.split(',') : [];
      
      if (startDates.length === 1 && endDates.length === 1) {
        // If single values for both start and end dates
        filter.fromDate = startDate;
        filter.toDate = endDate;
      } else {
        // For multiple date ranges
        if (startDates.length > 1) {
          filter.fromDate = startDates;
          // If your API expects a specific format: filter.fromDate = { $in: startDates };
        } else if (startDate) {
          filter.fromDate = startDate;
        }
        
        if (endDates.length > 1) {
          filter.toDate = endDates;
          
        } else if (endDate) {
          filter.toDate = endDate;
        }
      }
    }
    
    // Parse remaining filters with the same multiple selection logic
    if (status) {
      const statuses = status.split(',');
      if (statuses.length === 1) {
        filter.status = status.toUpperCase();
      } else if (statuses.length > 1) {
        filter.status = statuses.map(s => s.toUpperCase());
        // If your API expects a specific format: filter.leadStage = { $in: stages.map(s => s.toUpperCase()) };
      }
    }
    
    if (priority) {
      const priorities = priority.split(',');
      if (priorities.length === 1) {
        filter.priority = priority.toUpperCase();
      } else if (priorities.length > 1) {
        filter.priority = priorities.map(s=>s.toUpperCase());
        
      }
    }
    
   
    
    if (searchQuery && searchQuery.trim() !== "") {
      filter.search = searchQuery.trim();
    }

  
    try {       
      if (!apiUrl) {         
        throw new Error("API URL is not defined");       
      }              

      const response = await axios.post(         
        apiUrl,         
        {           
          query: GET_TODOS,           
          variables: {              
            page: currentPage,              
            pageSize: itemsPerPage,             
            filter: Object.keys(filter).length > 0 ? filter : undefined           
          },         
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

  useEffect(() => {     
    fetchTasks();   
  }, [currentPage, itemsPerPage, user.token, startDate, endDate, priority,searchQuery, status]);    

  useEffect(() => {     
    console.log("Received todos in component:", todos);   
  }, [todos]);    

  // Return refetch along with other data   
  return { todos, loading, error, totalItems, refetch: fetchTasks }; 
};  

export default todoListApiService;