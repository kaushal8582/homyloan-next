"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";
import Review from "../Components/Review";
import { getPageContent } from "../services/pageContentApi";

const USDAPage = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("reviews").then(setContent);
  }, []);

  return (
    <div>
      <Navbar />
        <Review content={content} />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default USDAPage;
