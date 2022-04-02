import Head from 'next/head'
import { Text , Box, Container, Flex,Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
;
import BottomNav from './BottomNav';

import NProgress from 'nprogress';
import Router from 'next/router';
import { useRouter } from 'next/router';

function Layout({ children }) {
    const router = useRouter()
 NProgress.configure({ showSpinner: false });

    Router.events.on('routeChangeStart', () => {
        NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => {
        NProgress.done();
    });


    // useEffect(() => {

    // }, [])

    return (
        <>
            <Head>
                <title>
                    Takers Cargo
                </title>
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
                    integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
                    crossOrigin='anonymous' referrerPolicy='no-referrer' />
            </Head>
            <Box h={`100vh`} position={`relative`}>
            {children}
            <BottomNav />
           
            </Box>

        </>
    )
}

export default Layout






