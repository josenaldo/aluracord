import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            light: "#7737ae",
            main: "#55059a",
            dark: "#3b036b",
            contrastText: "#ffffff",
        },
        secondary: {
            light: "#339388",
            main: "#00796b",
            dark: "#00544a",
            contrastText: "#ffffff",
        },
        neutrals: {
            light: "#8f8f8f",
            main: "#444444",
            dark: "#292929",
            contrastText: "#ffffff",
        }
    }
});

export default theme;
