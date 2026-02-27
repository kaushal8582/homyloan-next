import React from 'react'
import DownPayment from '../Components/DownPayment'
import Navbar from '../Components/Navbar'
import VA_Who from '../Components/VA_Who'
import VA_Loan from '../Components/VA_Loan'
import VA_Options from '../Components/VA_Options'
import Chatbot from "../Components/Chatbot";
import Frequentlyaskedquestion from "../Components/Frequentlyaskedquestions";
import Footer from '../Components/Footer'
import SubscribeSection from '../Components/SubscribeSection'

const Downpayment = () => {
  return (
    <div>
      <div>
        <Navbar/>
        <DownPayment/>
      </div>
      <VA_Loan/>
      <VA_Who/>
      <VA_Options/>
      <Chatbot/>
      <Frequentlyaskedquestion/>
      <SubscribeSection/>
      <Footer/>
    </div>
  )
}

export default Downpayment
