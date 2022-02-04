import * as React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Divider,
    Avatar,
    Button,
    Tooltip,
    ListItemIcon,
    Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import appConfig from "../../config.json";

const ResponsiveAppBar = (props) => {
    const user = props.user;
    const theme = props.theme;
    const signOut = props.signOut;

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [darkTheme, setDarkTheme] = React.useState(
        theme.palette.mode === "dark"
    );

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChangedarkTheme = (event) => {
        setDarkTheme(!darkTheme);
        theme.palette.mode = darkTheme ? "light" : "dark";
    };

    return (
        <AppBar position="relative">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            flexGrow: 1,
                            display: "flex",
                        }}
                    >
                        {appConfig.name}
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Abrir menu do usuário">
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenUserMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={(event) => {}}>
                                <ListItemIcon>
                                    {darkTheme ? (
                                        <DarkModeIcon fontSize="small" />
                                    ) : (
                                        <LightModeIcon fontSize="small" />
                                    )}
                                </ListItemIcon>
                                Tema Dark
                                <Switch
                                    checked={darkTheme}
                                    onChange={handleChangedarkTheme}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            </MenuItem>

                            {user ? (
                                <MenuItem>
                                    <ListItemIcon>
                                        <Avatar
                                            src={user.user_metadata.avatar_url}
                                            sx={{
                                                width: 20,
                                                height: 20,
                                            }}
                                        />
                                    </ListItemIcon>
                                    {user.user_metadata.name}
                                </MenuItem>
                            ) : (
                                ""
                            )}
                            <Divider />
                            {user ? (
                                <MenuItem
                                    onClick={(event) => {
                                        signOut();
                                    }}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            ) : (
                                ""
                            )}
                        </Menu>
                    </Box>
                </Toolbar>

            </Container>
        </AppBar>
    );
};

export default ResponsiveAppBar;
