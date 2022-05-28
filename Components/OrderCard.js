import React,{useEffect,useState} from 'react';
import { Box, Flex, Divider , Text, TagLabel, Tag } from "@chakra-ui/react";
import { BoxIcon ,ChevronRightIcon} from '../icons/dist/cjs'
import { useRouter } from 'next/router';
import route from "../assets/routeMarker.svg"
import Image from 'next/image'

var moment = require('moment'); // require

const OrderCard = ({ data}) => {
    const router = useRouter()
    const [color,setColor] = useState(`#ed8b00`)

    useEffect(() =>{
  
            data?.status === `arrived` ? setColor(`green`) :
            data?.status === `in-transit` ? setColor(`#000`):
            data?.status === `pending` ? setColor(`#ed8b00`) :
            
            data?.status === `received` ? setColor(`#000`):
            data?.status === `arrived` && data?.paymentStatus === `paid`? `#000` :
            `#ed8b00`
    
    },[])

    return (
        <Box  p={2} mb={5}  onClick={() => { router.push(`/user/orders/${data?.id}`) }} alignItems={`center`} _hover={{ color: '#ed8b00' }} minH={`50px`} h={`fit-content`} w={`100%`} borderRadius={10}>
            <Flex alignItems={`center`} >
                <Flex flexGrow={1}>
                    <Tag
                        size={`sm`}
                        key={`sm`}
                        borderRadius='full'
                        variant='solid'

                        bgColor={color}
                    >

                        <TagLabel>{data?.status === `arrived` && data?.paymentStatus === `paid`? `Received` : data?.status }</TagLabel>

                    </Tag>
                </Flex>
                <Flex p={2} flexGrow={2} textAlign={`left`} justifyContent={`left`} flexDirection={`column`}><small textAlign={`left`} >{data?.trackingNumber}</small></Flex>
                <Flex justifyContent={`flex-end`} flexGrow={1}><ChevronRightIcon color={`#ed8b00`} size={16}  /></Flex>
            </Flex>
            <Divider orientation='horizontal' />
                        <Flex>
                            <Image alt={`Route`} src={route} h />
                <Flex flexDirection={`column`}>

                </Flex>
                <Flex flexDirection={`column`}>
                    <Flex mb={5} textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        <Text w={`200px`} textAlign={`left`} >{data?.origin?.city}, {data?.origin?.country}</Text>
                        <small>{moment(data?.timestamp).format(`DD-MM-YY hh:mm a`)}</small>

                    </Flex>
                    <Flex textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        <Text w={`200px`} textAlign={`left`} >{data?.destination?.city}, {data?.destination?.country}</Text>
                        <small>{ data?.status === "arrived" ? moment(data?.lastUpdatedTime.toDate().getTime()).format(`DD-MM-YY hh:mm a`) : `---`}</small>
                    </Flex>
                </Flex>
            </Flex>

        </Box>
    );
};

export default OrderCard;