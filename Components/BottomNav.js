import React,{useContext,useState,useEffect} from 'react';
import { Text , Box, Container, Flex,Link, LinkBox, LinkOverlay, Circle } from '@chakra-ui/react'
import {AiOutlineHome,AiOutlineScan,AiOutlineCustomerService,AiOutlineUser,AiOutlineMessage,AiOutlineOrderedList} from 'react-icons/ai'
import { useRouter } from 'next/router';
import {MessageSquareIcon,UserIcon,ClipboardIcon,GridIcon} from '../icons/dist/cjs'
import OrderContext from '../contexts/OrderContext';
import NoticeContext from '../contexts/NoticeContext';



function BottomNav({user}) {
    const router = useRouter()
    const [notification,setNotification] = useState(0)
    const { order} = useContext(OrderContext)
    const {notice} = useContext(NoticeContext)

    useEffect(() =>{
        

        
       if(router.pathname != `/messages` ){
        setNotification(state =>{
            setNotification(state + 1)
        })
       }

    },[order,notice])

    return (
        <Flex flexDirection={[`row`,`row`,`row`,`column`,`colum`]} bgColor={`#ffffff`} w={[`100%`,`100%`,`100%`,`10%`,`10%`]} position={[`fixed`,`fixed`,`fixed`,`relative`,`relative`]}  bottom={0}  left={0} right={0} zIndex={100} boxShadow={`lg`} p={2} h={[`fit-content`,`fit-content`,`fit-content`,`100%`,`100%`]}>
        <Flex cursor={`pointer`} _hover={{ color: '#ed8b00' }}  onClick={() =>{ router.push('/')}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <GridIcon  size={16} color={`#000000`} />
            </Box>
            <small size={`sm`}>Home</small>
        </Flex>
        <Flex cursor={`pointer`} onClick={() =>{ router.push(`/user/orders?uid=${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <ClipboardIcon  size={16} color={`#000000`} />
            </Box>
            <small size={`sm`}>Orders</small>
        </Flex>
        <Flex  cursor={`pointer`} onClick={() =>{ router.push('/messages');setNotification(0)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box position={`relative`}>
            <MessageSquareIcon  size={16} color={`#000000`} />
            {notification  > 0 ? <Box top={-2} right={-2} position={`absolute`}><Circle w={2} h={2} fontSize={`sm`}  p={2} bgColor={`#ed8b00`}><Text fontSize={11}>{notification}</Text></Circle></Box> : <></>}
            </Box>
            <small size={`sm`}>Message</small>
        </Flex>
        <Flex cursor={`pointer`} onClick={() =>{ router.push(`/user/${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <UserIcon  size={16} color={`#000000`} />
            </Box>
            <small size={`sm`}>User</small>
        </Flex>
    </Flex>
    );
}

export default BottomNav;