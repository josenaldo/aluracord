import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

export default function ProfileDialog(props) {
    const { onClose, open, selectedUsername } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            Olha o teste!
        </Dialog>
    );
}

ProfileDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    // selectedUsername: PropTypes.bool.isRequired,
};
