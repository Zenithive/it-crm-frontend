import axios from "axios";


export const individualmeetingscreenApi = async() => {
    const response = await axios.get('api-endpoint');
    return response.data;
}
    