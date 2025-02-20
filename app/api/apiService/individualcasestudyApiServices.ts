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


export const individualcasestudyDocApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}