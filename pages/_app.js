import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'

import { newTheme } from '../theme/theme';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../Components/Layout";
import BookingContextWrapper from '../Components/BookingContextWrapper.js';

function MyApp({ Component, pageProps }) {
    return (
        <>
                <ChakraProvider theme={newTheme}>
                    <BookingContextWrapper>


                       <Layout>

                           <Component {...pageProps} />

                       </Layout>

</BookingContextWrapper>
                </ChakraProvider>
        </>
    )
}

export default MyApp
