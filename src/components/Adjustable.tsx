import { useDefault } from '@/contexts/Default'
import { useRouter } from 'next/router'
import React from 'react'

export default function Adjustable({ children }: { children: React.ReactNode }) {
    const { navbar, phone } = useDefault()
    const router = useRouter()

    if (phone) {
        return (
            <div className='mt-16 w-full h-full'>
                {children}
            </div>
        )
    } else {
        return (
            <div className={`${navbar ? 'ml-80' : 'ml-24'} trans-cubic-second`}
                style={{ width: `calc(100% - ${navbar ? "320px" : "96px"})`, height: "100%", marginTop: router.asPath.includes("/connect") ? "0px" : "56px" }}
            >
                {children}
            </div>
        )
    }
}
