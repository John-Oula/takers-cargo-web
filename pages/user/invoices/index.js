import React,{useContext,useEffect, useState} from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import OrderCard from '../../../Components/OrderCard';
import { onSnapshot,collection, orderBy, limit,query, where, getFirestore } from "firebase/firestore";  
import {db} from '../../../firebase/initFirebase';
import AuthContext from '../../../contexts/AuthContext';
import OrderContext from '../../../contexts/OrderContext';
import FirstRowHeader from '../../../Components/FirstRowHeader';
import InvoiceCard from '../../../Components/InvoiceCard';
import BackButton from '../../../Components/BackButton';



const Index = () => {
  const { user} = useContext(AuthContext)
  const { order,setOrder} = useContext(OrderContext)
 
  // const db = getFirestore(app)
useEffect(()=>{
  
  const collRef =collection(db, "Bookings")
  if(user){
    const q = query(collRef, where("userId", "==", user?.uid), orderBy("creationDate"), limit(10));

    const unsubscribe = onSnapshot(q , (querySnaphot) =>{
      setOrder(querySnaphot.docs.map(doc => ({...doc.data(),id: doc.id, timestamp: doc.data().creationDate?.toDate().getTime()})))
    })
  }
  
  return unsubscribe
},[user])
  // const [orders,loadingMessage,error] = useCollection(query(collection(db, "Bookings"), where("userId", "==", userId), orderBy("creationDate"), limit(10)))
    return (
      <>
              <Flex p={5} flexDirection={`column`}>

      <FirstRowHeader title={`Invoices`}  leftIcon={<BackButton />}/>
      {
        order && order?.map(each =>(<InvoiceCard key={each?.id} data={each}  />
        ))
      }
      </Flex>
      </>
    );
};

export default Index;