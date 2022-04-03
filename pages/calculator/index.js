import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    Box, Flex, Radio, Divider, Modal,
    ModalOverlay, useDisclosure,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Textarea, Spacer, Select, Center, Text, Heading, FormControl, Input, Button, InputGroup
} from "@chakra-ui/react";
import FirstRowHeader from '../../Components/FirstRowHeader';
import { AiOutlineArrowRight, AiOutlineBook, AiOutlineContainer, AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai'
import ListItem from "../../Components/ListItem";
import Image from 'next/image'
import route from '../../assets/routeMarker.svg'
import map from '../../assets/Map.png'
import SelectAddressContext from '../../contexts/SelectAddressContext.js';
import { useForm } from "react-hook-form";
import CreateAdress from '../../Components/CreateAddress';
import BackButton from '../../Components/BackButton';


const ShipperAddressBook = ({ close }) => {

    return (
        <Box>
            <InputGroup p={4} flexDirection={`column`}>
                <Input mt={5} placeholder='Full Name' type={`text`} />
                <Input mt={5} placeholder='Phone Number' type={`text`} />
                <Input mt={5} placeholder='Email' type={`text`} />
                <Input mt={5} placeholder='Country' type={`text`} />
                <Input mt={5} placeholder='Detailed Address' type={`text`} />

            </InputGroup>
            <Button mb={5} onClick={close} color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Save Address</Button>
        </Box>
    )
}
const Origin = ({ close }) => {
    const addresses = [{
        id: "D2KvZbLnZdqqyMW3RmBF",
        country:
            "Tanzania",
        detailedAddress:
            "Arusha, TZ ",
        fullName:
            "Takers",
        phone:
            "325636253465"
    }, {
        id: "D2KvZbLnZdqqyMW3RmB",
        country:
            "Tanzania",
        detailedAddress:
            "Arusha, TZ ",
        fullName:
            "CargoX",
        phone:
            "325636253465"
    }, {
        id: "D2KvZbLnkZdqqyMW3RBF",
        country:
            "Tanzania",
        detailedAddress:
            "Arusha, TZ ",
        fullName:
            "Takerss cargo",
        phone:
            "325636253465"
    }]
    const { origin, setOrigin } = useContext(SelectAddressContext)
    const ref = useRef()


    function selectItem(data) {
        if (!origin) {
            setOrigin(
                data
            )
        }
        else {
            setOrigin(null)
            setOrigin(
                data

            )


        }

    }
    return (
        <Flex p={2} flexDirection={`column`} justifyContent={`center`}>
            <FirstRowHeader title={`Select origin address`} leftIcon={<BackButton />} />
            {
                addresses.map((each) => {
                    return (
                        <div key={each?.id} onClick={() => selectItem(each)}  ref={ref} payload={each} >
                            <ListItem key={each?.id} data={each} selectable title={each?.fullName} label={each?.detailedAddress + ' ' + each?.phone} crud path={`address/1`} />

                        </div>

                    )
                })
            }
            <Button mb={10} w={`auto`} onClick={close} color={`#ffffff`} bgColor={`#000000`}>Use Address</Button>

        </Flex>
    )
}
const AddressBook = ({ close }) => {
    const addresses = [{
        id: "D2KvZbLnZdqqyMW3RmBF",
        country:
            "Tanzania",
        detailedAddress:
            "Arusha, TZ ",
        fullName:
            "Peter Gumbo",
        phone:
            "325636253465"
    }, {
        id: "D2KvZbLnZdqqyMW3RmB",
        country:
            "Tanzania",
        detailedAddress:
            "Arusha, TZ ",
        fullName:
            "Peter mbo",
        phone:
            "325636253465"
    }, {
        id: "D2KvZbLnZdqqyMW3RBF",
        country:
            "Tanzania",
        detailedAddress:
            "Arusha, TZ ",
        fullName:
            "Peter Gumb",
        phone:
            "325636253465"
    }]
    const { select, setSelect } = useContext(SelectAddressContext)
    const ref = useRef()

    function selectItem(data) {
        if (!select) {
            setSelect(
                data
            )
        }
        else {
            setSelect(null)
            setSelect(
                data

            )


        }

    }

    return (
        <Flex p={2} flexDirection={`column`} justifyContent={`center`}>
            <FirstRowHeader title={`Address Book`} leftIcon={<BackButton />} />
            {
                addresses.map((each) => {
                    return (
                        <div key={each?.id} onClick={() => selectItem(each)} className={`q`} ref={ref} payload={each} >
                            <ListItem data={each} selectable title={each?.fullName} label={each?.detailedAddress + ' ' + each?.phone} crud path={`address/1`} />

                        </div>

                    )
                })
            }
            <Button mb={10} w={`auto`} onClick={close} color={`#ffffff`} bgColor={`#000000`}>Use Address</Button>

        </Flex>
    )
}
const Calculator = () => {
    // var bailmentType = document.getElementById("bailmentType");
    // var selectedOption = bailmentType.options[bailmentType.selectedIndex].text;
    const [shipperAddressBook, setShipperAddressBook] = useState(false)
    const [receiverAddressBook, setReceiverAddressBook] = useState(false)
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [estimatedPrice,setEstimatedPrice] = useState(0)
    const [bailmentObj, setBailmentObj] = useState(null)
    const [originAddressBook, setOriginAddressBook] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { select, setSelect, cargo, origin, setCargo,setOrigin } = useContext(SelectAddressContext)
    const { handleSubmit, register } = useForm();
    const bailments = [
      { id: '131e331', active:
        true,
        items:[
        "phone",
        
        "laptops",
        
        "camera"],
        name:
        "Electronics",
        unit:
        "pcs"},
        { id: '131331', active:
            true,
            items:[
            "shirt",
            
            "trousers",
            
            "pants"],
            name:
            "Clothes",
            unit:
            "kg"}]
     const rate = {
                bailmentId:
"131e331",
basedOn:
"pcs",
max:
40,
min:
1,
name:
"standard",
price:
20,
status:
"active",
unit:
"pcs"
            }
      const bailmentRef = useRef()
    let cargoList = []


    const closeShipperAddressBook = () => {
        setShipperAddressBook(state => { setShipperAddressBook(!state) })

    }
    const closeReceiverAddressBook = () => {
        setReceiverAddressBook(state => { setReceiverAddressBook(!state) })

    }
    const closeOriginAddressBook = () => {
        setOriginAddressBook(state => { setOriginAddressBook(!state) })

    }

    const addCargo = (values) => {
        const price = rate?.price * values.quantity * values.unit
        const data = {...values, price:price}
        if (cargo) {
            cargoList.push(data)
            setCargo(state => {
                setCargo([...state, ...cargoList])
            })
            onClose()
        }
        else {
            cargoList.push(data)
            setCargo(data)
        }

    }

    const submitForm = (e) => {
         e.preventDefault();
        //   setBailmentObj(e.target.delivery.value)

        const formData = {destination:{ ...select}, origin:{...origin},
           method: e.target.method.value,
           remarks: e.target.remarks.value,
          paymentMethod: e.target.payment_method.value,
          value: e.target.value.value,
          bailment:cargo,
          price: estimatedPrice

        }
        console.log(formData);

    }

    useEffect(() => {

     
        return () => {
             setSelect(null)
             setCargo([])
             setOrigin(null)

        }
    }, [])

    useEffect(() => {

        onClose()
    }, [select])


    useEffect(() => {
        if(cargo.length > 1){
                    setEstimatedPrice(state =>{
                        console.log(state);
                        setEstimatedPrice(state + cargo[cargo.length-1]?.price)
                    })
        }
        else{
            setEstimatedPrice(cargo[cargo.length-1]?.price)
        }

        () => {
            return (setEstimatedPrice(0))

        }
    }, [cargo])
    return (
        <>

            <Flex p={4} flexDirection={`column`} justifyContent={`center`}>
                <Modal size={[`full`]} onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <Text mb={`auto`} >Add cargo information</Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        {!showAddressForm &&  <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
                                <Input   {...register('expressNumber')} mt={5} placeholder='Express Number/ Tracking Number' type={`text`} />
                                <Select id={`bailmentType`} {...register('type')} mt={5} variant='filled' placeholder='Type / Category of consignment' >
                                   { bailments?.map((each,i) => (
                                        <option key={i} dummy={each}  onClick={() => setBailmentObj(each)} ref={bailmentRef}>{each.name}</option>
                                    ))}
                                </Select>
                                <Input  {...register('unit')} mt={5} placeholder='Weight/pcs' type={`number`} />
                                {/* <Input mt={5}  placeholder='Value (USD)' type={`number`} /> */}
                                <Input  {...register('quantity')} mt={5} placeholder='Quantity' type={`number`} />

                                <Button mb={5} mt={5} w={`100%`} onClick={handleSubmit(addCargo)} color={`#ffffff`} bgColor={`#000000`} >Add</Button>
                            </InputGroup>}
                            {showAddressForm && <CreateAdress  />}

                        </ModalBody>
                        <ModalFooter alignItems={`center`}>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {shipperAddressBook && <ShipperAddressBook close={closeShipperAddressBook} />}
                {receiverAddressBook && <AddressBook close={closeReceiverAddressBook} />}
                {originAddressBook && <Origin close={closeOriginAddressBook} />}

                {!shipperAddressBook && !receiverAddressBook && !originAddressBook && 
                    <>
                        <FirstRowHeader title={`Freight Calculation`} leftIcon={<BackButton />} />

                        <Flex>
                            <Image src={route} alt={`Route`} />

                            <InputGroup p={2} flexDirection={`column`}>
                                <Box backgroundImage={map} backgroundSize={`lg`}>
                                    <Flex>
                                        <Box cursor={`pointer`} onClick={() =>{ setOriginAddressBook(true) }} _hover={{ color: '#ed8b00' }} p={4}>
                                            <Heading as={`h6`} size={`md`}>{origin ? origin?.fullName : `Shipper Information`}</Heading>
                                            <Text fontSize={`sm`}>{origin ? origin?.detailedAddress + ' ' + origin?.phone : `Click to fill in shipper information`}</Text>
                                            {/* <Divider orientation={`vertical`} /> */}


                                        </Box>
                                        <Spacer />
                                        <Center>
                                            <AiOutlineBook onClick={() => { setOriginAddressBook(true) }} size={24} />
                                        </Center>
                                    </Flex>
                                    <Divider />
                                    <Flex>
                                        <Box cursor={`pointer`} onClick={() =>{ setShowAddressForm(true);onOpen()}} _hover={{ color: '#ed8b00' }} p={4}>
                                            <Heading as={`h6`} size={`md`}>{select ? select?.fullName : `Receiver Information`}</Heading>
                                            <Text fontSize={`sm`}>{select ? select?.detailedAddress + ' ' + select?.phone : `Click to fill in receiver information`}</Text>
                                            {/* <Divider orientation={`vertical`} /> */}


                                        </Box>
                                        <Spacer />
                                        <Center>
                                            <AiOutlineBook onClick={() => { setReceiverAddressBook(true) }} size={24} />
                                        </Center>
                                    </Flex>
                                </Box>
                            </InputGroup>

                        </Flex>

                        {
                            cargo?.map((each, index) => {
                                return (<ListItem key={'cargo_' + index} leftIcon={<AiOutlineContainer />} title={each?.type + ' ' + '$' + rate?.price * each?.unit * each?.quantity} label={each?.unit + 'kg' + ' ' + each?.expressNumber } click={() => null} />
                                )

                            })
                        }

                        <Button mb={5} onClick={() =>{setShowAddressForm(false);onOpen()}} color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Add a consignment</Button>
                        {/* <ListItem rightIcon={<AiOutlineArrowRight />} title={`Shipping Warehouse`} label={`Select one of our warehouse locations`}/> */}
                        <form onSubmit={(e) => submitForm(e)}>
                        <Select name='value' mt={5} placeholder='Value-added services' variant={`filled`} />
                        <Select mt={5}  name='method'   placeholder='Type of delivery' variant={`filled`} >
                            <option value={`sea`}>Sea</option>
                            <option value={`air`}>Air</option>
                        </Select>
                        <Select name='payment_method' mt={5} placeholder='Payment method' variant={`filled`} >
                            <option value={`MPESA`}>MPESA</option>
                            <option value={`Cash`}>Cash</option>
                             <option value={`Bank Transfer`}>Bank Transfer</option>
                        </Select>
                        <Textarea {...register('remarks')} mb={5} mt={5} placeholder='Remarks' />
                        {/* <Flex>

                            <Radio mr={3} />

                            <small>I have read and agreed to Takers Cargo
                                Terms and conditions of Delivery</small>
                        </Flex> */}
                        <Flex mt={`10%`}>
                            <Flex >
                                <Box>
                                    <Heading as={`h6`} size={`sm`}>Estimated costs(USD)</Heading>
                                    <Text w={`80%`} fontSize={`xs`}>Calculation results are for reference only.</Text>
                                </Box>
                            </Flex>
                            <Spacer />
                            <Flex justifyContent={`flex-end`} ml={`auto`} mr={0} flexGrow={2}>

                                <Heading as={`h6`} size={`sm`}>{estimatedPrice ? estimatedPrice : `--`}</Heading>

                            </Flex>
                        </Flex>
                        {/* <Button type='submit' mt={5} color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Calculate</Button> */}
                        </form>
                    </>}
            </Flex>

        </>
    );
};



export default Calculator;