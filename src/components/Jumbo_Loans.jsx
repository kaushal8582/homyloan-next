"use client";

import React from "react";
import Jumboboard from "../assets/jumboboard.svg";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultHero = {
  heading: "Jumbo Loans",
  description:
    "A jumbo loan is a loan for a home where the loan amount falls outside of the conforming loan limits. In most counties the conforming loan limit is $548,250 (higher in other counties).",
  ctaLabel: "Check Today's Rate",
  imageUrl: "",
};

export default function Jumbo_Loans({ content }) {
  const router = useRouter();
  const hero = mergeWithDefaults(defaultHero, content?.hero);
  const imgSrc = (hero.imageUrl && hero.imageUrl.trim()) ? hero.imageUrl : Jumboboard;

  return (
    <div className="max-w-[1480px] mx-auto">
      <section className="w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 mt-20 sm:mt-24 lg:mt-28 gap-8 lg:gap-0">
        <div className="w-full lg:max-w-[600px] text-center lg:text-left">
          <h1 className="mt-[100px] sm:mt-7 lg:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold leading-[100%] uppercase text-[#101011]">
            {hero.heading}
          </h1>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-medium leading-[140%] text-[#101011]">
            {hero.description}
          </p>
          <div className="flex justify-center lg:justify-start mt-6 sm:mt-7 lg:mt-8">
            <Button onClick={() => router.push("/applynow")} label={hero.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>
        <div className="relative w-full sm:w-[80%] lg:w-[560px] h-64 sm:h-80 md:h-96 lg:h-[560px] lg:mt-[100px] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] overflow-hidden">
          <img src={imgSrc} className="w-full h-full object-cover" alt="Jumbo Loans" />
        </div>
      </section>
    </div>
  );
}
