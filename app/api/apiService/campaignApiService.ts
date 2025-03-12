import axios from "axios";

export const campaignApi= async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
  
}