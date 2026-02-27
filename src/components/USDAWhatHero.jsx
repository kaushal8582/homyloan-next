"use client";

import React from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWhat = {
  heading: "What Is A USDA Loan?",
  description:
    "USDA loans are guaranteed by the U.S. Department of Agriculture as part of its Rural Development Guaranteed Housing Loan program. These mortgages are designed for properties located in designated rural areas and offer excellent benefits to qualified low to moderate income homebuyers.",
  ctaLabel: "Get a Quote",
};

const USDAWhatHero = ({ content }) => {
  const router = useRouter();
  const what = mergeWithDefaults(defaultWhat, content?.what);

  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen overflow-hidden flex items-center justify-center py-20 sm:py-24 lg:py-0">
      <img src="/What.svg" alt="USDA Loan Background" className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(/WhatBG.svg)`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500 z-10" />
      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase mb-6 sm:mb-8">
          {what.heading}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">{what.description}</p>
        <div className="flex justify-center">
          <Button onClick={() => router.push("/applynow")} label={what.ctaLabel} />
        </div>
      </div>
    </section>
  );
};

export default USDAWhatHero;
