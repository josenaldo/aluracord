import appConfig from "../config.json";

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

            /* ./App fit Height */
        `}</style>
    );
}

export default function CustomApp({ Component, pageProps }) {
    console.log("Roda em todas as páginas");
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}
