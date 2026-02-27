"use client";
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Homebuyer from '@/components/Homebuyer'
import HomeBuyerGuide from '@/components/HomeBuyerGuide'
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import { getPageContent } from "@/services/pageContentApi";

const HomeBuyer = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("homebuyer").then(setContent);
  }, []);

  return (
    <div>
      <Navbar/>
      <Homebuyer content={content?.hero}/>
      <HomeBuyerGuide content={content?.homeBuyerGuide}/>
      <SubscribeSection/>
      <Footer/>
    </div>
  )
}

export default HomeBuyer
