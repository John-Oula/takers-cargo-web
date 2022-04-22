import { Box, Circle, Flex, Heading,Button ,Text,  Spacer ,Image} from "@chakra-ui/react";
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/router';
import React, { useContext, useEffect , useState ,useRef } from 'react';
import ListItem from "../../Components/ListItem";
import AuthContext from '../../contexts/AuthContext';
import { db } from '../../firebase/initFirebase';
import { CameraIcon,CheckIcon, ChevronRightIcon, CircleQuestionMarkIcon, CreditCardIcon, LogOutIcon, MapIcon, MapPinIcon, SettingsIcon, Trash2Icon, UserIcon } from '../../icons/dist/cjs';
import { updateDocument, uploadFile } from "../../lib";

export const getServerSideProps = async (ctx) => {
    // const data = getOneDocument(ctx.query.id,`Bookings`)
    const docRef = doc(db, `Users`, ctx.query.id);
    const docSnap = await getDoc(docRef);
   
    // if (!data) return { notFound: true };
    return { props: { data : JSON.stringify(docSnap.data()) || [] } };
  };

function UserMenu({data}) {
    const router = useRouter();
    const userData = JSON.parse(data)
   const { user,logout } = useContext(AuthContext)
   const [file, setFile] = useState('');
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState('');
   const [error, setError] = useState('');
   const [preview, setPreview] = useState('');
   const hiddenFileInput = useRef(null);

   
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
   
        setPreview(URL.createObjectURL(event.target.files[0]))
    };


    const onClickListItem = (path) =>{
        router.push(path)
    }

    const uploadImage = () =>{
        setLoading(true)
        setError(``)
        setSuccess(``)
        uploadFile(`users/${user?.uid}/profile_pics/${file.name}`,file)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref)
            .then((url)=>{
                updateDocument(user?.uid,`Users`,{photoURL: url})
            .then(()=>{
                alert(url)
                setLoading(false)
                setSuccess(`Uploaded succefully`)
            })
            .catch(error =>{
                setLoading(false)
                setError(error.message)
            })
            })
            .catch(error=>{
                setError(error.message)
            })
           
        })
        .catch(error =>{
            setLoading(false)
            setError(error.message)
        })
    }
    useEffect(() => {
        if (user == null) {
         router.push("/login");
       }
     }, [user]);

    return (
        <>
        {user && <Box p={5} h={`100%`} w={`100%`}>


<Flex mb={10} mt={3} >
<Heading as={`h3`} size={`lg`}>Account</Heading>
<Spacer />
<SettingsIcon size={24} color={`#000000`} />

</Flex>
{error || success && <Text color={success ? `green` : `red`}>{error}{success}</Text>}
<Flex mb={10} alignItems={`center`}>
    <Circle overflow={`hidden`} w={70} h={70} mr={10}   borderWidth={`1px`} borderColor={`black`}>
      {  !userData?.photoURL ? <CameraIcon m={4} size={24} color={`#000000`} /> 
      :<Image w={`auto`} h={`100%`} src={preview && preview ? preview : userData?.photoURL} />
      }

    </Circle>

   
    <Box >
    <Heading as={`h6`} size={`sm`}>{userData?.fullname}</Heading>
   <Flex alignItems={`center`}>
   <Button isLoading={loading} loadingText={`Uploading...`} onClick={handleClick} mt={`1em`}>
        Change Profile picture
    </Button>
    {file && 
    <Flex>
        <Box ml={`1em`}>
        <CheckIcon onClick={uploadImage}  color={`#000`} size={`24`} />

        </Box>
        <Box ml={`1em`}>
        <Trash2Icon onClick={()=> {setFile(null);setPreview(null)}} color={`#000`} size={`24`} />

        </Box>
    </Flex>}
   </Flex>
    </Box>
    <input 
                                            name={`photo`}
                                            type="file"
                                            ref={hiddenFileInput}
                                            onChange={handleChange}
                                            style={{display: 'none'}}

                                        />
</Flex>
<Box display={[`box`,`box`,`box`,`none`,`none`]}>
<ListItem click={() => onClickListItem(`/user/address?uid=${user?.uid}`)} leftIcon={<MapIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Address Book`}  />
<ListItem click={() => onClickListItem(`/user/editProfile/${user?.uid}`)} leftIcon={<UserIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Personal Data`} label={`Update your account details`} />
<ListItem click={() => onClickListItem(`/user/invoices`)} leftIcon={<CreditCardIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Invoices`} label={`Manage your Invoices`} />
<ListItem click={() => onClickListItem(`/user/returns`)} leftIcon={<Trash2Icon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Returns`} label={`Check your returns`} />
<ListItem click={() => onClickListItem(`/warehouse`)} leftIcon={<MapPinIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Warehouse address`} label={`Our warehouse address locations`} />
<ListItem click={() => onClickListItem(`/faq`)} leftIcon={<CircleQuestionMarkIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`FAQ's`} label={`Get quick answers`} />
<ListItem click={() => {logout(user);onClickListItem(`/login`)}} leftIcon={<LogOutIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Sign Out`}  />


</Box>

<br/>
<br/>
<br/>
<br/>
   <br/>
                


</Box>}
        </>
    );
}

export default UserMenu

// export async function getServerSideProps(context) {



//     return { props :{posts :posts}}

// }