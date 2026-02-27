import React from 'react'
import Button from '../UI/Button';
import ContentText from './ContentText';

const OurPhilossopy = ({ content }) => {
  const heading = content?.heading || "Our Philosophy";
  const description = content?.description || "While the mortgage industry trends toward automation, we double down on the human element. Home Loans Powered by Humans® represents our commitment to providing personalized guidance, expert advice, and support through every step of the homebuying journey. We assign you one licensed Mortgage Loan Officer to work with you from application to closing, available nights, weekends, or early mornings—whatever fits your schedule.";
  const image = content?.image || "/door.jpg";

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-14">
      {/* LEFT CONTENT */}
      <div className="max-w-xl w-full md:w-auto">
        {/* TITLE */}
        <ContentText tag="h1" text={heading} className="text-[#101011] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[65px] leading-[100%] uppercase" />

        {/* DESCRIPTION */}
        <ContentText tag="p" text={description} className="text-[#101011B2] font-[400px] text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed sm:leading-[120%] md:leading-[100%] mt-4 sm:mt-5 md:mt-6" />

      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full md:w-auto">
        <img
          src={image}
          alt="Door"
          className="w-full h-[250px] sm:h-[300px] md:h-[380px] lg:h-[450px] md:w-[500px] lg:w-[600px] rounded-xl sm:rounded-2xl md:rounded-[24px] object-cover"
        />
      </div>
    </section>
  );
}

export default OurPhilossopy
