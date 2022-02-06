import React from "react";

import { Box, Paper } from "@mui/material";
import { supabase } from "../src/SupabaseClient.js";
import { eventBus } from "../src/EventBus.js";
import { Events } from "../src/Events.js";
import ProfileDialog from "../src/components/ProfileDialog.js";
import ButtonSendSticker from "../src/components/ButtonSendSticker.js";
import SendMessageBox from "../src/components/SendMessageBox.js";
import MessageList from "../src/components/MessageList.js";

export default function ChatPage(props) {
    const [messageList, setMessageList] = React.useState([]);
    const [openProfileDialog, setOpenProfileDialog] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);

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
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                height: "100%",
                maxWidth: "100%",
                maxHeight: "90vh",
                padding: "10px",
            }}
        >
            <Paper
                sx={{
                    display: "grid",
                    gridTemplateRows: "1fr minmax(84px, auto)",
                    gap: 0,
                    flex: 1,
                    height: "100%",
                    maxWidth: "95%",
                    maxHeight: "100%",
                    padding: 0,
                    bgcolor: "chat.background",
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
            </Paper>
            <ProfileDialog
                user={selectedUser}
                open={openProfileDialog}
                onClose={handleCloseProfileDialog}
            />
        </Box>
    );
}
