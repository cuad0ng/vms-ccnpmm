import React from "react";
import { useEffect, useState, useRef } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploading from "react-images-uploading";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
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
import apiProfile from "../../apis/apiProfile";
import apiImage from "../../apis/apiImage";
import { margin } from "@mui/system";
function ListImage() {
  const [user, setUser] = useState();
  const [image,setImage] = useState();
  const [listImage, setListImage] = useState();
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token')
  useEffect(() => {
    if(!access_token){
        toast.warning("Bạn chưa đăng nhập")
        navigate("/")
    }else{
        apiImage.getListImage().then((res)=>{
            setListImage(res.image)
          }
        )
    }
  }, [access_token], [listImage])


  const handleUploadImage = async () =>{
    await apiImage.uploadImage({image:image}).then((res)=>{
        toast.info('Tải hình ảnh thành công')
        apiImage.getListImage().then((res)=>{
            setListImage(res.image)
          }
        )
    })

  }

  console.log(listImage)
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
    return (
        <Stack justifyContent="center" alignItems="center" spacing={3}>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} padding={5}>
            {listImage?.map((item) => (
                <>
                <Box sx={{background:'#FFFFFF', borderRadius:'0.5rem', width:'300px' , height:'300px'}} margin="10px">
                    <Stack alignItems="center">
                    <img src={item?.url?item.url:'https://res.cloudinary.com/cuadong/image/upload/v1671190128/vms-ccnpmm/mxe4xs-1024px-No_image_available.svg_ii3xi4.png'} style={{maxWidth : "280px", maxHeight:"280px", margin:"0.5rem"}}></img>
                    </Stack>
                </Box>
                </>
            ))}
            </Grid>
            <Box>
                <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" onChange={(event)=>{
                    setImage(event.target.files[0])
                }}/>
                <Button onClick={handleUploadImage}>Thêm hình ảnh</Button>
            </Box>
        </Stack>
    )
}
export default ListImage