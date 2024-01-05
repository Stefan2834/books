import '../app/globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
    title: 'Books',
    description: 'A webapp where you can read and write books.',
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {



    return (
        <div className={inter.className}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Books</title>
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
            </Head>
            <main>
                {children}
            </main>
        </div>
    )
}

