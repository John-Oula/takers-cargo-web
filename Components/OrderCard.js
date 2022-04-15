import React from 'react';
import { Box, Flex, Divider , Text, TagLabel, Tag } from "@chakra-ui/react";
import { BoxIcon ,ChevronRightIcon} from '../icons/dist/cjs'
import { useRouter } from 'next/router';
var moment = require('moment'); // require

const OrderCard = ({ data}) => {
    const router = useRouter()

    return (
        <Box  p={5} boxShadow={`md`} onClick={() => { router.push(`/user/orders/${data?.id}`) }} alignItems={`center`} _hover={{ color: '#ed8b00' }} minH={`50px`} h={`fit-content`} w={`100%`} borderRadius={10}>
            <Flex alignItems={`center`} >
                <Flex flexGrow={1}>
                    <Tag
                        size={`sm`}
                        key={`sm`}
                        borderRadius='full'
                        variant='solid'

                        bgColor={`green`}
                    >

                        <TagLabel>{data?.status ? data?.status : 'unknown'}</TagLabel>

                    </Tag>
                </Flex>
                <Flex p={2} flexGrow={2} textAlign={`left`} justifyContent={`left`} flexDirection={`column`}><small textAlign={`left`} >{data?.trackingNumber}</small></Flex>
                <Flex justifyContent={`flex-end`} flexGrow={1}><ChevronRightIcon color={`#ed8b00`} size={16}  /></Flex>
            </Flex>
            <Divider orientation='horizontal' />
                        <Flex>
                <Flex flexDirection={`column`}>

                </Flex>
                <Flex flexDirection={`column`}>
                    <Flex mb={5} textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        <Text w={`200px`} textAlign={`left`} >{data?.origin?.city}, {data?.origin?.country}</Text>
                        <small>{moment(data?.timestamp).format(`DD-MM-YY hh:mm a`)}</small>

                    </Flex>
                    <Flex textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        <Text w={`200px`} textAlign={`left`} >{data?.destination?.city}, {data?.destination?.country}</Text>
                        <small>{moment(data?.lastUpdatedTime.toDate().getTime()).format(`DD-MM-YY hh:mm a`)}</small>

                    </Flex>
                </Flex>
            </Flex>

        </Box>
    );
};

export default OrderCard;