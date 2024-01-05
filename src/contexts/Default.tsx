import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Protected from '@/components/Protected';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Adjustable from '@/components/Adjustable';

interface DefaultContextValue {
    server: String;
    error: null | string,
    setError: (error: null | string) => void
    navbar: boolean,
    setNavbar: (navbar: boolean) => void
    phone: boolean,
    setPhone: (phone: boolean) => void
}

export const DefaultContext = createContext<DefaultContextValue | undefined>(undefined);

export function useDefault() {
    const context = useContext(DefaultContext);
    if (!context) {
        throw new Error('useDefault must be used within an DefaultProvider');
    }
    return context;
}

export function DefaultProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession()
    const server: String = process.env.NEXT_PUBLIC_SERVER || ''
    const [error, setError] = useState<null | string>(null)
    const [navbar, setNavbar] = useState<boolean>(false);
    const [phone, setPhone] = useState<boolean>(window.innerWidth < 1000 ? true : false)



    useEffect(() => {
        if (status === "authenticated") {
            console.log(session?.user)
        }
    }, [status])




    const value: DefaultContextValue = {
        server,
        error, setError,
        navbar, setNavbar,
        phone, setPhone
    };

    return (
        <DefaultContext.Provider value={value}>
            <Protected>
                <Snackbar open={error !== null ? true : false} autoHideDuration={5000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error" sx={{
                        width: '100%',
                        marginBottom: '40px',
                        '@media (max-width:1000px)': { marginBottom: '64px' }
                    }}
                    >
                        {error}
                    </Alert>
                </Snackbar>
                <Navbar />
                <Adjustable>
                    {children}
                </Adjustable>
            </Protected>
        </DefaultContext.Provider>
    )
}