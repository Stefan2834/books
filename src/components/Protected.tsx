import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface ReactChildren {
    children: ReactNode
}

const Protected: React.FC<ReactChildren> = ({ children }) => {
    const router = useRouter();
    const { data, status } = useSession()


    if(data?.user || status !== "loading") {
        const isAuthenticated = data?.user;
        if (!isAuthenticated && router.pathname !== '/login') {
            router.push('/login');
            return null
        } else if(isAuthenticated && router.pathname === '/login') {
            router.push('/main')
            return null
        }
        return children;
    }
    return null;
};

export default Protected;
