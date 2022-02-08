import React from "react";
import {
    Box,
    Grid,
    TextField,
    Button,
    IconButton,
    InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
2
import { eventBus } from "../EventBus";
import { Events } from "../Events";
import { supabase } from "../SupabaseClient";
import { useAuth } from "../contexts/Auth";

import ButtonSendSticker  from "./ButtonSendSticker";


export default function SendMessageBox(props) {
    const { user } = useAuth();

    const [message, setMessage] = React.useState("  ");
    const addMessage = props.addMessage;

    function handleSendMessage(newMessageText) {
        eventBus.dispatch(Events.START_LOADING);

        const message = {
            from: user.user_metadata.user_name,
            messageText: newMessageText,
            sendDate: new Date(),
        };

        supabase
            .from("Message")
            .insert([message])
            .then(({ data }) => {
                addMessage(data[0]);
                setMessage("");
                eventBus.dispatch(Events.STOP_LOADING);
            });
    }

    return (
        <Box
            as="form"
            sx={{
                display: "flex",
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "10px",
            }}
        >
            <ButtonSendSticker />
            <TextField
                id="senMesssageText"
                value={message}
                multiline
                maxRows={4}
                fullWidth
                placeholder="Insira sua message aqui..."
                variant="filled"
                sx={{}}
                onChange={(event) => {
                    const valor = event.target.value;
                    setMessage(valor);
                }}
                onKeyPress={(event) => {
                    if (event.key === "Enter" && event.shiftKey) {
                        event.preventDefault();
                        handleSendMessage(message);
                    }
                }}
                // endAdornment={<InputAdornment position="end"></InputAdornment>}
            ></TextField>

            <IconButton
                aria-label="send message"
                onClick={(event) => {
                    event.preventDefault();
                    handleSendMessage(message);
                    document.querySelector("textarea").focus();
                }}
                edge="end"
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
}
