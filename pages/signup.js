import React, { useState,useContext , useEffect} from 'react';
import { Text, Center, Radio, Heading, Button, FormControl, InputGroup, InputLeftElement, Input, Box, Container, Flex } from '@chakra-ui/react'

import Link from 'next/link';
import {useRouter} from 'next/router'
import { AiOutlineMail, AiOutlineArrowLeft } from 'react-icons/ai'
import FirstRowHeader from '../Components/FirstRowHeader';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/initFirebase';
import BackButton from '../Components/BackButton';
import { useForm } from "react-hook-form";
import { addDocumentWithId } from '../lib';
import { serverTimestamp } from "firebase/firestore";
import AuthContext from '../contexts/AuthContext';
import { useToast } from '@chakra-ui/react'

const Signup = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const { handleSubmit, register } = useForm();
    const [error, setError] = useState()
    const [emailVerified, setEmailVerified] = useState(false)
    const { setUser,signup ,updateUserProfile, emailVerification,user} = useContext(AuthContext)
    const toast = useToast()
    useEffect(() => {
        if (user) {
          router.push("/");
        }
        
      }, [user]);
    const showToast = (title,description,status) =>{
        
          toast({
            title: title,
            description: description,
            status: status,
            duration: 10000,
            isClosable: true,
          })
    }


    const onSubmit = (values) => {
        setError('')
        setLoading(true)
        if (values?.password != values?.confirmPassword) {
            setError(`Passwords don't match`)
            setLoading(false)
        }
        if(values){
            signup(values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user)
                const data = {
                    userId: user.uid,
                    email: user.email,
                    fullname: values?.fullname,
                    online: true,
                    phone: values?.phoneNumber,
                    shipments: 0,
                    creationDate: serverTimestamp()

                }
                updateUserProfile(user,{
                    phoneNumber: values?.phoneNumber,
                    displayName: values?.fullname,

                })
                .then(() =>{
                    addDocumentWithId(`Users`, data, user.uid)
                    .then(() => {
                        showToast('A verification link has been sent to your email.',"Click on the link in the email to verify",'success')

                        emailVerification(user)
                        .then(() => {
                            showToast('Email has been verified.',"Redirecting...",'success')

                            setLoading(false)

                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ..
                            console.log(errorMessage);
                            setLoading(false)
                        })

                        
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        console.log('58' ,errorMessage);
                        setLoading(false)
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(error.message)
                    setLoading(false)
                })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(error.message)
                setLoading(false)
            });
        }
                //    switch (errorCode) {
                //        case (`auth/weak-password`):
                //         setError(`Password should be at least 6 characters`)
                //         setLoading(false)

                //            break;

                //        default:
                //            break;
                //    }

                // ..
         
    }

    useEffect(()=>{
        if(user?.emailVerified){
            setEmailVerified(true)
            router.push(`/`)
        }
    },[user])
    return (
        <>

            <Flex p={5} flexDirection={[`column`, `column`, `row`, `row`, `row`]} flex={1}>
                <FirstRowHeader title={`New account`} leftIcon={<BackButton />} />
                <Heading as={`h4`} size={`md`} >
                    To start please fill with your personal info
                </Heading>

                <Flex flexDirection={`column`} mt={`5%`}>
                    <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
                        {error && <Text color={`red`}>{error}</Text>}
                        <Input {...register('fullname')} mt={5} placeholder='Fullname' type={`text`} />
                        <Input {...register('phoneNumber')} mt={5} placeholder='Mobile Number' type={`text`} />
                        <Input {...register('email')} mt={5} placeholder='Email address' type={`email`} />
                        <Input {...register('password')} mt={5} placeholder='Password' type={`password`} />
                        <Input {...register('confirmPassword')} mt={5} placeholder='Confirm Password' type={`password`} />
                        <Flex mt={`10%`}>

                            <Radio mr={3} />

                            <small>I have read and agreed to Takers Cargo
                                <Link href={`/`}> Terms and conditions</Link></small>
                        </Flex>

                        <Button isLoading={loading} loadingText={`Signing up ...`} mb={5} mt={5} w={`100%`} onClick={handleSubmit(onSubmit)} color={`#ffffff`} bgColor={`#000000`} >Continue</Button>
                    </InputGroup>
                </Flex>



            </Flex>
        </>
    );
};

export default Signup;