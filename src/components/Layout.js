import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Text } from "@skynexui/components";

import {
    Box,
    Grid,
    Avatar,
    Card,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Stack,
} from "@mui/material";

import appConfig from "../../config.json";
import { supabase } from "../SupabaseClient.js";
import { eventBus } from "../EventBus.js";
import { Events } from "../Events.js";
import theme from "../Theme.js";

import ProfileDialog from "./ProfileDialog.js";
import Loading from "./Loading.js";
import ButtonSendSticker from "./ButtonSendSticker.js";
import SendMessageBox from "./SendMessageBox.js";
import ChatHeader from "./ChatHeader.js";
import MessageList from "./MessageList.js";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import { ThemeProvider } from "@mui/material/styles";

export default function Layout({ children }) {
    const [user, setUser] = React.useState(null);
    const router = useRouter();

    async function checkUser() {
        const user = supabase.auth.user();
        console.log(user);
        if (user === null) {
            router.push(`/`);
        }
        setUser(user);
    }

    async function signOut() {
        await supabase.auth.signOut();
        setUser(null);
        router.push(`/`);
    }

    React.useEffect(() => {
        eventBus.dispatch(Events.START_LOADING);

        checkUser();

        eventBus.dispatch(Events.STOP_LOADING);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: "64px 1fr",
                    margin: 0,
                    padding: 0,
                    gap: 0,
                    // gridAutoFlow: "row",
                }}
            >
                <ResponsiveAppBar theme={theme} signOut={signOut} user={user} sx={{gridArea: 'header'}} />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, { user: user })
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
