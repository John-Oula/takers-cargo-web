import { Flex, Spinner, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import logo from '../assets/logo.svg'

export default function Loading() {
  return (
    <Flex flexDirection={`column`} alignItems={`center`} justifyContent={`center`} bgColor={`#000`} height={`100vh`} width={`100%`}>
        <Image src={logo} width={`60pt`} height={`60pt`}/>
        <br/>
        <Spinner  />
        <Text textAlign={`center`} mt={5} color={`#ed8b00`}>Turn on VPN if you are based in China</Text>

    </Flex>
  )
}
