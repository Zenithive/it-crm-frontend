import axios from "axios";


export const individualmeetingApi = async() => {
    const response = await axios.get('api-endpoint');
    return response.data;
}
    