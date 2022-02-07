import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";
import { useRouter } from "next/router";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.session();

        setUser(session?.user ?? null);
        setLoading(false);

        if (!session && router.pathname !== "/") {
            console.log("Redirecionando 1");
            router.push("/");
        }

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
                if (!session) {
                    console.log("Redirecionando 2");
                    router.push("/");
                }
            }
        );

        return () => {
            listener?.unsubscribe();
        };
    }, []);

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signIn: (data) =>
            supabase.auth.signIn({
                provider: "github",
            }),
        signOut: () => supabase.auth.signOut(),
        isCurrentUser: (username) => username === user?.user_metadata.user_name,
        user,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? "Carregando" : children}
            {/* {!loading && children} */}
        </AuthContext.Provider>
    );
}
