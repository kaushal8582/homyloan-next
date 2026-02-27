"use client";
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Amp from '@/components/Amp'
import Employer from '@/components/Employer'
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import Chatbot from '@/components/Chatbot'
import { getPageContent } from "@/services/pageContentApi";

const AMP = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("amp").then(setContent);
  }, []);

  return (
    <div>
      <Navbar/>
      <Amp content={content?.hero}/>
      <Employer content={content?.employer}/>
      <Chatbot/>
    <SubscribeSection/>
    <Footer/>
    </div>
  )
}

export default AMP
