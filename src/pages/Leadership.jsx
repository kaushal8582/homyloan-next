import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import OurLeadershipTeam from '../Components/OurLeadershipTeam'
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";
import { getPageContent } from "../services/pageContentApi";

const Leadership = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("leadership").then(setContent);
  }, []);

  return (
    <div>
      <Navbar/>
      <OurLeadershipTeam content={content}/>
     
    <SubscribeSection/>
    <Footer/>
    </div>
  )
}

export default Leadership
