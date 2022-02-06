import { createTheme } from "@mui/material/styles";
import {deepPurple, teal, grey, blueGrey} from "@mui/material/colors";

const themeDark = createTheme({
    palette: {
        mode: "dark",
        primary: {
            light: deepPurple[100],
            main: deepPurple[300],
            dark: deepPurple[500],
        },
        secondary: {
            light: teal[100],
            main: teal[300],
            dark: teal[500],
            contrastText: "#000000",
        },
        background: {
            default: "#212121",
            paper: "#303030",
        },

        chat: {
            background: blueGrey[800],
            chatBubble: {
                user: teal[900],
                other: blueGrey[900],
                contrastText: "#ffffff",
            },
            sendDate: blueGrey[600],

        }
    },
});

const themeLight = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: deepPurple[100],
            main: deepPurple[300],
            dark: deepPurple[500],
        },
        secondary: {
            light: teal[300],
            main: teal[500],
            dark: teal[700],
        },
        background: {
            default: "#eeeeee",
            paper: "#f5f5f5",
        },
        chat: {
            background: blueGrey[50],
            chatBubble: {
                user: teal[300],
                other: blueGrey[300],
                contrastText: grey[800],
            },
            sendDate: blueGrey[100],

        },
    },
});

export { themeLight, themeDark };
