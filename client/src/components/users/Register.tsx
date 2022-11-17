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
import { getPath } from "../../App";
import { useNavigate } from "react-router-dom";
import { Error, IOUtil } from "../../util/IOUtil";
import { Alert } from "@mui/material";
import { I18n } from "../../util/language/I18n";

const Register = (): JSX.Element => {
  const [registered, setRegistered] = React.useState<Boolean>(false);
  const [error, setError] = React.useState<Error>();
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordVerify, setPasswordVerify] = React.useState<string>("");
  const [passwordMatch, setPasswordMatch] = React.useState<boolean>(true);

  const navigate = useNavigate();
  const hasError = error !== undefined;

  React.useEffect(() => {
    if (registered) IOUtil.loginUser(email, password).then(() => navigate("/dashboard"));
  }, [registered, navigate, email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordMatch(password === passwordVerify);

    let phone = phoneNumber;
    
    if (phone[0] === "0") setPhoneNumber((phoneNumber) => phone = "+32" + phoneNumber.slice(1));
    if (passwordMatch) setRegistered(await IOUtil.registerUser(firstName, lastName, email, phone, password, passwordVerify, (err) => setError(err)));

    setPassword("");
    setPasswordVerify("");
  };
  
  return (
    <Container component="main" maxWidth="xs">

      {!passwordMatch && (<Alert severity="error">Passwords don't match, try again!</Alert>)}
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
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                label={I18n.t("register.firstname")}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="lastName" label={I18n.t("register.lastname")} name="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="family-name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="email" label={I18n.t("register.email")}
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="phoneNumber" label={I18n.t("register.phone")}
                name="phoneNumber"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                autoComplete="Phone-Nummer"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="password" label={I18n.t("register.password")}
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="passwordVerify" label={I18n.t("register.verify")}
                type="password"
                id="passwordVerify"
                value={passwordVerify}
                onChange={(event) => setPasswordVerify(event.target.value)}
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
