import {
  Box,
  TextField,
  Button,
  Container,
  CssBaseline,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {useNavigate, useSearchParams } from "react-router-dom";
import { IOUtil } from "../../util/IOUtil";
import { I18n } from "../../util/language/I18n";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();

  const [error, setError] = useState<string>("");
  const [infoMsg, setInfo] = useState<string>("");

  const [expired, _setExpired] = useState<boolean>(false);
  const [_loading, setLoading] = useState<boolean>(true);

  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    console.log(token);
    if (!token) {
      setLoading(false);
    } else {
      const validateToken = async () => {
        const valid = await IOUtil.doesPasswordResetExist(token, controller);
        if (!IOUtil.isAborted(controller) && !valid) navigate("/");
      };

      validateToken();
    }

    return () => controller.abort();
  }, [token, navigate]);

  const handlePasswordChangeSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // TODO Improve data capture
    const password = data.get("password")!.toString();
    const password_verify = data.get("password_verify")!.toString();

    if (password !== password_verify)
      return setError(I18n.t("passwordReset.noMatch"));

    if (token && (await IOUtil.changePassword(token, password))) {
      setInfo(I18n.t("passwordReset.resetSuccesfull"));
    } else {
      setError(I18n.t("passwordReset.resetFail"));
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
          I18n.t("passwordReset.confirmMessage", {
            email: email_value,
          })
        );
      }
    } else {
      setError(I18n.t("passwordReset.errorEmailNorSupplied"));
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        {error !== "" && <Alert severity="error">{I18n.t(error)}</Alert>}
        {infoMsg !== "" && <Alert severity="info">{I18n.t(infoMsg)}</Alert>}

        <h1>{I18n.t("passwordReset")}</h1>
        <CssBaseline />

        {!token && (
          <>
            <h2 style={{ marginBottom: "-0.5rem" }}>
              {I18n.t("passwordReset.EnterEmail")}
            </h2>
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
                {I18n.t("passwordReset.submit")}
              </Button>
            </Box>
          </>
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
              label={I18n.t("forgotPassword.password")}
              name="password"
              type="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_verify"
              label={I18n.t("forgotPassword.verify")}
              type="password"
              id="password_verify"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {I18n.t("passwordReset.submit")}
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ForgotPassword;
