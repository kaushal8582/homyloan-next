"use client";
import React, { useState, useEffect } from 'react'
import MortgageTerm from '@/components/MortgageTerm'
import Navbar from '@/components/Navbar'
import Terms from '@/components/Terms'
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import { getPageContent } from "@/services/pageContentApi";

const MortgageTermDefined = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("mortgagetermdefined").then(setContent);
  }, []);

  return (
    <div>
        <Navbar/>
        <MortgageTerm content={content?.hero}/>
        <Terms content={content?.terms}/>
        <SubscribeSection/>
        <Footer/>
    </div>
  )
}

export default MortgageTermDefined
