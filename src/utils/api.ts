import { AxiosInstance } from "axios";
const axios = require('axios');

export const getAxiosInstance = (baseURL: string, apiKey: string): AxiosInstance => {
  return axios.create({
    baseURL,
    headers: { 
      'Content-Type': 'application/json', 
      'X-MBX-APIKEY': apiKey
    }
  })
}

