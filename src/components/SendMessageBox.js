import React from "react";
import {
    Box,
    Grid,
    OutlinedInput,
    Button,
    IconButton,
    InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import appConfig from "../../config.json";
import { eventBus } from "../EventBus.js";
import { Events } from "../Events.js";
import { supabase } from "../SupabaseClient.js";

export default function SendMessageBox(props) {
    const [message, setMessage] = React.useState("  ");
    const addMessage = props.addMessage;

    function handleSendMessage(newMessageText) {
        eventBus.dispatch(Events.START_LOADING);

        const message = {
            from: "josenaldo",
            messageText: newMessageText,
            sendDate: new Date(),
        };

        supabase
            .from("Message")
            .insert([message])
            .then(({ data }) => {
                // console.log("data" , data);
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
            }}
        >
            <OutlinedInput
                id="senMesssageText"
                value={message}
                required
                multiline
                maxRows={4}
                fullWidth
                placeholder="Insira sua message aqui..."
                variant="standard"
                sx={{}}
                onChange={(event) => {
                    const valor = event.target.value;
                    setMessage(valor);
                }}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        handleSendMessage(message);
                    }
                }}
                // endAdornment={<InputAdornment position="end"></InputAdornment>}
            ></OutlinedInput>

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
