import {  axiosClientWithToken} from "./axiosClient";

const apiImage = {
    getListImage: async()=>{
        const res = await axiosClientWithToken.get(`image/get-images`)
        return res.data;
    },
    uploadImage: async(params)=>{
        const res = await axiosClientWithToken.post(`/image`,params,{headers: {
            'Content-Type': 'multipart/form-data'
        }})
        return res.data;
    }
}
export default apiImage;