import axios from "axios";

const URL = 'https://6491df492f2c7ee6c2c912a2.mockapi.io/api/stockproducts'

export const axiosInstance = axios.create({
    baseURL: URL
})