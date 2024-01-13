import NextAuth from "next-auth/next";
import "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            username: string,
            email: string,
            userRole: string,
            coins: number,
        }
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        userRole?: "admin" | "user"
    }
}
