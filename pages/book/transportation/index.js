import { Button, Flex } from '@chakra-ui/react';
import React,{useContext} from 'react';
import { useRouter } from 'next/router';
import SelectAddressContext from '../../../contexts/SelectAddressContext';
import { ChevronRightIcon } from '../../../icons/dist/cjs';
import BackButton from '../../../Components/BackButton';
import FirstRowHeader from '../../../Components/FirstRowHeader';


function index(props) {
    const { setTransportation } = useContext(SelectAddressContext)

    const router = useRouter()

    return (
       <>
        <FirstRowHeader title={`Select Shipment Method`} leftIcon={<BackButton />} />

<Flex h={`100%`} flexGrow={1} p={7} flexDirection={`column`}>

    
<Button onClick={() =>{ router.push('/book');setTransportation(`air`)}} rightIcon={<ChevronRightIcon color='#ed8b00'/>} h={`30%`} p={[5]} mb={3} textAlign={`start`}  overflow={`break-word`} color={`#ffffff`} bgColor={`#000000`}>AIR</Button>
<Button onClick={() =>{ router.push('/book');setTransportation(`sea`)}} rightIcon={<ChevronRightIcon color='#ed8b00'/>} h={`30%`} p={[5]}  textAlign={`start`}  color={`#ffffff`} bgColor={`#000000`}>SEA</Button>
</Flex>
       </>
    );
}

export default index;