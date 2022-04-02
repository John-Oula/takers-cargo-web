import React from 'react';
import {Box, Spacer,Circle, Flex, Center, Heading} from "@chakra-ui/react";
import ListItem from "../../Components/ListItem";
import {useRouter} from 'next/router'
import {AiOutlineArrowLeft, AiOutlineSelect,  AiOutlineCamera ,AiOutlineSetting , AiOutlineCreditCard , AiOutlineBook, AiOutlineCar , AiOutlineDelete , AiOutlineInfoCircle , AiOutlineLogout} from 'react-icons/ai'
import FirstRowHeader from '../../Components/FirstRowHeader';
import BackButton from '../../Components/BackButton';



function Warehouse() {
    const router = useRouter();
    console.log()
    return (
        <Box p={5} h={`100%`}>
                        <FirstRowHeader title={`Warehouse Address`} leftIcon={<BackButton />} />


            <ListItem selectable={true}  subtitle={`广州高端企鹅号21245`}  title={`Guangzhou,ZH`}  />
            <ListItem selectable={true}  subtitle={`广州高端企鹅号21245`}  title={`Guangzhou,ZH`}  />
         


           
                            


        </Box>
    );
}

export default Warehouse

// export async function getServerSideProps(context) {



//     return { props :{posts :posts}}

// }