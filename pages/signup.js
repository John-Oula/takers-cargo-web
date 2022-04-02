import React from 'react';
import { Text, Center, Radio, Heading, Button, FormControl, InputGroup, InputLeftElement, Input, Box, Container, Flex } from '@chakra-ui/react'

import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { AiOutlineMail, AiOutlineArrowLeft } from 'react-icons/ai'
import FirstRowHeader from '../Components/FirstRowHeader';


const Signup = () => {
    const router = useRouter();
    return (
<>

        <Flex p={5} flexDirection={[`column`, `column`, `row`, `row`, `row`]} flex={1}>
            <FirstRowHeader title={`New account`} leftIcon={<BackButton />} />

            <Heading as={`h4`} size={`md`} >
                To start please fill with your personal info
            </Heading>

            <Flex flexDirection={`column`} mt={`5%`}>
                <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
                    <Input mt={5} placeholder='Fullname' type={`text`} />
                    <Input mt={5} placeholder='Mobile Number' type={`text`} />
                    <Input mt={5} placeholder='Email address' type={`text`} />
                    <Input mt={5} placeholder='Password' type={`password`} />
                    <Input mt={5} placeholder='Confirm Password' type={`password`} />
                    <Flex mt={`10%`}>

                        <Radio mr={3} />

                        <small>I have read and agreed to Takers Cargo
                            <Link href={`/`}> Terms and conditions</Link></small>
                    </Flex>

                    <Button mb={5} mt={5} w={`100%`} onClick={() => router.push(`/verify-email`)} color={`#ffffff`} bgColor={`#000000`} >Continue</Button>
                </InputGroup>
            </Flex>
                        


        </Flex>
</>
    );
};

export default Signup;