import Head from 'next/head'
import { Text , Box, Container, Flex,Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
;
import BottomNav from './BottomNav';
import React,{useState,useContext} from 'react';

import NProgress from 'nprogress';
import Router from 'next/router';
import { useRouter } from 'next/router';
import AuthContext from '../contexts/AuthContext';
import OrderContextWrapper from './OrderContextWrapper';

function Layout({ children }) {
    const router = useRouter()
    const { user,setUser ,logout} = useContext(AuthContext)

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
            <Flex flexDirection={[`column`,`colum`,`colum`,`row`,`row`,]} h={`100vh`} position={`relative`}>
            {user && user?.uid && <BottomNav user={user} logout={logout} />}
            {children}

          
          
         
            </Flex>

        </>
    )
}

export default Layout






