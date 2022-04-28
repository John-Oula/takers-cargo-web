import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'
  import { AiOutlinePlus,AiOutlineMinus ,AiOutlineArrowLeft} from 'react-icons/ai'
  import FirstRowHeader from '../../Components/FirstRowHeader';
  import BackButton from '../../Components/BackButton';


const Faq = () => {
    return (
<Box>
<FirstRowHeader title={`Frequently Asked Questions`} leftIcon={<BackButton />} />

<Accordion allowMultiple>
<AccordionItem>
<h2>
<AccordionButton>
<Box flex='1' textAlign='left'>
  How do we pay for packages?
</Box>
<AccordionIcon />
</AccordionButton>
</h2>
<AccordionPanel pb={4}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat.
</AccordionPanel>
</AccordionItem>

<AccordionItem>
{({ isExpanded }) => (
<>
<h2>
  <AccordionButton>
    <Box flex='1' textAlign='left'>
     How do we book packages?
    </Box>
    {isExpanded ? (
      <AiOutlineMinus fontSize='12px' />
    ) : (
      <AiOutlinePlus fontSize='12px' />
    )}
  </AccordionButton>
</h2>
<AccordionPanel pb={4}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat.
</AccordionPanel>
</>
)}
</AccordionItem>
</Accordion>   
</Box>
    );
};

export default Faq;