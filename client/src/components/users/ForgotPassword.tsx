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
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getPath } from "../../App";
import { I18n } from "../../util/language/I18n";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();

  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    //if (!token) navigate(getPath("/"))
    //TODO Check if token is valid or expired
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // TODO Improve data capture
    const password = data.get("password")!.toString();
    const password_verify = data.get("password_verify")!.toString();

    if (password !== password_verify)
      return setError("error.passwords_no_match");

    // Send request to server, requesting a boolean reply
    // setReset(//response)
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        {error !== "" && <Alert severity="error">{I18n.t(error)}</Alert>}

        <h1>{I18n.t("page.password_reset")}</h1>
        <CssBaseline />

        {!expired && (
          <Box
            component="form"
            onSubmit={handleSubmit}
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
