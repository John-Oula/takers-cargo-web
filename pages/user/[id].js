import React from 'react';
import {Box, Spacer,Circle, Flex, Heading} from "@chakra-ui/react";
import ListItem from "../../Components/ListItem";
import {useRouter} from 'next/router'
import {QrIcon,CameraIcon, SettingsIcon ,ChevronRightIcon,TruckIcon,CreditCardIcon,UserIcon,LogOutIcon,Trash2Icon,MapIcon,MapPinIcon,CircleQuestionMarkIcon} from '../../icons/dist/cjs'


function UserMenu() {
    const router = useRouter();

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
               
                <Heading as={`h6`} size={`sm`}>Peter Gumbo</Heading>

            </Flex>
            <ListItem click={() => onClickListItem(`/address`)} leftIcon={<MapIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Address Book`}  />
            <ListItem click={() => onClickListItem(`/editProfile`)} leftIcon={<UserIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Personal Data`} label={`Label`} />
            <ListItem click={() => onClickListItem(`/invoices`)} leftIcon={<CreditCardIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Invoices`} label={`Label`} />
            <ListItem click={() => onClickListItem(`/returns`)} leftIcon={<Trash2Icon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Returns`} label={`Label`} />
            <ListItem click={() => onClickListItem(`/warehouse`)} leftIcon={<MapPinIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Warehouse address`} label={`Label`} />
            <ListItem click={() => onClickListItem(`/faq`)} leftIcon={<CircleQuestionMarkIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`FAQ's`} label={`Label`} />
            <ListItem click={() => onClickListItem(`/logout`)} leftIcon={<LogOutIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Sign Out`} label={`Label`} />



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