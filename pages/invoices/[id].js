import React from 'react';
import {
    Text, Center, Modal,
    ModalOverlay, useDisclosure,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, SimpleGrid, Heading, Button, Spacer, InputGroup, InputLeftElement, Grid, GridItem, Box, Container, Flex, Link, LinkBox, LinkOverlay
} from '@chakra-ui/react'
import FirstRowHeader from '../../Components/FirstRowHeader';
import { AiOutlineArrowLeft, AiOutlineScan, AiOutlineBarcode } from 'react-icons/ai'
import Route from '../../Components/Route';
import qr from '../../assets/qr.png'
import Image from 'next/image'
import BackButton from '../../Components/BackButton';
import QRCode from "react-qr-code";
import route from '../../assets/routeMarker.svg'


const InvoiceDetails = () => {
    // const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <Flex p={5} flexDirection={`column`}>

            <FirstRowHeader title={`Invoice Details`} leftIcon={<BackButton />} />
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
                                    <Text>637674735R684348344</Text>
                                    </Box>
                                    </Center>
                                    </Flex>
                            </GridItem>
                            <GridItem borderBottomWidth={1} colSpan={4} rowSpan={2}   >
                                <Box color={`#000`} p={2} alignItems={`center`} h={`fit-content`} w={`100%`} >
                                    <Flex>
                                    <Image src={route} />

                                        <Flex flexDirection={`column`}>
                                            <Flex mb={2} textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                                                <Text w={`200px`} textAlign={`left`} >Guangzhou, ZH</Text>
                                                <Text fontSize={`sm`} >Takers Cargo +23245345435</Text>

                                            </Flex>
                                            <Flex textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                                                <Text w={`200px`} textAlign={`left`} >Tanzania</Text>
                                                <Text fontSize={`sm`}>Peter Gumbo +23245345435</Text>

                                            </Flex>
                                        </Flex>
                                    </Flex>

                                </Box>

                            </GridItem>
                            <GridItem borderBottomWidth={1} colSpan={4} rowSpan={2} >
                       <Box p={2}>

<Flex fontSize={`sm`} h='fit-content' ><Text>Product Category: </Text><Spacer/><Text ml={3}> Electronics</Text></Flex>

                       </Box>
                            </GridItem>

                            <GridItem colSpan={4} rowSpan={2} borderBottomWidth={1} >
                                <SimpleGrid p={2} columns={[2, 2, 2]} spacing='10px'>
                                    <Box fontSize={`sm`} height='fit-content'><Text >Transportation</Text><Text>Sea</Text></Box>
                                    <Box fontSize={`sm`} height='fit-content'><Text >Weight</Text><Text>4 kg</Text></Box>
                                    <Box fontSize={`sm`} height='fit-content'><Text >Invoice Date</Text><Text>12 - 02 - 2022</Text></Box>
                                    <Box fontSize={`sm`} height='fit-content'><Text >Payment Method</Text><Text>MPESA</Text></Box>
                                </SimpleGrid>
                            </GridItem>
                            <GridItem borderBottomWidth={1} colSpan={4} rowSpan={2} >
                       <Box p={2}>

<Flex  fontSize={`sm`} h='fit-content' ><Text>Total costs : </Text><Spacer/><Text textAlign={`flex-end`} ml={3}> $30.0</Text></Flex>

                       </Box>
                            </GridItem>

                            <GridItem  colSpan={4} rowSpan={1} >

                               <Box p={2}>
                               <Flex mb={2} fontSize={`sm`} h='fit-content' ><Text>Remarks: </Text><Text ml={3}> Pass the colStart and colEnd prop to GridItem component to make an element start or end at the nth grid position.</Text></Flex>
                                <Flex mb={2} fontSize={`sm`} h='fit-content' ><Text>Recipient: </Text><Text align={`right`} ml={3}> 232323234</Text></Flex>
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

export default InvoiceDetails;