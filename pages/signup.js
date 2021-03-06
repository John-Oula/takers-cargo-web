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
import { addDocumentWithId, updateDocument } from '../lib';
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
    const [emailSent,setEmailSent] =  useState(false)
    const toast = useToast()
    const actionCodeSettings = {
        url: 'https://cargo.antratechstudios.com'
    }
    useEffect(() => {
        if (user && user.emailVerified) {
            
          router.push("/");
          
        }
        
      }, [user]);

      const resendVerification = () =>{
        emailVerification(user,actionCodeSettings)
        .then(() => {
            showToast('A verification link has been sent to your email.',"Click on the link in the email to verify",'success')


            setLoading(false)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage);
            setLoading(false)
        })

      }
    const showToast = (title,description,status) =>{
        
          toast({
            title: title,
            description: description,
            status: status,
            duration: 10000,
            isClosable: true,
          })
    }


    const onSubmit = async (values) => {
        setError('')
        setLoading(true)
        if (values?.password != values?.confirmPassword) {
            setError(`Passwords don't match`)
            setLoading(false)
        }
        if(values){
           await signup(values.email, values.password)
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
                    creationDate: serverTimestamp(),
                    role:"user",
                    emailVerified: false,
                    verificationEmailSent: false

                }

                
                
             
         
                updateUserProfile(user,{
                    phoneNumber: values?.phoneNumber,
                    displayName: values?.fullname,

                })
                .then(() =>{
                    addDocumentWithId(`Users`, data, user.uid)
                    .then(() => {

             // Set custom claim i.e Role   
            const payload = {uid:user.uid,email:user.email}

              fetch('http://localhost:3000/api/roles',{method:"POST",body:JSON.stringify(payload)})
             .then(res =>{
             

                emailVerification(user,actionCodeSettings)
                .then(() => {

                    updateDocument(user.uid, `Users`,{verificationEmailSent: true})
                    .then(()=>{
                        showToast('A verification link has been sent to your email.',"Click on the link in the email to verify",'success')
                        setEmailSent(true)

                        setLoading(false)
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        console.log(errorMessage);
                        setLoading(false)
                        setEmailSent(false)

                    })

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(errorMessage);
                    setLoading(false)
                    setEmailSent(false)

                })
               
             
             })
             .catch(e => console.log(e.message)) 
                        

                        
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
                    {!emailSent  ? `To start please fill with your personal info` : `Please verify your email`}
                </Heading>

                <Flex flexDirection={`column`} mt={`5%`}>
                    { !emailSent && <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
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
                    </InputGroup>}
                    {emailSent &&
                    <>
                    <Button onClick={resendVerification}>Resend Verification</Button>
                    </>
                    
                    }
                </Flex>



            </Flex>
        </>
    );
};

export default Signup;