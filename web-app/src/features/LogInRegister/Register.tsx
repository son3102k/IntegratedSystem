import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { welcome } from "../../constant/name";

const theme = createTheme();
interface openRegister {
  openRegister: boolean;
  setOpenRegister: (open: boolean) => void;
}

export default function Register({ openRegister, setOpenRegister }: openRegister) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const validateFirstName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate first name
    setFirstName(event.target.value);
  };

  const validateLastName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate Last name
    setLastName(event.target.value);
  };

  const validateEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate email
    setEmail(event.target.value);
  };

  const validatePhoneNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate PhoneNumber
    setPhoneNumber(event.target.value);
  };

  const validateUserName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate UserName
    setUserName(event.target.value);
  };

  const validatePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate password
    setPassword(event.target.value);
  };

  const validateConfirmPassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate Confirm Password
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(email, password);
  };

  return (
    <div>
      <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>
        <DialogContent>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography component="h1" variant="h5">
                  {welcome}
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        onChange={(event) => validateFirstName(event)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="lastName"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        onChange={(event) => validateLastName(event)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => validateEmail(event)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="phoneNumber"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(event) => validatePhoneNumber(event)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="username"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        value={username}
                        onChange={(event) => validateUserName(event)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => validatePassword(event)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(event) => validateConfirmPassword(event)}
                      />
                    </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 5, mb: 5 }}>
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
