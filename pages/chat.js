import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import Head from "next/head";
import appConfig from '../config.json';

export default function ChatPage() {
    /*
        Desafio:

        TODO: Por um botão de enviar no campo de texto
        TODO: Apagar uma mensagem do chat
            Dica: usar unção filter
    */

    const [mensagem, setMensagem] = React.useState("");
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagens.length + 1,
            de: 'josenaldo',
            texto: novaMensagem,
        }
        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens
        ]);
        setMensagem("");
    }
    return (
        <>
            <Head>
                <title>{appConfig.name} - Chat</title>
            </Head>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: "url(" + appConfig.theme.background + ")",
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    color: appConfig.theme.colors.neutrals['000']
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        height: '100%',
                        maxWidth: '95%',
                        maxHeight: '95vh',
                        padding: '32px',
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: appConfig.theme.colors.neutrals[600],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >

                        <MessageList mensagens={listaDeMensagens} />

                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                value={mensagem}
                                onChange={event => {
                                    const valor = event.target.value;
                                    setMensagem(valor);
                                }}
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        handleNovaMensagem(mensagem);
                                    }
                                }}
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{
                width: '100%',
                marginBottom:
                '16px', display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
                }}
            >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    console.log('MessageList', props.mensagens);

    const mensagens = props.mensagens;
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {mensagens.map(mensagem => {
                return (<MessageItem key={mensagem.id} mensagem={mensagem}></MessageItem>)
            })}


        </Box>
    )


}

function MessageItem(props) {
    const mensagem = props.mensagem
    const tag = props.tag || "li";

    return (
        <Text
            tag={tag}
            styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                }
            }}
        >
            <Box
                styleSheet={{
                    marginBottom: '8px',
                }}
            >
                <Image
                    styleSheet={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '8px',
                    }}
                    src={`https://github.com/${mensagem.de}.png`}
                />
                <Text tag="strong">
                    {mensagem.de}
                </Text>
                <Text
                    styleSheet={{
                        fontSize: '10px',
                        marginLeft: '8px',
                        color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                >
                    {(new Date().toLocaleDateString())}
                </Text>
            </Box>
            {mensagem.texto}
        </Text>
    )
}