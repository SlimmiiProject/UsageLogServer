import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IOUtil } from "../../util/IOUtil";
import { useNavigate } from "react-router-dom";
import { I18n } from "../../util/language/I18n";
import { AccountData, getPath, userContext } from "../../App";
import {
  Container,
  Alert,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
} from "@mui/material";
import React from "react";

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const userContextData = React.useContext(userContext);

  const [authenticated, setAuthenticated] = React.useState<
    AccountData | undefined
  >(undefined);
  const [isFailed, setFailed] = React.useState<Boolean>(false);

  React.useEffect(() => {
    if (authenticated) {
      setFailed(false);
      navigate(getPath("dashboard"));
    }
  }, [authenticated, navigate]);

  // On submit it checks the credentials, If authenticated it redirects to the dashboardpage
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // TODO Improve data capture
    const email = data.get("email")!.toString();
    const password = data.get("password")!.toString();

    IOUtil.loginUser(email, password, userContextData.setAccountData).then(
      (res) => {
        setAuthenticated(res);

        if (res) {
          IOUtil.isAdmin().then((res) => {
            userContextData.setAccountData((accountData) => {
              return { ...accountData!, isAdmin: res };
            });
          });
        } else setFailed(true);
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      {isFailed && <Alert severity="error">{I18n.t("signIn.error")}</Alert>}

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
          {" "}
          <LockOutlinedIcon />{" "}
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
            label={I18n.t("signIn.email")}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={I18n.t("signIn.password")}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={I18n.t("signIn.rememberMe")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {I18n.t("signIn.signIn")}
          </Button>
          {/* {
            <GoogleLoginComponent
              auth={setAuthenticated}
              isLoggedIn={isLoggedIn}
              setLoggedIn={setLoggedIn}
            />
          } */}
          <Grid container>
            <Grid item xs>
              <Link href="forgot-password" variant="body2">
                {" "}
                {I18n.t("signIn.forgotPassword")}
              </Link>
            </Grid>

            <Grid item>
              <Link href={getPath("register")} variant="body2">
                {" "}
                {I18n.t("signIn.register")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
