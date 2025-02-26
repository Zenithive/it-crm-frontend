import axios from "axios";

export const individualvendorPrimaryApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}

export const individualvendorSecondaryApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}

export const individualvendorAgreementApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}

export const individualvendorLocationsApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}

export const individualvendorSkillsApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}

export const individualvendorPaymentTermsApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}

export const individualvendorEmployeeCountApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}

export const individualvendorRecentActivityApi = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}
