import React, { useState, useRef , useContext} from 'react';
import {Box, Flex, Center,Radio,Text} from "@chakra-ui/react";
import {useRouter} from 'next/router'
import { AiOutlineEdit ,AiOutlineDelete } from 'react-icons/ai'
import SelectAddressContext from '../contexts/SelectAddressContext.js';


function ListItem({label,title,leftIcon,rightIcon,path,crud ,selectable,data,click,onDelete,onEdit }) {
    const router = useRouter();
    const {select,origin} =useContext(SelectAddressContext)


    const push = (path) =>{
            router.push('/'+path)
    }


    return (
        <Flex className={`${select?.id === data?.id || origin?.id === data?.id && `selected`}`} id={data?.id} cursor={selectable && `pointer`} onClick={click } alignItems={`center`} _hover={{ color: '#ed8b00' }} p={2} minH={`50px`} h={`fit-content`} w={`100%`}>
            <Flex mr={leftIcon && 5 }>
            {leftIcon && leftIcon}
            {/* {selectable && <Radio />} */}
            </Flex>
            <Flex textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`} width={`inherit`}>
                <Text  textAlign={`left`} >{title}</Text>
                <small  className='label'>{label && label}</small>

            </Flex>
            <Flex justifyContent={`flex-end`}>
            {rightIcon && rightIcon}
            {crud &&
             <>
             <Box mr={5}><AiOutlineEdit  onClick={onEdit} /></Box>
             <AiOutlineDelete onClick={onDelete} />
            
            </>}
            </Flex>
        </Flex>
    );
}

export default ListItem;