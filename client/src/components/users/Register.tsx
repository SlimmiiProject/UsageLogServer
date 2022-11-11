import * as React from "react";
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
import { getCurrentLanguagePath } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IOUtil } from "../../util/IOUtil";
import { Alert } from "@mui/material";
import { I18n } from "../../util/language/I18n";

const Register = (): JSX.Element => {
  const [authenticated, setAuthenticated] = React.useState<Boolean>(false);
  const [register, setRegister] = React.useState<Boolean>(false);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordVerify, setPasswordVerify] = React.useState<string>("");
  const [passwordMatch, setPasswordMatch] = React.useState<boolean>(true);
  const [phoneNumberCorrectLength, setPhoneNumberCorrectLength] =
    React.useState<boolean>();

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    password === passwordVerify
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
    phoneNumber[0] === "0" ? (
      setPhoneNumber("+32" + phoneNumber.slice(1))
    ) : (
      <></>
    );

    if (passwordMatch) {
      console.log(
        await IOUtil.registerUser(
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          passwordVerify
        )
      );
    }

    setPassword("");
    setPasswordVerify("");
  };
  let path = getCurrentLanguagePath(I18n.currentLanguage);
  return (
    <Container component="main" maxWidth="xs">
      {!passwordMatch ? (
        <Alert severity="error">Passwords don't match, try again!</Alert>
      ) : (
        <></>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "rgba(25,118,210,255)" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {I18n.t("register.here")}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => handleSubmit(e)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                label={I18n.t("register.firstname")}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label={I18n.t("register.lastname")}
                name="lastName"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={I18n.t("register.email")}
                name="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label={I18n.t("register.phone")}
                name="phoneNumber"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
                autoComplete="Phone-Nummer"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={I18n.t("register.password")}
                type="password"
                id="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordVerify"
                label={I18n.t("register.verify")}
                type="password"
                id="passwordVerify"
                value={passwordVerify}
                onChange={(event) => {
                  setPasswordVerify(event.target.value);
                }}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {I18n.t("register.here")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={path + "login"} variant="body2">
                {I18n.t("register.signIn")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
