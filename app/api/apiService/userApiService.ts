import axios from "axios";

export const userApi= async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
  
}