"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import Button from '../UI/Button';

const USDATopBenefits = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-8 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="w-full lg:max-w-xl text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase leading-tight">
            Top USDA Loan <br /> Benefits:
          </h2>

          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg text-black leading-relaxed">
            USDA loans stand out in the mortgage market by providing significant advantages, especially related to the down payment.
          </p>

          <ul className="mt-4 sm:mt-5 lg:mt-6 space-y-2 sm:space-y-3 lg:space-y-4 text-sm sm:text-base lg:text-lg text-black leading-relaxed list-disc pl-5 text-left">
            <li>Zero down payment with 100% financing</li>
            <li>Option to finance eligible closing costs</li>
            <li>Flexible qualifying criteria</li>
            <li>Seller can cover up to 6% of costs</li>
            <li>Gift funds allowed</li>
            <li>Available for purchase or refinance</li>
          </ul>

          <div className="mt-6 sm:mt-8 lg:mt-10 flex justify-center lg:justify-start">
            <Button
              onClick={() => router.push("/applynow")}
              label="Get a Quote"
              bgColor="#E6FF4B"
              dotColor="#1a1a1a"
              className="!w-auto sm:!w-[28vw] lg:!w-[22vw]"
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full">
          <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden">
            <img
              src="/USDA_TOP.svg"
              alt="USDA Loan Benefits"
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default USDATopBenefits

