import axios from 'axios';

export const resourcemanagmentApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}