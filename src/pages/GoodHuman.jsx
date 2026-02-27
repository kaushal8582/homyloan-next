import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BeAGoodHuman from "../Components/BeAGoodHuman";
import SubscribeSection from "../Components/SubscribeSection";
import { getPageContent } from "../services/pageContentApi";

const GoodHumanPage = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("goodhuman").then(setContent);
  }, []);

  return (
    <div>
      <Navbar />
      <BeAGoodHuman content={content}/>
      <SubscribeSection/>
      <Footer />
    </div>
  );
};

export default GoodHumanPage;
