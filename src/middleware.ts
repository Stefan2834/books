import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            return token?.userRole === "admin"
        },
    },
    secret: process.env.ACCESS_TOKEN
})

export const config = { matcher: ["/admin"] }