import React, {useState,useRef,useContext} from 'react';
import { Text,Center,Circle ,Radio,PinInput,PinInputField, Heading,Button ,FormControl, InputGroup ,InputLeftElement ,Input ,  Box, Container, Flex  } from '@chakra-ui/react'
import picture from '../../../assets/PictureUpload.svg'
import Image from 'next/image'
import FirstRowHeader from '../../../Components/FirstRowHeader';
import BackButton from '../../../Components/BackButton';
import { useForm } from "react-hook-form";
import AuthContext from '../../../contexts/AuthContext';
import {  doc,getDoc,updateDoc } from 'firebase/firestore'
import {db} from '../../../firebase/initFirebase'



export const getServerSideProps = async (ctx) => {
    // const data = getOneDocument(ctx.query.id,`Bookings`)
    const docRef = doc(db, `Users`, ctx.query.id);
    const docSnap = await getDoc(docRef);
   
    // if (!data) return { notFound: true };
    return { props: { data : JSON.stringify(docSnap.data()) || [] } };
  };


const EditProfile = ({data}) => {
    const hiddenFileInput = useRef(null);
    const userData = JSON.parse(data)
    const { user,updateUserProfile} = useContext(AuthContext)

    const [file, setFile] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
        // Check if username and email already exists
        // const usernameRef = await db.collection('Users').where('userName', '==', values.userName).get()
        // const emailRef = await query(collection(db, "Users"), where("email", "==", values?.email));
        // switch (true) {
        //     case usernameRef.empty &&  values.userName !== userData?.userName :
        //         try {
        //             //Check if there is an existing file
        //             {file && file.size
        //                 ?
        //                 storage.ref(`users/${user.uid}/profilePhoto`).put(file)
        //                     .then(snapshot => {
        //                         snapshot.ref.getDownloadURL().then((url) => {
        //                             if (values) {

        //                                 user.updateProfile({
        //                                     displayName: e.target.userName.value,
        //                                     photoURL: url
        //                                 })
        //                                     .then(() => {
        //                                         console.log('Updated user!')

        //                                         var updatedInfo = {userProfileImageUrl: url}

        //                                         Object.assign(values, updatedInfo)
        //                                         //Update user Info
        //                                         updateDocument('Users', user.uid, values)
        //                                         // Update email in Firebase Auth
        //                                         auth.currentUser.updateEmail(values.email)
        //                                             .then(() =>{
        //                                                 setLoading(false)
        //                                             })
        //                                             .catch(err =>{
        //                                                 console.log(err.message)
        //                                             })

        //                                     });

        //                             }
        //                         })
        //                         setFile('')
        //                         setLoading(false)

        //                     })
        //                     .catch(error => {
        //                         setLoading(false)
        //                         console.log(error.message)
        //                     })
        //                 :

        //                 values
        //                     ?
        //                     user.updateProfile({displayName: e.target.userName.value})
        //                         .then(() => {

        //                             //Update user Info
        //                             updateDocument('Users', user.uid, values)

        //                             // Update email in Firebase Auth
        //                             auth.currentUser.updateEmail(values.email)
        //                                 .then(() =>{
        //                                     setLoading(false)
        //                                 })
        //                                 .catch(err =>{
        //                                     console.log(err.message)
        //                                 })
        //                         })
        //                         .catch(e => console.log(e))
        //                     :
        //                     console.log('Error updating')


        //             }

        //         } catch (e) {
        //             setLoader(false)
        //             console.log(e.message)
        //             console.log('error')
        //             setLoading(false)

        //         }
        //         break;
        //     case emailRef.empty &&  values.email !== userData?.email :
        //         try {
        //             //Check if there is an existing file
        //             {file && file.size
        //                 ?
        //                 storage.ref(`users/${user.uid}/profilePhoto`).put(file)
        //                     .then(snapshot => {
        //                         snapshot.ref.getDownloadURL().then((url) => {
        //                             if (values) {

        //                                 user.updateProfile({
        //                                     displayName: e.target.userName.value,
        //                                     photoURL: url
        //                                 })
        //                                     .then(() => {
        //                                         console.log('Updated user!')

        //                                         var updatedInfo = {userProfileImageUrl: url}

        //                                         Object.assign(values, updatedInfo)
        //                                         //Update user Info
        //                                         updateDocument('Users', user.uid, values)
        //                                         // Update email in Firebase Auth
        //                                         auth.currentUser.updateEmail(values.email)
        //                                             .then(() =>{
        //                                                 setLoading(false)
        //                                             })
        //                                             .catch(err =>{
        //                                                 console.log(err.message)
        //                                             })

        //                                     });

        //                             }
        //                         })
        //                         setFile('')
        //                         setLoading(false)

        //                     })
        //                     .catch(error => {
        //                         setLoading(false)
        //                         console.log(error.message)
        //                     })
        //                 :

        //                 values
        //                     ?
        //                     user.updateProfile({displayName: e.target.userName.value})
        //                         .then(() => {

        //                             //Update user Info
        //                             updateDocument('Users', user.uid, values)

        //                             // Update email in Firebase Auth
        //                             auth.currentUser.updateEmail(values.email)
        //                                 .then(() =>{
        //                                     setLoading(false)
        //                                 })
        //                                 .catch(err =>{
        //                                     console.log(err.message)
        //                                 })
        //                         })
        //                         .catch(e => console.log(e))
        //                     :
        //                     console.log('Error updating')


        //             }

        //         } catch (e) {
        //             setLoader(false)
        //             console.log(e.message)
        //             console.log('error')
        //             setLoading(false)

        //         }
        //         break;
        //     case !usernameRef.empty &&  values.userName !== userData?.userName :
        //         setError('Username not available')
        //         setLoading(false)
        //         break;
        //     case !emailRef.empty &&  values.email !== userData?.email :
        //         setError('Email already in use')
        //         setLoading(false)
        //         break;
        //     default:
        //         setLoading(false)

        //         break;



        // }
        const {email,phoneNumber,displayName} = values
        const data = {displayName:displayName}

        updateUserProfile(data)
        .then(()=>{
            updateDoc({email:email,phone:phoneNumber,fullName:displayName})
            .then(()=>{
                setSuccess(`Profile updated`)
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
            setError(error.message)
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
                        <FirstRowHeader title={`New account`} leftIcon={<BackButton />} />
                       <Center>
                       <Circle onClick={handleClick} overflow={`hidden`} w={100} h={100}>
            <Image src={picture} alt={`Profile Picture`} />
            </Circle>
                       </Center>
                       {error || success && <Text color={error ? `red` : `green`}>{error}{success}</Text>}

            <InputGroup p={4} flexDirection={`column`} alignItems={`center`}>
                    <Input  defaultValue={userData?.fullname} {...register('displayName')}  mt={5}  type={`text`} />
                    <Input defaultValue={userData?.username || ``} placeholder={`Username`} {...register('username')}  mt={5}  type={`text`} />
                    <Input defaultValue={userData?.phoneNumber || userData?.phone } {...register('phoneNumber')}  mt={5}  type={`text`} />
                    <Input  defaultValue={userData?.email} placeholder={`Email`} {...register('email')}  mt={5}  type={`text`} />
                    
                    <input 
                                            name={`photo`}
                                            type="file"
                                            ref={hiddenFileInput}
                                            onChange={handleChange}
                                            style={{display: 'none'}}

                                        />

                    <Button isLoading={loading} loadingText={`Updating...`} onClick={handleSubmit(onSubmit)} mb={5} mt={5} w={`100%`} color={`#ffffff`} bgColor={`#000000`} >Apply Changes</Button>
                </InputGroup>
        </Flex>
    );
};

export default EditProfile;