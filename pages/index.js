import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";

function Titulo(props) {
    const Tag = props.tag || "h1";
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.primary["500"]};
                    font-size: 48px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

function Photo(props) {
    const username = props.children;
    return (
        <>
            <Image
                styleSheet={{
                    borderRadius: "50%",
                    marginBottom: "16px",
                    border: '5px solid',
                    borderColor: appConfig.theme.colors.primary[800],
                }}

                src={props.avatarUrl}
                alt={props.fullname}
            />
            <Text
                variant="body4"
                styleSheet={{
                    color: appConfig.theme.colors.neutrals["000"],
                    backgroundColor:
                        appConfig.theme.colors.primary["700"],
                    padding: "10px 15px",
                    borderRadius: "1000px",
                    textAlign: "center"
                }}
            >
                {props.fullname || props.login}
            </Text>
        </>
    )
}

export default function PaginaInicial() {
    const [username, setUsername] = React.useState("");
    const [showAvatar, setShowAvatar] = React.useState(false);
    const [avatarURL, setAvatarURL] = React.useState(false);
    const [fullname, setFullname] = React.useState("");
    const [login, setLogin] = React.useState("");
    const roteamento = useRouter();

    return (
        <>
            <Head>
                <title>{appConfig.name}</title>
            </Head>

            <Box
                styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: "url("+ appConfig.theme.background + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                }}
            >
                <Box
                    styleSheet={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        width: "100%",
                        maxWidth: "700px",
                        borderRadius: "5px",
                        padding: "32px",
                        margin: "16px",
                        boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
                        backgroundColor: appConfig.theme.colors.neutrals["000"],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function(event){
                            event.preventDefault();
                            console.log('Alguém submeteu o form')
                            // Ativando o roteamento
                            roteamento.push('/chat')
                        }}
                        styleSheet={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: "100%", sm: "50%" },
                            textAlign: "center",
                            marginBottom: "32px",
                        }}
                    >
                        <Titulo tag="h2">{appConfig.name}</Titulo>
                        <Text
                            variant="body3"
                            styleSheet={{
                                marginBottom: "32px",
                                color: appConfig.theme.colors.primary[700],
                            }}
                        >
                            {appConfig.description}
                        </Text>

                        <TextField
                            value={username}
                            onChange={function (event) {
                                console.log('usuario digitou', event.target.value);
                                // Onde está o valor
                                const valor = event.target.value;
                                // Trocar o valor da variável através do react e avisa quem precisa
                                setUsername(valor)

                                if(valor.length >= 3) {
                                    const url = "https://api.github.com/users/" + valor
                                    fetch(url)
                                    .then(response => {
                                        if (!response.ok) {
                                            console.log(response);
                                            throw new Error(response.status);
                                        }
                                        return response.json();
                                    })
                                    .then(data => {
                                        console.log(data);
                                        setAvatarURL(data.avatar_url);
                                        setLogin(data.login);
                                        setFullname(data.name);
                                        setShowAvatar(true);
                                    }).catch(error => {
                                            console.log(error);
                                            if(error.message === "403") {
                                                setAvatarURL('/images/load.svg');
                                                setLogin('Aguarde');
                                                setFullname("Github não quer falar com você agora. Volta mais tarde.");
                                            }else if(error.message  === "404") {
                                                setAvatarURL('/images/blank.svg');
                                                setLogin('Não Encontrado');
                                                setFullname("Nem sei de quem você tá falando.");
                                            }else {
                                                setAvatarURL('/images/error.svg');
                                                setLogin('ERRO');
                                                setFullname("Pronto. Ferrou com tudo. Tá satisfeito?");
                                            }
                                            setShowAvatar(true);
                                        }
                                    );
                                }else{
                                    setShowAvatar(false)
                                }


                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor:
                                        appConfig.theme.colors.neutrals[200],
                                    mainColor:
                                        appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight:
                                        appConfig.theme.colors.primary[500],
                                    backgroundColor:
                                        appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            label="Entrar"
                            fullWidth
                            buttonColors={{
                                contrastColor:
                                    appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary["500"],
                                mainColorLight:
                                    appConfig.theme.colors.primary["400"],
                                mainColorStrong:
                                    appConfig.theme.colors.primary["600"],
                            }}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "200px",
                            padding: "16px",
                            backgroundColor:
                                appConfig.theme.colors.primary["600"],
                            border: "1px solid",
                            borderRadius: "10px",
                            flex: 1,
                            minHeight: "240px",
                        }}
                    >
                        {showAvatar ? <Photo avatarUrl={avatarURL} fullname={fullname} login={login}/> : ""}
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
