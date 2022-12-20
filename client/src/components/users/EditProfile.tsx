import { Button, CssBaseline, TextField, Grid, Box, Container, Alert } from "@mui/material";
import { I18n } from "../../util/language/I18n";
import { Link, useNavigate } from "react-router-dom";
import { Error, IOUtil } from "../../util/IOUtil";
import { useContext, useEffect, useState } from "react";
import { getPath, userContext } from "../../App";

export type CreationData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_verify: string;
};

const EditProfile = (): JSX.Element => {
  const userContextData = useContext(userContext);
  const [error, setError] = useState<Error>();
  const account = userContextData.userAccount!;

  const [formData, setFormData] = useState<CreationData>({
    first_name: account.firstName,
    last_name: account.lastName,
    email: account.email,
    phone_number: "",
    password: "",
    password_verify: ""
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);

    IOUtil.sendChangeProfileData(formData).then(data => {
      if (data.data.error) setError(data.data);
      else {
        userContextData.update();
        navigate(getPath("profile"))
      }
    });
  };

  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      {error && (
        <Alert severity="error">
          {
            <>
              {I18n.t(error.error)}
              {error.missing_fields &&
                error.missing_fields.map((field) => <div>{I18n.t(field)}</div>)}
            </>
          }
        </Alert>
      )}

      <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label={I18n.t("editprofile.firstname")} value={account.firstName} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label={I18n.t("editprofile.lastname")}
                name="lastName"
                autoComplete="family-name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={I18n.t("editprofile.email")}
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={I18n.t("editprofile.password")}
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label={I18n.t("editprofile.password2")}
                type="password"
                id="password2"
                autoComplete="new-password"
                value={formData.password_verify}
                onChange={(e) => setFormData({ ...formData, password_verify: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {I18n.t("editprofile.editprofile")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfile;
