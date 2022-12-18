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

const theme = createTheme();
interface openForgetPW {
  openForgetPW: boolean;
  setOpenForgetPW: (open: boolean) => void;
}

export default function ForgetPW({ openForgetPW, setOpenForgetPW }: openForgetPW) {
  const [email, setEmail] = React.useState("");
  const [username, setUserName] = React.useState("");

  const validateEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate email
    setEmail(event.target.value);
  };

  const validateUserName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate UserName
    setUserName(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(email);
  };

  return (
    <div>
      <Dialog open={openForgetPW} onClose={() => setOpenForgetPW(false)}>
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
                  Forget Password
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => validateEmail(event)}
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
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 5, mb: 5 }}>
                    Send
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
