import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  Stack,
  Button,
  Typography,
  Avatar,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiProfile from "../../apis/apiProfile";
function ProfileUser() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [avatar,setAvatar] = useState('');
  const [name,setName] = useState('');
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

  const handleUpdate = async () =>{
    await apiProfile.postAvatar({avatar:avatar}).then((res)=>{
        let params = {
            id:user?._id,
            name:name,
            avatar:res.avatar
        }
        apiProfile.putUser(params)
        toast.info('Chỉnh sửa thông tin thành công')
        navigate('/user')
    })
  }

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
          <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" onChange={(event)=>{
            setAvatar(event.target.files[0])
          }}/>
          <TextField label="Tên người dùng" value={name} placeholder={user?.name} onChange={(event) => {
                setName(event.target.value)
            }}></TextField>
          <Typography>Email : {user?.email}</Typography>
          <Typography>Ngày tạo: {user?.createdAt}</Typography>
          <Button onClick={handleUpdate}>Thực hiện chỉnh sửa</Button>
        </Stack>
    )
}
export default ProfileUser