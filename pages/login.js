import React,{useState,useContext} from 'react';
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
import {useRouter} from 'next/router'
import {PhoneIcon,MailIcon,LogoGoogleIcon} from '../icons/dist/cjs'
import { RecaptchaVerifier , signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase/initFirebase';
import { useForm } from "react-hook-form";
import { GoogleAuthProvider } from "firebase/auth";
import { addDocumentWithId } from '../lib';
import AuthContext from '../contexts/AuthContext';


const Login = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [withEmail,setWithEmail] = useState()
    const [phone,setPhone] = useState()
    const { handleSubmit, register } = useForm();
    const { setUser,login ,googleSignin} = useContext(AuthContext)
    const [error,setError] = useState()
    const [loading,setLoading] = useState()

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log(response);
              onSignInSubmit();
              
            }
          }, auth);
    }

    const loginWithEmail = (values) =>{
      setError('')
      setLoading(true)
      login(values.email,values.password)
      .then(userCredentials =>{
        const user = userCredentials.user
        setUser(user)
        setLoading(false)
        router.push(`/`)

      })
      .catch(error=>{
        setLoading(false)

        setError(error.message)
      })
    }


    const loginWithGoogle = () =>{
    googleSignin()
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    const data = {
        userId: user.uid,
        email: user.email,
        fullname: user?.displayName,
        online: true,
        phone: user?.phone,
        shipments: 0,
        creationDate: serverTimestamp()

    }
    addDocumentWithId(`Users`, data, user.uid)
        .then(() => {

            // router.push(`/verify-email`)
            setLoading(false)
            setUser(user)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage);
            setLoading(false)
        })
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    }
    const loginWithPhone = (values) =>{
        values.preventDefault()
        generateRecaptcha()
          const appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, phone, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      console.log(`verification sent`);
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log(error);
    });
    }


    
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
            <form>
            <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
            {error && <Text color={`red`}>{error}</Text>}

                {withEmail  ? 
                <>
                <Input mt={5}  {...register('email')} placeholder='Email' type={`text`} />
                <Input mt={5} {...register('password')}  placeholder='Password' type={`text`} />
                </>
                :
                <Input mt={5}  {...register('phone')} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' type={`text`} />

                }

                <Button loadingText='Logging in ...' isLoading={loading} type={'submit'} id={`sign-in-button`}  mb={5}  mt={5} w={`100%`} onClick={withEmail ? handleSubmit(loginWithEmail) :(e) => loginWithPhone(e)}    color={`#ffffff`} bgColor={`#000000`} >{ withEmail ? `Login` : `Send Code`} </Button>
                {withEmail ? <Link href={`/forgot-password`} color={`#ed8b00`}> Forgot password?</Link> : <Text cursor={`pointer`}>Resend Code</Text>}

            </InputGroup>
            </form>

          </ModalBody>
            <ModalFooter alignItems={`center`}>
            <Text textAlign={`center`}>Don’t have an account?<Link href={`/signup`} color={`#ed8b00`}> Sign up</Link></Text>

            </ModalFooter>
          </ModalContent>
        </Modal>
            <Image  src={truck} alt={`shipping truck`}  />
            <Heading as={`h3`} size={`2xl`} mt={105} >
                Welcome to <br/> Takers Cargo
            </Heading>
            <Text mb={`auto`} >Convinient sourcing from Turkey/China
to Tanzania</Text>
<Flex flexDirection={`column`}  mt={`30%`}>
<Button  mb={5} w={`auto`} onClick={loginWithGoogle}   leftIcon={<LogoGoogleIcon color={`#ffffff`} />} color={`#ffffff`} bgColor={`#000000`} >Google</Button>

<Button  mb={5} w={`auto`} onClick={() => {setWithEmail(true);onOpen()}}   leftIcon={<MailIcon color={`#ffffff`} />} color={`#ffffff`} bgColor={`#000000`} >Login with email</Button>
<Button  mb={5} w={`auto`} onClick={() => {setWithEmail(false);onOpen()}}   leftIcon={<PhoneIcon color={`#ffffff`} />} color={`#ffffff`} bgColor={`#000000`} >Login with Phone</Button>

<Text textAlign={`center`}>Don’t have an account?<Link href={`/signup`} color={`#ed8b00`}> Sign up</Link></Text>
        </Flex>
</Flex>
    );
};

export default Login;