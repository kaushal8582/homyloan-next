"use client";
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import ApplyNow from '@/components/ApplyNow'
import Footer from '@/components/Footer'
import { getPageContent } from "@/services/pageContentApi";

const Applynow = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("applynow").then(setContent);
  }, []);

  return (
    <div>
      <Navbar/>
      <ApplyNow content={content?.hero}/>
      <Footer/>
    </div>
  )
}

export default Applynow
