import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Find from '../Components/Find'
import Branch from '../Components/Branch'
import Footer from '../Components/Footer'
import { getPageContent } from "../services/pageContentApi";

const FindOfficer = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("findofficer").then(setContent);
  }, []);

  return (
    <div>
      <Navbar/>
      <Find content={content?.hero}/>
      <Branch content={content?.branch}/>
      <Footer/>
    </div>
  )
}

export default FindOfficer
