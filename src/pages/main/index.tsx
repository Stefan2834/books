import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react'
import Link from 'next/link';

export default function Index() {
    const router = useRouter()



    return (
        <div style={{ height: "400vh" }} className='w-full main main-color-oposite'>
            <div onClick={async () => { await signOut() }}>LogOut</div><br />
            <Link href="/test">go to test page</Link>
        </div>
    );
};
