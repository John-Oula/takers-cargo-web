import React,{useContext,useState,useEffect} from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
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


const Messages = () => {

  const { user} = useContext(AuthContext)
  const {order} = useContext(OrderContext)
  const {notice} = useContext(NoticeContext)
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
    <Tab>Notice</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <>
      { 
        order && order?.map(each =>{
          if(each?.status?.message === `pending` || each?.status?.message === `arrived` || each?.status?.message === `in-transit` || each?.status?.message === `received`)
            return(<ListItem click={() => {router.push(`/user/orders/${each?.id}`)}} leftIcon={<AiOutlineAlert />}
         title={
           each?.status?.message === `arrived` ? arrivedTitle :
           each?.status?.message === `pending` ? pendingTitle :
           each?.status?.message === `received` ? receivedTitle :
           each?.status?.message === `in-transit` ? transitTitle : null
          } key={each?.id} label={`${each?.trackingNumber} ${each?.status?.lastUpdatedTime.toDate()}`}/>)
      })
      }
      </>
    </TabPanel>
    <TabPanel>
{
  notice && notice.map(each =>{ if(each?.active)
    return(<ListItem leftIcon={<AiOutlineAlert />} title={each?.name} label={each?.content}/>)}

  )
}
    </TabPanel>
  </TabPanels>
</Tabs>
</>
    );
};

export default Messages;