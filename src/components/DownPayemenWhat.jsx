"use client";

import React from 'react'
import Button from '../UI/Button';
import { useRouter } from "next/navigation";
const DownPayemenWhat = ({ content }) => {
  const router = useRouter();
  return (
    <section className=" max-w-[1480px] mx-auto w-full flex flex-col lg:flex-row items-center justify-start px-4 sm:px-8 lg:px-20 mt-24 sm:mt-28 lg:mt-36 gap-8 lg:gap-0 py-10 lg:py-0">
      {/* LEFT IMAGE */}
      {/* IMAGE WITH BACKGROUND CARD */}
      <div className="w-full sm:w-[90%] lg:w-[585px] h-80 sm:h-96 md:h-[450px] lg:h-[501px] bg-[#F5F5F5] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] flex items-center justify-center p-6 sm:p-8 lg:p-0 order-2 lg:order-1">
        <div className="w-full h-full sm:w-[85%] sm:h-[85%] lg:w-[480px] lg:h-[480px] rounded-3xl sm:rounded-[40px] lg:rounded-[45px] overflow-hidden flex justify-center items-center">
          <img
            src="/DownPayment2.svg"
            className="w-full h-full object-cover"
            alt="Refinancing"
          />
        </div>
      </div>

      {/* RIGHT TEXT CONTENT */}
      <div className="w-full lg:max-w-[450px] mb-0 lg:mb-20 lg:ml-20 order-1 lg:order-2 text-center lg:text-left">
        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold uppercase leading-[100%] tracking-[1px] text-[#101011]">
          What is DPA <br /> Loan?
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[17px] font-normal leading-[140%] text-[#101011B2]">
          A Down Payment Assistance (DPA) loan is a program designed for those
          who need financial help covering the initial costs of a home purchase.
          Often, a borrower qualifies for all other aspects of a loan but does
          not have enough cash saved for the down payment and closing expenses.
        </p>
        <div className="flex justify-center lg:justify-start">
          <Button onClick={()=>{router.push("/applynow")}} label="Get a Quote" bgColor="#FF6B6B" dotColor="#1a1a1a" />
        </div>
      </div>
    </section>
  );
}

export default DownPayemenWhat
