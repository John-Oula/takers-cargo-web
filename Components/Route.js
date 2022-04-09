import React from 'react';
import { Box, Flex, Divider , Text, TagLabel, Tag } from "@chakra-ui/react";
import { AiOutlineArrowRight, AiOutlineDropbox } from 'react-icons/ai'
import { useRouter } from 'next/router';
import { dateTime } from '../lib';

const Route = ({ data,origin,destination }) => {
    const router = useRouter()

    return (
        <Box className={`Route`}   p={5} boxShadow={`md`} bgColor={`#000000`} alignItems={`center`} _hover={{ transform: `scale(1.03)` }} minH={`50px`} h={`fit-content`} w={`100%`} borderRadius={10}>
            <Flex>
                <Flex flexDirection={`column`}>
                    <Flex mb={5} textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        <Text  color={`#ed8b00`} w={`200px`} textAlign={`left`} >{data?.origin?.city },{ data?.origin?.country}</Text>
                        <Text fontSize={`sm`} color={`#ffffff`}>{!data?.creationDate  ? `---` : dateTime(data?.creationDate)}</Text>
 
                    </Flex>
                    <Flex textAlign={`left`} justifyContent={`left`} flexGrow={2} flexDirection={`column`}>
                        <Text color={`#ed8b00`} w={`200px`} textAlign={`left`} >{data?.destination?.city },{ data?.destination?.country}</Text>
                        <Text fontSize={`sm`} color={`#ffffff`}>{!data?.status?.lastUpdatedTime ? `---` : dateTime(data?.status?.lastUpdatedTime)}</Text>

                    </Flex>
                </Flex>
            </Flex>

        </Box>
    );
};

export default Route;