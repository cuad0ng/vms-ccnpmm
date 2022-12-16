
import { axiosClient } from "./axiosClient";

const apiAuth = {
    postLogin: async (params) => {
        const myLogin = await axiosClient.post('/auth/login', params)
        return myLogin.data;
    },
    postRegister: async (params) => {
        const register = await axiosClient.post('/auth/register', params)
        return register.data
    },
    resetPassword:async (params,token) => {
        const register = await axiosClient.post(`/auth/resetPassword/?token=${token}`, params)
        return register.data
    },
    forgetPassword:async (params) => {
        const register = await axiosClient.post(`/auth/forgetPassword`, params)
        return register.data
    }
}

export default apiAuth;