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
import ScrollableFeed from "react-scrollable-feed";
import { createClient } from "@supabase/supabase-js";

/*
DESAFIOS:
- Como usuário, desejo ver um loading ao abrir o chat, enquanto as mensagens são careegadas
- Como usuário, desejo ver um load ao enviar uma mensagem, enquanto ela é enviada
- Como usuário, desejo ver um load ao remover mensagens, enquanto ela é removida
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
    const [showLoad, setShowLoad] = React.useState(false);

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
            <MessageHeader message={message} delete={props.delete} />
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
                    {new Intl.DateTimeFormat(
                        "pt-BR",
                        appConfig.dateFormat
                    ).format(new Date(message.sendDate))}
                </Text>
            </Box>
        </Box>
    );
}
