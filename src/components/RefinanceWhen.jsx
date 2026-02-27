"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWhen = {
  heading: "When is the Right Time to Refinance?",
  subText:
    "If your current home or mortgage meets one or more of these conditions, it is a great time to consider refinancing:",
  imageUrl: "/RightTime.svg",
  bodyText:
    "There are several key indicators that it may be the right time to refinance. If your local housing market has driven up your home's value, the resulting high equity can open the door to a new loan with better terms or a cash out option. Also, if you can secure an interest rate that is significantly lower than your current one, refinancing is definitely worth exploring. Finally, if your mortgage is relatively new, getting a new loan early on can help ensure more of your monthly payment goes toward the principal balance, helping you build equity faster.",
  ctaLabel: "Get a Quote",
};

const RefinanceWhen = ({ content }) => {
  const router = useRouter();
  const w = mergeWithDefaults(defaultWhen, content);
  const imgSrc = w.imageUrl?.trim() ? w.imageUrl : "/RightTime.svg";

  return (
    <section className="w-full bg-[#F4F4F4] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <h1 className="text-[#101011] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[65px] leading-[110%] lg:leading-[100%] uppercase text-center max-w-full sm:max-w-[600px] lg:max-w-[800px] px-2">
        {w.heading}
      </h1>
      <p className="text-[#101011] font-light text-sm sm:text-base lg:text-[18px] leading-[140%] lg:leading-[100%] text-center max-w-full sm:max-w-[650px] lg:max-w-[850px] mt-4 sm:mt-5 lg:mt-6 px-2">
        {w.subText}
      </p>
      <div className="mt-8 sm:mt-10 lg:mt-12 w-full max-w-full sm:max-w-[95%] lg:max-w-[1030px] px-2">
        <img src={imgSrc} alt="Home" className="w-full h-auto aspect-[1030/464] object-cover rounded-3xl sm:rounded-[50px] lg:rounded-[70px] shadow-sm" />
      </div>
      <p className="text-[#101011B2/70] font-normal text-xs sm:text-sm md:text-base lg:text-[18px] leading-[150%] sm:leading-[140%] lg:leading-[100%] text-center w-full max-w-full sm:max-w-[90%] lg:max-w-[1030px] mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-2">
        {w.bodyText}
      </p>
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <Button onClick={() => router.push("/applynow")} label={w.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
      </div>
    </section>
  );
};

export default RefinanceWhen
