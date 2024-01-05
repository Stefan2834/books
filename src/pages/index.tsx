import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'

export default function Index() {
    const { data: session } = useSession()
    const router = useRouter()

    if (session) {
        router.push('/main')
    } else {
        router.push('/login')
    }

    return null
}
