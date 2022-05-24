import React, {useState,useRef,useEffect,useContext} from 'react';
import { Text,Center,Circle, Modal,
    ModalOverlay,useDisclosure ,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton ,Radio,PinInput,PinInputField, Heading,Button ,FormControl, InputGroup ,InputLeftElement ,Input ,  Box, Container, Flex  } from '@chakra-ui/react'
import picture from '../../../assets/PictureUpload.svg'
import Image from 'next/image'
import FirstRowHeader from '../../../Components/FirstRowHeader';
import BackButton from '../../../Components/BackButton';
import { useForm } from "react-hook-form";
import AuthContext from '../../../contexts/AuthContext';
import {  doc,getDoc,query,updateDoc, where } from 'firebase/firestore'
import {db} from '../../../firebase/initFirebase'
import { updateArrField, updateDocument } from '../../../lib';



export const getServerSideProps = async (ctx) => {
    // const data = getOneDocument(ctx.query.id,`Bookings`)
    const docRef = doc(db, `Users`, ctx.query.id);
    const docSnap = await getDoc(docRef);
   
    // if (!data) return { notFound: true };
    return { props: { data : JSON.stringify(docSnap.data()) || [] } };
  };


const EditProfile = ({data}) => {
    const userData = JSON.parse(data)
    const { user,updateUserProfile,emailUpdate,reAuthUser} = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure()


    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const { handleSubmit, register } = useForm();



// Prompt user to reathenticate
// Opens a modal
    useEffect(()=>{
        switch (error) {
            case 'auth/requires-recent-login':
                onOpen()
                
                break;
        
            default:
                break;
        }
    },[error])


    const reauthenticate = async (e) =>{
        setModalLoading(true)
        setError(``)
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
      
       await reAuthUser(user,data)
       .then(()=>{
           setSuccess(`You can now update your information`)
                   setModalLoading(false)

           onClose()

       })
       .catch((error)=>{
        setModalLoading(false)

           setError(error.message)
       })

    }
    const onSubmit = async (values) => {
        setError('')
        setSuccess(``)
 

        setLoading(true)
       
        const {email,phoneNumber,displayName} = values
       

        await emailUpdate(user,email)
        .then(()=>{
            updateDocument(user?.uid,`Users`,values)
            .then(()=>{
                setSuccess(`Profile updated`)
                // if(values.phone != userData.phone){
                //     const q = query(collRef, where("bookedFor", "array-contains", userData.phone));
                //     updateArrField(`Bookings`,`bookedFor`,values.phone)
                //     .then(()=>setLoading(false))

                //     .catch(error =>{
                //         console.log(error.message);
                //         setError(error.message)
                //                             setLoading(false)
        
                //     })
                // }
                setLoading(false)


            })
            .catch(error =>{
                console.log(error.message);
                setError(error.message)
                                    setLoading(false)

            })
        })
        .catch(error =>{
            console.log(error.message);
            setError(error.code)
                                setLoading(false)

        })
        
        // if(emailRef){
           
        // }
        // else{
        //     setError(`Email already exists`)
        //     setLoading(false)
        // }

    }

    return (
        <Flex flexDirection={`column`} justifyContent={`center`}>
               <Modal size={[`full`]} onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader><Heading as={`h3`} size={`2xl`}  >
                
            </Heading>
            <Text mb={`auto`} >Fill the form to change your information</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={(e) => reauthenticate(e)}>
            <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
            {error && <Text color={`red`}>{error}</Text>}

    
                <Input mt={5} name={`email`}  placeholder='Email' type={`text`} />
                <Input mt={5} name={`password`}  placeholder='Password' type={`text`} />
               
                <Button loadingText='Validating ...' isLoading={modalLoading} type={'submit'}   mb={5}  mt={5} w={`100%`}    color={`#ffffff`} bgColor={`#000000`} >Confirm </Button>

            </InputGroup>
            </form>

          </ModalBody>
     
          </ModalContent>
        </Modal>
                        <FirstRowHeader title={`New account`} leftIcon={<BackButton />} />
                       <Center>
                       <Circle  overflow={`hidden`} w={100} h={100}>
            <Image src={picture} alt={`Profile Picture`} />
            </Circle>
                       </Center>
                       {error || success && <Text textAlign={`center`} color={error ? `red` : `green`}>{error}{success}</Text>}

            <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
                    <Input  defaultValue={userData?.fullname} {...register('fullname')}  mt={5}  type={`text`} />
                    <Input defaultValue={userData?.username || ``} placeholder={`Username`} {...register('username')}  mt={5}  type={`text`} />
                    
                    <Input defaultValue={userData?.phoneNumber || userData?.phone } {...register('phone')}  mt={5}  type={`text`} />
                    <Input  defaultValue={userData?.email} placeholder={`Email`} {...register('email')}  mt={5}  type={`text`} />
                    
                  

                    <Button isLoading={loading} loadingText={`Updating...`} onClick={handleSubmit(onSubmit)} mb={5} mt={5} w={`100%`} color={`#ffffff`} bgColor={`#000000`} >Apply Changes</Button>
                </InputGroup>
        </Flex>
    );
};

export default EditProfile;