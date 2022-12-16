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
function ProfileUser() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token')
  useEffect(() => {
    if(!access_token){
        toast.warning("Bạn chưa đăng nhập")
        navigate("/")
    }else{
        apiProfile.getUser().then((res)=>{
            setUser(res.userData)
          }
        )
    }
  }, [access_token])
    return (
        <Stack justifyContent="center" alignItems="center" spacing={3}>
          <Avatar
                    sx={{
                      width: 110,
                      height: 110,
                      border: "3px solid aquamarine",
                    }}
                    src={user?.avatar?user.avatar:""}
          />
          <Typography>Tên người dùng: {user?.name}</Typography>
          <Typography>Email : {user?.email}</Typography>
          <Typography>Ngày tạo: {user?.createdAt}</Typography>

          <Button href="/user/edit">Chỉnh sửa</Button>
        </Stack>
    )
}
export default ProfileUser