import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ListItem from "../../Components/ListItem";
import {AiOutlineCreditCard , AiOutlineAlert , AiOutlineArrowLeft} from 'react-icons/ai'
import FirstRowHeader from '../../Components/FirstRowHeader';
import BackButton from '../../Components/BackButton';


const Messages = () => {
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
      <ListItem leftIcon={<AiOutlineCreditCard />} title={`Order payment Complete`} label={`Your payment order #de5453 has been complete`}/>
      <ListItem leftIcon={<AiOutlineCreditCard />} title={`Document requested`} label={`Submit a picture for order ID #124000110 to complete payment process.`}/>
      <ListItem leftIcon={<AiOutlineCreditCard />} title={`Order payment Complete`} label={`Your payment order #de5453 has been complete`}/>
      <ListItem leftIcon={<AiOutlineCreditCard />} title={`Order payment Complete`} label={`Your payment order #de5453 has been complete`}/>
      <ListItem leftIcon={<AiOutlineCreditCard />} title={`Order payment Complete`} label={`Your payment order #de5453 has been complete`}/>

      <ListItem leftIcon={<AiOutlineCreditCard />} title={`Order payment Complete`} label={`Your payment order #de5453 has been complete`}/>

    </TabPanel>
    <TabPanel>
    <ListItem leftIcon={<AiOutlineAlert />} title={`Maintenance of website due in 2 days`} label={`Maintenance of website due in 2 days`}/>
    <ListItem leftIcon={<AiOutlineAlert />} title={`Maintenance of website due in 2 days`} label={`Maintenance of website due in 2 days`}/>
    <ListItem leftIcon={<AiOutlineAlert />} title={`Maintenance of website due in 2 days`} label={`Maintenance of website due in 2 days`}/>
    <ListItem leftIcon={<AiOutlineAlert />} title={`Maintenance of website due in 2 days`} label={`Maintenance of website due in 2 days`}/>
    <ListItem leftIcon={<AiOutlineAlert />} title={`Maintenance of website due in 2 days`} label={`Maintenance of website due in 2 days`}/>
    <ListItem leftIcon={<AiOutlineAlert />} title={`Maintenance of website due in 2 days`} label={`Maintenance of website due in 2 days`}/>

    </TabPanel>
  </TabPanels>
</Tabs>
</>
    );
};

export default Messages;