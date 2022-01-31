import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

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
            <DialogTitle>
                Perfil
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: appConfig.theme.colors.neutrals["300"],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
            // sx={{
            //     backgroundColor: appConfig.theme.colors.neutrals["900"],
            //     color: appConfig.theme.colors.neutrals["000"],
            // }}
            >
                {user ? (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",

                    }}>
                        <Avatar
                            alt={user.name}
                            src={user.avatar_url}
                            sx={{ width: 100, height: 100 }}
                        />
                        <DialogContentText
                            sx={{
                                color: appConfig.theme.colors.neutrals["000"],
                            }}
                        >
                            <Box>{user.name}</Box>
                            <Box>{user.company}</Box>
                            <Box>{user.location}</Box>
                            <Box>{user.login}</Box>
                            <Box>{user.bio}</Box>
                            <Box>{user.html_url}</Box>
                            <Box>{user.public_repos}</Box>
                            <Box>{user.followers}</Box>
                            <Box>{user.following}</Box>
                        </DialogContentText>
                    </Box>
                ) : (
                    <DialogContentText>
                        Nenhum usuário selecionado
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}

ProfileDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
