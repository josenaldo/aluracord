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

import appConfig from "../config.json";
import { supabase } from "../src/SupabaseClient.js";
import { eventBus } from "../src/EventBus.js";
import { Events } from "../src/Events.js";
import ProfileDialog from "../src/components/ProfileDialog.js";
import Loading from "../src/components/Loading.js";
import ButtonSendSticker from "../src/components/ButtonSendSticker.js";
import SendMessageBox from "../src/components/SendMessageBox.js";
import ChatHeader from "../src/components/ChatHeader.js";
import MessageList from "../src/components/MessageList.js";
import Layout from "../src/components/Layout.js";

export default function ChatPage(props) {
    const [messageList, setMessageList] = React.useState([]);
    const [openProfileDialog, setOpenProfileDialog] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const router = useRouter();

    setMessageList.bind(this);

    function addMessage(message) {
        setMessageList([...messageList, message]);
    }

    React.useEffect(() => {
        eventBus.dispatch(Events.START_LOADING);

        console.log("Carregando mensagens");

        supabase
            .from("Message")
            .select("*")
            .then(({ data }) => {
                setMessageList(data);
                eventBus.dispatch(Events.STOP_LOADING);
            });

        return () => {
            eventBus.remove(Events.SEND_MESSAGE);
        };
    }, []);

    function handleDeleteMessage(messageId) {
        eventBus.dispatch(Events.START_LOADING);

        supabase
            .from("Message")
            .delete()
            .match({ id: messageId })
            .then(({ data }) => {
                const result = messageList.filter((message) => {
                    return message.id !== messageId;
                });
                setMessageList(result);
                eventBus.dispatch(Events.STOP_LOADING);
            });
    }

    function handleOpenProfileDialog(username) {
        eventBus.dispatch(Events.START_LOADING);

        const url = "https://api.github.com/users/" + username;
        console.log(url);
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then((data) => {
                console.log("dados do github: ", data);
                setSelectedUser(data);
                setOpenProfileDialog(true);
                eventBus.dispatch(Events.STOP_LOADING);
            })
            .catch((error) => {
                console.log(error);
                if (error.message === "403") {
                    // setFullname("Github não quer falar com você agora. Volta mais tarde.");
                } else if (error.message === "404") {
                    // setFullname("Nem sei de quem você tá falando.");
                } else {
                    // setFullname("Pronto. Ferrou com tudo. Tá satisfeito?");
                }
                setSelectedUser(null);
                eventBus.dispatch(Events.STOP_LOADING);
            });
    }

    function handleCloseProfileDialog() {
        setOpenProfileDialog(false);
        setSelectedUser(null);
    }

    return (
        <>
            <Layout>
                <Card
                    sx={{
                        display: "grid",
                        gap: 0,
                        flex: 1,
                        height: "100%",
                        maxWidth: "95%",
                        maxHeight: "95vh",
                        padding: "32px",
                    }}
                >
                    {/* <ChatHeader signOut={signOut} user={user} /> */}
                    <MessageList
                        sx={{ flexGrow: 3 }}
                        messages={messageList}
                        delete={handleDeleteMessage}
                        handleOpenProfileDialog={handleOpenProfileDialog}
                    />
                    <SendMessageBox addMessage={addMessage} />
                </Card>


            <ProfileDialog
                user={selectedUser}
                open={openProfileDialog}
                onClose={handleCloseProfileDialog}
            />
            </Layout>
        </>
    );
}
