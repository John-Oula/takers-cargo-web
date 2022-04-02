import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import OrderCard from '../../Components/OrderCard';

const Index = () => {
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
      <OrderCard id={1} />
      <OrderCard id={1} />
      <OrderCard id={1} />
      <OrderCard id={1} />
      <OrderCard id={1} />
      <OrderCard id={1} />
      <OrderCard id={1} />
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