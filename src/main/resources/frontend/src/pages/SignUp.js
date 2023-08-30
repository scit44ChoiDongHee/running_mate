import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    user_id: "",
    user_pw: "",
    user_name: "",
    user_email: "",
    user_birthday: "",
    user_phone: "",
    user_nickname: "",
    user_photo: "",
    confirmPassword: "", // 비밀번호 확인 필드 추가
  });

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);

  const validateEmail = (email) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    return emailRegEx.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
    return passwordRegEx.test(password);
  };

  const validatePasswordConfirm = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  useEffect(() => {
    setEmailValid(validateEmail(formData.user_email));
    setPasswordValid(validatePassword(formData.user_pw));
    setPasswordConfirmValid(
      validatePasswordConfirm(formData.user_pw, formData.confirmPassword)
    );
  }, [formData.user_email, formData.user_pw, formData.confirmPassword]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/register", formData);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("데이터 전송 에러:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                name="user_id"
                required
                fullWidth
                id="id"
                label="ID"
                autoFocus
                placeholder="아이디를 입력하세요"
                autoComplete="off"
                value={formData.user_id}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="user_pw"
                label="Password"
                type="password"
                id="pw"
                placeholder="비밀번호를 입력하세요"
                autoComplete="off"
                value={formData.user_pw}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword" // 추가된 입력 필드
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                placeholder="비밀번호를 다시 입력하세요"
                autoComplete="off"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <div>
                {!passwordConfirmValid &&
                  formData.confirmPassword.length > 0 && (
                    <div>비밀번호가 일치하지 않습니다.</div>
                  )}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "30px" }}>
            <TextField
              required
              fullWidth
              id="user_email"
              label="Email Address"
              autoComplete="off"
              name="user_email"
              placeholder="test@gmail.com"
              value={formData.user_email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <TextField
              required
              fullWidth
              id="name"
              label="name"
              autoComplete="off"
              name="user_name"
              placeholder="이름을 입력하세요"
              value={formData.user_name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                name="user_birthday"
                onChange={(newValue) =>
                  handleInputChange({
                    target: { name: "user_birthday", value: newValue },
                  })
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <TextField
              required
              fullWidth
              id="phone"
              label="phone"
              autoComplete="off"
              name="user_phone"
              placeholder="전화번호를 입력하세요"
              value={formData.user_phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <TextField
              required
              fullWidth
              id="nickname"
              label="nickname"
              name="user_nickname"
              placeholder="별명을 입력하세요"
              autoComplete="off"
              value={formData.user_nickname}
              onChange={handleInputChange}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!emailValid || !passwordValid || !passwordConfirmValid} // 유효하지 않은 경우 버튼 비활성화
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
 