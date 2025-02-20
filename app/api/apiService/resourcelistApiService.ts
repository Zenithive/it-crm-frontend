import axios from 'axios';

export const resourcelistApi = async () =>{
    const response = await axios.get("http://localhost:3000/api/some");
    return response.data;
}