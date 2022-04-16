import React,{useContext,useEffect, useState} from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import OrderCard from '../../../Components/OrderCard';
import { onSnapshot,collection, orderBy, limit,query, where, getFirestore } from "firebase/firestore";  
import {db} from '../../../firebase/initFirebase';
import AuthContext from '../../../contexts/AuthContext';
import OrderContext from '../../../contexts/OrderContext';



const Index = () => {
  const { user} = useContext(AuthContext)
  const { order,setOrder} = useContext(OrderContext)
 
  // const db = getFirestore(app)
useEffect(()=>{
  
  const collRef =collection(db, "Bookings")
  if(user){
    const q = query(collRef, where("userId", "==", user?.uid), orderBy("creationDate"), limit(10));

    const unsubscribe = onSnapshot(q , (querySnaphot) =>{
      setOrder(querySnaphot.docs.map(doc => ({...doc.data(),id: doc.id, timestamp: doc.data().creationDate?.toDate().getTime() ,  latestUpdateTime: doc.data().creationDate?.toDate().getTime()})))
    })
  }
  
  return unsubscribe
},[user])
  // const [orders,loadingMessage,error] = useCollection(query(collection(db, "Bookings"), where("userId", "==", userId), orderBy("creationDate"), limit(10)))
    return (
        <Tabs isFitted >
  <TabList>
    <Tab>All</Tab>
    <Tab>Booked</Tab>
    <Tab>Unpaid</Tab>
    <Tab>In transit</Tab>
    <Tab>Done</Tab>

  </TabList>

  <TabPanels>
    <TabPanel>
      <>
      {
        order && order?.map(each =>(<OrderCard key={each?.id} data={each} origin={each?.origin} destination={each?.destination} id={each?.id} />
        ))
      }
      </>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
    );
};

export default Index;