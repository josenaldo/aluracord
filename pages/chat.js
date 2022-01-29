import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import appConfig from "../config.json";

export default function PaginaDoChat() {
    return (
        <>
            <Head>
                <title>{appConfig.name} - Chat</title>
            </Head>
            <div>Página do Chat</div>
        </>
    );
}
