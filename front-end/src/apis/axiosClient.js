import axios from 'axios';
import queryString from 'query-string';
const token = localStorage.getItem('access_token')
const baseURL='https://vms-ccnpmm-production.up.railway.app/api/v1/'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    paramsSerializer: (params) => queryString.stringify(params)
});

export const axiosClientWithToken = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    paramsSerializer: (params) => queryString.stringify(params)
});

var myInterceptor = null;
export const axiosInstance = () => {
    axiosClientWithToken.interceptors.request.eject(myInterceptor)
    myInterceptor = axiosClientWithToken.interceptors.request.use(
        async (config) => {
            config.headers['Authorization'] = `Bearer ${token}`
            return config;
        },
    );
}
