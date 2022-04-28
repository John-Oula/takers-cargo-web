import { Button, Flex, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import BackButton from '../../Components/BackButton';
import FirstRowHeader from '../../Components/FirstRowHeader';
import AuthContext from '../../contexts/AuthContext';



const ResetPassword = () => {
    const [passwordSent, setEmailSent] = useState(false)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const { passwordUpdate ,user } = useContext(AuthContext)
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


    const updatePassword = async (e) => {

        e.preventDefault()
        setLoading(true)
        setError('')

        await passwordUpdate(user,e.target.password.value)
            .then(() => {
                showToast('Password updated successfully','','success')

                setLoading(false)

            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
                switch (err.code) {
                    case "auth/requires-recent-login":
                        setError(`Please login again`)
                        
                        break;
                
                    default:
                        break;
                }
            })

    }

    return (
        <>

            <Flex p={5} flexDirection={[`column`, `column`, `row`, `row`, `row`]} flex={1}>

                <>
                    <FirstRowHeader title={`Forgot Password`} leftIcon={<BackButton />} />

                   

                    <Text textAlign={`center`} color={`red`}>{error && error}</Text>

                    <Flex flexDirection={`row`} justifyContent={`center`} mt={`5%`}>
                        <form onSubmit={(e) => updatePassword(e)} >
                            <Input name={`password`} placeholder='Enter your password ' type={`password`} />
                            <Button mb={5} mt={5} w={`100%`} isLoading={loading} loadingText={`Updating Password...`} type={`submit`} color={`#ffffff`} bgColor={`#000000`} >{ `Update Password`}</Button>

                        </form>
                    </Flex>

                </>


            </Flex>
        </>

    );
};

export default ResetPassword;