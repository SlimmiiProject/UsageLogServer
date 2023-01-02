import { useState } from "react";
import { I18n } from "../util/language/I18n";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { IOUtil } from "../util/IOUtil";
import { Alert } from "@mui/material";

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  description: string;
}

const Contact = (): JSX.Element => {
    const [infoMsg, setInfoMsg] = useState<string>("");
    const [canSend, setCanSend] = useState<boolean>(true);
    const [contactData, setContactData] = useState<ContactInfo>({ firstName: "", lastName: "", email: "", subject: "", description: "" });

    return (
        <Box sx={{ marginTop: 10, width: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "auto" }} >
            <>
                {infoMsg !== "" && <Alert severity="info" style={{marginBottom:"1rem"}}>{I18n.t(infoMsg)}</Alert>}

                <Avatar sx={{ m: 1, bgcolor: 'rgba(25,118,210,255)' }}>
                    <AssignmentIcon />
                </Avatar>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label={I18n.t("contact.firstname")}
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(event) =>
                setContactData({
                  ...contactData,
                  firstName: event.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label={I18n.t("contact.lastname")}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(event) =>
                setContactData({ ...contactData, lastName: event.target.value })
              }
            />
          </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField required id="firstName" name="firstName" label={I18n.t("contact.firstname")} fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            onChange={event => setContactData({ ...contactData, firstName: event.target.value })}
                            value={contactData.firstName}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField required id="lastName" name="lastName" label={I18n.t("contact.lastname")} fullWidth
                            autoComplete="family-name"
                            variant="standard"
                            onChange={event => setContactData({ ...contactData, lastName: event.target.value })}
                            value={contactData.lastName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required id="email" name="email" label={I18n.t("contact.email")} fullWidth
                            autoComplete="email"
                            variant="standard"
                            onChange={event => setContactData({ ...contactData, email: event.target.value })}
                            value={contactData.email}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required id="subject" name="subject" label={I18n.t("contact.subject")} fullWidth
                            autoComplete="ProblemWith"
                            variant="standard"
                            onChange={event => setContactData({ ...contactData, subject: event.target.value })}
                            value={contactData.subject}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextareaAutosize id="description" aria-label="empty textarea" placeholder={I18n.t("contact.description")}
                            minRows={8}
                            required
                            style={{ width: 600 }}
                            onChange={event => setContactData({ ...contactData, description: event.target.value })}
                            value={contactData.description}
                        />
                    </Grid>
                    <Button type="submit" sx={{ mt: 2, mb: 2, bgcolor: 'rgba(25,118,210,255)', color: "white" }}
                        style={{ width: 600, marginLeft: 23, }}
                        disabled={!canSend}
                        onClick={() => {
                            setCanSend(false);
                            IOUtil.sendContactData(contactData).then(() => {
                                setCanSend(true);
                                setInfoMsg("message.sent-contact")
                                setContactData({
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    subject: "",
                                    description: ""
                                });
                            });
                        }}
                    >
                        {I18n.t("contact.send")}
                    </Button>
                </Grid>
            </>
        </Box>
    );
};

export default Contact;
