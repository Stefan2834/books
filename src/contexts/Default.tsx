import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Protected from '@/components/Protected';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Adjustable from '@/components/Adjustable';
import useLocalStorage from '@/app/custom/useLocalStorage';

interface DefaultContextValue {
    server: string;
    error: null | string,
    setError: (error: null | string) => void
    success: null | string,
    setSuccess: (error: null | string) => void
    navbar: boolean,
    setNavbar: (navbar: boolean) => void
    phone: boolean,
    setPhone: (phone: boolean) => void
    dark: boolean,
    setDark: (dark: boolean) => void,
    colors: string[]
}

export const DefaultContext = createContext<DefaultContextValue | undefined>(undefined);

export function useDefault() {
    const context = useContext(DefaultContext);
    if (!context) {
        throw new Error('useDefault must be used within an DefaultProvider');
    }
    return context;
}

const Colors = ["#101010", "#f6f6f6"]

export function DefaultProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession()
    const server: string = process.env.NEXT_PUBLIC_SERVER || ''
    const [error, setError] = useState<null | string>(null)
    const [success, setSuccess] = useState<null | string>(null)
    const [navbar, setNavbar] = useState<boolean>(false);
    const [phone, setPhone] = useState<boolean>(window.innerWidth < 1000 ? true : false)
    const [dark, setDark] = useLocalStorage('dark', false)
    const [colors, setColors] = useState<string[]>([Colors[0], Colors[1]])



    useEffect(() => {
        if (status === "authenticated") {
            console.log(session?.user)
        }
    }, [status])

    useEffect(() => {
        if (dark) {
            document.documentElement.style.setProperty('--main', Colors[0]);
            document.documentElement.style.setProperty('--main-oposite', Colors[1]);
            setColors([Colors[0], Colors[1]])
        } else {
            document.documentElement.style.setProperty('--main', Colors[1]);
            document.documentElement.style.setProperty('--main-oposite', Colors[0]);
            setColors([Colors[1], Colors[0]])
        }
    }, [dark])




    const value: DefaultContextValue = {
        server,
        error, setError,
        success, setSuccess,
        navbar, setNavbar,
        phone, setPhone,
        dark, setDark,
        colors
    };

    return (
        <DefaultContext.Provider value={value}>
            <Protected>
                <Snackbar open={error !== null} autoHideDuration={5000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error" sx={{
                        width: '100%',
                        marginBottom: '40px',
                        '@media (max-width:1000px)': { marginBottom: '64px' }
                    }}
                    >
                        {error}
                    </Alert>
                </Snackbar>
                <Snackbar open={success !== null} autoHideDuration={5000} onClose={() => setSuccess(null)}>
                    <Alert onClose={() => setSuccess(null)} severity="success" sx={{
                        width: '100%',
                        marginBottom: '40px',
                        '@media (max-width:1000px)': { marginBottom: '64px' }
                    }}
                    >
                        {success}
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