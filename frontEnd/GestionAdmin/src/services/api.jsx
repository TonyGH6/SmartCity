import axios from 'axios';
import { accountService } from "./accountService";
const Axios = axios.create ({

    baseURL:'http://localhost:3002'

    
});

Axios.interceptors.request.use((config) => {
    
    if (config.url && config.url.includes('/login')) {
        return config; 
    }

    const token = accountService.getToken(); 
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default Axios;