import React from 'react';


import {Box, Image,Flex,Center} from '@chakra-ui/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function Slider({images}) {



    return (

            <Carousel infiniteLoop={true} interval={4000} transitionTime={1000} showArrows={false} stopOnHover showIndicators={false} showStatus={false} swipeable  autoPlay={true}  showThumbs={false}>
              
                {
                    images?.map((each,i) =>{
                        return(

                     
                            
                            
                                <>
                                     <Box key={i} bg={`#ed8b00`} h={`150px`} m={3} w={`100px`} overflow={`hidden`} borderRadius={`10`}>
                                                      {each}                                       {/* <Image  key={'slider_'+ each?.url} fallbackSrc={`https://via.placeholder.com/200`} src={each.image?.url} w={`100%`} h={`auto`} />  */}

                                </Box>                          
                                

                                </>
                           
                                   
                       

                        )
                    })
                }


            </Carousel>

    );
}

export default Slider;