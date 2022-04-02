
import React from 'react';
import {Box, Spacer,Circle, Flex, Center, Heading} from "@chakra-ui/react";
import InvoiceCard from "../../Components/InvoiceCard";
import BackButton from '../../Components/BackButton';
import FirstRowHeader from '../../Components/FirstRowHeader';

const Invoices = () => {
    return (
       <Flex p={4} flexDirection={`column`}>
           <FirstRowHeader title={`Invoices`} leftIcon={<BackButton/>} />
            <InvoiceCard id={1} status={`paid`} />
            <InvoiceCard id={1} status={`paid`} />
            <InvoiceCard id={1} status={`paid`} />
            <InvoiceCard id={1} status={`paid`} />
            <InvoiceCard id={1} status={`paid`} />
            <InvoiceCard id={1} status={`paid`} />
            <InvoiceCard id={1} status={`paid`} />
            <InvoiceCard id={1} status={`paid`} />
       </Flex>
    );
};

export default Invoices;