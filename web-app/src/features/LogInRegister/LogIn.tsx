import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import image_login from "../../assets/image_login.jpg";
import { group, welcome } from "../../constant/name";
import { loginAPI } from "../../apis/auth";
import Register from "./Register";
import ForgetPW from "./ForgetPW";
import { useNavigate } from "react-router-dom";
import { Router_SearchOnline } from "../../constant/routerComponent";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="">
        {group}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [openRegister, setOpenRegister] = React.useState(false);
  const [openForgetPW, setOpenForgetPW] = React.useState(false);

  const validateEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate email
    setUsername(event.target.value);
  };

  const validatePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate password
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(username, password);
    // await loginAPI({ username, password });
    navigate(Router_SearchOnline);
  };

  return (
    <>
      <Register openRegister={openRegister} setOpenRegister={setOpenRegister} />
      <ForgetPW openForgetPW={openForgetPW} setOpenForgetPW={setOpenForgetPW} />
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={8}
            sx={{
              backgroundImage: `url(${image_login})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LocalLibraryIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {welcome}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(event) => validateEmail(event)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => validatePassword(event)}
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link variant="body2" onClick={() => setOpenForgetPW(true)}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link variant="body2" onClick={() => setOpenRegister(true)}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
