import React from 'react';


import {Box, Image,Flex,Center} from '@chakra-ui/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function Slider({images}) {



    return (

            <Carousel infiniteLoop={true} interval={4000} transitionTime={1000} showArrows={false}  stopOnHover showIndicators={false} showStatus={false} swipeable  autoPlay={true}  showThumbs={false}>
              
                {
                    images?.map((each) =>{
                        if(each?.type === `banner`){
                        return(

                     
                            
                            
                               
                                     <Box key={each?.id} bgColor={`#ed8b00`} h={`150px`} w={`100%`} overflow={`hidden`} borderRadius={`10`}>
                                                                                          
                                                       <Image   fallbackSrc={`https://via.placeholder.com/200`} src={each.file?.src} w={`100%`} h={`auto`} /> 

                                </Box>                          
                                

                            
                           
                                   
                       

                        )}
                    })
                }


            </Carousel>

    );
}

export default Slider;