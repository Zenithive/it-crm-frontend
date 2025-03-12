export const getPriorityColor = (priority: string) => {
    const priorityMap: Record<string, string> = {
      LOW: "bg-green-shadow-color text-green-text",
      MEDIUM: "bg-orange-shadow-color text-orange-text",
      HIGH: "bg-red-shadow-color text-red-text",
      URGENT: "bg-red-600 text-white",
    };
    return priorityMap[priority] || "";
  };
  
  export const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      TODO: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-yellow-100 text-yellow-800",
      ON_HOLD: "bg-gray-300 text-gray-800",
      COMPLETED: "bg-green-100 text-green-800",
    };
    return statusMap[status] || "";
  };
  

  export const getStatusColor1 = (status: string): string => {
    const normalizedStatus = status.toUpperCase().trim();
    const statusMap: Record<string, string> = {
      ACTIVE: "bg-green-shadow-color text-green-text",
      INACTIVE: "bg-orange-shadow-color text-orange-text",
    };
    return statusMap[normalizedStatus] || "bg-gray-100 text-gray-800";
  };


  export const getRoleColor = (role: string): string => {
    const formattedRole = role.trim().toUpperCase();
    const roleMap: Record<string, string> = {
      "BUSINESS EXECUTIVE": "bg-blue-shadow-color text-blue-text",
      "C-LEVEL": "bg-purple-shadow-color text-purple-text",
      "SALES EXECUTIVE": "bg-yellow-shadow-color text-yellow-text",
    };
    return roleMap[formattedRole] || "bg-gray-100 text-gray-800";
  };
  