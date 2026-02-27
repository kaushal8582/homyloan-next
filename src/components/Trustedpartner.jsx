"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import Button from '../UI/Button';
import ContentText from './ContentText';
import home6 from "../assets/home6.svg";
import computer from "../assets/computer.svg";

const Trustedpartner = ({ content }) => {
  const router = useRouter();
  const trustedPartnerHeading = content?.trustedPartner?.heading || "Your Trusted Partner in Home Financing";
  const trustedPartnerDesc = content?.trustedPartner?.description || "At HomyLoans, we understand that purchasing a home is a significant milestone in your life. That's why we're committed to making the home loan process as seamless and stress-free as possible. Whether you're a first-time homebuyer, looking to refinance, or seeking specialized loan options, our team is here to guide you every step of the way.";
  const trustedPartnerCta = content?.trustedPartner?.ctaText || "See Open Positions";
  const trustedPartnerImage = content?.trustedPartner?.image || home6;
  
  const ourServicesHeading = content?.ourServices?.heading || "Our Services";
  const ourServicesDesc = content?.ourServices?.description || "Homy Loans offers a variety of mortgage options: Conventional loans for strong credit borrowers, FHA for first-time buyers or lower credit scores, VA for veterans and eligible spouses, USDA with no down payment for eligible rural or suburban homes, Jumbo for high-value properties, Refinance to lower payments or access equity, Reverse mortgages to convert home equity into funds, Down Payment Assistance to reduce upfront costs, and Specialty loans for physicians, heroes, and other targeted groups.";
  const ourServicesCta = content?.ourServices?.ctaText || "Get a Quote";
  const ourServicesImage = content?.ourServices?.image || computer;

  return (
    <>
      <section className=" max-w-[1480px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 mt-20 sm:mt-24 lg:mt-36 gap-8 lg:gap-0">
        {/* LEFT SIDE */}
        <div className="w-full lg:max-w-[600px] text-center lg:text-left">
          {/* TITLE */}
          <ContentText tag="h1" text={trustedPartnerHeading} className="mt-4 sm:mt-6 lg:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold leading-[110%] lg:leading-[100%] uppercase text-[#101011]" />

          {/* DESCRIPTION */}
          <ContentText tag="p" text={trustedPartnerDesc} className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-normal leading-[140%] text-[#101011] lg:pr-5" />

          <div className="flex justify-center lg:justify-start mt-5 sm:mt-6">
            <Button
              onClick={() => router.push("/open-positions")}
              label={trustedPartnerCta}
              bgColor="#FF6B6B"
              dotColor="#1a1a1a"
            />
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative w-full sm:w-[90%] lg:w-[560px] h-64 sm:h-80 md:h-96 lg:h-[560px] lg:mt-[100px] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] overflow-hidden flex-shrink-0">
          <img src={trustedPartnerImage} alt="Home Financing" className="w-full h-full object-cover" />
        </div>
      </section>
      <section className="max-w-[1480px] mx-auto w-full flex flex-col lg:flex-row items-center justify-start px-4 sm:px-6 md:px-12 lg:px-20 mt-16 sm:mt-20 lg:mt-28 gap-8 lg:gap-0">
        {/* LEFT IMAGE */}
        {/* IMAGE WITH BACKGROUND CARD */}
        <div className="w-full sm:w-[90%] lg:w-[585px] h-80 sm:h-96 md:h-[480px] lg:h-[601px] bg-[#F5F5F5] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] flex items-center justify-center p-8 sm:p-10 lg:p-12 order-2 lg:order-1">
          <div className="w-full h-full rounded-2xl sm:rounded-[35px] lg:rounded-[45px] overflow-hidden">
            <img
              src={ourServicesImage}
              className="w-full h-full object-cover"
              alt="Our Services"
            />
          </div>
        </div>

        {/* RIGHT TEXT CONTENT */}
        <div className="  w-full lg:max-w-[550px] lg:mb-20 lg:ml-20 text-center lg:text-left order-1 lg:order-2">
          {/* TITLE */}
          <ContentText tag="h1" text={ourServicesHeading} className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold uppercase leading-[110%] lg:leading-[100%] tracking-[1px] text-[#101011]" />

          {/* DESCRIPTION */}
          <ContentText tag="p" text={ourServicesDesc} className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-medium leading-[150%] text-[#101011]" />

          <div className="flex justify-center lg:justify-start mt-5 sm:mt-6">
            <Button onClick={() => router.push("/applynow")} label={ourServicesCta} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Trustedpartner
