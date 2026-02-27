import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Trustedpartner from "../Components/Trustedpartner";
import OurProcess from "../Components/OurProcess";
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";
import { getPageContent } from "../services/pageContentApi";

const TrustedPartner = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("trustedpartner").then(setContent);
  }, []);

  return (
    <div>
      <Navbar />
      <Trustedpartner content={content} />
      <OurProcess content={content?.ourProcess} />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default TrustedPartner;
