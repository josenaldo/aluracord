import React from "react";
import PropTypes from "prop-types";

import { Card, Box, Typography, Avatar, Chip } from "@mui/material";

import { useAuth } from "../src/contexts/Auth";
import appConfig from "../config.json";
import LoginForm from "../src/components/LoginForm";

export default function PaginaInicial(props) {
    const { user } = useAuth();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                height: "100%",
                maxWidth: "100%",
                maxHeight: "90vh",
                padding: "10px",
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
                    <LoginForm />
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
                textAlign: "center",
            }}
        >
            {props.children}
        </Typography>
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
