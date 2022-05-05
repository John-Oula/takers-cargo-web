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
import { addDocument, addDocumentWithId, updateDocument } from '../../lib';
import { useRouter } from 'next/router';
import { db } from '../../firebase/initFirebase';
import { serverTimestamp } from 'firebase/firestore'
import { collection, getDocs, getDoc } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';
import AuthContext from '../../contexts/AuthContext';
import {ChevronLeftIcon} from '../../icons/dist/cjs'


var moment = require('moment'); // require


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

    const { origin, setOrigin } = useContext(SelectAddressContext)
    const ref = useRef()
    const [address, setAddress] = useState()
    const { user } = useContext(AuthContext)
    const getAddress = async () => {
        let addresses = []
        const colRef = collection(db, "Warehouse");
        const docSnap = await getDocs(colRef);
        docSnap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            addresses.push(doc.data())
        });
        setAddress(addresses)
    }
    useEffect(async () => {

        getAddress()

    }, [])

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
            <FirstRowHeader title={`Select origin address`} leftIcon={<ChevronLeftIcon color='#000' onClick={close} />} />
            {
                address?.map((each) => {
                    return (
                        <div key={each?.id} onClick={() => selectItem(each)} ref={ref} payload={each} >
                            <ListItem key={each?.id} data={each} selectable title={each?.fullname} label={each?.detailedAddress + ' ' + each?.phone} crud path={`address/1`} />

                        </div>

                    )
                })
            }
            <Button mb={10} w={`auto`} onClick={close} color={`#ffffff`} bgColor={`#000000`}>Use Address</Button>

        </Flex>
    )
}
const AddressBook = ({ close }) => {

    const { select, setSelect } = useContext(SelectAddressContext)
    const [address, setAddress] = useState()
    const { user } = useContext(AuthContext)
    const getAddress = async () => {
        let addresses = []
        const subColRef = collection(db, "Users", user?.uid, "address");
        const docSnap = await getDocs(subColRef);
        console.log(docSnap);
        docSnap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            addresses.push({...doc.data(), id:doc.id})
        });
        setAddress(addresses)
    }
    useEffect(async () => {

        getAddress()

    }, [])
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
            <FirstRowHeader title={`Address Book`} leftIcon={<ChevronLeftIcon color='#000' onClick={close} />} />
            {
                address?.map((each) => {
                    return (
                        <div key={each?.id} onClick={() => selectItem(each)} className={`q`} ref={ref} payload={each} >
                            <ListItem data={each} selectable title={each?.fullname} label={each?.detailedAddress + ' ' + each?.phone} crud path={`address/1`} />

                        </div>

                    )
                })
            }
            <Button mb={10} w={`auto`} onClick={close} color={`#ffffff`} bgColor={`#000000`}>Use Address</Button>

        </Flex>
    )
}
const Book = () => {
    // var bailmentType = document.getElementById("bailmentType");
    // var selectedOption = bailmentType.options[bailmentType.selectedIndex].text;
    const [shipperAddressBook, setShipperAddressBook] = useState(false)
    const [receiverAddressBook, setReceiverAddressBook] = useState(false)
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [estimatedPrice, setEstimatedPrice] = useState(0)
    const [bailmentObj, setBailmentObj] = useState(null)
    const [originAddressBook, setOriginAddressBook] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { select, setSelect, cargo, origin, setOrigin, setCargo } = useContext(SelectAddressContext)
    const { handleSubmit, register } = useForm();
    const [loading, setLoading] = useState(false)
    const [rate, setRate] = useState()
    const [groupedBailment, setGroupedBailment] = useState([])
    const [error, setError] = useState(false)
    const { user } = useContext(AuthContext)
    const [rates, loadingRates, errorRates] = useCollection(collection(db, 'Rates'))
    const [bailments] = useCollection(collection(db, 'Bailment'))
    const [bailmentSelectValue, setBailmentSelectValue] = useState()
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [transportation, setTransportation] = useState('')
    const [edit, setEdit] = useState()
    const [value,setValue] = useState(0)
    useEffect(() => {
        if (user == null) {
            router.push("/login");
        }
    }, [user]);
    const router = useRouter()


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

    const shippingRate = (rate, unit, quantity) => {
        return rate * unit * quantity

    }
    const getShippingRate = async (id) => {
        const docRef = doc(db, `Rates`, id);
        return await getDoc(docRef);

    }

    const addCargo = (values) => {
        values.preventDefault()
        const price = parseFloat(rate) * parseFloat(values.target.quantity.value) 

        const data = {
            expressNumber: values.target.express.value,
            quantity: parseFloat(values.target.quantity.value),
            item: values.target.item.value,
            category: values.target.category.value,
            price: price,
            unit: bailmentSelectValue?.unit
        }

        if (cargo) {
            cargoList.push(data)
            setCargo(state => {
                if (edit) {
                    const index = [...state].findIndex(one => one.expressNumber === edit.expressNumber);
                    
                    const newCargo = [...state]
                    newCargo[index] = data;
                    
                    setCargo(newCargo)
                    
                   
                }
                else setCargo([...state, ...cargoList])
            })
            // setEstimatedPrice(state =>{
            //     setEstimatedPrice(state - Math.abs(priceDifference))
            // })
           
            setEdit(null)
            onClose()
        }
        else {
            cargoList.push(data)

            setCargo(data)
            setEdit(null)
        }

    }

    const removeCargo = (id) => {

        const removeArr = [...cargo].filter(each => each.expressNumber !== id.expressNumber)
        setCargo(removeArr)
    }

    const editCargo = (cargoObj, value) => {
        onOpen()
        setEdit(cargoObj)


    }

    useEffect(() => {
  
        if(!isOpen) 
         setEdit(null)

        
    }, [isOpen])

    const validateBooking = (cargo) =>{
        switch (true) {
            case !cargo:
                alert(`Please add cargo to your booking`)
                return true
                
                break;
        
            default:
                break;
        }
    }

    const submitForm = (e) => {
       
        setError(null)
        setLoading(true)
        e.preventDefault();
        const date = Date.now()
        const firstDate = moment().add(45, 'days');
        const secondDate = date + 24 * 60 * 60 * 1000
        const trackingNumber = `TC` + date.toString()
        //   setBailmentObj(e.target.delivery.value)
        const expressNumbersArr = cargo.map(each => each.expressNumber)

        const formData = {
            destination: { ...select }, origin: { ...origin },
            method: e.target.method.value,
            remarks: e.target.remarks.value,
            paymentMethod: e.target.payment_method.value,
            value: e.target.value.value,
            bailment: cargo,
            price: estimatedPrice,
            userId: user?.uid,
            trackingNumber: trackingNumber,
            status: `pending`,
            paymentStatus: `unpaid`,
            lastUpdatedTime: serverTimestamp(),
            // expectedArrivalDate: secondDate,
            creationDate: serverTimestamp(),
            totalQuantity: totalQuantity,
            expressNumbers: expressNumbersArr

        }

        addDocumentWithId('Bookings', formData, trackingNumber)
            .then(doc => {
                console.log(doc)

                setLoading(false)
                router.push(`/user/orders/${trackingNumber}`)






            })
            .catch(error => {
                setLoading(false)

                console.log(error.message);
                setError(error.message)
            }
            )

    }

    useEffect(() => {


        return () => {
            setSelect(null)
            setCargo([])
            setOrigin(null)
            setEdit(null)

        }
    }, [])



    useEffect(() => {

        onClose()
    }, [select])

// Track cargo prices and quantity
    useEffect(() => {


            // setEstimatedPrice(state => {
            //     setEstimatedPrice(state + cargo[cargo.length - 1]?.price)
            // })
            const priceArr = cargo.map(each => each.price)
            setEstimatedPrice( priceArr.reduce((cargoTotal,cargoItem) => 
                  cargoTotal + cargoItem 
            ,0) +  parseFloat(value))

            const quantityArr = cargo.map(each => each.quantity)
            setTotalQuantity( quantityArr.reduce((cargoTotal,cargoItem) => 
                  cargoTotal + cargoItem
            ,0))
            
            // setTotalQuantity(state => {
            //     setTotalQuantity(state + cargo[cargo.length - 1]?.quantity)
            // })


        



        
    }, [cargo,value])


    return (
        <>

            <Flex w={`100%`} p={4} flexDirection={[`column`,`colum`,`colum`,`row`,`row`,]} justifyContent={`center`}>
                <Modal trapFocus={false} size={[`full`]} onClose={onClose} isOpen={isOpen} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <Text mb={`auto`} >Add cargo information</Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {!showAddressForm &&
                                <form onSubmit={(e) => addCargo(e)}>
<FormControl isRequired>
                                    <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
                                        <Input name='express' defaultValue={edit && edit?.expressNumber} mt={5} placeholder='Express Number/ Tracking Number' type={`text`} />


                                        <Select defaultValue={edit && edit?.category} name={`category`} onChange={(e) => setBailmentSelectValue(JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data')))} id={`bailmentType`} mt={5} variant='filled' placeholder='Type / Category of consignment' >
                                            {bailments?.docs.map((each, i) => {
                                                if (each.data().category != bailments?.docs[i].category)
                                                    return (
                                                        <option key={`option_${i}`} data={JSON.stringify(each.data())} value={each.data().category}>{each.data().category}
                                                        </option>

                                                    )
                                            }
                                            )
                                            }
                                        </Select>
                                        <Select name={`item`} defaultValue={edit && edit?.item} onChange={(e) => setRate(e.target.options[e.target.selectedIndex].getAttribute('rate'))} mt={5} variant='filled' placeholder='Item' >
                                            {
                                                bailmentSelectValue?.items.map((item, i) => {
                                                    return (

                                                        <option key={i} rate={item.rate} value={item.itemName}>{item.itemName} ----      {bailmentSelectValue?.currency} {item.rate}</option>

                                                    )
                                                })
                                            }
                                        </Select>
                                        <InputGroup alignItems={`center`}>
                                            <Input name='quantity' defaultValue={edit && edit?.quantity} mt={5} placeholder={transportation == `sea` ? `Quantity in ${bailmentSelectValue?.unit}` : `Quantity in kg`} type={`text`} />
                                            {/* <InputRightAddon  >{bailmentSelectValue ? bailmentSelectValue.unit : `--`}</InputRightAddon> */}
                                        </InputGroup>
                                        {/* <Input mt={5}  placeholder='Value (USD)' type={`number`} /> */}
                                        {/* {bailmentSelectValue?.unit != 'pcs'  ? <Input name={`quantity`}  mt={5} placeholder='Quantity' type={`number`} /> : <></>} */}
                                        {/* <Input disabled value={bailmentSelectValue && rate}  {...register('rate')} mt={5} placeholder='Costs' type={`number`} /> */}
                                        <Button mb={5} mt={5} w={`100%`} type={`submit`} color={`#ffffff`} bgColor={`#000000`} >Add</Button>
                                    </InputGroup>
                                    </FormControl>
                                </form>


                            }
                            {showAddressForm && <CreateAdress />}

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
                        <Flex justifyContent={`center`} flexGrow={2} flexDirection={[`column`,`colum`,`colum`,`row`,`row`,]}>
                            
                       <Box>
                                                   <FirstRowHeader title={`Book your Shipment`} leftIcon={<BackButton />} />

                       {error && <Text color={`red`}>{error}</Text>}
                        <Flex>
                            <Image alt={`Route`} src={route} />

                            <InputGroup p={2} flexDirection={`column`}>
                                <Box backgroundImage={map} backgroundSize={`lg`}>
                                    <Flex>
                                        <Box cursor={`pointer`} onClick={() => { setOriginAddressBook(true) }} _hover={{ color: '#ed8b00' }} p={4}>
                                            <Heading as={`h6`} size={`md`}>{origin ? origin?.fullname : `Shipper Information`}</Heading>
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
                                        <Box cursor={`pointer`} onClick={() => { setShowAddressForm(true); onOpen() }} _hover={{ color: '#ed8b00' }} p={4}>
                                            <Heading as={`h6`} size={`md`}>{select ? select?.fullname : `Receiver Information`}</Heading>
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
                                return (<ListItem key={'cargo_' + index} leftIcon={<AiOutlineContainer />} title={each?.category + ' ' + '$' + each?.price} label={each?.quantity + each?.unit + ' ' + each?.expressNumber} click={() => null} crud onDelete={() => removeCargo(each)} onEdit={() => editCargo(each)} />
                                )

                            })
                        }


                       </Box>
                        </Flex>
                        <Flex justifyContent={`center`} flexGrow={2} flexDirection={[`column`,`colum`,`colum`,`row`,`row`,]}>
                        <form onSubmit={(e) => submitForm(e)}>
                        <FormControl isRequired>
                        <Select mb={5} onChange={(e) => { setTransportation(e.target.value) }} mt={5} name='method' placeholder='Shipping Method' variant={`filled`} >
                                <option value={`sea`}>Sea</option>
                                <option value={`air`}>Air</option>
                            </Select>

                        <Button w={`100%`} mb={5} onClick={() => { setShowAddressForm(false); onOpen() }} color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Add a consignment</Button>
                        
                            <Select onChange={(e) => { setValue(e.target.value) }} name='value' mt={5} placeholder='Value-added services' variant={`filled`} >
                            <optgroup label={`Add ons`}>  
                            <option value={0.5}>Phone cover + protector -- $ 0.5</option>
                            <option value={16}>Packaging -- $ 16</option>
                            </optgroup>
                            </Select>
                          
                           
                            <Select name='payment_method' mt={5} placeholder='Payment method' variant={`filled`} >
                                <option value={`MPESA`}>MPESA</option>
                                <option value={`Cash`}>Cash</option>
                                <option value={`Bank Transfer`}>Bank Transfer</option>
                            </Select>
                           </FormControl>
                            <Textarea {...register('remarks')} mb={5} mt={5} placeholder='Remarks' />
                            <Flex>

                                <Radio mr={3} />

                                <small>I have read and agreed to Takers Cargo
                                    Terms and conditions of Delivery</small>
                            </Flex>
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
                            <Button isLoading={loading} loadingText='Booking' type='submit' w={`100%`} mt={5} color={`#ffffff`} bgColor={!error ? `#000000` : `red`} leftIcon={<AiOutlinePlus />}>Book</Button>
                        </form>
                        </Flex>
                    </>}
            </Flex>
            <br />
            <br />
            <br />

        </>
    );
};



export default Book;