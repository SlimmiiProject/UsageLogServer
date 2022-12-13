import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Container,
  CssBaseline,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getPath } from "../../App";
import { IOUtil } from "../../util/IOUtil";
import { I18n } from "../../util/language/I18n";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();

  const [error, setError] = useState<string>("");
  const [infoMsg, setInfo] = useState<string>("");

  const [expired, setExpired] = useState<boolean>(false);

  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
          //TODO Check if token is valid or expired
    }

  }, []);

  const handlePasswordChangeSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // TODO Improve data capture
    const password = data.get("password")!.toString();
    const password_verify = data.get("password_verify")!.toString();

    if (password !== password_verify)
      return setError("error.passwords_no_match");

    if (token && (await IOUtil.changePassword(token, password))) {
      setInfo("info.password_reset_succesful");
    } else {
      setError("error.password_reset_fail");
    }
  };

  const handlePasswordResetRequestSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setInfo("");

    const data = new FormData(event.currentTarget);
    const email_value = data.get("email")?.toString();

    if (email_value) {
      if (await IOUtil.requestPasswordReset(email_value)) {
        setInfo(
          I18n.t("info.email_sent_password_reset", {
            email: email_value,
          })
        );
      }
    } else {
      setError("error.email_not_supplied");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        {error !== "" && <Alert severity="error">{I18n.t(error)}</Alert>}
        {infoMsg !== "" && <Alert severity="info">{I18n.t(infoMsg)}</Alert>}

        <h1>{I18n.t("page.password_reset")}</h1>
        <CssBaseline />

        <h2 style={{ marginBottom: "-0.5rem" }}>
          {I18n.t("page.password_reset.enter_email")}
        </h2>
        {!token && (
          <Box
            component="form"
            onSubmit={handlePasswordResetRequestSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label={I18n.t("field.email")}
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {I18n.t("button.submit")}
            </Button>
          </Box>
        )}


        {!expired && token && (
          <Box
            component="form"
            onSubmit={handlePasswordChangeSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label={I18n.t("field.password")}
              name="password"
              type="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_verify"
              label={I18n.t("field.password_verify")}
              type="password"
              id="password_verify"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {I18n.t("button.submit")}
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ForgotPassword;
