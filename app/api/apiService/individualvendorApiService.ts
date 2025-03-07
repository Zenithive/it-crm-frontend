import axios from "axios";


export const individualvendorApi = async() => {
    const response = await axios.get('api-endpoint');
    return response.data;
}
