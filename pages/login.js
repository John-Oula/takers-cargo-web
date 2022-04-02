import React from 'react';
import { Text,Center, Heading,Button,  Modal,
    ModalOverlay,useDisclosure ,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton ,FormControl, InputGroup ,InputLeftElement ,Input ,  Box, Container, Flex  } from '@chakra-ui/react'
import Image from 'next/image';
import truck from '../assets/openTruck.svg';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import {AiOutlineMail,AiOutlineGoogle} from 'react-icons/ai'



const Login = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()

    
    return (
        <Flex  p={5} flexDirection={[`column`,`column`,`row`,`row`,`row`]} flex={1}>
            <Modal size={[`full`]} onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader><Heading as={`h3`} size={`2xl`}  >
                Welcome back!
            </Heading>
            <Text mb={`auto`} >Fill the form to gain access</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
                <Input mt={5}  placeholder='Email / Phone Number / username' type={`text`} />
                <Input mt={5}  placeholder='Password' type={`text`} />
        
                <Button  mb={5}  mt={5} w={`100%`} onClick={onOpen}    color={`#ffffff`} bgColor={`#000000`} >Login</Button>
                <Link href={`/forgot-password`} color={`#ed8b00`}> Forgot password?</Link>
            </InputGroup>

          </ModalBody>
            <ModalFooter alignItems={`center`}>
            <Text textAlign={`center`}>Don’t have an account?<Link href={`/signup`} color={`#ed8b00`}> Sign up</Link></Text>

            </ModalFooter>
          </ModalContent>
        </Modal>
            <Image  src={truck} />
            <Heading as={`h3`} size={`2xl`} mt={105} >
                Welcome to <br/> Takers Cargo
            </Heading>
            <Text mb={`auto`} >Convinient sourcing from Turkey/China
to Tanzania</Text>
<Flex flexDirection={`column`}  mt={`30%`}>
<Button  mb={5} w={`auto`} onClick={() =>{ router.push(`/login`)}}   leftIcon={<AiOutlineGoogle color={`#ffffff`} />} color={`#ffffff`} bgColor={`#000000`} >Google</Button>

<Button  mb={5} w={`auto`} onClick={onOpen}   leftIcon={<AiOutlineMail color={`#ffffff`} />} color={`#ffffff`} bgColor={`#000000`} >Login with email</Button>
<Text textAlign={`center`}>Don’t have an account?<Link href={`/signup`} color={`#ed8b00`}> Sign up</Link></Text>
        </Flex>
</Flex>
    );
};

export default Login;