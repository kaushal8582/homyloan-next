"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";

const USDA = ({ content }) => {
  const router = useRouter();
  return (
    <section className="relative min-h-screen w-full py-12 sm:py-20 lg:py-28 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#F4F4F4] overflow-hidden z-0 border-0 rounded-2xl sm:rounded-3xl">
      {/* Green Right Background */}
      <div className="absolute top-0 right-0 h-full w-[50%] sm:w-[45%] lg:w-[40%] bg-[#E6FF4B] z-10" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-0 mt-12 sm:mt-16 lg:mt-24 z-20">
        {/* Left Content */}
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-5 lg:mb-6 uppercase">USDA Loans</h2>

          <p className="text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed mb-6 sm:mb-7 lg:mb-8">
            Homy Loans now offers in-house USDA loans, providing faster
            approvals and personalized service to help you achieve your
            homeownership goals with ease.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/usda")} label="Explore loan programs" />
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative flex justify-center items-center h-64 sm:h-80 lg:h-auto">
          {/* Glow Layer */}
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-[360px] lg:h-[360px] rounded-full bg-white/40 blur-3xl lg:blur-5xl translate-x-0 sm:translate-x-[-50px] lg:translate-x-[-150px] translate-y-0 sm:translate-y-[20px] lg:translate-y-[40px] z-10" />

          {/* Outer Ring */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[360px] lg:h-[360px] rounded-full flex items-center justify-center translate-x-0 sm:translate-x-[-50px] lg:translate-x-[-150px] translate-y-0 sm:translate-y-[20px] lg:translate-y-[40px] z-30">
            {/* Inner Ring */}
            <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-[310px] lg:h-[310px] rounded-full border-2 sm:border-[3px] lg:border-[4px] border-white flex items-center justify-center z-40">
              {/* Image */}
              <img
                src="/USDA.svg"
                alt="USDA Home"
                className="w-32 h-32 sm:w-48 sm:h-48 lg:w-[260px] lg:h-[260px] object-cover rounded-full z-50"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USDA;
