import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import appConfig from "../config.json";
import "./styles.css";

export default function CustomApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <title>{appConfig.name} - Chat</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>

            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            {/* <GlobalStyle /> */}

            <CssBaseline />
            <Component {...pageProps} />
        </>
    );
}
