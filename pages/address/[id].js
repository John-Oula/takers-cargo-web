import React from 'react';
import { Box, Flex, Text, TextArea , Radio, Center, Heading, FormControl, Input, Button, InputGroup, Spacer } from "@chakra-ui/react";
import FirstRowHeader from '../../Components/FirstRowHeader';
import { AiOutlineCreditCard, AiOutlineArrowRight, AiOutlineCalculator, AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai'
import ListItem from "../../Components/ListItem";
import BackButton from '../../Components/BackButton';
 
const CreateAdress = () => {
    return (
        <>
        <FirstRowHeader title={`Address Book`} leftIcon={<BackButton />} />

        <Flex position={`relative`} p={4} flexDirection={`column`} justifyContent={`center`}>
            <InputGroup p={4} flexDirection={`column`}>
                <Input mt={5}  placeholder='Full Name' type={`text`} />
                <Input mt={5}  placeholder='Phone Number' type={`text`} />
                <Input mt={5}  placeholder='Email' type={`text`} />
                <Input mt={5}  placeholder='Country' type={`text`} />
                <Input mt={5}  placeholder='Detailed Address' type={`text`} />

            </InputGroup>
            <Button mb={5} color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Save Address</Button>
 
            
        </Flex>
    </>
    );
};

export default CreateAdress;