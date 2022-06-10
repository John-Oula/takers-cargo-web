import React,{useContext,useState,useEffect} from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Circle,Text, Flex } from '@chakra-ui/react'
import ListItem from "../../Components/ListItem";
import {AiOutlineCreditCard , AiOutlineAlert , AiOutlineArrowLeft} from 'react-icons/ai'
import FirstRowHeader from '../../Components/FirstRowHeader';
import BackButton from '../../Components/BackButton';
import { onSnapshot,collection, orderBy, limit,query, where, getFirestore } from "firebase/firestore";  
import {db} from '../../firebase/initFirebase';
import AuthContext from '../../contexts/AuthContext';
import OrderContext from '../../contexts/OrderContext';

import { dateTime } from '../../lib';
import {useRouter} from 'next/router'
import NoticeContext from '../../contexts/NoticeContext';
import { MessageSquareIcon } from '../../icons/dist/cjs';


const Messages = () => {

  const { user} = useContext(AuthContext)
  const {order} = useContext(OrderContext)
  const {notice} = useContext(NoticeContext)
  const inWarehouseTitle = `Your Package(s) has arrived in the Warehouse`
  const arrivedTitle = `Your Package has arrived`
  const pendingTitle = `Your Package is being processed`
  const receivedTitle = `Your Package has been received`
  const transitTitle = `Your Package now in-transit`
  
  const arrivedSubtitle = ``
     const router = useRouter()
     useEffect(() => {
      if (user == null) {
       router.push("/login");
     }
   }, [user]);
  // const db = getFirestore(app)
// useEffect(()=>{
  
//   const collRef =collection(db, "Bookings")
//   if(user){
//     const q = query(collRef, where("userId", "==", user?.uid), orderBy("creationDate"), limit(10));

//     const unsubscribe = onSnapshot(q , (querySnaphot) =>{
//       setOrders(querySnaphot.docs.map(doc => ({...doc.data(),id: doc.id, timestamp: doc.data().creationDate?.toDate().getTime()})))
//     })
//   }
  
//   return unsubscribe
// },[user])
    return (
<>
<FirstRowHeader title={`Notifications`} leftIcon={<BackButton />} />
<Tabs isFitted >
  <TabList mb='1em'>
    <Tab>Order Message</Tab>
    <Tab>
    <Box position={`relative`}>
    <Text>Notice</Text>
            {notice.length  > 0 ? <Box top={-2} right={-2} position={`absolute`}><Circle w={2} h={2} fontSize={`sm`}  p={2} bgColor={`#ed8b00`}><Text fontSize={11}></Text></Circle></Box> : <></>}
            </Box>
      </Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <>
      <Flex flexDirection={`column`} p={2}>
        
     
      { 
        order && order?.map(each =>{
          if(each?.status === `pending` || each?.status === `arrived` || each?.status === `in-transit` || each?.status === `received`)
            return(<ListItem click={() => {router.push(`/user/orders/${each?.id}`)}} leftIcon={<AiOutlineAlert />}
         title={
          each?.inWarehouse && each?.status === `pending` ? inWarehouseTitle :
           each?.status === `arrived` ? arrivedTitle :
           each?.status === `pending` ? pendingTitle :
           each?.status === `received` ? receivedTitle :
           each?.status === `in-transit` ? transitTitle : null
          } key={each?.id} label={`${each?.trackingNumber} ${dateTime(each?.status?.latestUpdateTime)}`}/>)
      })
      }
       </Flex>
      </>
    </TabPanel>
    <TabPanel>
<Flex flexDirection={`column`} p={2}>
{
  notice && notice.map(each =>{ 
    if(each?.active){
    return(<ListItem leftIcon={<AiOutlineAlert />} title={each?.name} label={each?.content}/>)}
}
  )
}
</Flex>

    </TabPanel>
  </TabPanels>
</Tabs>
</>
    );
};

export default Messages;