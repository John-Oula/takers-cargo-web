import React,{useContext,useEffect, useState} from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import OrderCard from '../../../Components/OrderCard';
import { onSnapshot,collection, orderBy, limit,query, where, getFirestore } from "firebase/firestore";  
import {db} from '../../../firebase/initFirebase';
import AuthContext from '../../../contexts/AuthContext';
import OrderContext from '../../../contexts/OrderContext';



const Index = () => {
  const { user} = useContext(AuthContext)
  const { order} = useContext(OrderContext)
   return (
        <Tabs  isFitted>
  <TabList>
    <Tab><small>All</small></Tab>
    
    <Tab><small>Unpaid</small></Tab>
    <Tab><small>In transit</small></Tab>
    <Tab><small>Done</small></Tab>

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
    {
        order && order?.map(each =>{
          if(each.paymentStatus == 'unpaid')
          return(<OrderCard key={each?.id} data={each} origin={each?.origin} destination={each?.destination} id={each?.id} />
        )})
      }
    </TabPanel>
    <TabPanel>
    {
        order && order?.map(each =>{
          if(each.status == 'in-transit')
          return(<OrderCard key={each?.id} data={each} origin={each?.origin} destination={each?.destination} id={each?.id} />
        )})
      }
    </TabPanel>
    {
        order && order?.map(each =>{
          if(each.received)
          return(<OrderCard key={each?.id} data={each} origin={each?.origin} destination={each?.destination} id={each?.id} />
        )})
      }
  </TabPanels>
</Tabs>
    );
};

export default Index;