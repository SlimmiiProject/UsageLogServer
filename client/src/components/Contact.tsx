import React, { useEffect, useState } from "react";
import { I18n } from "../util/language/I18n";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { IOUtil } from "../util/IOUtil";

export interface ContactInfo {
    firstname: string,
    lastname: string,
    email: string,
    subject: string,
    description: string;
}

const Contact = (): JSX.Element => {

    const [contactData, setContactData] = useState<ContactInfo>({ firstname: "", lastname: "", email: "", subject: "", description: "" });

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
                            onChange={event => setContactData({ ...contactData, firstname: event.target.value })}
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
                            onChange={event => setContactData({ ...contactData, lastname: event.target.value })}
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
                            onChange={event => setContactData({ ...contactData, email: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="subject"
                            name="subject"
                            label="Onderwerp"
                            fullWidth
                            autoComplete="ProblemWith"
                            variant="standard"
                            onChange={event => setContactData({ ...contactData, subject: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            id="description"
                            aria-label="empty textarea"
                            placeholder="Beschrijving"
                            minRows={8}
                            required
                            style={{ width: 600 }}
                            onChange={event => setContactData({ ...contactData, description: event.target.value })}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        sx={{ mt: 2, mb: 2, bgcolor: 'rgba(25,118,210,255)', color: "white" }}
                        style={{ width: 600, marginLeft: 23, }}
                        onClick={async (event) => await IOUtil.sendContactData(contactData)}
                    >
                        Send
                    </Button>
                </Grid>
            </React.Fragment>
        </Box>
    );
};

export default Contact;