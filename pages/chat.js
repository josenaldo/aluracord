import {
    Box,
    Text,
    TextField,
    Image,
    Button,
    Icon,
} from "@skynexui/components";
import React from "react";
import Head from "next/head";
import appConfig from "../config.json";
import { v4 as uuidv4 } from "uuid";


export default function ChatPage() {

    const [message, setMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState([]);

    function handleDeleteMessage(messageId) {
        const result = messageList.filter((message) => {
            return message.id !== messageId;
        });
        setMessageList(result);
    }

    function handleSendMessage(newMessageText) {
        const message = {
            id: uuidv4(),
            from: "josenaldo",
            text: newMessageText,
            sendDate: new Date(),
        };
        setMessageList([message, ...messageList]);
        setMessage("");
    }

    return (
        <>
            <Head>
                <title>{appConfig.name} - Chat</title>
            </Head>
            <Box
                styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: "url(" + appConfig.theme.background + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                    color: appConfig.theme.colors.neutrals["000"],
                }}
            >
                <Box
                    styleSheet={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
                        borderRadius: "5px",
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        height: "100%",
                        maxWidth: "95%",
                        maxHeight: "95vh",
                        padding: "32px",
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            position: "relative",
                            display: "flex",
                            flex: 1,
                            height: "80%",
                            backgroundColor:
                                appConfig.theme.colors.neutrals[600],
                            flexDirection: "column",
                            borderRadius: "5px",
                            padding: "16px",
                        }}
                    >
                        <MessageList messages={messageList} delete={handleDeleteMessage}/>

                        <Box
                            as="form"
                            styleSheet={{
                                display: "flex",
                                position: "relative",
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <TextField
                                value={message}
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
                                placeholder="Insira sua message aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: "100%",
                                    border: "0",
                                    resize: "none",
                                    borderRadius: "5px",
                                    padding: "6px 8px",
                                    backgroundColor:
                                        appConfig.theme.colors.neutrals[800],
                                    marginRight: "12px",
                                    color: appConfig.theme.colors.neutrals[200],
                                    height: "100%",
                                }}
                            ></TextField>
                            <Button
                                type="submit"
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleSendMessage(message);
                                    document.querySelector("textarea").focus();
                                }}
                                iconName="arrowRight"
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[
                                        "100"
                                    ],
                                    backgroundColor:
                                        appConfig.theme.colors.primary["500"],
                                    transition: "0.5s",
                                    marginBottom: "6px",
                                    focus: {
                                        backgroundColor:
                                            appConfig.theme.colors.primary[
                                                "600"
                                            ],
                                    },
                                    hover: {
                                        backgroundColor:
                                            appConfig.theme.colors.primary[
                                                "400"
                                            ],
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

function Header() {
    return (
        <>
            <Box
                styleSheet={{
                    width: "100%",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text variant="heading5">Chat</Text>
                <Button
                    variant="tertiary"
                    colorVariant="neutral"
                    label="Logout"
                    href="/"
                />
            </Box>
        </>
    );
}

function MessageList(props) {
    const messages = props.messages;
    return (
        <Box
            as="ul"
            styleSheet={{
                overflow: "scroll",
                display: "flex",
                flexDirection: "column-reverse",
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: "16px",
                overflow: "auto",
            }}
        >
            {messages.map((message) => {
                return (
                    <MessageItem
                        key={message.id}
                        message={message}
                        delete={props.delete}
                    ></MessageItem>
                );
            })}
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
            styleSheet={{
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
            <MessageHeader message={message} delete={props.delete} />
            {/* Message de texto */}
            <Box
                styleSheet={{
                    paddingLeft: "40px",
                    color: appConfig.theme.colors.neutrals["200"],
                }}
            >
                {message.text}
            </Box>
        </Box>
    );
}

function MessageHeader(props) {
    const message = props.message;

    return (
        <Box
            styleSheet={{
                marginBottom: "8px",
                display: "block",
                flexDirection: "column",
            }}
        >
            {/* Remetente da message */}
            <Box
                styleSheet={{
                    width: "100%",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <MessageSender message={message} />
                <Icon
                    name={"FaTrash"}
                    styleSheet={{
                        marginLeft: "15px",
                        width: "15px",
                        height: "15px",
                        color: appConfig.theme.colors.neutrals["400"],
                        focus: {
                            color: appConfig.theme.colors.primary["600"],
                        },
                        hover: {
                            color: appConfig.theme.colors.primary["400"],
                        },
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={(e) => {
                        props.delete(message.id);
                    }}
                />
            </Box>
        </Box>
    );
}

function MessageSender(props) {
    const message = props.message;

    return (
        <Box
            styleSheet={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            {/* Foto do remetente */}
            <Image
                styleSheet={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                }}
                src={`https://github.com/${message.from}.png`}
            />
            <Box
                styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Remetente */}
                <Text tag="strong">{message.from}</Text>

                {/* Hora da message */}
                <Text
                    styleSheet={{
                        fontSize: "10px",
                        marginLeft: "8px",

                        color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                >
                    {new Intl.DateTimeFormat('pt-BR', appConfig.dateFormat).format(message.sendDate)}
                </Text>
            </Box>
        </Box>
    );
}
