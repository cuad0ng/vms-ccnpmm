import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";
import { useDispatch , useSelector} from "react-redux";
import apiAuth from "../../apis/apiAuth";

import {
  Stack,
  IconButton,
  Button,
  Box,
  TextField,
  Typography,
  Input,
} from "@mui/material";

import Loading from "../Loading";
import { toast } from "react-toastify";
import apiProfile from "../../apis/apiProfile";

function Login(props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPass, setIsShowPass] = React.useState(false);

  const [isNoAccount, setIsNoAccount] = useState(false);

  const [wrongPass, setWrongPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handeleSumbit1 = () =>{
    apiProfile.getUser().then((res)=>{
      console.log(res)
      console.log(localStorage.getItem('user'))
    }
    )
  }
  const onSubmit = (data) => {
    console.log(email)
    console.log(password)
    if (loading) {
      toast.warning(
        "Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }
    setLoading(true);
    let params = {
      password: password,
      email: email,
    };

    apiAuth
      .postLogin(params)
      .then((res) => {
        console.log(res)
        let access_token = res.access_token;
        let user =  res.userData
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('access_token',access_token)
        props.closeModalLogin();
      })
      .catch((error) => {
        toast.warning("Đăng nhập không thành công")
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <Stack direction="row" height='400px' width='300px'>
      <Stack direction="column" sx={{ flex: 4 }} spacing={2}>
        <center>
        <h4 style={{ fontSize: "24px" }} text-align='center'>Đăng nhập</h4>
        </center>
        <form>
          <Stack spacing={2}>
            <Stack>
              <TextField label="Email" variant="standard" value={email} onChange={(event) => {
                setEmail(event.target.value)
              }}></TextField>
              <TextField label="Password" type='password' value={password} variant="standard" onChange={(event) => {
                setPassword(event.target.value)
              }}></TextField>
            </Stack>

            {isNoAccount && (
              <ErrorAfterSubmit message="Số điện thoại chưa được đăng ký" />
            )}

            {wrongPass && (
              <ErrorAfterSubmit message="Mật khẩu đăng nhập không chính xác" />
            )}

            <Button
              variant="contained"
              color="error"
              onClick={handleSubmit(onSubmit)}
            >
              {loading && <Loading color="#fff" />}
              Đăng nhập
            </Button>
          </Stack>
        </form>
        <Stack alignItems="center">
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenForgetPwd}
          >
            {" "}
            Quên mật khẩu
          </span>
        </Stack>
        <p style={{ textAlign: "center" }}>
          Nếu bạn chưa có tài khoản?
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenSignup}
          >
            {" "}
            Đăng ký
          </span>
        </p>
      </Stack>
    </Stack>
  );
}

export default Login;
