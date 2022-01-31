import appConfig from "../config.json";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
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
    },
});

function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }
            body {
                font-family: "Open Sans", sans-serif;
            }
            /* App fit Height */
            html,
            body,
            #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            ::-webkit-scrollbar {
                width: 20px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                background: ${appConfig.theme.colors.neutrals["400"]};
                border-radius: 5px;
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: ${appConfig.theme.colors.neutrals["700"]};
                border-radius: 5px;
            }

            .fadeOut {
                opacity: 0;
                transition: opacity 1s;
            }
            .fadeIn {
                opacity: 1;
                transition: opacity 1s;
            }

            @keyframes fade-in {
                0% {
                    opacity: 0;
                }
                0% {
                    opacity: 0.5;
                }
                100% {
                    opacity: 1;
                }
            }

            @keyframes fade-out {
                0% {
                    opacity: 0;
                }
                0% {
                    opacity: 0.5;
                }
                100% {
                    opacity: 1;
                }
            }

            /* ./App fit Height */
        `}</style>
    );
}

export default function CustomApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}
