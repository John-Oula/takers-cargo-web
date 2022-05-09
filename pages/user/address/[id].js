import React,{useEffect,useContext,useState} from 'react';
import { Flex,Button} from '@chakra-ui/react'
import ListItem from "../../../Components/ListItem";
import {  AiOutlinePlus , AiOutlineArrowLeft } from 'react-icons/ai'
import FirstRowHeader from '../../../Components/FirstRowHeader';
import {useRouter} from 'next/router'
import BackButton from '../../../Components/BackButton';
import {  collection, getDocs } from 'firebase/firestore'
import {db} from '../../../firebase/initFirebase'
import AuthContext from '../../../contexts/AuthContext';
import { deleteSubCollectionDocument } from '../../../lib';


export const getServerSideProps = async (ctx) => {
    // const data = getOneDocument(ctx.query.id,`Bookings`)
    let addresses = []
    const subColRef = collection(db, "Users", ctx.query.id, "address");
    const docSnap = await getDocs(subColRef);
    docSnap.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                addresses.push({...doc.data(), id:doc.id})
              });
    // if (!data) return { notFound: true };
    return { props: { data : addresses || [] } };
  };

const Address = ({data}) => {
    const { user } = useContext(AuthContext)



    const router = useRouter();

    return (
        <Flex p={4} flexDirection={`column`} justifyContent={`center`}>
                        <FirstRowHeader title={`Address Book`} leftIcon={<BackButton />} />

            {
                data.map(each =>{
                    return(
                    <ListItem onDelete={()=>{ deleteSubCollectionDocument(`Users`,user?.uid,`address`,each?.id)}} onEdit={() =>{ router.push(`/user/address/${user?.uid}/${each?.id}`)}} key={each?.id} title={each?.fullname} label={`${each?.city}, ${each?.country} ${each?.phone}  ${each?.email}`} crud  path={`/user/address/${each?.id}`}/>
                    )
                })
            }
          <Button mb={10} w={`auto`} onClick={() =>{ router.push(`/user/address/create`)}}  color={`#ffffff`} bgColor={`#000000`} leftIcon={<AiOutlinePlus />}>Add Address</Button>

        </Flex>
    );
};

export default Address;