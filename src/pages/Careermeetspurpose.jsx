import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import CareerMeetPurpose from '../Components/CareerMeetPurpose'
import WhyFitlife from '../Components/WhyFitlife'
import CareerOpportunities from '../Components/CareerOpportunities'
import OurCommitment from '../Components/OurCommitment'
import WhatWeOffer from '../Components/WhatWeOffer'
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";
import { getPageContent } from "../services/pageContentApi";

const Careermeetspurpose = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("careermeetpurpose").then(setContent);
  }, []);

  return (
    <div>
      <Navbar />
      <CareerMeetPurpose content={content?.hero} />
      <WhyFitlife content={content?.whyFitlife} />
      <CareerOpportunities content={content?.careerOpportunities} />
      <OurCommitment content={content?.ourCommitment} />
      <WhatWeOffer content={content?.whatWeOffer} />
      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Careermeetspurpose
