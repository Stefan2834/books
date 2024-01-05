import '../app/globals.css'
import Layout from '../components/Layout'
import { useState, useEffect, useRef, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DefaultProvider } from '@/contexts/Default';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider, Observable } from '@apollo/client';
import { useSession } from 'next-auth/react'
import { setContext } from '@apollo/link-context';
import { useRefreshToken } from '@/app/custom/useRefreshToken';
import { ApolloLink, FetchResult } from '@apollo/client/link/core';
import { onError } from "@apollo/client/link/error";



const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
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
                <ApolloWrap>
                    <DefaultProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </DefaultProvider>
                </ApolloWrap>
            </SessionProvider>
        </ThemeProvider>
    )
}

const ApolloWrap = ({ children }: { children: ReactNode }) => {
    const refreshToken = useRefreshToken()
    const [client, setClient] = useState<any>()
    const { data: session, status } = useSession();


    useEffect(() => {
        if (status !== "loading") {
            const authLink = setContext(async (_, { headers }) => {
                interface Session {
                    user: {
                        accessToken?: string | null;
                    };
                }

                const token = session?.user?.accessToken;
                return {
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : "",
                    },
                }
            });

            const errorLink = onError(({ networkError, operation, forward }: any) => {
                if (networkError && networkError.statusCode === 401) {
                    return new Observable<FetchResult>(() => {
                        const retryOperation = async () => {
                            await refreshToken()
                            forward(operation);
                        };
                        retryOperation();
                    });
                }
            });

            const apolloClient = new ApolloClient({
                link: ApolloLink.from([
                    errorLink,
                    authLink.concat(httpLink),
                ]),
                cache: new InMemoryCache()
            });
            setClient(apolloClient)
        }
    }, [status])



    if (client) {
        return (
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        )
    }
}