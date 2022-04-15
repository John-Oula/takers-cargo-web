import React,{useState,useEffect} from 'react';
import { Text,Modal,Grid,GridItem,
    ModalOverlay, useDisclosure,
    ModalContent,
    ModalHeader,Spacer,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Tag,TagLabel, Center, Stack, SimpleGrid, Heading, Button, FormControl, InputGroup, InputLeftElement, Input, Box, Container, Flex, Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
import FirstRowHeader from '../../../Components/FirstRowHeader';
import Route from '../../../Components/Route';
import BackButton from '../../../Components/BackButton';
import {db} from '../../../firebase/initFirebase'
import { doc,getDoc} from 'firebase/firestore'
import { dateTime } from '../../../lib';
import QRCode from "react-qr-code";
import { AiOutlineArrowLeft, AiOutlineScan, AiOutlineBarcode } from 'react-icons/ai'
import route from '../../../assets/routeMarker.svg'
import Image from 'next/image'



export const getServerSideProps = async (ctx) => {
    // const data = getOneDocument(ctx.query.id,`Bookings`)
    const docRef = doc(db, `Bookings`, ctx.query.id);
    const docSnap = await getDoc(docRef);
   
    // if (!data) return { notFound: true };
    return { props: { payload : JSON.stringify(docSnap.data() )|| [] } };
  };

const OrderDetails = ({payload}) => {
    const data = JSON.parse(payload)
    const { isOpen, onOpen, onClose } = useDisclosure()
 

    return (
        <Flex p={5} flexDirection={`column`}>
            <FirstRowHeader title={`Order Details`} leftIcon={<BackButton />} />
            <Route data={data} origin={data?.origin} destination={data?.destination}/>
            <Heading mt={9} mb={4} as={`h4`} size={`md`} >Details</Heading>

            <SimpleGrid columns={[2, 2, 2]} spacing='10px'>
                <Box height='fit-content'><Text fontSize={`sm`}>Tracking Number</Text><Text>{data?.trackingNumber}</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Transportation</Text><Text>{data?.method}</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Product Category</Text><Text>{data?.type}</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Booking Time</Text><Text>{dateTime(data?.creationDate)}</Text></Box>

                <Box height='fit-content'><Text fontSize={`sm`}>Status</Text>
                <Tag
                        size={`sm`}
                        key={`sm`}
                        borderRadius='full'
                        variant='solid'

                        bgColor={`green`}
                    >

                        <TagLabel>{data?.status && data?.status}</TagLabel>

                    </Tag></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Packages </Text><Text>{data?.bailment.length}</Text></Box>

                { data?.bailment?.map(each=>{
                    return(
                        <>
                                      <Box height='fit-content'><Text fontSize={`sm`}>Weight</Text><Text>{each?.unit}</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Express Number</Text><Text>{each?.expressNumber}</Text></Box>
  
                        </>
                    )

                })}
                <Box height='fit-content'><Text fontSize={`sm`}>Expected Arrival Date</Text><Text>{data?.expectedArrivalDate}</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Estimated costs</Text><Text>$ {data?.price ? data?.price : `--`}</Text></Box>
                <Box height='fit-content'><Text fontSize={`sm`}>Payment status</Text><Text>{data?.paymentStatus}</Text></Box>






            </SimpleGrid>
            <Button onClick={onOpen} leftIcon={<AiOutlineBarcode />} mt={`5%`}>QR code</Button>

<Modal size={[`full`]} onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay />
    <ModalContent>


        <ModalCloseButton />
        <ModalBody >

            <Grid borderWidth={1} h='auto ' templateRows='repeat(3, 1fr)' templateColumns='repeat(2, 1fr)' gap={0}>
                <GridItem borderBottomWidth={1} rowSpan={4} colSpan={4}  >
                    
                        <Flex alignItems={`center`}>
                        <QRCode size={120} value="/invoice" />   
                         <Center>
                        <Box fontSize={`sm`} ml={5}>
                        <Text>Tracking Number</Text>
                        <Text>{data?.trackingNumber}</Text>
                        </Box>
                        </Center>
                        </Flex>
                </GridItem>
                <GridItem borderBottomWidth={1} colSpan={4} rowSpan={2}   >
                    <Box color={`#000`} p={2} alignItems={`center`} h={`fit-content`} w={`100%`} >
                        <Flex>
                        <Image src={route} alt={`Route`} />

                            <Flex flexDirection={`column`}>
                                <Flex mb={2} textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                                    <Text w={`200px`} textAlign={`left`} >{data?.origin?.city}, {data?.origin?.country}</Text>
                                    <Text fontSize={`sm`} >{data?.origin?.name} {data?.origin?.phone}</Text>

                                </Flex>
                                <Flex textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                                    <Text w={`200px`} textAlign={`left`} >{data?.destination?.city}, {data?.destination?.country}</Text>
                                    <Text fontSize={`sm`}>{data?.destination?.name} {data?.destination?.phone}</Text>

                                </Flex>
                            </Flex>
                        </Flex>

                    </Box>

                </GridItem>
                <GridItem borderBottomWidth={1} colSpan={4} rowSpan={2} >
           <Box p={2}>

<Flex fontSize={`sm`} h='fit-content' ><Text>Product Category: </Text><Spacer/><Text ml={3}> {data?.bailment.length > 1 ? `mixed` : data?.bailment[0].type}</Text></Flex>

           </Box>
                </GridItem>

                <GridItem colSpan={4} rowSpan={2} borderBottomWidth={1} >
                    <SimpleGrid p={2} columns={[2, 2, 2]} spacing='10px'>
                        <Box fontSize={`sm`} height='fit-content'><Text >Transportation</Text><Text>{data?.method}</Text></Box>
                        <Box fontSize={`sm`} height='fit-content'><Text >Weight</Text><Text>4 kg</Text></Box>
                        <Box fontSize={`sm`} height='fit-content'><Text >Invoice Date</Text><Text>12 - 02 - 2022</Text></Box>
                        <Box fontSize={`sm`} height='fit-content'><Text >Payment Method</Text><Text>{data?.paymentMethod}</Text></Box>
                    </SimpleGrid>
                </GridItem>
                <GridItem borderBottomWidth={1} colSpan={4} rowSpan={2} >
           <Box p={2}>

<Flex  fontSize={`sm`} h='fit-content' ><Text>Total costs : </Text><Spacer/><Text textAlign={`flex-end`} ml={3}>$ {data?.price}</Text></Flex>

           </Box>
                </GridItem>

                <GridItem  colSpan={4} rowSpan={1} >

                   <Box p={2}>
                   <Flex mb={2} fontSize={`sm`} h='fit-content' ><Text>Remarks: </Text><Text ml={3}> {data?.remarks}</Text></Flex>
                    <Flex mb={2} fontSize={`sm`} h='fit-content' ><Text>Recipient: </Text><Text align={`right`} ml={3}> {data?.userId}</Text></Flex>
                    <Flex mb={2} fontSize={`sm`} h='fit-content' ><Text>Invoice date: </Text><Text ml={3}> 12-02-2022</Text></Flex>

                   </Box>


                </GridItem>

            </Grid>

        </ModalBody>
        <ModalFooter alignItems={`center`}>

        </ModalFooter>
    </ModalContent>
</Modal>
        </Flex>
    );
};

export default OrderDetails;
