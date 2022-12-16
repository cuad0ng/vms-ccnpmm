import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import apiAuth from "../../apis/apiAuth";

import {
  Stack,
  IconButton,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import {toast} from 'react-toastify'

function SignUp(props) {
  const [retypePassword, setRetypePassword] = useState('')
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const {
    formState: { errors },
  } = useForm();
  const handleSubmit = () => {
    if (password!=retypePassword) {
      toast.warning("Mật khẩu và nhập lại mật khẩu phải giống nhau")
    } else {
      let param = {
        password: password,
        email: email,
        name : name,
      };
      apiAuth.postRegister(param)
      .then((res)=>{
        console.log(res);
        toast.info("Đăng ký thành công")
      }).catch((err)=>{
        console.log(err)
      })
    }
  };
  return (
    <Stack direction="row">
      <Stack direction="column" sx={{ flex: 5 }} spacing={3}>
        <Typography variant="h5">Mời bạn đăng ký tài khoản</Typography>
        <form>
          <Stack spacing={1}>
            <Stack width="100%">
            <TextField label="Name" type='standard' value={name} variant="standard" onChange={(event) => {
                setName(event.target.value)
              }}></TextField>
            <TextField label="Email" variant="standard" value={email} onChange={(event) => {
                setEmail(event.target.value)
              }}></TextField>
            </Stack>
            <TextField label="Password" type='password' value={password} variant="standard" onChange={(event) => {
                setPassword(event.target.value)
              }}></TextField>

              <TextField label="Retype Password" type='password' value={retypePassword} variant="standard" onChange={(event) => {
                setRetypePassword(event.target.value)
              }}></TextField>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              color="error"
            >
              Hoàn Tất
            </Button>
          </Stack>
        </form>
      </Stack>
      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={props.closeModalLogin}>
          <CloseIcon />
        </IconButton>
      </span>
    </Stack>
  );
}

export default SignUp;
