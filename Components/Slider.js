import React from 'react';


import {Box, Image,Flex,Center} from '@chakra-ui/react'


function Slider({images}) {
const image = [1,2,3]


    return (

              
                <>
                {
                    image?.map((each,i) =>{
                        return(

                            
                                
                                <Box key={i} bg={`#ed8b00`} h={`150px`} m={3} w={`700px`} overflow={`hidden`} borderRadius={`10`}>
                                                    {each}           
                                                               {/* <Image  key={'slider_'} fallbackSrc={`https://via.placeholder.com/200`} src={each.image?.url} w={`100%`} h={`auto`} />  */}
                                

                                </Box>
                            
                                   
                        )
                    })
                }
                </>



    );
}

export default Slider;