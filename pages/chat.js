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

    const [mensagem, setMensagem] = React.useState("");
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    function handleDeleteMessage(messageId) {
        const result = listaDeMensagens.filter((mensagem) => {
            return mensagem.id !== messageId;
        });
        setListaDeMensagens(result);
    }

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: uuidv4(),
            de: "josenaldo",
            texto: novaMensagem,
        };
        setListaDeMensagens([mensagem, ...listaDeMensagens]);
        setMensagem("");
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
                        <MessageList mensagens={listaDeMensagens} delete={handleDeleteMessage}/>

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
                                value={mensagem}
                                onChange={(event) => {
                                    const valor = event.target.value;
                                    setMensagem(valor);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        handleNovaMensagem(mensagem);
                                    }
                                }}
                                placeholder="Insira sua mensagem aqui..."
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
                                    handleNovaMensagem(mensagem);
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
    const mensagens = props.mensagens;
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
            {mensagens.map((mensagem) => {
                return (
                    <MessageItem
                        key={mensagem.id}
                        mensagem={mensagem}
                        delete={props.delete}
                    ></MessageItem>
                );
            })}
        </Box>
    );
}

function MessageItem(props) {
    const mensagem = props.mensagem;
    const tag = props.tag || "li";

    return (
        // Mensagem
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
            <MessageHeader mensagem={mensagem} delete={props.delete} />
            {/* Mensagem de texto */}
            <Box
                styleSheet={{
                    paddingLeft: "40px",
                }}
            >
                {mensagem.texto}
            </Box>
        </Box>
    );
}

function MessageHeader(props) {
    const mensagem = props.mensagem;

    return (
        <Box
            styleSheet={{
                marginBottom: "8px",
                display: "block",
                flexDirection: "column",
            }}
        >
            {/* Remetente da mensagem */}
            <Box
                styleSheet={{
                    width: "100%",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <MessageSender mensagem={mensagem} />
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
                        props.delete(mensagem.id);
                    }}
                />
            </Box>
        </Box>
    );
}

function MessageSender(props) {
    const mensagem = props.mensagem;

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
                src={`https://github.com/${mensagem.de}.png`}
            />
            <Box
                styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Remetente */}
                <Text tag="strong">{mensagem.de}</Text>

                {/* Hora da mensagem */}
                <Text
                    styleSheet={{
                        fontSize: "10px",
                        marginLeft: "8px",

                        color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                >
                    {new Date().toLocaleDateString()}
                </Text>
            </Box>
        </Box>
    );
}
