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
import {
  getCurrentLanguagePath
} from "../../App";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IOUtil } from "../../util/IOUtil";
import { I18n } from "../../util/language/I18n";

const Register = (): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // TODO Improve data capture
    const first_name = data.get("firstName")!.toString();
    const last_name = data.get("lastName")!.toString();
    const email = data.get("email")!.toString();
    const phone_number = data.get("phoneNumber")!.toString();
    const password = data.get("password")!.toString();
    const password_verify = data.get("passwordVerify")!.toString();

    IOUtil.registerUser(
      first_name,
      last_name,
      email,
      phone_number,
      password,
      password_verify
    );
  };
  let path = getCurrentLanguagePath(I18n.currentLanguage);
  return (
    <Container component="main" maxWidth="xs">
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
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
