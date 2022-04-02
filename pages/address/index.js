import React from 'react';
import { Flex,Button} from '@chakra-ui/react'
import ListItem from "../../Components/ListItem";
import {  AiOutlinePlus , AiOutlineArrowLeft } from 'react-icons/ai'
import FirstRowHeader from '../../Components/FirstRowHeader';
import {useRouter} from 'next/router'
import BackButton from '../../Components/BackButton';


const Address = () => {
    const router = useRouter();

    return (
        <Flex p={4} flexDirection={`column`} justifyContent={`center`}>
                        <FirstRowHeader title={`Address Book`} leftIcon={<BackButton />} />

            <ListItem title={`Peter Gumbo`} label={`Arusha, TZ +243 864656835`} crud path={`address/1`}/>
            <ListItem title={`Peter Gumbo`} label={`Arusha, TZ +243 864656835`} crud path={`address/1`}/>
            <ListItem title={`Peter Gumbo`} label={`Arusha, TZ +243 864656835`} crud path={`address/1`}/>
            <ListItem title={`Peter Gumbo`} label={`Arusha, TZ +243 864656835`} crud path={`address/1`}/>
            <ListItem title={`Peter Gumbo`} label={`Arusha, TZ +243 864656835`} crud path={`address/1`}/>
            <ListItem title={`Peter Gumbo`} label={`Arusha, TZ +243 864656835`} crud path={`address/1`}/>
            <Button mb={10} w={`auto`} onClick={() =>{ router.push(`/address/create`)}}  color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Add Address</Button>

        </Flex>
    );
};

export default Address;