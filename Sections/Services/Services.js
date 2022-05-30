import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Icon,
    Text,
    Stack,
    HStack,
    VStack,
  } from '@chakra-ui/react';
  import { CheckIcon } from '@chakra-ui/icons';
  
  // Replace test data with your own
  const features = 
     [
      {
     id: 1,
     title: 'Costless Services',
     text: 'We carriers in all modes of transportation and work to establish a sound business relationship with them based on our qualification process and their ability to provide a reliable and quality service. Our satisfied customers are realizing significant bottom-line freight savings while experiencing a reliable and consistent service.',
   },
   {
  id: 2,
  title: 'Customer Management',
  text: 'We recognize that each customer may be different with unique requirements so we provide our customer with the personalized service touch. A dedicated Customer Service Representative, (CSR) is assigned. We ensure costumer satisfactions.',
},
{
id: 3,
title: 'In depth industry knowledge',
text: 'Our team of professionals understands the importance of customers’ feedback, challenges, and game changing events so we can assess the impact to our customers. Based on our assessment we will determine go forward steps if at all necessary to ensure our customers are looked after accordingly.',
},
{
id: 4,
title: 'Multiple value add services',
text: 'We offer our customers many different value add services which have been designed to introduce bottom line savings and enhance our customer support capabilities to our valued customers.',
},

  ]

  
  export default function AppFeatures() {
    return (
      <Box mb={100} p={4}>
        <Stack mb={10} spacing={4}maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={'3xl'}>Why choose us?</Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
          We are a team of logistics management team who you can trust and rely on to effectively manage your transportation service requirements. With good management experience, we provide our customers with cost effective transportation solutions. Our commitment to investment in state of the art business intelligence, visibility and tracking technology and taking pride in being a total solutions service provider is what sets us apart from your typical transportation company.
           Takers Cargo air freight forwarding process of planning and organizing the transport of freight from one point to another by air gives businesses the flexibility and trusted experience they need in a transportation partner.
          </Text>
        </Stack>
  
        
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {features.map((feature) => (
              <HStack key={feature.id} align={'top'}>
                <Box color={'green.400'} px={2}>
                  <Icon as={CheckIcon} />
                </Box>
                <VStack align={'start'}>
                  <Text fontWeight={600}>{feature.title}</Text>
                  <Text color={'gray.600'}>{feature.text}</Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
       
      </Box>
    );
  }