import axios from "axios";
import { signOut, useSession } from "next-auth/react";

export const useRefreshToken = () => {
    const { data: session, update } = useSession();

    const refreshToken = async () => {
        try {

            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/login/refresh`, {
                refreshToken: session?.user.refreshToken,
            });
            if (session && res?.data?.success) {
                console.log('REFRESHING ACCESS TOKEN')
                update({
                    ...session,
                    user: {
                        ...session?.user,
                        accessToken: res?.data?.accessToken
                    }
                })
            }
            else {
                console.log('THE REFRESH TOKEN HAS EXPIRED')
                signOut();
            }
        } catch (err) { console.log(err) }
    };
    return refreshToken;
};