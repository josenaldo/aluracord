import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import PropTypes from "prop-types";
import { supabase } from "../src/SupabaaseClient.js";
import Alert from "@mui/material/Alert";

import appConfig from "../config.json";

export default function PaginaInicial() {
    const [user, setUser] = React.useState(null);

    return (
        <>
            <Head>
                <title>{appConfig.name}</title>
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
                }}
            >
                <Box
                    styleSheet={{
                        display: "flex",
                        justifyContent: "space-evenly",
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
                        styleSheet={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            width: { xs: "100%", sm: "50%" },
                        }}
                    >
                        <Title
                            title={appConfig.name}
                            subTitle={appConfig.description}
                        />

                        <LoginForm handleSelectUser={setUser} />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: "flex",
                            // flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "200px",
                            width: "200px",
                            padding: "16px",
                            backgroundColor:
                                appConfig.theme.colors.primary["600"],
                            border: "1px solid",
                            borderRadius: "10px",
                            flex: 1,
                            minHeight: "240px",
                        }}
                    >
                        {user ? <Photo user={user} /> : ""}
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}

function Title(props) {
    const tag = props.tag || "h1";
    const title = props.title;
    const subTitle = props.subTitle;
    return (
        <Box>
            <Text
                as={tag}
                styleSheet={{
                    color: appConfig.theme.colors.primary["500"],
                    fontSize: "48px",
                    fontWeight: "600",
                }}
            >
                {title}
            </Text>
            <SubTitle>{subTitle}</SubTitle>
        </Box>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
};

function SubTitle(props) {
    const tag = props.tag || "h2";
    return (
        <Text
            as={tag}
            styleSheet={{
                color: appConfig.theme.colors.primary[700],
            }}
        >
            {props.children}
        </Text>
    );
}

function LoginForm(props) {
    const handleSelectUser = props.handleSelectUser;

    const [errorMessage, setErrorMessage] = React.useState(null);
    const [warningMessage, setWarningMessage] = React.useState(null);

    const [user, setUser] = React.useState(null);

    const router = useRouter();

    React.useEffect(() => {
        /* when the app loads, check to see if the user is signed in */
        checkUser();
        /* check user on OAuth redirect */
        window.addEventListener("hashchange", function () {
            checkUser();
        });
    }, []);

    async function checkUser() {
        /* if a user is signed in, update local state */
        const user = supabase.auth.user();
        console.log(user);
        setUser(user);
        handleSelectUser(user);
    }

    async function signInWithGithub() {
        /* authenticate with GitHub */
        await supabase.auth.signIn({
            provider: "github",
        });
    }

    async function signOut() {
        /* sign the user out */
        await supabase.auth.signOut();
        setUser(null);
        handleSelectUser(null);
    }

    // function searchUser() {
    //     if (username.length >= 3) {
    //         const url = "https://api.github.com/users/" + username;
    //         fetch(url)
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     throw new Error(response.status);
    //                 }
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 setUser(data);
    //                 handleSelectUser(data);
    //                 setErrorMessage(null);
    //                 setWarningMessage(null);
    //             })
    //             .catch((error) => {
    //                 if (error.message === "403") {
    //                     setWarningMessage(
    //                         "Github não quer falar com você agora. Volta mais tarde."
    //                     );
    //                     setUser(null);
    //                     handleSelectUser(null);
    //                 } else if (error.message === "404") {
    //                     setErrorMessage(
    //                         "Não faço a mínima ideia de quem seja essa criatura!"
    //                     );
    //                     setUser(null);
    //                     handleSelectUser(null);
    //                 } else {
    //                     console.log(error);
    //                     setErrorMessage(
    //                         "MIZERA! VOCÊ ME QUEBROU! TÁ SATISFEITO?"
    //                     );
    //                     setUser(null);
    //                     handleSelectUser(null);
    //                 }
    //             });
    //     } else {
    //         setWarningMessage("Usuário precisa ter ao menos 3 caracteres.");
    //         setUser(null);
    //         handleSelectUser(null);
    //     }
    // }

    // async function signInWithGithub() {
    //     const { user, session, error } = await supabase.auth.signIn({
    //         // provider can be 'github', 'google', 'gitlab', and more
    //         provider: "github",
    //     });
    //     if (user) {
    //         setUser(user);
    //         handleSelectUser(user);
    //     }
    // }

    // async function signout() {
    //     const { error } = await supabase.auth.signOut();
    // }

    return (
        <Box
            as="form"
            onSubmit={function (event) {
                event.preventDefault();
                searchUser();
            }}
            styleSheet={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                textAlign: "center",
            }}
        >
            {/* <TextField
                value={username}
                fullWidth
                autoFocus
                textFieldColors={{
                    neutral: {
                        textColor: appConfig.theme.colors.neutrals[200],
                        mainColor: appConfig.theme.colors.neutrals[900],
                        mainColorHighlight: appConfig.theme.colors.primary[500],
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                    },
                }}
                onChange={function (event) {
                    event.preventDefault();
                    const valor = event.target.value;
                    setUsername(valor);
                }}
            /> */}
            {/* <Box
                styleSheet={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            > */}
            {!user ? (
                <Button
                    type="button"
                    label="Logar no Github"
                    fullWidth
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary["500"],
                        mainColorLight: appConfig.theme.colors.primary["400"],
                        mainColorStrong: appConfig.theme.colors.primary["600"],
                    }}
                    styleSheet={{
                        margin: "5px",
                        display: "block",
                    }}
                    onClick={(event) => {
                        signInWithGithub();
                    }}
                />
            ) : (
                <Button
                    type="button"
                    label="Sair"
                    fullWidth
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary["500"],
                        mainColorLight: appConfig.theme.colors.primary["400"],
                        mainColorStrong: appConfig.theme.colors.primary["600"],
                    }}
                    styleSheet={{
                        margin: "5px",
                        display: "block",
                    }}
                    onClick={(event) => {
                        signOut();
                    }}
                />
            )}

            <Button
                type="button"
                label="Entrar no Chat"
                disabled={!user}
                fullWidth
                buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.primary["500"],
                    mainColorLight: appConfig.theme.colors.primary["400"],
                    mainColorStrong: appConfig.theme.colors.primary["600"],
                }}
                styleSheet={{
                    margin: "5px",
                    display: "block",
                }}
                onClick={(event) => {
                    router.push(`/chat`);
                }}
            />
            {/* </Box> */}

            {errorMessage ? (
                <Alert
                    severity="error"
                    onClose={() => {
                        setErrorMessage(null);
                    }}
                    sx={{
                        marginBottom: "10px",
                    }}
                >
                    {errorMessage}
                </Alert>
            ) : (
                ""
            )}

            {warningMessage ? (
                <Alert
                    severity="warning"
                    onClose={() => {
                        setWarningMessage(null);
                    }}
                    sx={{
                        marginBottom: "10px",
                    }}
                >
                    {warningMessage}
                </Alert>
            ) : (
                ""
            )}
        </Box>
    );
}

function Photo(props) {
    const user = props.user;
    return (
        <Box
            styleSheet={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Image
                styleSheet={{
                    borderRadius: "50%",
                    marginBottom: "16px",
                    border: "5px solid",
                    borderColor: appConfig.theme.colors.primary[800],
                    backgroundColor: appConfig.theme.colors.primary["500"],
                }}
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.name}
            />
            <Text
                variant="body4"
                styleSheet={{
                    color: appConfig.theme.colors.neutrals["000"],
                    backgroundColor: appConfig.theme.colors.primary["700"],
                    padding: "10px 15px",
                    borderRadius: "1000px",
                    textAlign: "center",
                }}
            >
                {user.user_metadata.name || user.user_metadata.login}
            </Text>
        </Box>
    );
}
