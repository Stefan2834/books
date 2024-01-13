import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

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
                try {
                    return {
                        username: credentials?.username,
                        email: credentials?.email,
                        userRole: credentials?.userRole,
                        coins: credentials?.coins,
                    }
                } catch (err) {
                    return req
                }
            }
        }),
    ],
    jwt: {
        secret: process.env.ACCESS_TOKEN,
    },
    pages: {
        signIn: "/connect/login",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url === baseUrl + '/connect/login' || url === baseUrl + '/connect/register') {
                return baseUrl + '/main';
            } else {
                return baseUrl + '/connect/login';
            }
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
}

export default NextAuth(authOptions)
