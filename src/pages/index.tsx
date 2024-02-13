import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Index() {
    const { data: session } = useSession()
    const router = useRouter()


    if (session) {
        router.push('/main')
    } else {
        router.push('/connect/login')
    }

    return null
}
