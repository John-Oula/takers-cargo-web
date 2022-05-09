import React from 'react';
import {Box, Flex, Center,Heading} from "@chakra-ui/react";


const FirstRowHeader = ({title,rightIcon,leftIcon,label}) => {
    return (
        <Flex  w={`100%`}>
            <Flex    alignItems={`center`}  p={2} minH={`50px`} h={`fit-content`} w={`100%`}>
            <Flex _hover={{ color: '#ed8b00' }}  mr={5}>
            {leftIcon && leftIcon}
            </Flex>
            <Flex flexGrow={1} textAlign={`center`} justifyContent={`center`} flexDirection={`column`}>
                <Heading as={`h6`} size={`sm`} align={`center`} textAlign={`center`} >{title}</Heading>
                <small>{label && label}</small>

            </Flex>
            <Flex   justifyContent={`flex-end`}>
            {rightIcon && rightIcon}
            </Flex>
        </Flex>
        </Flex>
    );
};

export default FirstRowHeader;