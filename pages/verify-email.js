import React from 'react';
import { Text,Center,HStack ,Radio,PinInput,PinInputField, Heading,Button ,FormControl, InputGroup ,InputLeftElement ,Input ,  Box, Container, Flex  } from '@chakra-ui/react'
import Image from 'next/image';
import truck from '../assets/openTruck.svg';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import {AiOutlineMail,AiOutlineArrowLeft} from 'react-icons/ai'
import FirstRowHeader from '../Components/FirstRowHeader';
import Truck from '../assets/truckFront.svg'
import BackButton from '../Components/BackButton';


const VerifyEmail = () => {
    const router = useRouter();
    const verified = true;

    return (
        <>
        { verified && <Flex mt={`20%`} mb={`10%`} textAlign={`right`} justifyContent={`right`}>
                        <Image  src={Truck} />
                        </Flex>}
                        <Flex  p={5} flexDirection={[`column`,`column`,`row`,`row`,`row`]} flex={1}>
                        {!verified && 
                        <>
                        <FirstRowHeader title={`New account`} leftIcon={<BackButton />} />

<Heading as={`h4`} size={`md`} mt={0} >
Enter the 4 digit code we sent you to verify your phone number
</Heading>

<Flex flexDirection={`row`} justifyContent={`center`}  mt={`5%`}>
<HStack >
<PinInput otp>
<PinInputField />
<PinInputField />
<PinInputField />
<PinInputField />
</PinInput>
</HStack>

</Flex>
<Button  mb={5}  mt={5} w={`100%`}    color={`#00000`}  variant={`outline`} >Resend Code</Button>
<Button  mb={5}  mt={5} w={`100%`} onClick={() => router.push(`/verify-email`)}    color={`#ffffff`} bgColor={`#000000`} >Continue</Button>

                        </>}
{
    verified &&  
           <>
           <Heading as={`h4`} size={`md`} >
    You are ready to book
 </Heading>
 <Text>Your account is now activated.You may book your first shipment.</Text>
 <Button  mb={5} w={`auto`} onClick={() =>{router.push(`/`)}}   color={`#ffffff`} bgColor={`#000000`} >Let's book</Button>

           </>
}
</Flex>
        </>

    );
};

export default VerifyEmail;