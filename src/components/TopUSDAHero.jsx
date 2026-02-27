"use client";

import React from 'react'
import Button from '../UI/Button';
import { useRouter } from "next/navigation";
const TopUSDAHero = ({ content }) => {
  const router = useRouter();
  return (
    <section className="w-full bg-[#F4F4F4] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="w-full lg:max-w-xl text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-black leading-tight">
            Top USDA Loan Benefits
          </h2>

          <p className="mt-4 sm:mt-5 lg:mt-6 text-xs sm:text-sm text-black/70 leading-relaxed">
            USDA loans stand out in the mortgage market by providing significant
            advantages, especially related to the down payment.
          </p>

          <ul className="mt-4 sm:mt-5 lg:mt-6 space-y-2 sm:space-y-3 lg:space-y-4 text-xs sm:text-sm text-black/70 leading-relaxed list-disc pl-5 text-left">
            <li>Zero down payment with 100% financing</li>
            <li>Option to finance eligible closing costs</li>
            <li>Flexible qualifying criteria</li>
            <li>Seller can cover up to 6% of costs</li>
            <li>Gift funds allowed</li>
            <li>Available for purchase or refinance</li>
          </ul>
          <Button
              onClick={() => router.push("/applynow")}
            label="Get a Quote"
            bgColor="#E6FF4B"
            dotColor="#1a1a1a"
            className="!w-auto sm:!w-[28vw] lg:!w-[22vw]"
          />
        </div>

        {/* Right Image */}
        <div className="w-full">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src="/topusda.svg"
              alt="VA Loan Eligibility"
              className="w-full h-64 sm:h-80 lg:h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopUSDAHero
