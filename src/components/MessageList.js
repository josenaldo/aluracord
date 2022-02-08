import React from "react";

import {
    Box,
    IconButton,
    Avatar,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ScrollableFeed from "react-scrollable-feed";

import { useAuth } from "../contexts/Auth";
import appConfig from "../../config.json";

export default function MessageList(props) {
    const messages = props.messages;
    const palette = useTheme().palette;
    const scroll =  useTheme().scroll;

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
                "& .feedScroll": scroll,
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
    const { isCurrentUser } = useAuth();

    const palette = useTheme().palette;

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
