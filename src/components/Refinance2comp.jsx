"use client";

import React from "react";
import Image from "next/image";
import home6 from "../assets/home6.svg";
import computer from "../assets/computer.svg";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultDescription =
  "To refinance a mortgage means to replace an existing mortgage loan with a new one. With a refinance, the principal balance of the existing loan is paid-in-full using the balance of the new loan.";

const defaultHero = {
  badge: "HOMY LOANS",
  heading: "REFINANCE YOUR\nHOME",
  description: defaultDescription,
  ctaLabel: "Check Today's Rate",
  imageUrl: "",
};

const defaultWhatIs = {
  heading: "WHAT IS\nREFINANCING?",
  description: defaultDescription,
  ctaLabel: "Get a Quote",
  imageUrl: "",
};

const Refinance2comp = ({ content }) => {
  const router = useRouter();
  const hero = mergeWithDefaults(defaultHero, content?.hero);
  const whatIs = mergeWithDefaults(defaultWhatIs, content?.whatIs);
  const heroImgSrc = hero.imageUrl?.trim() ? hero.imageUrl : home6;
  const whatIsImgSrc = whatIs.imageUrl?.trim() ? whatIs.imageUrl : computer;

  return (
    <>
      <section className="max-w-[1480px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 mt-24 sm:mt-28 lg:mt-36 gap-8 lg:gap-0">
        <div className="w-full lg:max-w-[600px] text-center lg:text-left">
          <div className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-black/40 text-xs sm:text-sm tracking-wide mt-[50px]">
            {hero.badge}
          </div>
          <h1 className="mt-6 sm:mt-7 lg:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold leading-[100%] uppercase text-[#101011]">
            {hero.heading?.split("\n").map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </h1>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-medium leading-[140%] text-[#101011]">
            {hero.description}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={hero.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>
        <div className="relative w-full sm:w-[80%] lg:w-[560px] h-64 sm:h-80 md:h-96 lg:h-[560px] lg:mt-[100px] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] overflow-hidden">
          <Image src={heroImgSrc} fill className="object-cover" alt="" />
        </div>
      </section>
      <section className="max-w-[1480px] mx-auto w-full flex flex-col lg:flex-row items-center justify-start px-4 sm:px-8 lg:px-20 mt-28 sm:mt-32 lg:mt-44 gap-8 lg:gap-0 py-10 lg:py-0">
        <div className="w-full sm:w-[90%] lg:w-[585px] h-80 sm:h-96 md:h-[450px] lg:h-[601px] bg-[#F5F5F5] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] flex items-center justify-center p-6 sm:p-8 lg:p-0 order-2 lg:order-1">
          <div className="w-full h-full sm:w-[85%] sm:h-[85%] lg:w-[480px] lg:h-[480px] rounded-3xl sm:rounded-[40px] lg:rounded-[45px] overflow-hidden flex items-center justify-center relative">
            <Image src={whatIsImgSrc} fill className="object-cover" alt="Refinancing" />
          </div>
        </div>
        <div className="w-full lg:max-w-[550px] mb-0 lg:mb-20 lg:ml-20 order-1 lg:order-2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold uppercase leading-[100%] tracking-[1px] text-[#101011]">
            {whatIs.heading?.split("\n").map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </h1>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-medium leading-[150%] text-[#101011]">
            {whatIs.description}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={whatIs.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Refinance2comp
