import React, { useEffect, useState } from "react";
import { I18n } from "../util/language/I18n";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';


const Contact = (): JSX.Element => {

    return (
        <Box
            sx={{
                marginTop: 10,
                width: 600,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: "auto",
            }}
        >
            <React.Fragment>
                <Avatar sx={{ m: 1, bgcolor: 'rgba(25,118,210,255)' }}>
                    <AssignmentIcon />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                    Contact Form
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="e-mail"
                            fullWidth
                            autoComplete="email"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="ProblemWith"
                            name="ProblemWith"
                            label="Waarmee hebt u een probleem?"
                            fullWidth
                            autoComplete="ProblemWith"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            id="Problem"
                            aria-label="empty textarea"
                            placeholder="Wat is het probleem?"
                            minRows={8}
                            required
                            style={{ width: 600 }}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        sx={{ mt: 2, mb: 2, bgcolor: 'rgba(25,118,210,255)', color: "white" }}
                        style={{ width: 600, marginLeft: 23, }}
                    >
                        Send
                    </Button>
                </Grid>
            </React.Fragment>
        </Box>
    );
};

export default Contact;