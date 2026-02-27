"use client";

import React from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultHero = {
  heading: "DownPayment Assistance\nLoans",
  description:
    "Homeownership gives stability, community, and fulfillment, not just financial benefits. Homy Loans offers programs from just 3% down. Let's clear up common homebuying myths so you can proceed confidently.",
  ctaLabel: "Check Today's Rate",
  imageUrl: "/DownPayment.svg",
};

const Downpaymentassistance = ({ content }) => {
  const router = useRouter();
  const hero = mergeWithDefaults(defaultHero, content?.hero);
  const imgSrc = (hero.imageUrl && hero.imageUrl.trim()) ? hero.imageUrl : "/DownPayment.svg";

  return (
    <>
      <section className="max-w-[1480px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 mt-20 sm:mt-24 lg:mt-28 gap-8 lg:gap-0">
        <div className="w-full lg:max-w-[600px] text-center lg:text-left">
          <h1 className="mt-[80px] sm:mt-8 lg:mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold leading-[100%] uppercase text-[#101011]">
            {(hero.heading || "").split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && (hero.heading || "").includes("\n") ? <br /> : null}</span>
            ))}
          </h1>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[20px] font-medium leading-[140%] text-[#101011]">
            {hero.description}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={hero.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>
        <div className="relative w-full sm:w-[80%] lg:w-[560px] h-64 sm:h-80 md:h-96 lg:h-[560px] lg:mt-[100px] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] overflow-hidden">
          <img src={imgSrc} className="w-full h-full object-cover" alt="" />
        </div>
      </section>
    </>
  );
};

export default Downpaymentassistance
