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


export default function SendMessageBox({sendMessage}) {
    const { user } = useAuth();

    const [message, setMessage] = React.useState("  ");

    function handleSendMessage() {
        sendMessage(message);
        document.querySelector("textarea").focus();
        setMessage("");
    }

    function handleSendSticker(sticker) {
        sendMessage(`:sticker: ${sticker}` );
        document.querySelector("textarea").focus();
    }

    return (
        <Box
            as="form"
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
                padding: "10px",
            }}
        >
            <ButtonSendSticker onStickerClick={handleSendSticker}/>

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
                        handleSendMessage();
                    }
                }}
                // endAdornment={<InputAdornment position="end"></InputAdornment>}
            ></TextField>

            <ButtonSendMessage handleSendMessage={handleSendMessage}/>
        </Box>
    );
}

function ButtonSendMessage({handleSendMessage}) {
    return (
        <Box>
            <IconButton
                aria-label="send message"
                onClick={handleSendMessage}
                // edge="end"
            >
                <SendIcon fontSize="large" />
            </IconButton>
        </Box>
    );
}