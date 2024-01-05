import { useDefault } from '@/contexts/Default'
import React from 'react'

export default function Adjustable({ children }: { children: React.ReactNode }) {
    const { navbar, phone } = useDefault()


    if (phone) {
        return (
            <div className='mt-16 w-full h-full'>
                {children}
            </div>
        )
    } else {
        return (
            <div className={navbar ? 'ml-80' : 'ml-24'}
                style={{ transition: "400ms ease", width: "100%", height: "100%" }}
            >
                {children}
            </div>
        )
    }
}
