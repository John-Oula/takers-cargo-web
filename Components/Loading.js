import { Flex, Spinner, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import logo from '../assets/takers_white_bg.jpg'

export default function Loading() {
  return (
    <Flex flexDirection={`column`} alignItems={`center`} justifyContent={`center`} height={`100%`} width={`100%`}>
        <Image src={logo} width={`600pt`} height={`600pt`}/>
        <Spinner  />
        <Text textAlign={`center`} mt={5} color={`#ed8b00`}>Turn on VPN if you are based in China</Text>

    </Flex>
  )
}
