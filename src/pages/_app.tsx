import '../css/globals.css'
import Layout from '../components/Layout'
import { useState, useEffect, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DefaultProvider } from '@/contexts/Default';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider, Observable } from '@apollo/client';
import { useSession } from 'next-auth/react'
import { setContext } from '@apollo/link-context';
import { ApolloLink, FetchResult } from '@apollo/client/link/core';
import { onError } from "@apollo/client/link/error";



const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#711DB0',
        },
        secondary: {
            main: '#C21292',
        },
        error: {
            main: '#EF4040',
        },
        warning: {
            main: '#FFA732',
        },
    }
});



interface AppProps {
    Component: React.ComponentType<any>;
    pageProps: {
        session: any;
    };
}

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER}/graphql`,
});


export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {

    return (
        <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
                {/* <ApolloWrap> */}
                    <DefaultProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </DefaultProvider>
                {/* </ApolloWrap> */}
            </SessionProvider>
        </ThemeProvider>
    )
}

// const ApolloWrap = ({ children }: { children: ReactNode }) => {
//     const [client, setClient] = useState<any>()
//     const { data: session, status } = useSession();


//     useEffect(() => {
//         if (status !== "loading") {

//             const apolloClient = new ApolloClient({
//                 link: ApolloLink.from([]),
//                 cache: new InMemoryCache()
//             });
//             setClient(apolloClient)
//         }
//     }, [status])



//     if (client) {
//         return (
//             <ApolloProvider client={client}>
//                 {children}
//             </ApolloProvider>
//         )
//     }
// }