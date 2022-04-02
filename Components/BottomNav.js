import React from 'react';
import { Text , Box, Container, Flex,Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
import {AiOutlineHome,AiOutlineScan,AiOutlineCustomerService,AiOutlineUser,AiOutlineMessage,AiOutlineOrderedList} from 'react-icons/ai'
import { useRouter } from 'next/router';
import {MessageSquareIcon,UserIcon,ClipboardIcon,GridIcon} from '../icons/dist/cjs'



function BottomNav(props) {
    const router = useRouter()
    return (
        <Flex bgColor={`#ffffff`} w={`100%`} position={`fixed`} bottom={0}  left={0} right={0} zIndex={100} boxShadow={`lg`} p={2} h={`fit-content`}>
        <Flex cursor={`pointer`} _hover={{ color: '#ed8b00' }}  onClick={() =>{ router.push('/')}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <GridIcon  size={16} color={`#000000`} />
            </Box>
            <small size={`sm`}>Home</small>
        </Flex>
        <Flex cursor={`pointer`} onClick={() =>{ router.push('/orders')}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <ClipboardIcon  size={16} color={`#000000`} />
            </Box>
            <small size={`sm`}>Orders</small>
        </Flex>
        <Flex cursor={`pointer`} onClick={() =>{ router.push('/messages')}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <MessageSquareIcon  size={16} color={`#000000`} />
            </Box>
            <small size={`sm`}>Message</small>
        </Flex>
        <Flex cursor={`pointer`} onClick={() =>{ router.push('/user/1')}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <UserIcon  size={16} color={`#000000`} />
            </Box>
            <small size={`sm`}>User</small>
        </Flex>
    </Flex>
    );
}

export default BottomNav;