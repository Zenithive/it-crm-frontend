import React from 'react'
import axios from 'axios';

export const apiServiceLeftSide = async () => {
  
    const response = await axios.get('api-endpoint');
    return response.data;
  
}

export const apiServiceTimeline = async ()=>{

    const response = await axios.get('api-endpoint');
    return response.data;
}


export const apiServiceRightSideDoc = async () =>{
    const response = await axios.get('api-endpoint');
    return response.data;
}
