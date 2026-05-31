import { createContext, useEffect, useState } from "react";
import type {ReactNode} from "react"
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {

    const [user, setUser] = useState<User |null>(null);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {

            setUser(data.session?.user ?? null);

            setLoading(false);
        });

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signWithGoogle = async () => {

        await supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };

    const signOut = async () => {

        await supabase.auth.signOut();
    };

    return(
        <AuthContext.Provider
        value={{
            user,
            loading,
            signWithGoogle,
            signOut,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export {AuthContext};
