import React, { useEffect, useState } from 'react'
import styles from '../css/Navbar.module.css'
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from "next-auth/react"
import { useDefault } from '@/contexts/Default';



import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    Toolbar,
    AppBar,
} from '@mui/material';


import home from '../svg/light/arch-bg.jpg'
import mail from '../svg/light/arch-bg.jpg'
import settings from '../svg/light/arch-bg.jpg'
import doubleRight from '../svg/light/arch-bg.jpg'
import search from '../svg/light/arch-bg.jpg'
import message from '../svg/light/arch-bg.jpg'
import userImg from '../svg/light/arch-bg.jpg'


import homeActive from '../svg/light/arch-bg.jpg'
import settingsActive from '../svg/light/arch-bg.jpg'
import userActive from '../svg/light/arch-bg.jpg'
import messageActive from '../svg/light/arch-bg.jpg'
import mailActive from '../svg/light/arch-bg.jpg'
import searchActive from '../svg/light/arch-bg.jpg'


export default function Navbar() {
    const { navbar, setNavbar, phone, setPhone } = useDefault(); 
    const router = useRouter()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setPhone(true)
            } else {
                setPhone(false)
            }
        }
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])



    const changePath = (path: string) => {
        router.push(path)
    }

    return (
        <>
            {!phone ? (
                <Paper elevation={10} sx={{ transition: "400ms ease width", zIndex: 10 }} className={navbar ? `${styles.navbar}` : `${styles.navbarClosed}`}>
                    <Button sx={{ textTransform: 'none', position: "absolute", color: "black", transition: "400ms ease", left: 20 }}
                        className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 absolute top-2'
                        onClick={() => { changePath('/'); signOut() }}
                    >
                        <div className='h-10 w-14 mx-2 flex items-center'>
                            <Image src={home} alt='Poza' width='40' height='40' className='trans' />
                        </div>
                        <div className='h-10 w-60 font-normal text-xl flex items-center ml-8'>Chat-app</div>
                    </Button>
                    <Link href={'/main/home'} style={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
                        className='w-64 h-14cursor-pointer flex items-center justify-start hover:translate-x-2'
                    >
                        <div className='h-10 w-14 mx-2 flex items-center'>
                            <Image src={router.asPath === '/main/home' ? homeActive : home} alt="Poza" width="40" height="40" />
                        </div>
                        <div className={`h-10 w-60 ${router.asPath === '/main/home' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Home</div>
                    </Link>
                    <Link href={'/main/messages'} style={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
                        className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
                    >
                        <div className='h-10 w-14 mx-2 flex items-center'>
                            <Image src={router.asPath.includes('/main/messages') ? messageActive : message} alt='Poza' width='40' height='40' />
                        </div>
                        <div className={`h-10 w-60 ${router.asPath.includes('/main/messages') ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Messages</div>
                    </Link>
                    <Link href={'/main/users'} style={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
                        className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
                    >
                        <div className='h-10 w-14 mx-2 flex items-center'>
                            <Image src={router.asPath === '/main/users' ? searchActive : search} alt='Poza' width='40' height='40' />
                        </div>
                        <div className={`h-10 w-60 ${router.asPath === '/main/users' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Users</div>
                    </Link>
                    <Link href={'/main/notifications'} style={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
                        className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
                    >
                        <div className='h-10 w-14 mx-2 flex items-center'>
                            <Image src={router.asPath === '/main/notifications' ? mailActive : mail} alt='Poza' width='40' height='40' />
                        </div>
                        <div className={`h-10 w-60 ${router.asPath === '/main/notifications' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Notifications</div>
                    </Link>
                    <Link href={`/main/users/`} style={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
                        className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
                    >
                        <div className='h-10 w-14 mx-2 flex items-center'>
                            <Image src={router.asPath === `/main/users/` ? userActive : userImg} alt='Poza' width='40' height='40' />
                        </div>
                        <div className={`h-10 w-60 ${router.asPath === `/main/users/` ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Profile</div>
                    </Link>
                    <Link href={'/main/settings'} style={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
                        className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
                    >
                        <div className='h-10 w-14 mx-2 flex items-center'>
                            <Image src={router.asPath === '/main/settings' ? settingsActive : settings} alt='Poza' width='40' height='40' />
                        </div>
                        <div className={`h-10 w-60 ${router.asPath === '/main/settings' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Settings</div>
                    </Link>
                    <Button sx={{ textTransform: 'none', position: "absolute", color: "black", transition: "400ms ease", left: 20 }}
                        className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 absolute bottom-2'
                        onClick={() => setNavbar(!navbar)}
                    >
                        <div className='h-10 w-14 mx-2 flex items-center'>
                            {navbar ? (
                                <Image src={doubleRight} alt='Poza' width='40' height='40' className='rotate-180 trans' />
                            ) : (
                                <Image src={doubleRight} alt='Poza' width='40' height='40' className='trans' />
                            )}
                        </div>
                        <div className='h-10 w-60 font-normal text-xl flex items-center ml-8'>Collapse</div>
                    </Button>
                </Paper>
            ) : (
                <>
                    <Box sx={{ zIndex: '20', height: '100%' }}
                        className={router.route === '/main/messages/[email]' ? `${styles.custom1}` : `${styles.custom2}`}
                    >
                        <Paper sx={{ position: 'fixed', left: 0, top: 0, zIndex: 20, width: '100vw' }} elevation={3}
                        >
                            <AppBar position="static" sx={{ backgroundColor: "#eee" }}>
                                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Image alt='Poza' src={home} width={35} height={35} onClick={() => signOut()} />
                                    <Image onClick={() => changePath('/main/settings')} className='cursor-pointer'
                                        alt='Poza'
                                        src={router.asPath === '/main/settings' ? settingsActive : settings}
                                        width={35} height={35}
                                    />
                                </Toolbar>
                            </AppBar>
                        </Paper>
                        <div style={{ position: 'fixed', left: 0, bottom: 0, zIndex: 20, width: '100vw', height: '54px' }}>
                            <BottomNavigation
                                showLabels
                            >
                                <BottomNavigationAction onClick={() => changePath('/main/home')} label="Home"
                                    icon={<Image alt='Poza' width={30} height={30} src={router.asPath === '/main/home' ? homeActive : home} />}
                                />
                                <BottomNavigationAction onClick={() => changePath('/main/messages')} label="Messages"
                                    icon={<Image alt='Poza' width={30} height={30} src={router.asPath.includes('/main/messages') ? messageActive : message} />}
                                />
                                <BottomNavigationAction onClick={() => changePath('/main/users')} label="Users"
                                    icon={<Image alt='Poza' width={30} height={30} src={router.asPath === '/main/users' ? searchActive : search} />}
                                />
                                <BottomNavigationAction onClick={() => changePath('/main/notifications')} label="Notifications"
                                    icon={<Image alt='Poza' width={30} height={30} src={router.asPath === '/main/notifications' ? mailActive : mail} />}
                                />
                                <BottomNavigationAction onClick={() => changePath(`/main/users`)} label="Profile"
                                    icon={<Image alt='Poza' width={30} height={30} src={router.asPath === `/main/users` ? userActive : userImg} />}
                                />
                            </BottomNavigation>
                        </div>
                    </Box>
                </>
            )}
        </>
    )
}
