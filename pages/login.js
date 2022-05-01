import React,{useState,useContext,useEffect} from 'react';
import { Text,Center,HStack,PinInput,
  PinInputField ,Heading,Button,  Modal,
    ModalOverlay,useDisclosure ,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,InputRightElement  ,FormControl, InputGroup ,InputLeftElement ,Input ,  Box, Container, Flex  } from '@chakra-ui/react'
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
import { useToast } from '@chakra-ui/react'




const Login = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [withEmail,setWithEmail] = useState()
    const [phone,setPhone] = useState()
    const { handleSubmit, register } = useForm();
    const { setUser,login,user ,googleSignin} = useContext(AuthContext)
    const [error,setError] = useState()
    const [sentSms,setSentSms] = useState(false)
    const [code,setCode] = useState(null)
    const [loading,setLoading] = useState(false)
    const [confirmation,setConfirmation] = useState(null)
    const toast = useToast()

    useEffect(() => {
      if (user) {
        router.push("/");
      } else if (user == null) {
        router.push("/login");
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

    const confirmCode = (code) =>{

    }
    const loginWithPhone = (e) =>{
      e.preventDefault()
    
        generateRecaptcha()
          const appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, phone, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      setSentSms(true);
      showToast('A verification SMS has been sent to your number.',"Enter the code sent in the SMS",'success')
      if(code == null) return;

      confirmationResult.confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        alert(`user`)
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        setError(error.message)
      });
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      setError(error.message)
      console.log(error);
      alert(error.message)
    });
    }


    
    return (
        <Flex h={`100%`} w={`100%`} alignItems={[null,null,`center`,`center`,`center`]} p={5} flexDirection={[`column`,`column`,`column`,`column`,`column`]} >
          
            <Image w={`auto`} h={`100%`} src={truck} alt={`shipping truck`}  />
           <Box mb={15}>
           <Heading as={`h3`} size={`2xl`} mb={5} >
                Welcome to <br/> Takers Cargo
            </Heading>
            <Text mb={`auto`} >Convinient sourcing from Turkey/China
to Tanzania</Text>
           </Box>

<Flex flexDirection={`column`} w={[`100%`,`100%`,`100%`,`30%`,`30%`]} mt={`0%`}>
<Button  mb={5} w={`auto`} onClick={loginWithGoogle}   leftIcon={<LogoGoogleIcon color={`#ffffff`} />} color={`#ffffff`} bgColor={`#000000`} disabled >Google | Coming soon</Button>

<Button  mb={5} w={`auto`} onClick={() => {setWithEmail(true);onOpen()}}   leftIcon={<MailIcon color={`#ffffff`} />} color={`#ffffff`} bgColor={`#000000`} >Login with email</Button>
<Button  mb={5} w={`auto`} onClick={(e) => {setWithEmail(false);onOpen()}}   leftIcon={<PhoneIcon color={`#ffffff`} />} color={`#ffffff`} bgColor={`#000000`} disabled >Login with Phone | Coming soon</Button>

<Text textAlign={`center`}>Don’t have an account?<Link href={`/signup`} color={`#ed8b00`}> Sign up</Link></Text>
        </Flex>  
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

                {withEmail  && 
                <>
                <Input mt={5}  {...register('email')} placeholder='Email' type={`text`} />
                <Input mt={5} {...register('password')}  placeholder='Password' type={`text`} />
                </>
              
                }
{         !withEmail &&    <Input mt={5}  {...register('phone')} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' type={`text`} />
}                  {
                    sentSms && 
                    <>
                    <Flex flexDirection={`row`} justifyContent={`center`}  mt={`5%`}>
<HStack >
<PinInput onComplete={(e) => setCode(e)} otp>
<PinInputField />
<PinInputField />
<PinInputField />
<PinInputField />
<PinInputField />
<PinInputField />
</PinInput>
</HStack>

</Flex>
                    </>
                  }
                <Button loadingText='Logging in ...' isLoading={loading} type={'submit'} id={`sign-in-button`}  mb={5}  mt={5} w={`100%`} onClick={withEmail ? handleSubmit(loginWithEmail) :(e) => loginWithPhone(e)}    color={`#ffffff`} bgColor={`#000000`} >{ withEmail ? `Login` : `Send Code`} </Button>
                {withEmail ? <Link href={`/forgotPassword`} color={`#ed8b00`}> Forgot password?</Link> : <Text cursor={`pointer`}>Resend Code</Text>}

            </InputGroup>
            </form>

          </ModalBody>
            <ModalFooter alignItems={`center`}>
            <Text textAlign={`center`}>Don’t have an account?<Link href={`/signup`} color={`#ed8b00`}> Sign up</Link></Text>

            </ModalFooter>
          </ModalContent>
        </Modal>
</Flex>
    );
};

export default Login;