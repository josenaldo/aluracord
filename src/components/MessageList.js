import React from "react";

import { Box, IconButton, Avatar, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import ScrollableFeed from "react-scrollable-feed";

import appConfig from "../../config.json";

export default function MessageList(props) {
    const messages = props.messages;

    React.useEffect(() => {
        return () => {};
    }, []);

    return (
        <Box
            as="ul"
            sx={{
                overflow: "scroll",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: "16px",
                overflow: "auto",
            }}
        >
            <ScrollableFeed>
                {messages.map((message) => {
                    return (
                        <MessageItem
                            key={message.id}
                            message={message}
                            delete={props.delete}
                            handleOpenProfileDialog={
                                props.handleOpenProfileDialog
                            }
                        ></MessageItem>
                    );
                })}
            </ScrollableFeed>
        </Box>
    );
}

function MessageItem(props) {
    const message = props.message;
    const tag = props.tag || "li";

    return (
        // Message
        <Box
            as={tag}
            sx={{
                borderRadius: "5px",
                padding: "6px",
                marginBottom: "12px",
                marginRight: "10px",
                hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                },
            }}
        >
            {/* Message Header */}
            <MessageHeader
                message={message}
                delete={props.delete}
                handleOpenProfileDialog={props.handleOpenProfileDialog}
            />
            {/* Message de texto */}
            <Box
                sx={{
                    paddingLeft: "40px",
                    color: appConfig.theme.colors.neutrals["200"],
                }}
            >
                {message.messageText}
            </Box>
        </Box>
    );
}

function MessageHeader(props) {
    const message = props.message;
    const deleteMessage = props.delete;

    return (
        <Box
            sx={{
                marginBottom: "8px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Remetente da message */}
            <Box
                sx={{
                    width: "100%",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <MessageSender
                    message={message}
                    handleOpenProfileDialog={props.handleOpenProfileDialog}
                />

                <IconButton
                    aria-label="delete message"
                    onClick={(e) => {
                        deleteMessage(message.id);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

function MessageSender(props) {
    const message = props.message;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            {/* Foto do remetente */}
            <Avatar
                alt={message.from}
                src={`https://github.com/${message.from}.png`}
                sx={{
                    width: 32,
                    height: 32,
                    marginX: "8px",
                }}
                onClick={(e) => {
                    props.handleOpenProfileDialog(message.from);
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Remetente */}
                <Typography tag="strong">{message.from}</Typography>

                {/* Hora da message */}
                <Typography
                    sx={{
                        fontSize: "10px",
                        marginLeft: "8px",
                        fontWeight: "bold",
                    }}
                    variant="body1"
                >
                    {new Intl.DateTimeFormat(
                        "pt-BR",
                        appConfig.dateFormat
                    ).format(new Date(message.sendDate))}
                </Typography>
            </Box>
        </Box>
    );
}
