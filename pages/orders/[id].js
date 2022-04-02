import React from 'react';
import { Text, Center, Stack, SimpleGrid, Heading, Button, FormControl, InputGroup, InputLeftElement, Input, Box, Container, Flex, Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
import FirstRowHeader from '../../Components/FirstRowHeader';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Route from '../../Components/Route';
import BackButton from '../../Components/BackButton';


const OrderDetails = () => {
    // const router = useRouter()

    return (
        <Flex p={5} flexDirection={`column`}>
            <FirstRowHeader title={`Order Details`} leftIcon={<BackButton />} />
            <Route id={1} />
            <Heading mt={9} mb={4} as={`h4`} size={`md`} >Details</Heading>

            <SimpleGrid columns={[2, 2, 2]} spacing='10px'>
                <Box height='fit-content'><Text fontSize={`sm`}>Tracking Number</Text><Text>TCFY4F5DFY5D27</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Transportation</Text><Text>Sea</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Product Category</Text><Text>Electronics</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Weight</Text><Text>4 kg</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Status</Text><Text>In-transit</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Expected Arrival Date</Text><Text>12 - 02 - 2022</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Total Payment</Text><Text>$ --</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Payment status</Text><Text>Pending</Text></Box>






            </SimpleGrid>

        </Flex>
    );
};

export default OrderDetails;