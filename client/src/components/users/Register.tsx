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
import { getPath } from "../../App";
import { useNavigate } from "react-router-dom";
import { Error, IOUtil } from "../../util/IOUtil";
import { Alert } from "@mui/material";
import { I18n } from "../../util/language/I18n";
import React, { useState } from "react";
import { StateUtil } from "../../util/StateUtil";

export type RegisterFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_verify: string;
};

const Register = (): JSX.Element => {
  const [registered, setRegistered] = useState<Boolean>(false);
  const [error, setError] = useState<Error>();
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_verify: ""
  });

  const navigate = useNavigate();
  const hasError = error !== undefined;

  const setValue = (key: keyof RegisterFormData, data: string) => StateUtil.setValue<RegisterFormData>(key, data, setFormData);

  React.useEffect(() => {
    if (registered) IOUtil.loginUser(formData.email, formData.password).then(() => navigate("/dashboard"));
  }, [registered, navigate, formData.email, formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordMatch(formData.password === formData.password_verify);

    let phone = formData.phone_number;

    if (phone[0] === "0") setFormData((formData) => { return { ...formData, phone_number: phone = "+32" + phone.slice(1) }; });

    const { first_name, last_name, email, password, password_verify } = formData;
    if (passwordMatch) setRegistered(await IOUtil.registerUser(first_name, last_name, email, phone, password, password_verify, (err) => setError(err)));

    setFormData((formData) => { return { ...formData, password: "", password_verify: "" }; })
  };

  return (
    <Container component="main" maxWidth="xs">

      {!passwordMatch && (<Alert severity="error">{I18n.t("error.passwords_no_match")}</Alert>)}
      {hasError && <Alert severity="error">{
        <>
          {I18n.t(error.error)}
          {error.missing_fields && error.missing_fields.map((field) => <div>{I18n.t(field)}</div>)}
        </>
      }</Alert>}

      <CssBaseline />
      <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{ m: 1, bgcolor: "rgba(25,118,210,255)" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {I18n.t("register.here")}
        </Typography>

        <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }} >
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName"
                value={formData.first_name}
                onChange={(event) => setValue("first_name", event.target.value)}
                label={I18n.t("register.firstname")}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="lastName" label={I18n.t("register.lastname")} name="lastName"
                value={formData.last_name}
                onChange={(event) => setValue("last_name", event.target.value)}
                autoComplete="family-name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="email" label={I18n.t("register.email")}
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) => setValue("email", event.target.value)}
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="phoneNumber" label={I18n.t("register.phone")}
                name="phoneNumber"
                value={formData.phone_number}
                onChange={(event) => setValue("phone_number", event.target.value)}
                autoComplete="Phone-Nummer"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="password" label={I18n.t("register.password")}
                type="password"
                id="password"
                value={formData.password}
                onChange={(event) => setValue("password", event.target.value)}
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="passwordVerify" label={I18n.t("register.verify")}
                type="password"
                id="passwordVerify"
                value={formData.password_verify}
                onChange={(event) => setValue("password_verify", event.target.value)}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
            {I18n.t("register.here")}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={getPath("login")} variant="body2">
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
