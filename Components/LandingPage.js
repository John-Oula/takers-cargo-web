import { Container } from '@chakra-ui/react';
import React from 'react';
import FeatureList from '../Sections/Features/Features';
import Footer from '../Sections/Footer/Footer';
import Hero from "../Sections/Hero/Hero";
import AppFeatures from '../Sections/Services/Services';
import Testimonials from '../Sections/Testimonials/Testimonials';
import Navbar from './Navbar';
const LandingPage = () => {
    return (
        <>
        <Container maxW={`7xl`}>
            
            <Navbar />
            <Hero />
            <FeatureList />
            <AppFeatures />
            {/* <Testimonials /> */}
            <Footer />
        </Container>
        </>
    );
};

export default LandingPage;