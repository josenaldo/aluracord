import React from "react";

import { Box, CircularProgress } from "@mui/material";

import appConfig from "../../config.json";
import {eventBus} from "../EventBus.js";
import {Events} from "../Events.js";

export default function Loading(props) {

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        eventBus.on(Events.START_LOADING, () => {
            console.log("Ligando o Loading");
            setLoading(true);
        });

        eventBus.on(Events.STOP_LOADING, () => {
            console.log("Desligando o Loading");
            setLoading(false);
        });

        return () => {
            console.log("Removendo os ouvintes do Loading")
            eventBus.remove(Events.START_LOADING);
            eventBus.remove(Events.STOP_LOADING);
        };
    }, []);

    return <Box>{loading ? <CircularProgress color="primary" /> : ""}</Box>;
}
