import React from 'react'
import Image from "next/image";
import Button from "../UI/Button";
import home6 from "../assets/home6.svg";
import computer from "../assets/computer.svg";
export default function MortgageTerm({ content }) {
  const pillText = content?.pillText || "HOMY LOANS";
  const heading = content?.heading || "Mortgage Terms Defined";
  const image = content?.image || "/MorgageTerm.svg";
  
  return (
    <>
      <section className=" max-w-[1480px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 mt-24 sm:mt-28 lg:mt-40 gap-8 lg:gap-0">
        {/* LEFT SIDE */}
        <div className="w-full lg:max-w-[600px] text-center lg:text-left">
          <div className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-black/40 text-xs sm:text-sm tracking-wide">
            {pillText}
          </div>
          {/* TITLE */}
          <h1 className="mt-4 sm:mt-5 lg:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold leading-[110%] lg:leading-[100%] uppercase text-[#101011]">
            {heading}
          </h1>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative w-full sm:w-[80%] lg:w-[560px] h-64 sm:h-80 md:h-96 lg:h-[560px] lg:mt-[100px] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] overflow-hidden">
          <Image src={image} fill className="object-cover" alt="Mortgage Terms" />
        </div>
      </section>
    </>
  );
}
