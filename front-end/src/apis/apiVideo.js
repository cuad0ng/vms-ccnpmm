import {  axiosClientWithToken} from "./axiosClient";

const apiVideo = {
    getListVideo: async()=>{
        const res = await axiosClientWithToken.get(`video/get-videos`)
        return res.data;
    },
    uploadVideo: async(params)=>{
        const res = await axiosClientWithToken.post(`/video`,params,{headers: {
            'Content-Type': 'multipart/form-data'
        }})
        return res.data;
    }
}
export default apiVideo;