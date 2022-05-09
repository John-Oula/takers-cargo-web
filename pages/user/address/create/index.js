import React,{useState,useContext} from 'react';
import { Box, Flex, Text, TextArea , Radio, Center, Heading, FormControl, Input, Button, InputGroup, Spacer } from "@chakra-ui/react";
import FirstRowHeader from '../../../../Components/FirstRowHeader';
import {AiOutlinePlus } from 'react-icons/ai'
import BackButton from '../../../../Components/BackButton';
import { useForm } from 'react-hook-form';
import { addDocumentToSubCollection } from '../../../../lib';
import AuthContext from '../../../../contexts/AuthContext';
import { useRouter } from 'next/dist/client/router';

const CreateAdress = () => {
    const { handleSubmit, register } = useForm();
    const [error,setError] = useState()
    const [loading,setLoading] = useState()
    const { user} = useContext(AuthContext)
    const router = useRouter();


    const onSubmit = (values) =>{
        console.log(values);
        setError('')
        setLoading(true)
        addDocumentToSubCollection(`Users`,user?.uid,'address',values)
        .then(doc =>{
          setLoading(false)
          router.push(`/user/address/${user?.uid}`)
  
        })
        .catch(error=>{
          setLoading(false)
  
          setError(error.message)
        })
      }
    return (
        <>
        <FirstRowHeader title={`Address Book`} leftIcon={<BackButton />} />

        <Flex position={`relative`} p={4} flexDirection={`column`} justifyContent={`center`}>
            
            {error && <Text color={`red`}>{error}</Text>}
            <InputGroup p={4} flexDirection={`column`}>
                <Input mt={5} {...register('fullname')} placeholder='Full Name' type={`text`} />
                <Input mt={5} {...register('phone')} placeholder='Phone Number' type={`text`} />
                <Input mt={5} {...register('email')} placeholder='Email' type={`text`} />
                <Input mt={5} {...register('city')} placeholder='City' type={`text`} />

                <Input mt={5} {...register('country')} placeholder='Country' type={`text`} />
                <Input mt={5} {...register('detailedAddress')} placeholder='Detailed Address' type={`text`} />

            </InputGroup>
            <Button isLoading={loading} type={`submit`} onClick={handleSubmit(onSubmit)} mb={5} color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Save Address</Button>

        
            
        </Flex>
    </>
    );
};

export default CreateAdress;