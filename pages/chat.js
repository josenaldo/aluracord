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
import ScrollableFeed from "react-scrollable-feed";
import { createClient } from "@supabase/supabase-js";
import appConfig from "../config.json";
import ProfileDialog from "../src/ProfileDialog.js";


/*
DESAFIOS:
- Como usuário, desejo clicar no avatar do usuário e ver um popup com os dados do usuário,
    como Nome completo, usuário do github, link para twitter (se tiver), bio do github (se houver) e
    link para o perfil do github.
*/

const SUPABASE_URL = "https://eeewrjggkkqbdtdrfvcu.supabase.co";
const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU3MjYzOCwiZXhwIjoxOTU5MTQ4NjM4fQ.3CDCiDIRmD7vU-YviNLhmXj83mk6L-QMjucyKFYjaZE";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const [message, setMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState([]);
    const [showLoad, setShowLoad] = React.useState(true);
    const [openProfileDialog, setOpenProfileDialog] = React.useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        setShowLoad(true);
        supabaseClient
            .from("Message")
            .select("*")
            .then(({ data }) => {
                setMessageList(data);
                setShowLoad(false);
            });
    }, []);

    function handleDeleteMessage(messageId) {
        setShowLoad(true);
        supabaseClient
            .from("Message")
            .delete()
            .match({ id: messageId })
            .then(({ data }) => {
                const result = messageList.filter((message) => {
                    return message.id !== messageId;
                });
                setMessageList(result);
                setShowLoad(false);
            });
    }

    function handleSendMessage(newMessageText) {
        setShowLoad(true);
        const message = {
            from: "josenaldo",
            messageText: newMessageText,
            sendDate: new Date(),
        };

        supabaseClient
            .from("Message")
            .insert([message])
            .then(({ data }) => {
                setMessageList([...messageList, data[0]]);
                setMessage("");
                setShowLoad(false);
            });
    }

    function handleOpenProfileDialog(username) {
        setShowLoad(true);

        const url = "https://api.github.com/users/" + username;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setOpenProfileDialog(true);
                setShowLoad(false);
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
                setShowLoad(false);
            });
    }

    function handleCloseProfileDialog() {
        setOpenProfileDialog(false);
        setUser(null);
    }

    return (
        <>
            <Head>
                <title>{appConfig.name} - Chat</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
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
                    <Header showLoad={showLoad} />
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
                        <MessageList
                            messages={messageList}
                            delete={handleDeleteMessage}
                            handleOpenProfileDialog={handleOpenProfileDialog}
                        />

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

            <ProfileDialog
                user={user}
                open={openProfileDialog}
                onClose={handleCloseProfileDialog}
            />
        </>
    );
}

function Header(props) {
    const showLoad = props.showLoad || false;
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

                <Image
                    src="/images/load-chat.svg"
                    alt="Carregando conversa"
                    styleSheet={{
                        opacity: showLoad ? "1" : "0",
                        transition: "opacity 0.5s",
                    }}
                />

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
            <MessageHeader
                message={message}
                delete={props.delete}
                handleOpenProfileDialog={props.handleOpenProfileDialog}
            />
            {/* Message de texto */}
            <Box
                styleSheet={{
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

    return (
        <Box
            styleSheet={{
                marginBottom: "8px",
                display: "flex",
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
                <MessageSender
                    message={message}
                    handleOpenProfileDialog={props.handleOpenProfileDialog}
                />
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
                onClick={(e) => {
                    props.handleOpenProfileDialog(message.from);
                }}
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
                    {new Intl.DateTimeFormat(
                        "pt-BR",
                        appConfig.dateFormat
                    ).format(new Date(message.sendDate))}
                </Text>
            </Box>
        </Box>
    );
}
