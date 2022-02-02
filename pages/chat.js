import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    Text,
    TextField,
    Image,
    Button,
    Icon,
} from "@skynexui/components";

import {
    Box,
    Grid,
    Avatar,
    CircularProgress,
} from "@mui/material";

import ScrollableFeed from "react-scrollable-feed";

import appConfig from "../config.json";
import { supabase } from "../src/SupabaaseClient.js";
import { eventBus } from "../src/EventBus.js";
import { Events } from "../src/Events.js";
import ProfileDialog from "../src/components/ProfileDialog.js";
import Loading from "../src/components/Loading.js";
import ButtonSendSticker from "../src/components/ButtonSendSticker.js";

export default function ChatPage(props) {

    const [message, setMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState([]);
    const [showLoad, setShowLoad] = React.useState(true);
    const [openProfileDialog, setOpenProfileDialog] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const router = useRouter();

    async function checkUser() {
        const user = supabase.auth.user();
        console.log(user);
        if (user === null) {
            router.push(`/`);
        }
        setUser(user);
    }

    async function signOut() {
        await supabase.auth.signOut();
        setUser(null);
        router.push(`/`);
    }

    React.useEffect(() => {
        eventBus.dispatch(Events.START_LOADING);

        checkUser();

        console.log("Carregando mensagens");
        supabase
            .from("Message")
            .select("*")
            .then(({ data }) => {
                setMessageList(data);
                eventBus.dispatch(Events.STOP_LOADING);
            });

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
                setMessageList([...messageList, data[0]]);
                setMessage("");
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
                sx={{
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
                    sx={{
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
                    <Header showLoad={showLoad} signOut={signOut} user={user} />
                    <Box
                        sx={{
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
                            sx={{
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
                user={selectedUser}
                open={openProfileDialog}
                onClose={handleCloseProfileDialog}
            />
        </>
    );
}

function Header(props) {
    const showLoad = props.showLoad || false;
    const user = props.user;
    const signOut = props.signOut;

    return (
        <Box
            sx={{
                marginBottom: "10px",
            }}
        >
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={4}
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <Text
                        variant="heading5"
                        // styleSheet={{ display: "flex", alignItems: "center" }}
                    >
                        Discórdia Chat
                    </Text>
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* {showLoad ? <CircularProgress color="secondary" /> : ""} */}
                    <Loading color="secondary" />
                </Grid>

                <Grid
                    item
                    xs={4}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                    }}
                >
                    {user ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                alt={user.user_metadata.name}
                                src={user.user_metadata.avatar_url}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    // marginX: "5px",
                                }}
                            />
                            <Text
                                styleSheet={
                                    {
                                        marginX: "5px",
                                    }
                                }
                            >
                                {user.user_metadata.user_name}
                            </Text>
                            <Button
                                variant="tertiary"
                                colorVariant="neutral"
                                label="Logout"
                                onClick={(event) => {
                                    signOut();
                                }}
                            />
                        </Box>
                    ) : (
                        "Não logado"
                    )}
                </Grid>
            </Grid>

            {/* <Box
                sx={{
                    width: "100%",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >



            </Box> */}
        </Box>
    );
}

function SendMessageBox(props) {
    <Box
        as="form"
        sx={{
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
            sx={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
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
            sx={{
                color: appConfig.theme.colors.neutrals["100"],
                backgroundColor: appConfig.theme.colors.primary["500"],
                transition: "0.5s",
                marginBottom: "6px",
                focus: {
                    backgroundColor: appConfig.theme.colors.primary["600"],
                },
                hover: {
                    backgroundColor: appConfig.theme.colors.primary["400"],
                },
            }}
        />
    </Box>;
}

function MessageList(props) {
    const messages = props.messages;

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
            sx={{
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
                sx={{
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
