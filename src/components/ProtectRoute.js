import React from "react";


import {
    Box,
    IconButton,
    Avatar,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";

import { useAuth } from "../contexts/Auth";

export default function ProtectRoute({ children }) {
    const router = useRouter();
    const { user } = useAuth();

    React.useEffect(() => {
        if(!user && router.pathname !== "/") {
            console.log("Redirecionando 3");
            router.push("/");
        }
    }, []);

    return (<>{ !user && router.pathname !== "/" ? ("Redirecionando 4...") : (children)}</>);
}