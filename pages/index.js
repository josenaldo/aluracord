import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import {
    Alert,
    Card,
    Box,
    Typography,
    Button,
    Avatar,
    Chip,
} from "@mui/material";

import appConfig from "../config.json";
import { eventBus } from "../src/EventBus.js";
import { Events } from "../src/Events.js";
import { supabase } from "../src/SupabaseClient.js";

export default function PaginaInicial() {
    const [user, setUser] = React.useState(null);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100%",
                    backgroundImage: "url(" + appConfig.theme.background + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                    // backgroundColor: "primary.dark",
                }}
            >
                <Card
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        width: "100%",
                        maxWidth: "700px",
                        padding: "32px",
                    }}
                >
                    {/* Formulário */}
                    <Box
                        sx={{
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
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "200px",
                            width: "200px",
                            padding: "16px",
                            backgroundColor: "primary.dark",
                            border: "1px solid",
                            borderRadius: "10px",
                            flex: 1,
                            minHeight: "240px",
                        }}
                    >
                        {user ? <Photo user={user} /> : ""}
                    </Box>
                    {/* Photo Area */}
                </Card>
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
            <Typography
                component={tag}
                sx={{
                    color: "primary.dark",
                    fontSize: "48px",
                    fontWeight: "600",
                    marginY: "0",
                    textAlign: "center",
                }}
            >
                {title}
            </Typography>
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
        <Typography
            component={tag}
            sx={{
                color: "primary.dark",
            }}
        >
            {props.children}
        </Typography>
    );
}

function LoginForm(props) {
    const handleSelectUser = props.handleSelectUser;

    const [errorMessage, setErrorMessage] = React.useState(null);
    const [warningMessage, setWarningMessage] = React.useState(null);

    const [user, setUser] = React.useState(null);

    const [loading, setLoading] = React.useState(false);

    const router = useRouter();

    React.useEffect(() => {
        eventBus.dispatch(Events.START_LOADING);
        checkUser();
        window.addEventListener("hashchange", function () {
            checkUser();
        });
        eventBus.dispatch(Events.STOP_LOADING);
    }, []);

    async function checkUser() {
        const user = supabase.auth.user();
        console.log(user);
        setUser(user);
        handleSelectUser(user);
    }

    async function signInWithGithub() {
        await supabase.auth.signIn({
            provider: "github",
        });
    }

    async function signOut() {
        await supabase.auth.signOut();
        setUser(null);
        handleSelectUser(null);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
        >
            {!user ? (
                <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    onClick={(event) => {
                        signInWithGithub();
                    }}
                    sx={{
                        marginY: "5px",
                        width: "100%",
                    }}
                >
                    Logar no Github
                </Button>
            ) : (
                <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    onClick={(event) => {
                        signOut();
                    }}
                    sx={{
                        marginY: "5px",
                        width: "100%",
                    }}
                >
                    Sair
                </Button>
            )}

            <Button
                type="button"
                variant="contained"
                disabled={!user}
                fullWidth
                onClick={(event) => {
                    router.push(`/chat`);
                }}
                sx={{
                    marginY: "5px",
                    width: "100%",
                }}
            >
                Entrar no Chat
            </Button>

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
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Avatar
                sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    marginBottom: "16px",
                    border: "5px solid",
                    borderColor: "primary.dark",
                    backgroundColor: "primary.main",
                }}
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.user_name}
            />
            <Chip label={user.user_metadata.user_name} color="primary" />
        </Box>
    );
}
