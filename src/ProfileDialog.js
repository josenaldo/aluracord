import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import WebIcon from "@mui/icons-material/Web";
import GitHubIcon from "@mui/icons-material/GitHub";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import appConfig from "../config.json";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfileDialog(props) {
    const { onClose, open, user } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            PaperProps={{
                sx: {
                    backgroundColor: appConfig.theme.colors.neutrals["900"],
                    color: appConfig.theme.colors.neutrals["000"],
                },
            }}
            TransitionComponent={Transition}
            onClose={handleClose}
            open={open}
        >
            <DialogContent>
                {user ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <UserAvatar user={user} />

                        <DialogContentText
                            sx={{
                                color: appConfig.theme.colors.neutrals["000"],
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                align: "center",
                                flexDirection: "column",
                            }}
                        >
                            {/* Nome completo, Cidade e Bio */}
                            <UserBasicDataBox user={user} />

                            {/* Links do usuário */}
                            <UserLinkBox user={user} />

                            {/* Estatisticas do usuário */}
                            <UserStatBox user={user} />

                        </DialogContentText>
                    </Box>
                ) : (
                    <DialogContentText>
                        Nenhum usuário selecionado
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Button onClick={handleClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}

ProfileDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

function UserAvatar(props) {
    const user = props.user;

    return (
        <Avatar
            alt={user.name}
            src={user.avatar_url}
            sx={{
                width: 120,
                height: 120,
                border: "5px solid",
                borderColor: appConfig.theme.colors.neutrals["500"],
                marginBottom: "20px",
            }}
        />
    );
}

UserAvatar.propTypes = {
    user: PropTypes.func.isRequired,
};

function UserBasicDataBox(props) {
    const user = props.user;
    return (
        <>
            {/* Nome completo */}
            <Box
                sx={{
                    fontSize: "130%",
                    fontWeight: "bold",
                }}
            >
                {user.name}
            </Box>

            {/* Cidade */}
            <Box
                sx={{
                    color: appConfig.theme.colors.neutrals["300"],
                    fontSize: "80%",
                }}
            >
                {user.location}
            </Box>

            {/* Bio */}
            <Box
                sx={{
                    textAlign: "center",
                    paddingX: "20px",
                    paddingY: "10px",
                    fontStyle: "italic",
                    color: appConfig.theme.colors.neutrals["100"],
                    marginY: "10px",
                }}
            >
                {user.bio}
            </Box>
        </>
    );
}

UserBasicDataBox.propTypes = {
    user: PropTypes.func.isRequired,
};

function UserLinkBox(props) {
    const user = props.user;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginY: "10px",
            }}
        >
            {user.email ? (
                <UserLink href={"mailto:" + user.email} icon={EmailIcon} />
            ) : (
                ""
            )}

            {user.twitter ? (
                <UserLink href={user.twitter} icon={TwitterIcon} />
            ) : (
                ""
            )}

            {user.blog ? <UserLink href={user.blog} icon={WebIcon} /> : ""}

            {user.html_url ? (
                <UserLink href={user.html_url} icon={GitHubIcon} />
            ) : (
                ""
            )}
        </Box>
    );
}

UserLinkBox.propTypes = {
    user: PropTypes.func.isRequired,
};

function UserLink(props) {
    const Icon = props.icon;

    return (
        <Link
            href={props.href}
            target="_blank"
            rel="noopener"
            sx={{
                color: appConfig.theme.colors.neutrals["100"],
                paddingX: "10px",
            }}
        >
            <Icon fontSize="large" />
        </Link>
    );
}

UserLink.propTypes = {
    href: PropTypes.func.isRequired,
    icon: PropTypes.bool.isRequired,
};

function UserStatBox(props) {
    const user = props.user;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
                alignItems: "center",
                marginY: "10px",
            }}
        >
            <StatCard title="Repositórios públicos" stat={user.public_repos} />
            <DividerStatCard />
            <StatCard title="Seguidores" stat={user.followers} />
            <DividerStatCard />
            <StatCard title="Seguindo" stat={user.following} />
        </Box>
    );
}

UserStatBox.propTypes = {
    user: PropTypes.func.isRequired,
};

function StatCard(props) {
    return (
        <Card
            sx={{
                backgroundColor: appConfig.theme.colors.neutrals["800"],
                color: appConfig.theme.colors.neutrals["000"],
                marginX: "10px",
                width: "120px",
            }}
        >
            <CardHeader
                title={props.title}
                sx={{
                    color: appConfig.theme.colors.neutrals["000"],
                    textAlign: "center",
                    height: "60px",
                }}
                titleTypographyProps={{
                    sx: {
                        fontSize: "16px",
                    },
                }}
            />
            <CardContent>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "24px",
                        fontWeight: "bold",
                    }}
                >
                    {props.stat}
                </Typography>
            </CardContent>
        </Card>
    );
}

StatCard.propTypes = {
    title: PropTypes.func.isRequired,
    stat: PropTypes.bool.isRequired,
};

function DividerStatCard(props) {
    return (
        <Divider
            orientation="vertical"
            flexItem
            sx={{
                borderColor: appConfig.theme.colors.neutrals["500"],
            }}
        />
    );
}
