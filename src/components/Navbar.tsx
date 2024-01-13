import React from 'react'
import styles from '../css/Navbar.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react"
import { useDefault } from '@/contexts/Default';
import Theme from '../components/Theme'

import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    Toolbar,
    AppBar,
    Badge, Button, Divider
} from '@mui/material';



import mail from '../svg/light/double-right.svg'
import search from '../svg/light/double-right.svg'
import message from '../svg/light/double-right.svg'
import userImg from '../svg/light/double-right.svg'


import homeActive from '../svg/light/double-right.svg'
import settingsActive from '../svg/light/double-right.svg'
import userActive from '../svg/light/double-right.svg'
import messageActive from '../svg/light/double-right.svg'
import mailActive from '../svg/light/double-right.svg'
import searchActive from '../svg/light/double-right.svg'




import doubleRight from '../svg/light/double-right.svg'

import doubleRightDark from '../svg/dark/double-right.svg'

import logout from '../svg/light/logout.svg'
import user from '../svg/light/user.svg'
import money from '../svg/light/paper-money-two.svg'
import home from '../svg/light/home.svg'
import read from '../svg/light/notebook.svg'
import write from '../svg/light/write.svg'
import favorite from '../svg/light/bookmark.svg'
import settings from '../svg/light/setting-two.svg'


import logoutDark from '../svg/dark/logout.svg'
import userDark from '../svg/dark/user.svg'
import moneyDark from '../svg/dark/paper-money-two.svg'
import homeDark from '../svg/dark/home.svg'
import readDark from '../svg/dark/notebook.svg'
import writeDark from '../svg/dark/write.svg'
import favoriteDark from '../svg/dark/bookmark.svg'
import settingsDark from '../svg/dark/setting-two.svg'

import logo from '../svg/logo2.png'


