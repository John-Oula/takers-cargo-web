import React,{useContext,useEffect} from 'react';
import {Box, Spacer,Circle, Flex, Heading} from "@chakra-ui/react";
import ListItem from "../../Components/ListItem";
import {useRouter} from 'next/router'
import {QrIcon,CameraIcon, SettingsIcon ,ChevronRightIcon,TruckIcon,CreditCardIcon,UserIcon,LogOutIcon,Trash2Icon,MapIcon,MapPinIcon,CircleQuestionMarkIcon} from '../../icons/dist/cjs'
import AuthContext from '../../contexts/AuthContext';
import {  doc,getDoc} from 'firebase/firestore'
import {db} from '../../firebase/initFirebase'

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
   const { user,setUser,logout } = useContext(AuthContext)
   


    const onClickListItem = (path) =>{
        router.push(path)
    }


    return (
        <Box p={5} h={`100%`}>


            <Flex mb={10} mt={3} >
            <Heading as={`h3`} size={`lg`}>Account</Heading>
            <Spacer />
            <SettingsIcon size={24} color={`#000000`} />

            </Flex>
            <Flex mb={10} alignItems={`center`}>
                <Circle mr={10} p={4}  borderWidth={`1px`} borderColor={`black`}>
                   <CameraIcon size={24} color={`#000000`} /> 
                </Circle>
               
                <Heading as={`h6`} size={`sm`}>{userData?.fullname}</Heading>

            </Flex>
            <ListItem click={() => onClickListItem(`/user/address?uid=${user?.uid}`)} leftIcon={<MapIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Address Book`}  />
            <ListItem click={() => onClickListItem(`/user/editProfile/${user?.uid}`)} leftIcon={<UserIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Personal Data`} label={`Label`} />
            <ListItem click={() => onClickListItem(`/user/invoices`)} leftIcon={<CreditCardIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Invoices`} label={`Label`} />
            <ListItem click={() => onClickListItem(`/user/returns`)} leftIcon={<Trash2Icon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Returns`} label={`Label`} />
            <ListItem click={() => onClickListItem(`/warehouse`)} leftIcon={<MapPinIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Warehouse address`} label={`Label`} />
            <ListItem click={() => onClickListItem(`/faq`)} leftIcon={<CircleQuestionMarkIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`FAQ's`} label={`Label`} />
            <ListItem click={() => {logout(user);onClickListItem(`/login`)}} leftIcon={<LogOutIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Sign Out`} label={`Label`} />



           <br/>
           <br/>
           <br/>
           <br/>
               <br/>
                            


        </Box>
    );
}

export default UserMenu

// export async function getServerSideProps(context) {



//     return { props :{posts :posts}}

// }