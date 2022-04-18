import { Box, Circle, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import NoticeContext from '../contexts/NoticeContext';
import OrderContext from '../contexts/OrderContext';
import { ClipboardIcon, GridIcon, MessageSquareIcon,CameraIcon, ChevronRightIcon, CircleQuestionMarkIcon, CreditCardIcon, LogOutIcon, MapIcon, MapPinIcon, SettingsIcon, Trash2Icon, UserIcon  } from '../icons/dist/cjs';



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
        <Flex flexDirection={[`row`,`row`,`row`,`column`,`colum`]} bgColor={`#ffffff`} w={[`100%`,`100%`,`100%`,`7%`,`7%`]} position={[`fixed`,`fixed`,`fixed`,`relative`,`relative`]}  bottom={0}  left={0} right={0} zIndex={100} boxShadow={`lg`} p={2} h={[`fit-content`,`fit-content`,`fit-content`,`100%`,`100%`]}>
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
        <Flex display={[`flex`,`flex`,`flex`,`none`,`none`]} cursor={`pointer`} onClick={() =>{ router.push(`/user/${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <UserIcon  size={16} color={`#000000`} />
            </Box>
            <small size={`sm`}>User</small>
        </Flex>
        <Flex display={[`none`,`none`,`none`,`flex`,`flex`]} cursor={`pointer`} onClick={() =>{ router.push(`/user/${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <MapIcon color={`#000`} />
            </Box>
            <small size={`sm`}>Address Book</small>
        </Flex>
        <Flex display={[`none`,`none`,`none`,`flex`,`flex`]} cursor={`pointer`} onClick={() =>{ router.push(`/user/${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <UserIcon  size={16} color={`#000000`} />
            </Box>
            <small size={`sm`}>Personal Data</small>
        </Flex>
        <Flex display={[`none`,`none`,`none`,`flex`,`flex`]} cursor={`pointer`} onClick={() =>{ router.push(`/user/${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <CreditCardIcon size={16} color={`#000`} />
            </Box>
            <small size={`sm`}>Invoices</small>
        </Flex>
         <Flex display={[`none`,`none`,`none`,`flex`,`flex`]} cursor={`pointer`} onClick={() =>{ router.push(`/user/${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <Trash2Icon size={16} color={`#000`} />
            </Box>
            <small size={`sm`}>Returns</small>
        </Flex>
         <Flex display={[`none`,`none`,`none`,`flex`,`flex`]} cursor={`pointer`} onClick={() =>{ router.push(`/user/${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <MapPinIcon size={16} color={`#000`} />
            </Box>
            <small size={`sm`}>Warehouse Address</small>
        </Flex>
         <Flex display={[`none`,`none`,`none`,`flex`,`flex`]} cursor={`pointer`} onClick={() =>{ router.push(`/user/${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <CircleQuestionMarkIcon size={16} color={`#000`} />
            </Box>
            <small size={`sm`}>FAQ's</small>
        </Flex>
        <Flex display={[`none`,`none`,`none`,`flex`,`flex`]} cursor={`pointer`} onClick={() =>{ router.push(`/user/${user?.uid}`)}} flexGrow={1} alignItems={`center`} justifyContent={`center`} flexDirection={`column`}>
            <Box>
            <LogOutIcon color={`#000`} />
            </Box>
            <small size={`sm`}>Sign Out</small>
        </Flex>
    </Flex>
    );
}

export default BottomNav;