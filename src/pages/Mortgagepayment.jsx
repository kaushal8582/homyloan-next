"use client";
import React, { useState, useEffect } from 'react'
import MortgagePayment from '@/components/MortgagePayment'
import Navbar from '@/components/Navbar'
import OnlinePayment from '@/components/OnlinePayment'
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import { getPageContent } from "@/services/pageContentApi";

const Mortgagepayment = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("mortgagepayment").then(setContent);
  }, []);

  return (
    <div>
      <Navbar/>
      <MortgagePayment content={content?.hero}/>
      <OnlinePayment content={content?.onlinePayment}/>
      <SubscribeSection/>
      <Footer/>
    </div>
  )
}

export default Mortgagepayment
