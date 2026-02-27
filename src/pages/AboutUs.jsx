"use client";

import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Aboutus from '../Components/Aboutus'
import HomyLoan from '../Components/HomyLoan'
import OurPhilossopy from '../Components/OurPhilossopy'
import WhatWeOffer from '../Components/WhatWeOffer'
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";
import { getPageContent } from "../services/pageContentApi";

const AboutUs = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("aboutus").then(setContent);
  }, []);

  return (
    <div>
      <Navbar/>
      <Aboutus content={content?.hero}/>
      <HomyLoan content={content?.homyLoan}/>
      <OurPhilossopy content={content?.philosophy}/>
      <WhatWeOffer content={content?.whatWeOffer}/>
    <SubscribeSection/>
    <Footer/>
    </div>
  )
}

export default AboutUs
