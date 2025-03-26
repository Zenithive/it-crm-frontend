import axios from "axios";

export const individualcasestudyECommerceApi= async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
  
}

export const individualcasestudyProjectApi= async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
  
}

export const individualcasestudyTechnologiesApi = async ()=>{
    const response = await axios.get('api-endpoint');
    return response.data;
}


export const individualcasestudyOutcomesApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}


// In api/apiService/individualcasestudyApiServices.js
export const individualcasestudyDocApi = async (caseStudyID: any) => {
    const token = localStorage.getItem('token'); // Assuming you store your token in localStorage
    console.log(`token`, token);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/documents?id=${caseStudyID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  };