"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import Button from '../UI/Button';

const RefinanceReason = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-14">
      {/* LEFT CONTENT */}
      <div className="w-full lg:max-w-xl text-center lg:text-left">
        {/* TITLE */}
        <h1 className="text-[#101011] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[65px] leading-[100%] uppercase">
          Refinance Your <br /> Home
        </h1>

        {/* DESCRIPTION */}
        <p className="text-[#101011B2] font-normal text-sm sm:text-base lg:text-[18px] leading-[140%] sm:leading-[130%] lg:leading-[100%] mt-4 sm:mt-5 lg:mt-6">
          To refinance a mortgage means to replace an existing mortgage loan
          with a new one. With a refinance, the principal balance of the
          existing loan is paid-in-full using the balance of the new loan.
        </p>

        <div className="flex justify-center lg:justify-start">
          <Button onClick={() => router.push("/applynow")} label="Get a Quote" bgColor="#FF6B6B" dotColor="#1a1a1a" />
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full sm:w-[90%] lg:w-auto flex-shrink-0">
        <img
          src="/door.jpg"
          alt="Door"
          className="w-full lg:w-[600px] h-64 sm:h-80 md:h-96 lg:h-[586px] rounded-2xl sm:rounded-3xl lg:rounded-[24px] object-cover"
        />
      </div>
    </section>
  );
}

export default RefinanceReason
