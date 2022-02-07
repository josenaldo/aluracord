import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/Auth";
import { eventBus } from "../EventBus.js";
import { Events } from "../Events.js";

import { Box, Button, Alert } from "@mui/material";

export default function LoginForm(props) {
    const [errorMessage, setErrorMessage] = React.useState(null);
    const router = useRouter();
    const { signIn, signOut, user } = useAuth();

    async function handleSignIn() {
        try {
            eventBus.dispatch(Events.START_LOADING);
            const { error } = await signIn();

            if (error) throw error;
        } catch (error) {
            setErrorMessage(`Erro no login: ${error.message}`);
        } finally {
            eventBus.dispatch(Events.STOP_LOADING);
        }
    }

    function handleSignOut() {
        signOut();
    }

    function handleGoToChat() {
        router.push(`/chat`);
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
                    onClick={handleSignIn}
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
                    onClick={handleSignOut}
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
                onClick={handleGoToChat}
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
        </Box>
    );
}
