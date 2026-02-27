"use client";
import React from 'react'
import Navbar from '@/components/Navbar'
import FAQHero from '@/components/FAQHero'
import FAQSection from '@/components/Frequentlyaskedquestions'
import Footer from '@/components/Footer'

const FAQPage = () => {
  return (
    <div>
      <Navbar />
      <FAQHero />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default FAQPage
