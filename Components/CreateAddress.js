import React,{useContext} from 'react';
import { Flex, Input, Button, InputGroup, Spacer } from "@chakra-ui/react";
import FirstRowHeader from '../Components/FirstRowHeader';
import { AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai'
import { useForm } from "react-hook-form";
import SelectAddressContext from '../contexts/SelectAddressContext.js';

const CreateAdress = ({mode}) => {
    const { handleSubmit, register } = useForm();
    const { select, setSelect } = useContext(SelectAddressContext)


    const save = (values) =>{
        console.log(values);
        setSelect(values)
        

    }
    return (
        <>

        <Flex position={`relative`} p={4} flexDirection={`column`} justifyContent={`center`}>
            <InputGroup p={4} flexDirection={`column`}>
                <Input   {...register('fullname')} mt={5}  placeholder='Full Name' type={`text`} />
                <Input   {...register('phone')} mt={5}  placeholder='Phone Number' type={`text`} />
                <Input   {...register('email')} mt={5}  placeholder='Email' type={`text`} />
                <Input   {...register('country')} mt={5}  placeholder='Country' type={`text`} />
                <Input   {...register('detailedAddress')} mt={5}  placeholder='Detailed Address' type={`text`} />

            </InputGroup>
            <Button onClick={handleSubmit(save)} mb={5} color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Save Address</Button>
 
            
        </Flex>
    </>
    );
};

export default CreateAdress;