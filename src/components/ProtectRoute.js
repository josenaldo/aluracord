import React from "react";

import { useRouter } from "next/router";

import { useAuth } from "../contexts/Auth";
import LoadingApp from "./LoadingApp";

export default function ProtectRoute({ children }) {
    const router = useRouter();
    const { user } = useAuth();

    React.useEffect(() => {
        if (!user && router.pathname !== "/") {
            console.log("Redirecionando 3");
            router.push("/");
        }
    }, []);

    return (
        <>
            {!user && router.pathname !== "/" ? (
                <LoadingApp message="Redirecionando usuário não logado..." />
            ) : (
                children
            )}
        </>
    );
}