export default function Navbar() {
    const { navbar, setNavbar, phone, colors, dark } = useDefault();
    const router = useRouter()
    const { data: session } = useSession()



    const changePath = (path: string) => {
        router.push(path)
    }

    return (
        <>
            {!phone ? (
                <>
                    {!router.asPath.includes("/connect") && (
                        <>
                            <div className='fixed top-0 left-0 h-14 z-40 main trans-cubic' style={navbar ? { width: "320px" } : { width: "96px" }} />
                            <div style={navbar ? { width: "calc(100% - 320px" } : { width: "calc(100% - 96px)" }}
                                className='h-14 main z-10 flex items-center justify-between top-0 right-0 fixed shadow-xl trans-cubic'
                            >
                                <div className='mx-6 flex items-center justify-end w-full'>
                                    <Button sx={{
                                        margin: "0 4px", width: "90px", color: colors[1],
                                        fontWeight: "600", fontSize: "16px", lineHeight: "18px"
                                    }} onClick={() => router.push("/main")}
                                        className='w-16 h-10 cursor-pointer'
                                    >
                                        <Image src={dark ? moneyDark : money} alt='Poza' width='30' height='30' />
                                        <div className='ml-2'>{session?.user?.coins}</div>
                                    </Button>
                                    <div className='flex items-center justify-center pl-6 mx-10'>
                                        <Theme />
                                    </div>
                                    <Button sx={{
                                        margin: "0 4px", width: "auto", maxWidth: "200px", color: colors[1],
                                        fontWeight: "600", fontSize: "16px", lineHeight: "18px", display: "flex", justifyContent: "flex-start"
                                    }} onClick={() => router.push("/main")}
                                        className='w-16 h-10 cursor-pointer'
                                    >
                                        <Image src={dark ? userDark : user} alt='Poza' width='30' height='30' />
                                        <div className='ml-2 truncate'>{session?.user?.username}</div>
                                    </Button>
                                    <Button sx={{
                                        margin: "0 4px", width: "90px", color: colors[1],
                                        fontWeight: "600", fontSize: "16px", lineHeight: "18px"
                                    }} onClick={() => signOut()}
                                        className='w-16 h-10 cursor-pointer'
                                    >
                                        <Image src={dark ? logoutDark : logout} alt='Poza' width='30' height='30' />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                    <div className={`${navbar ? styles.navbar : styles.navbarClosed} trans-cubic ${router.asPath.includes("/connect") ? "h-full mt-0" : "h-[calc(100% - 56px)] mt-14"}`}>
                        <Button sx={{ position: "absolute", left: 20, color: colors[1], transition: "400ms ease" }}
                            className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 absolute top-2'
                            onClick={() => router.push('/main')}
                        >
                            <div className='h-10 w-14 mx-2 flex items-center'>
                                <Image src={logo} alt='Poza' width='40' height='40' />
                            </div>
                            <div className='h-10 w-60 font-normal text-xl flex items-center ml-8'>Books</div>
                        </Button>
                        <Divider orientation="horizontal" flexItem sx={{ backgroundColor: colors[1], mb: 1 }} />
                        <Link href={'/main/home'} style={{
                            color: colors[1],
                            margin: "8px 0", position: 'relative', left: -10
                        }}
                            className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 transition'
                        >
                            <div className='h-10 w-14 mx-2 flex items-center'>
                                <Image src={dark ? homeDark : home} alt="Poza" width='35' height="35" />
                            </div>
                            <div className={`h-10 w-60 ${router.asPath === '/main/home' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Acasa</div>
                        </Link>
                        <Link href={'/main/messages'} style={{
                            color: colors[1],
                            margin: "8px 0", position: 'relative', left: -10
                        }}
                            className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 transition'
                        >
                            <div className='h-10 w-14 mx-2 flex items-center'>
                                <Image src={dark ? readDark : read} alt='Poza' width='35' height='35' />
                            </div>
                            <div className={`h-10 w-60 ${router.asPath.includes('/main/messages') ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Citeste</div>
                        </Link>
                        <Link href={'/main/users'} style={{
                            color: colors[1],
                            margin: "8px 0", position: 'relative', left: -10
                        }}
                            className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 transition'
                        >
                            <div className='h-10 w-14 mx-2 flex items-center'>
                                <Image src={dark ? favoriteDark : favorite} alt='Poza' width='35' height='35' />
                            </div>
                            <div className={`h-10 w-60 ${router.asPath === '/main/users' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Favorite</div>
                        </Link>
                        <Link href={'/main/notifications'} style={{
                            color: colors[1],
                            margin: "8px 0", position: 'relative', left: -10
                        }}
                            className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 transition'
                        >
                            <div className='h-10 w-14 mx-2 flex items-center'>
                                <Image src={dark ? writeDark : write} alt='Poza' width='35' height='35' />
                            </div>
                            <div className={`h-10 w-60 ${router.asPath === '/main/notifications' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Scrie</div>
                        </Link>
                        <Link href={'/main/settings'} style={{
                            color: colors[1],
                            margin: "8px 0", position: 'relative', left: -10
                        }}
                            className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 transition'
                        >
                            <div className='h-10 w-14 mx-2 flex items-center'>
                                <Image src={dark ? settingsDark : settings} alt='Poza' width='35' height='35' />
                            </div>
                            <div className={`h-10 w-60 ${router.asPath === '/main/settings' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Setari</div>
                        </Link>
                        <Divider orientation="horizontal" flexItem sx={{ backgroundColor: colors[1], mt: 1 }} />
                        <Button sx={{ position: "absolute", color: colors[1], transition: "400ms ease", left: 20 }}
                            className='w-64 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 absolute bottom-2'
                            onClick={() => setNavbar(!navbar)}
                        >
                            <div className='h-10 w-14 mx-2 flex items-center'>
                                {navbar ? (
                                    <Image src={dark ? doubleRightDark : doubleRight} alt='Poza' width='35' height='35' className='rotate-180 transition' />
                                ) : (
                                    <Image src={dark ? doubleRightDark : doubleRight} alt='Poza' width='35' height='35' className='transition' />
                                )}
                            </div>
                            <div className='h-10 w-60 font-normal text-xl flex items-center ml-8'>Collapse</div>
                        </Button>
                    </div>
                </>
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
