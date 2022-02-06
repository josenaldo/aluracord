import React from "react";

import { Box, CircularProgress } from "@mui/material";

import {eventBus} from "../EventBus.js";
import {Events} from "../Events.js";

export default function Loading(props) {

    const [loading, setLoading] = React.useState(false);
    const color = props.color || "secondary";

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
            eventBus.remove(Events.START_LOADING);
            eventBus.remove(Events.STOP_LOADING);
        };
    }, []);

    return <Box>{loading ? <CircularProgress color={color} /> : ""}</Box>;
}
