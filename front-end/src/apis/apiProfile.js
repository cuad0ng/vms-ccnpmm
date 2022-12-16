import {  axiosClientWithToken} from "./axiosClient";

const apiProfile = {
    postAvatar: async (params) =>{
        const res = await axiosClientWithToken.post(`user/upload-avatar`,params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data
    },
    putUser: async (params) =>{
        const res = await axiosClientWithToken.put(`user/${params.id}`,params)
        return res.data
    },
    getUser:async()=>{
        const res = await axiosClientWithToken.get(`user`)
        return res.data;
    }
}
    
export default apiProfile;