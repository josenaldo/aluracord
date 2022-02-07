import React from "react";

import {
    Box,
    IconButton,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ScrollableFeed from "react-scrollable-feed";

import { useAuth } from "../contexts/Auth";
import appConfig from "../../config.json";

export default function MessageList(props) {
    const messages = props.messages;
    const palette = useTheme().palette;
    const isDarkTheme = palette.mode === "dark";

    const darkScroll = {
        "&::-webkit-scrollbar": {
            width: "8px",
        },

        "&::-webkit-scrollbar-track": {
            bgcolor: `${palette.grey["800"]}`,
            borderRadius: "10px",
        },

        "&::-webkit-scrollbar-thumb": {
            bgcolor: `${palette.grey["700"]}`,
            borderRadius: "10px",
        },

        "&::-webkit-scrollbar-thumb:hover": {
            bgcolor: `${palette.grey["500"]}`,
        },
    };

    const lightScroll = {
        "&::-webkit-scrollbar": {
            width: "8px",
        },

        "&::-webkit-scrollbar-track": {
            bgcolor: `${palette.grey["300"]}`,
            borderRadius: "10px",
        },

        "&::-webkit-scrollbar-thumb": {
            bgcolor: `${palette.grey["400"]}`,
            borderRadius: "10px",
        },

        "&::-webkit-scrollbar-thumb:hover": {
            bgcolor: `${palette.grey["500"]}`,
        },
    };

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
                overflow: "auto",
                padding: 0,
                "& .feedScroll": isDarkTheme ? darkScroll : lightScroll,
            }}
        >
            <ScrollableFeed className="feedScroll">
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
    const deleteMessage = props.delete;
    const { user, isCurrentUser } = useAuth();

    const palette = useTheme().palette;
    const isDarkTheme = palette.mode === "dark";

    const arrowLeft = {
        right: "100%",
        top: 5,
        borderTopWidth: 0,
        borderTopColor: "transparent",
        borderRightWidth: 10,
        borderRightColor: "rgb(32,166,181)",
        borderBottomWidth: 10,
        borderBottomColor: "transparent",
        borderLeftWidth: 0,
        borderLeftColor: "transparent",
    };
    const arrowRight = {
        left: "100%",
        top: 5,
        borderTopWidth: 10,
        borderTopColor: "rgb(32,166,181)",
        borderRightWidth: 10,
        borderRightColor: "transparent",
        borderBottomWidth: 0,
        borderBottomColor: "transparent",
        borderLeftWidth: 0,
        borderLeftColor: "transparent",
    };

    // function isCurrentUser(message) {
    //     return message.from === user.user_metadata.user_name;
    // }

    return (
        // Message
        <Box
            as={tag}
            sx={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: isCurrentUser(message.from)
                    ? "row-reverse"
                    : "row",
                // gridTemplateColumns: "1fr 6fr",
                margin: "20px",
                hover: {
                    backgroundColor: "grey.A200",
                },
            }}
        >
            {/* Message Header */}

            {/* Message de texto */}

            <Box
                sx={{
                    width: "auto",
                    display: "flex",
                    flexDirection: isCurrentUser(message.from)
                        ? "row-reverse"
                        : "row",
                    // alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <MessageHeader
                    message={message}
                    delete={props.delete}
                    handleOpenProfileDialog={props.handleOpenProfileDialog}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: isCurrentUser(message.from)
                                ? "row-reverse"
                                : "row",
                            alignItems: "flex-start",
                            // width: "auto",
                            color: "chat.chatBubble.contrastText",
                            bgcolor: isCurrentUser(message.from)
                                ? "chat.chatBubble.user"
                                : "chat.chatBubble.other",
                            borderRadius: "5px",
                            // padding: "10px 20px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1,
                                color: "inherit",
                                paddding: "10px",
                                whiteSpace: "pre-line",
                                width: "auto",
                                height: "100%",
                                paddingY: "10px",
                                paddingLeft: isCurrentUser(message.from)
                                    ? "0px"
                                    : "20px",
                                paddingRight: isCurrentUser(message.from)
                                    ? "20px"
                                    : "0px",
                            }}
                        >
                            <Typography variant="body1">
                                {message.messageText}
                            </Typography>
                        </Box>
                        {/* Hora da message */}
                        <IconButton
                            aria-label="delete message"
                            sx={{
                                color: isCurrentUser(message.from)
                                    ? "chat.chatBubble.deleteButtonUser"
                                    : "chat.chatBubble.deleteButtonOther",
                            }}
                            onClick={(e) => {
                                deleteMessage(message.id);
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <MessageDate message={message} />
                </Box>
            </Box>
        </Box>
    );
}

function MessageHeader(props) {
    const message = props.message;

    return (
        <Box
            sx={{
                marginX: "10px",
                display: "block",
            }}
        >
            <MessageSender
                message={message}
                handleOpenProfileDialog={props.handleOpenProfileDialog}
            />
        </Box>
    );
}

function MessageSender(props) {
    const message = props.message;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "chat.sender.username",
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
            {/* Remetente */}
            <Typography tag="strong">@{message.from}</Typography>
        </Box>
    );
}

function MessageDate(props) {
    const message = props.message;
    const { isCurrentUser } = useAuth();

    return (
        <Typography
            sx={{
                fontSize: "10px",
                marginLeft: "8px",
                fontWeight: "bold",
                display: "block",
                marginTop: "5px",
                marginLeft: isCurrentUser(message.from) ? "2px" : "0",
                marginRight: isCurrentUser(message.from) ? "0" : "2px",
                padding: 0,
                textAlign: isCurrentUser(message.from) ? "left" : "right",
                color: "chat.sendDate",
            }}
            variant="body1"
        >
            {new Intl.DateTimeFormat("pt-BR", appConfig.dateFormat).format(
                new Date(message.sendDate)
            )}
        </Typography>
    );
}
