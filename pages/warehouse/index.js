import React,{useRef,useContext,useState,useEffect} from 'react';
import {Box, Spacer,Circle,Button, Flex, Center, Heading} from "@chakra-ui/react";
import ListItem from "../../Components/ListItem";
import {AiOutlineArrowLeft, AiOutlineSelect,  AiOutlineCamera ,AiOutlineSetting , AiOutlineCreditCard , AiOutlineBook, AiOutlineCar , AiOutlineDelete , AiOutlineInfoCircle , AiOutlineLogout} from 'react-icons/ai'
import FirstRowHeader from '../../Components/FirstRowHeader';
import BackButton from '../../Components/BackButton';

import SelectAddressContext from '../../contexts/SelectAddressContext.js';

import { useRouter } from 'next/router'; 
import { db } from '../../firebase/initFirebase';
import {  collection, getDocs,getDoc } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';

import AuthContext from '../../contexts/AuthContext';


const Warehouse = () => {
 
    const { origin, setOrigin } = useContext(SelectAddressContext)
    const ref = useRef()
    const [address,setAddress] = useState()
    const { user} = useContext(AuthContext)
    const getAddress = async () =>{
        let addresses = []
        const colRef = collection(db, "Warehouse");
        const docSnap =  await getDocs(colRef);
        docSnap.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    addresses.push(doc.data())
                  });
                  setAddress(addresses)
    }
    useEffect( async  ()=>{

        getAddress()
       
    },[])

    function selectItem(data) {
        if (!origin) {
            setOrigin(
                data
            )
        }
        else {
            setOrigin(null)
            setOrigin(
                data

            )


        }

    }
    return (
        <Flex p={2} flexDirection={`column`} justifyContent={`center`}>
            <FirstRowHeader title={`Select origin address`} leftIcon={<BackButton />} />
            {
                address?.map((each) => {
                    return (
                        <div key={each?.id} onClick={() => selectItem(each)}  ref={ref} payload={each} >
                            <ListItem key={each?.id}  data={each} selectable title={each?.fullname} label={each?.detailedAddress + ' ' + each?.phone}  />

                        </div>

                    )
                })
            }
            <Button mb={10} w={`auto`}  color={`#ffffff`} bgColor={`#000000`}>Use Address</Button>

        </Flex>
    )
}
export default Warehouse