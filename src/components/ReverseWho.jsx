"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";

const ReverseWho = ({ content }) => {
  const router = useRouter();
  return (
    <section className="w-full bg-[#F4F4F4] min-h-screen py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-snug md:leading-tight uppercase">
            WHO IS ELIGIBLE FOR <br className="hidden sm:block" /> Reverse
            Mortgage?
          </h2>

          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed">
            A Reverse Mortgage is an excellent option for qualifying seniors who
            wish to remain in their home without the burden of monthly mortgage
            payments.
          </p>

          {/* CTA */}
          <div className="mt-6 sm:mt-7 lg:mt-8 flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label="Get a Quote" bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <img
              src="/Reverse_Who.svg"
              alt="VA Loan Eligibility"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReverseWho;
