import React, { useEffect, useState, useCallback,useRef, } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { Stack, Button, Typography, Badge, Box, Modal, Grid, Item } from "@mui/material";

import "./Header.scss";

import Login from "../Login";
import SignUp from "../SignUp";
import ForgetPassword from "../ForgetPassword";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import apiProfile from "../../apis/apiProfile";

function Header() {
  const access_token = localStorage.getItem('access_token')
  const [user, setUser] = useState();

  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPwd, setIsForgetPwd] = useState(false);


  useEffect(() => {
    if(!access_token){
    }else{
        apiProfile.getUser().then((res)=>{
            setUser(res.userData)
          }
        )
    }
  }, [access_token])

  const closeModalLogin = () => {
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  };

  const closeModalForgetPWD = () => {
    setIsForgetPwd(false);
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
  };

  const handleReturnLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsForgetPwd(false);
    setIsRegister(false);
  }, []);

  const handleOpenSignup = useCallback(() => {
    setIsRegister(true);
    setIsForgetPwd(false);
    setIsLoginForm(false);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  }, []);

  const handleOpenForgetPwd = useCallback(() => {
    setIsForgetPwd(true);
    setIsRegister(false);
    setIsLoginForm(false);
  }, []);
  return (
    <header className="header">
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          height: "100px",
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
        }}
      >
        <Link className="header__logo" to={"/"}>
          <Stack spacing={1} pt={1}>
            <img
              alt=""
              style={{ width: "110px", height: "70px" }}
              src="https://res.cloudinary.com/duk2lo18t/image/upload/v1671119989/vms-removebg-preview_ev4g1g.png"
            />
          </Stack>
        </Link>


        <Stack
          alignItems="flex-start"
          justifyContent="center"
          py={2}
          className="header__account"
        >
          <Stack
            alignItems="center"
            sx={{ color: "white", width: "160px", maxWidth: "160px" }}
          >
                <Stack>
                  <Button
                    sx={{ color: "white", padding: "6px 0" }}
                    endIcon={<ArrowDropDownOutlinedIcon />}
                  >
                    <Typography
                      className="text-overflow-1-lines"
                      sx={{ fontSize: "15px", textAlign: "start" }}>
                      Liên hệ
                    </Typography>
                  </Button>
                </Stack>
                <Box className="header__dropdown">
                <a href='#'>Về chúng tôi</a>
                <a href='#'>Đội ngũ nhân viên</a>
                <a href='#'>Sự kiện</a>
                <a href='#'>Hợp tác và thoả thuận</a>
                </Box>
            </Stack>
        </Stack>

        <Stack
          alignItems="flex-start"
          justifyContent="center"
          py={2}
          className="header__account"
        >
          <Stack
            alignItems="center"
            sx={{ color: "white", width: "190px", maxWidth: "190px" }}
          >
                <Stack>
                  <Button
                    sx={{ color: "white", padding: "6px 0" }}
                    endIcon={<ArrowDropDownOutlinedIcon />}
                  >
                    <Typography
                      className="text-overflow-1-lines"
                      sx={{ fontSize: "15px", textAlign: "start" }}>
                      Sản phẩm của chúng tôi
                    </Typography>
                  </Button>
                </Stack>
                <Box className="header__dropdown">
                <a href='#'>Vms</a>
                <a href='/user/listImage'>Thư viện ảnh</a>
                <a href='/user/listVideo'>Thư viện video</a>
                </Box>
            </Stack>
        </Stack>
        <Stack spacing={1} className="header__cart">
          <a href="tel:0868704516">
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{ color: "white", width: "160px", maxWidth: "160px" }}
            >
              <PhoneIcon sx={{ fontSize: "32px" }} />
              <Typography fontSize="12px">Liên hệ với chúng tôi</Typography>
            </Stack>
          </a>
        </Stack>

        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={3}
          py={2}
          className="header__account"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing="10px"
            sx={{ color: "white", width: "160px", maxWidth: "160px" }}
          >
            {user ? (
              <>
              <Stack justifyContent="center"
                      alignItems="center" className="header__cart">
                <Stack><img src={user.avatar} /></Stack>
                <Button
                  href = "/user"
                  sx={{ color: "white" }}>
                  <Typography sx={{ fontSize: "13px" }}>Quản lý tài khoản</Typography>
                </Button>
                <Typography px={2} sx={{ fontSize: "13px" }}>{user.email}</Typography>
              </Stack>
            </>
            ) : (
              <>
                <Stack justifyContent="center" alignItems="center" className="header__cart">
                  <Stack><PersonOutlineOutlinedIcon sx={{ fontSize: "32px" }} /></Stack>
                  <Button
                    onClick={openModalLogin}
                    sx={{ color: "white" }}>
                    <Typography sx={{ fontSize: "13px" }}>Đăng nhập</Typography>
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalLogin}
        onClose={closeModalLogin}
      >
        <Box className="modal-login" sx={{ width: "360px" }}>
          {isLoginForm && (
            <Login
              handleOpenSignup={handleOpenSignup}
              closeModalLogin={closeModalLogin}
              handleOpenForgetPwd={handleOpenForgetPwd}
            />
          )}

          {isRegister && (
            <SignUp
              handleOpenLogin={handleOpenLogin}
              closeModalLogin={closeModalLogin}
            />
          )}

          {isForgetPwd && (
            <ForgetPassword
              closeModalForgetPWD={closeModalForgetPWD}
              handleReturnLogin={handleReturnLogin}
            />
          )}
        </Box>
      </Modal>
    </header>
  );
}
export default Header;
