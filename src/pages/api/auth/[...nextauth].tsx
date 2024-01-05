import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                email: { label: "Email", type: "email" },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any, req: any) {
                const user = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/login/token`, {
                    username: credentials.username,
                    email: credentials.email
                })
                if (user?.data?.success) {
                    return {
                        username: credentials?.username,
                        email: credentials?.email,
                        accessToken: user?.data?.accessToken,
                        refreshToken: user?.data?.refreshToken,
                        userRole: credentials?.userRole
                    }
                } else {
                    return req
                }
            }
        }),
    ],
    pages: {
        signIn:"/login",
    },
    jwt: {
        secret: process.env.ACCESS_TOKEN,
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url === baseUrl + '/login') {
                return baseUrl + '/main';
            } else {
                return baseUrl + '/login';
            }
        },
        async jwt({ token, user, trigger, session }) {

            if (trigger === "update") {
                return { ...token, ...session.user }
            } 
            return { ...token, ...user };
        },
        async session({ session, token }) {
            if (token.accessToken) {
                session.user = token as any;
            }
            return session;
        },
    },
}

export default NextAuth(authOptions)
