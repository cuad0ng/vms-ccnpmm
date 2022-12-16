import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  Stack,
  Grid,
  Button,
  Typography,
  TextField,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  InputBase,
  Avatar,
  ListItemText,
  RadioGroup,
  Radio,
  FormControlLabel,
  hexToRgb,
  Modal,
  IconButton,
  Paper,
  CircularProgress,
  Divider,
  Badge,
  ClickAwayListener,
} from "@mui/material";
import { toast } from "react-toastify";
import { styled } from '@mui/material/styles';
import { useParams,useNavigate } from "react-router-dom";
import apiImage from "../../apis/apiImage";
import apiVideo from "../../apis/apiVideo";
function ListVideo() {
  const [image,setImage] = useState();
  const [listVideo, setListVideo] = useState();
  const [video, setVideo] = useState();
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token')
  useEffect(() => {
    if(!access_token){
        toast.warning("Bạn chưa đăng nhập")
        navigate("/")
    }else{
        apiVideo.getListVideo().then((res)=>{
            setListVideo(res.video)
        })
    }
  }, [access_token], [listVideo])


  const handleUploadVideo = async () =>{
    await apiVideo.uploadVideo({video:video}).then((res)=>{
        toast.info('Tải video thành công')
        apiVideo.getListVideo().then((res)=>{
            setListVideo(res.video)
        })
    })

  }

    return (
        <Stack justifyContent="center" alignItems="center" spacing={3}>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} padding={5}>
            {listVideo?.map((item) => (
                <>
                <Box sx={{background:'#FFFFFF', borderRadius:'0.5rem', width:'330px' , height:'250px'}} margin="10px">
                    <Stack alignItems="center">
                    <video width="320" height="240" controls>
                         <source src={item.url} type="video/mp4" />
                    </video>
                    </Stack>
                </Box>
                </>
            ))}
            </Grid>
            <Box>
                <input type="file" id="video_uploads" name="video_uploads" accept=".mp4, .mkv," onChange={(event)=>{
                    setVideo(event.target.files[0])
                }}/>
                <Button onClick={handleUploadVideo}>Thêm Video</Button>
            </Box>
        </Stack>
    )
}
export default ListVideo