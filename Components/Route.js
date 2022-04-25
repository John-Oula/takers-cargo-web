import React,{useEffect,useState} from 'react';
import { Box, Flex, Divider , Text, TagLabel, Tag } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { dateTime, getOneDocument } from '../lib';
import { useDocument } from 'react-firebase-hooks/firestore';
import {  doc } from 'firebase/firestore';
import {db} from '../firebase/initFirebase'
import {AiOutlineArrowDown,AiOutlineArrowUp} from 'react-icons/ai'

const Route = ({ data }) => {
    const router = useRouter()
    const [route,setRoute]  = useState([])
    const [error,setError]  = useState()
    const [show,setShow] = useState(2)

    useEffect(()=>{
        if(data.method === `sea`){
            getOneDocument(data?.containerId,`Containers`)
            .then( doc =>
                setRoute(doc.data())
            )
            .catch(error =>{
                setError(error.message)
            })
            

        }
        else{
            getOneDocument(data?.flightId,`Flights`)
            .then( doc =>
                setRoute(doc.data())
            )
            .catch(error =>{
                setError(error.message)
            })
        }
    },[])


    return (
        <Box className={`Route`}   p={5} boxShadow={`md`} bgColor={`#000000`} alignItems={`center`} _hover={{ transform: `scale(1.03)` }} minH={`50px`} h={`fit-content`} w={`100%`} borderRadius={10}>
            <Flex>
                <Flex flexDirection={`column`}>
                    <Flex mb={5} textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        {/* <Text  color={`#ed8b00`} w={`200px`} textAlign={`left`} >{data?.origin?.city },{ data?.origin?.country}</Text>
                        <Text fontSize={`sm`} color={`#ffffff`}>{data?.creationDate && data?.status == `in-transit` ?dateTime(data?.latestUpdateTime) : `---` }</Text> */}
 { route &&
     route?.waypoints?.slice(0,show).map(each => (
         <>
                              <Text  color={`#ed8b00`} w={`200px`} textAlign={`left`} >{each?.location}</Text>
                        <Text fontSize={`sm`} color={`#ffffff`}>{each?.description}</Text>
                        <Text fontSize={`sm`} color={`#ffffff`}>{dateTime(each?.timestamp)}</Text>
         </>
     ))
 }
                    </Flex>
                    {/* <Flex textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        <Text color={`#ed8b00`} w={`200px`} textAlign={`left`} >{data?.destination?.city },{ data?.destination?.country}</Text>
                        <Text fontSize={`sm`} color={`#ffffff`}>{data?.lastUpdatedTime && data?.status == `arrived` ? dateTime(data?.latestUpdateTime) : `---`}</Text>

                    </Flex> */}
                </Flex>
            </Flex>
            <Flex w={`100%`} justifyContent={`center`} onClick={() => setShow(state=>{
                if(state === 2){
                    setShow(route.length)
                }
                else setShow(2)

            })}>
                {show === 2 ? <AiOutlineArrowDown color='#fff'/> : <AiOutlineArrowUp color='#fff'/>}

            </Flex>

        </Box>
    );
};

export default Route;