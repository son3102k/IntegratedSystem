import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { styled } from "@mui/material/styles";
import { redirect_Account, redirect_Main, redirect, Page_GoToLogIn } from "../../constant/pageRedirect";
import { name } from "../../constant/name";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, LogOut } from "../LogInRegister/AuthSlice";
import { Router_Login } from "../../constant/routerComponent";
// import { Router_Login } from "../../constant/routerComponent";

const drawerWidth = 240;

const Logo = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: blue[700],
  color: "#FFF",
});

interface Props {
  window?: () => Window;
  children?: JSX.Element;
}

export default function Layout(props: Props) {
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (auth.accessToken.length === 0) {
      navigate(Router_Login);
      console.log("not auth");
    }
  }, [])
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [nowRedirectName, setNowRedirectName] = React.useState(redirect_Main[0].name);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickTab = (redirect: redirect) => {
    setNowRedirectName(redirect.name);
    if (redirect.name === Page_GoToLogIn) {
      dispatch(LogOut());
    }
    navigate(redirect.router);
    handleDrawerToggle();
  };

  const renderListRedirect = (ListRedirects: redirect[]) => (
    <List>
      {ListRedirects.map((redirect) => (
        <ListItem key={redirect.name} disablePadding>
          <ListItemButton onClick={() => handleClickTab(redirect)}>
            <ListItemIcon>{redirect.icon}</ListItemIcon>
            <ListItemText primary={redirect.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const drawer = (
    <div>
      <Logo>
        <Toolbar>
          <LocalLibraryIcon fontSize="large" />
          <Typography variant="h6" noWrap component="div">
            {name}
          </Typography>
        </Toolbar>
      </Logo>
      <Divider />
      {renderListRedirect(redirect_Main)}
      <Divider />
      {renderListRedirect(redirect_Account)}
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {nowRedirectName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {/* code ui in here */}
        {props.children}
      </Box>
    </Box>
  );
}
