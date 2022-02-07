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
                margin: 0,
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
        ":before": {
            content: `""`,
            width: "5px",
            height: "5px",
            position: "absolute",
            borderLeft: "10px solid",
            borderLeftColor: "chat.chatBubble.user",
            borderRight: "10px solid transparent",
            borderTop: "10px solid",
            borderTopColor: "chat.chatBubble.user",
            borderBottom: "10px solid transparent",
            right: "-20px",
            top: "16px",
        },
    };

    const arrowRight = {
        ":before": {
            content: `""`,
            width: "5px",
            height: "5px",
            position: "absolute",
            borderLeft: "10px solid transparent",
            borderRight: "10px solid",
            borderRightColor: "chat.chatBubble.other",
            borderTop: "10px solid",
            borderTopColor: "chat.chatBubble.other",
            borderBottom: "10px solid transparent",
            left: "-20px",
            top: "16px",
        },
    };

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
                marginX: "10px",
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
                <Avatar
                    alt={message.from}
                    src={`https://github.com/${message.from}.png`}
                    sx={{
                        width: 32,
                        height: 32,
                        marginLeft: isCurrentUser(message.from)
                            ? "22px"
                            : "0px",
                        marginRight: isCurrentUser(message.from)
                            ? "0px"
                            : "22px",
                    }}
                    onClick={(e) => {
                        props.handleOpenProfileDialog(message.from);
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: isCurrentUser(message.from)
                                ? "row-reverse"
                                : "row",
                            alignItems: "flex-start",
                            color: "chat.chatBubble.contrastText",
                            bgcolor: isCurrentUser(message.from)
                                ? "chat.chatBubble.user"
                                : "chat.chatBubble.other",
                            borderRadius: "5px",
                            "& .bubble": isCurrentUser(message.from) ? arrowLeft : arrowRight,
                        }}
                    >
                        <Box
                            className="bubble"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
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
                            {!isCurrentUser(message.from) ? (
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        marginBottom: "2px",
                                    }}
                                >
                                    @{message.from}
                                </Typography>
                            ) : (
                                ""
                            )}

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
            {/* <MessageSender
                message={message}
                handleOpenProfileDialog={props.handleOpenProfileDialog}
            /> */}
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
            {/* <Typography tag="strong">@{message.from}</Typography> */}
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
