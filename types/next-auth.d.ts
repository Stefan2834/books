import NextAuth from "next-auth/next";
import "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            username: string,
            email: string,
            image: string,
            accessToken: string,
            refreshToken: string,
            userRole: string
        }
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        userRole?: "admin" | "user"
    }
}
