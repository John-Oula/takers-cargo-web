import React from 'react';
import { Box, Flex , Heading,Center, Divider , Text, TagLabel, Tag } from "@chakra-ui/react";
import { AiOutlineArrowRight, AiOutlineDropbox } from 'react-icons/ai'
import { useRouter } from 'next/router';
var moment = require('moment'); // require

const InvoiceCard = ({ data }) => {
    const router = useRouter()

    return (
        <Box  p={5} boxShadow={`md`} onClick={() => { router.push(`/user/invoices/${data?.id}`) }} alignItems={`center`} _hover={{ color: '#ed8b00' }} minH={`50px`} h={`fit-content`} w={`100%`} borderRadius={10}>
            <Flex alignItems={`center`} >
                <Flex flexGrow={1}>
                    <Tag
                        size={`sm`}
                        key={`sm`}
                        borderRadius='full'
                        variant='solid'

                        bgColor={`green`}
                    >

                        <TagLabel>{data?.paymentStatus ? 'paid' : 'unpaid'}</TagLabel>

                    </Tag>
                </Flex>
                <Flex p={2} flexGrow={2} textAlign={`left`} justifyContent={`left`} flexDirection={`column`}><small textAlign={`left`} >{data?.trackingNumber}</small></Flex>
                <Flex justifyContent={`flex-end`} flexGrow={1}><AiOutlineArrowRight color={`#ed8b00`} size={16}  /></Flex>
            </Flex>
            <Divider orientation='horizontal' />
            <br/>
                   <Flex>
                   <Flex flexGrow={2}>
                <Flex flexDirection={`column`}>

                </Flex>
                <Flex flexDirection={`column`}>
                    <Flex mb={5} textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        <Text w={`200px`} textAlign={`left`} >{data?.origin?.city}, {data?.origin?.country}</Text>
                        <small>{moment(data?.timestamp).format(`DD-MM-YY hh:mm a`)}</small>

                    </Flex>
                    <Flex textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        <Text w={`200px`} textAlign={`left`} >{data?.destination?.city}, {data?.destination?.country}</Text>
                        <small>{moment(data?.status?.lastUpdatedTime.toDate().getTime()).format(`DD-MM-YY hh:mm a`)}</small>

                    </Flex>
                </Flex>
            </Flex>
                        <Flex  flexGrow={1}>
                        <Center>
                        <Heading as={`h6`} size={`md`}>$ 4.0</Heading>
                        </Center>
                        </Flex>

                   </Flex>


        </Box>
    );
};

export default InvoiceCard;