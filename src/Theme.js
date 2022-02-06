import { createTheme } from "@mui/material/styles";

const themeDark = createTheme({
    palette: {
        mode: "dark",
        primary: {
            light: "#d1c4e9",
            main: "#9575cd",
            dark: "#673ab7",
            contrastText: "#000000",
        },
        secondary: {
            light: "#b2dfdb",
            main: "#4db6ac",
            dark: "#004d40",
            contrastText: "#000000",
        },
        background: {
            default: "#212121",
            paper: "#303030",
        },
    },
});

const themeLight = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: "#9575cd",
            main: "#673ab7",
            dark: "#512da8",
        },
        secondary: {
            light: "#4db6ac",
            main: "#009688",
            dark: "#00796b",
        },
        background: {
            default: "#eeeeee",
            paper: "#f5f5f5",
        },
    },
});

export { themeLight, themeDark };
