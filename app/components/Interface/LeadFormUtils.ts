// src/components/utils/LeadFormUtils.ts

export const getSelectTextColorClass = (value: string | undefined): string => {
    return value ? "text-black" : "text-gray-400";
  };
  
  export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };