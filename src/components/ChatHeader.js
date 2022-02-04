import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from '@mui/icons-material/Logout';


export default function ChatHeader(props) {
    const user = props.user;
    const signOut = props.signOut;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid
                            item
                            xs={4}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Typography variant="h6" component="div">
                                Discórdia Chat
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "50px",
                            }}
                        >
                        </Grid>

                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                            }}
                        >
                            {user ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        alt={user.user_metadata.name}
                                        src={user.user_metadata.avatar_url}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            marginX: "5px",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            marginX: "5px",
                                        }}
                                    >
                                        {user.user_metadata.user_name}
                                    </Typography>
                                    <Button
                                    variant="contained"
                                        onClick={(event) => {
                                            signOut();
                                        }}
                                        endIcon={<LogoutIcon />}
                                    >
                                        Sair
                                    </Button>
                                </Box>
                            ) : (
                                "Não logado"
                            )}
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
