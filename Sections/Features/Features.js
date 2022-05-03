import { Box, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { TruckIcon ,MapIcon , BoxIcon} from '../../icons/dist/cjs';





const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function FeatureList() {
  return (
    <Box mb={20} p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<TruckIcon color={`#000`} />}
          title={'Ship now, pay later'}
          text={
            'We offer the benefit of paying on delivery of the shipment and book & ship at no costs.'
          }
        />
        <Feature
          icon={<MapIcon color={`#000`} />}
          title={'Real-time tracking of shipments'}
          text={
            'Gain  Real time insights for every shipment  with 100% transparency from initial booking to final delivery.'
          }
        />
        <Feature
          icon={<BoxIcon color={`#000`} />}
          title={'Book shipments on the go!'}
          text={
            'Get to book as much shipments as you want on the fly with a single click!'
          }
        />
      </SimpleGrid>
    </Box>
  );
}