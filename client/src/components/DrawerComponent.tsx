import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import { NavLink } from "react-router-dom";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import { LanguageSelector } from "./LanguageSelector";
import { I18n } from "../util/language/I18n";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useContext } from "react";
import { getPath, userContext } from "../App";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from '@mui/icons-material/Login';

const drawerWidth = 240;

interface IOnDarkmode {
  (): void;
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{ open?: boolean; }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open" })<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ lang, mode, onDarkmode }: { lang: string; mode: boolean; onDarkmode: IOnDarkmode; }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const { isLoggedIn, isAdmin } = useContext(userContext);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {I18n.t("drawercomponent.head")}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDarkmode}
            edge="end"
            style={{ marginLeft: "auto" }}
          >
            {mode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              id: 0,
              text: I18n.t("drawercomponent.dashboard"),
              icon: <DashboardRoundedIcon />,
              link: getPath("dashboard"),
              render: isLoggedIn
            },
            {
              text: I18n.t("drawercomponent.profile"),
              icon: <AccountCircleRoundedIcon />,
              link: getPath("profile"),
              render: isLoggedIn
            },
            {
              text: I18n.t("drawercomponent.meters"),
              icon: <SpeedRoundedIcon />,
              link: getPath("devices"),
              render: isLoggedIn
            },
            {
              text: I18n.t("drawercomponent.contact"),
              icon: <MailIcon />,
              link: getPath("contact"),
              render: isLoggedIn
            },
            {
              text: I18n.t("drawercomponent.admin"),
              icon: <AdminPanelSettingsRoundedIcon />,
              link: getPath("admin"),
              render: isLoggedIn && isAdmin
            },
            {
              text: I18n.t("drawercomponent.login"),
              icon: <LoginIcon />,
              link: getPath(""),
              render: !isLoggedIn
            },
            {
              text: I18n.t("drawercomponent.logout"),
              icon: <LogoutIcon />,
              link: getPath("logout"),
              render: isLoggedIn
            }
          ].map((element, key) =>
            element.render && <NavLink to={element.link} style={{ textDecoration: "none", color: "inherit" }} onClick={handleDrawerClose}>
              <ListItem key={key} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText primary={element.text} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )}
        </List>
        <List></List>
        <List>
          <ListItemIcon></ListItemIcon>
          <LanguageSelector />
        </List>
        <Divider />
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
