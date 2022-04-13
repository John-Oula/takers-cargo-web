
import React,{useState,useContext,useEffect} from "react";
import { Text,Modal,Grid,GridItem,
  ModalOverlay, useDisclosure,
  ModalContent,
  ModalHeader,Spacer,
  ModalFooter,
  ModalBody,
  ModalCloseButton,Center, Heading,Button ,FormControl, InputGroup ,InputLeftElement ,Input ,  Box, Container, Flex,Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
import Slider from '../Components/Slider.js';
import OrderCard from '../Components/OrderCard.js';
import { useRouter } from 'next/router';
import {QrIcon,LiveSupportAgentHeadsetIcon, SearchIcon ,ChevronRightIcon} from '../icons/dist/cjs'
import { useForm } from "react-hook-form";
import { db } from '../firebase/initFirebase';
import {  getDoc,doc } from 'firebase/firestore'
import AuthContext from '../contexts/AuthContext';



function App() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm();
  const [search,setSearch] = useState()
  const { user } = useContext(AuthContext)

  const onSubmit = async (values) =>{
    onOpen();
    const docRef = doc(db, `Bookings`, values?.search);
    const docSnap = await getDoc(docRef)
    setSearch({...docSnap.data(),id:docSnap.id})

  }

  useEffect(() => {
     if (user == null) {
      router.push("/login");
    }
  }, [user]);

  return (
<Box overflow={`hidden`} h={`100%`} w={`100%`} bgColor={`#000000`}>
<Modal size={[`sm`]} onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay />
    <ModalContent>


        <ModalCloseButton />
        <ModalBody >

            <OrderCard data={search} />

        </ModalBody>
        <ModalFooter alignItems={`center`}>

        </ModalFooter>
    </ModalContent>
</Modal>
  <Flex pt={[5]} pb={[5]} alignItems={`center`}>
    <Flex  justifyContent={`center`} flexGrow={1}><QrIcon  width={24} height={24} color={`#ffffff`} /></Flex>
    <Flex justifyContent={`center`} alignItems={`center`} flexGrow={1}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <InputGroup w={`auto`}>

      <InputLeftElement pointerEvents='none' >
        <SearchIcon color='#000000'/>
      </InputLeftElement>

        
        <Input {...register('search')}   bg={`#ffffff`} placeholder={`Tracking Number`} />
        <Button display={`none`} type={`submit`}></Button>
        
        </InputGroup>
</form>
      
      </Flex>

    <Flex  justifyContent={`center`}flexGrow={1}><LiveSupportAgentHeadsetIcon  width={24} height={24} color={`#ffffff`} /></Flex>

    
  </Flex>
  <Center>
  <Heading mb={[10]} color={`#ed8b00`} as={`h6`} size={`sm`}>Book & Track your shipments</Heading>

  </Center>
  <Box h={`100%`} bgColor={`#ffffff`} borderTopLeftRadius={15} borderTopRightRadius={15}>
    <Center >
      <Flex mt={10}>
        <Flex flexGrow={2}>
        <Button w={`auto`} onClick={() =>{ router.push('/book')}}  p={[5]} h={`auto`} color={`#ffffff`} bgColor={`#000000`}><br/>BOOK</Button>

        </Flex>
        <Flex flexGrow={1} pl={[3]} flexDirection={`column`}>
          <Button onClick={() =>{ router.push('/calculator')}} rightIcon={<ChevronRightIcon color='#ed8b00'/>} h={`auto`} p={[5]} mb={3} textAlign={`start`}  overflow={`break-word`} color={`#ffffff`} bgColor={`#000000`}>FREIGHT <br/> CALCULATOR</Button>
          <Button onClick={() =>{ router.push('/user/orders')}} rightIcon={<ChevronRightIcon color='#ed8b00'/>} h={`auto`} p={[5]}  textAlign={`start`}  color={`#ffffff`} bgColor={`#000000`}>ORDERS</Button>
        </Flex>
      </Flex>
    </Center>
<Box w={`1000px`} mt={10} overflowX={`hidden`}>
<Center>
  <Slider />
</Center>
</Box>
  </Box>
</Box>
  );
}

export default App;
