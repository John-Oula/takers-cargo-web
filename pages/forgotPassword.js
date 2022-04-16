import { Button, Flex, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import BackButton from '../Components/BackButton';
import FirstRowHeader from '../Components/FirstRowHeader';
import AuthContext from '../contexts/AuthContext';



const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useContext(AuthContext)
    const toast = useToast()
    const showToast = (title,description,status) =>{
        
        toast({
          title: title,
          description: description,
          status: status,
          duration: 10000,
          isClosable: true,
        })
  }
    const actionCodeSettings = {
        url: 'https://cargo.antratechstudios.com/login'
    }

    const sendEmail = async (e) => {

        e.preventDefault()
        setLoading(true)
        setError('')

        await resetPassword(e.target.email.value,actionCodeSettings)
            .then(() => {
                setEmailSent(true)
                showToast('A password reset  link has been sent to your email.',"Click on the link in the email to reset your password",'success')

                setLoading(false)

            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })

    }

    return (
        <>

            <Flex p={5} flexDirection={[`column`, `column`, `row`, `row`, `row`]} flex={1}>

                <>
                    <FirstRowHeader title={`Forgot Password`} leftIcon={<BackButton />} />

                    <Heading textAlign={`center`} as={`h4`} size={`md`} mt={0} >
                        Enter your email
                    </Heading>

                    <Text color={`red`}>{error && error}</Text>

                    <Flex flexDirection={`row`} justifyContent={`center`} mt={`5%`}>
                        <form onSubmit={(e) => sendEmail(e)} >
                            <Input name={`email`} placeholder='Enter your email ' type={`email`} />
                            <Button mb={5} mt={5} w={`100%`} isLoading={loading} loadingText={`Sending link...`} type={`submit`} color={`#ffffff`} bgColor={`#000000`} >{emailSent ? `Resend link` : `Send Password Reset Link`}</Button>

                        </form>
                    </Flex>

                </>


            </Flex>
        </>

    );
};

export default ForgotPassword;