import React,{useState,useContext} from 'react';
import { Box, Flex, Text, TextArea , Radio, Center, Heading, FormControl, Input, Button, InputGroup, Spacer } from "@chakra-ui/react";
import FirstRowHeader from '../../../Components/FirstRowHeader';
import { AiOutlineCreditCard, AiOutlineArrowRight, AiOutlineCalculator, AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai'
import ListItem from "../../../Components/ListItem";
import BackButton from '../../../Components/BackButton';
import {  collection, getDoc , doc } from 'firebase/firestore'
import {db} from '../../../firebase/initFirebase'
import { useForm } from 'react-hook-form';
import AuthContext from '../../../contexts/AuthContext';
import {useRouter} from 'next/router'
import { updateDocumentInSubCollection } from '../../../lib';


export const getServerSideProps = async (ctx) => {
    
    const docRef = doc(db, "Users", ctx.query.id[0], `address/${ctx.query.id[1]}`);
    const docSnap = await getDoc(docRef);
   
    if (!docSnap.data()) return { notFound: true };
    return { props: { data : JSON.stringify(docSnap.data()) || {} } };
  };

  const CreateAdress = ({data}) => {
      const formData = JSON.parse(data)
    const { handleSubmit, register } = useForm();
    const [error,setError] = useState()
    const [loading,setLoading] = useState()
    const { user} = useContext(AuthContext)
    const router = useRouter();


    const onSubmit = (values) =>{
        console.log(values);
        setError('')
        setLoading(true)
        updateDocumentInSubCollection(`Users`,user?.uid,'address', router.query.id[1] , values)
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
        <FirstRowHeader title={`Edit Address`} leftIcon={<BackButton />} />

        <Flex position={`relative`} p={4} flexDirection={`column`} justifyContent={`center`}>
            
            {error && <Text color={`red`}>{error}</Text>}
            <InputGroup p={4} flexDirection={`column`}>
                <Input mt={5} defaultValue={formData?.fullname} {...register('fullname')} placeholder='Full Name' type={`text`} />
                <Input mt={5} defaultValue={formData?.phone} {...register('phone')} placeholder='Phone Number' type={`text`} />
                <Input mt={5} defaultValue={formData?.email} {...register('email')} placeholder='Email' type={`text`} />
                <Input mt={5} defaultValue={formData?.city} {...register('city')} placeholder='City' type={`text`} />
                <Input mt={5} defaultValue={formData?.country} {...register('country')} placeholder='Country' type={`text`} />
                <Input mt={5} defaultValue={formData?.detailedAddress} {...register('detailedAddress')} placeholder='Detailed Address' type={`text`} />

            </InputGroup>
            <Button isLoading={loading} type={`submit`} onClick={handleSubmit(onSubmit)} mb={5} color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Save Address</Button>

        
            
        </Flex>
    </>
    );
};

export default CreateAdress;