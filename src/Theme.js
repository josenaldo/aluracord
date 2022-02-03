import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            light: "#7737ae",
            main: "#55059a",
            dark: "#3b036b",
            contrastText: "#ffffff",
            "050": "#eee6f5",
            "100": "#ddcdeb",
            "100": "#bb9bd7",
            "100": "#9969c2",
            "100": "#7737ae",
            "100": "#55059A",
            "100": "#44047b",
            "100": "#33035c",
            "100": "#22023e",
            "100": "#11011f",
        },
        secondary: {
            light: "#339388",
            main: "#00796b",
            dark: "#00544a",
            contrastText: "#ffffff",
        },
        error: {
            main: red.A400,
        },
        "neutrals": {
            "000": "#ffffff",
            "050": "#ececec",
            "100": "#dadada",
            "200": "#b4b4b4",
            "300": "#8f8f8f",
            "400": "#696969",
            "500": "#444444",
            "600": "#363636",
            "700": "#292929",
            "800": "#1b1b1b",
            "900": "#0e0e0e",
            "999": "#000000"
        }
    },
});

export default theme;
