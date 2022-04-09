import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'

import { newTheme } from '../theme/theme';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../Components/Layout";
import BookingContextWrapper from '../Components/BookingContextWrapper.js';
import AuthContextWrapper from '../Components/AuthContextWrapper';
import OrderContextWrapper from '../Components/OrderContextWrapper';
import NoticeContextWrapper from '../Components/NoticeContextWrapper';

function MyApp({ Component, pageProps }) {
    return (
        <>
                <ChakraProvider theme={newTheme}>
                    <AuthContextWrapper>
                    <BookingContextWrapper>
                    <OrderContextWrapper>
                        <NoticeContextWrapper>



                       <Layout>

                           <Component {...pageProps} />

                       </Layout>
                       </NoticeContextWrapper>
                       </OrderContextWrapper>

</BookingContextWrapper>
</AuthContextWrapper>
                </ChakraProvider>
        </>
    )
}

export default MyApp
