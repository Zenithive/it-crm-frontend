import React from 'react'
import axios from 'axios';

export const apiServiceIndividual = async () => {
  
    const response = await axios.get('api-endpoint');
    return response.data;
  
}




