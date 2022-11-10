import * as React from "react";
import {
  Avatar,
  Alert,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  getCurrentLanguage,
  getCurrentLanguagePath,
  getCurrentPath,
} from "../../App";
import { useTranslation } from "react-i18next";
import { IOUtil } from "../../util/IOUtil";
import { useNavigate } from "react-router-dom";

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = React.useState<Boolean>(false);
  const [isFailed, setFailed] = React.useState<Boolean>(false);

  React.useEffect(() => {
    if (authenticated) {
      setFailed(false);
      navigate("/dashboard");
    }
  }, [authenticated]);
  // On submit it checks the credentials, If authenticated it redirects to the dashboardpage
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFailed(true);

    // TODO Improve data capture
    const email = data.get("email")!.toString();
    const password = data.get("password")!.toString();
    setAuthenticated(await IOUtil.loginUser(email, password));
  };
  // get current location
  let path = getCurrentLanguagePath(getCurrentLanguage(useTranslation()));
  return (
    <Container component="main" maxWidth="xs">
      {isFailed ? (
        <Alert severity="error">Login has failed, try again!</Alert>
      ) : (
        <></>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "rgba(25,118,210,255)" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mailadres"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Wachtwoord"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Onthoud mij"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Wachtwoord vergeten?
              </Link>
            </Grid>
            <Grid item>
              <Link href={`${path}register`} variant="body2">
                {"Registreren"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
