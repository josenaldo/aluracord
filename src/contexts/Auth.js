import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.session();

        setUser(session?.user ?? null);
        setLoading(false);

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
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
        user,
        isCurrentUser: (username) => username === user.user_metadata.user_name,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
