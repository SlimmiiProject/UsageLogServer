import * as React from "react";
import {Button,CssBaseline,TextField,Grid,Box,Container,Alert} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Link} from 'react-router-dom';

const EditProfile = (): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName:data.get("firstName"),
      lastName:data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      password2:data.get("password2"),
    });
  };
  



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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Password control"
                type="password"
                id="password2"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Link to="/profile" replace>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Edit profile
          </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfile;
