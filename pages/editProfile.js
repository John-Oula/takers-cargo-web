import React, {useState,useRef} from 'react';
import { Text,Center,Circle ,Radio,PinInput,PinInputField, Heading,Button ,FormControl, InputGroup ,InputLeftElement ,Input ,  Box, Container, Flex  } from '@chakra-ui/react'
import picture from '../assets/PictureUpload.svg'
import Image from 'next/image'
import FirstRowHeader from '../Components/FirstRowHeader';
import BackButton from '../Components/BackButton';
import { useForm } from "react-hook-form";



const EditProfile = () => {
    const hiddenFileInput = useRef(null);
    const [file, setFile] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register } = useForm();


        // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = () => {
        setFile('')
        hiddenFileInput.current.click();
        console.log(file);
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = (event) => {
        setFile(event.target.files[0])
    };


    const onSubmit = async (values) => {
        setError('')
 

        setLoading(true)
        e.preventDefault()
        // Check if username and email already exists
        const usernameRef = await db.collection('Users').where('userName', '==', values.userName).get()
        const emailRef = await db.collection('Users').where('email', '==', values.email).get()
        switch (true) {
            case usernameRef.empty &&  values.userName !== userData?.userName :
                try {
                    //Check if there is an existing file
                    {file && file.size
                        ?
                        storage.ref(`users/${user.uid}/profilePhoto`).put(file)
                            .then(snapshot => {
                                snapshot.ref.getDownloadURL().then((url) => {
                                    if (values) {

                                        user.updateProfile({
                                            displayName: e.target.userName.value,
                                            photoURL: url
                                        })
                                            .then(() => {
                                                console.log('Updated user!')

                                                var updatedInfo = {userProfileImageUrl: url}

                                                Object.assign(values, updatedInfo)
                                                //Update user Info
                                                updateDocument('Users', user.uid, values)
                                                // Update email in Firebase Auth
                                                auth.currentUser.updateEmail(values.email)
                                                    .then(() =>{
                                                        setLoading(false)
                                                    })
                                                    .catch(err =>{
                                                        console.log(err.message)
                                                    })

                                            });

                                    }
                                })
                                setFile('')
                                setLoading(false)

                            })
                            .catch(error => {
                                setLoading(false)
                                console.log(error.message)
                            })
                        :

                        values
                            ?
                            user.updateProfile({displayName: e.target.userName.value})
                                .then(() => {

                                    //Update user Info
                                    updateDocument('Users', user.uid, values)

                                    // Update email in Firebase Auth
                                    auth.currentUser.updateEmail(values.email)
                                        .then(() =>{
                                            setLoading(false)
                                        })
                                        .catch(err =>{
                                            console.log(err.message)
                                        })
                                })
                                .catch(e => console.log(e))
                            :
                            console.log('Error updating')


                    }

                } catch (e) {
                    setLoader(false)
                    console.log(e.message)
                    console.log('error')
                    setLoading(false)

                }
                break;
            case emailRef.empty &&  values.email !== userData?.email :
                try {
                    //Check if there is an existing file
                    {file && file.size
                        ?
                        storage.ref(`users/${user.uid}/profilePhoto`).put(file)
                            .then(snapshot => {
                                snapshot.ref.getDownloadURL().then((url) => {
                                    if (values) {

                                        user.updateProfile({
                                            displayName: e.target.userName.value,
                                            photoURL: url
                                        })
                                            .then(() => {
                                                console.log('Updated user!')

                                                var updatedInfo = {userProfileImageUrl: url}

                                                Object.assign(values, updatedInfo)
                                                //Update user Info
                                                updateDocument('Users', user.uid, values)
                                                // Update email in Firebase Auth
                                                auth.currentUser.updateEmail(values.email)
                                                    .then(() =>{
                                                        setLoading(false)
                                                    })
                                                    .catch(err =>{
                                                        console.log(err.message)
                                                    })

                                            });

                                    }
                                })
                                setFile('')
                                setLoading(false)

                            })
                            .catch(error => {
                                setLoading(false)
                                console.log(error.message)
                            })
                        :

                        values
                            ?
                            user.updateProfile({displayName: e.target.userName.value})
                                .then(() => {

                                    //Update user Info
                                    updateDocument('Users', user.uid, values)

                                    // Update email in Firebase Auth
                                    auth.currentUser.updateEmail(values.email)
                                        .then(() =>{
                                            setLoading(false)
                                        })
                                        .catch(err =>{
                                            console.log(err.message)
                                        })
                                })
                                .catch(e => console.log(e))
                            :
                            console.log('Error updating')


                    }

                } catch (e) {
                    setLoader(false)
                    console.log(e.message)
                    console.log('error')
                    setLoading(false)

                }
                break;
            case !usernameRef.empty &&  values.userName !== userData?.userName :
                setError('Username not available')
                setLoading(false)
                break;
            case !emailRef.empty &&  values.email !== userData?.email :
                setError('Email already in use')
                setLoading(false)
                break;
            default:
                setLoading(false)

                break;



        }

    }

    return (
        <Flex flexDirection={`column`} justifyContent={`center`}>
                        <FirstRowHeader title={`New account`} leftIcon={<BackButton />} />
                       <Center>
                       <Circle onClick={handleClick} overflow={`hidden`} w={100} h={100}>
            <Image src={picture} />
            </Circle>
                       </Center>
            <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
                    <Input {...register('fullName')}  mt={5} placeholder='Fullname' type={`text`} />
                    <Input {...register('username')}  mt={5} placeholder='Username' type={`text`} />
                    <Input {...register('phone')}  mt={5} placeholder='Mobile Number' type={`text`} />
                    <Input {...register('email')}  mt={5} placeholder='Email address' type={`text`} />
                    
                    <input
                                            name={`photo`}
                                            type="file"
                                            ref={hiddenFileInput}
                                            onChange={handleChange}
                                            style={{display: 'none'}}

                                        />

                    <Button onClick={handleSubmit(onSubmit)} mb={5} mt={5} w={`100%`} color={`#ffffff`} bgColor={`#000000`} >Apply Changes</Button>
                </InputGroup>
        </Flex>
    );
};

export default EditProfile;