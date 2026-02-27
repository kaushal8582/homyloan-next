import React from "react";
import ContentText from "./ContentText";

const WhatWeOffer = ({ content }) => {
  const heading = content?.heading || "What We Offer";
  const description = content?.description || "Homy Loans provides a wide range of mortgage solutions tailored to your needs, including Conventional, FHA, VA, USDA, Refinance, Reverse, Jumbo, and Condo Financing, as well as Down Payment Assistance Programs, First-Time Homebuyer Programs, Physician Loans, and Hero Loans for first responders, police, firefighters, nurses, and teachers. Our goal is to make homeownership accessible, seamless, and human-centered.";
  const image = content?.image || "/WhatWeOffer.svg";

  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto bg-[#F6F6F6] rounded-3xl sm:rounded-[35px] lg:rounded-[40px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-16">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <ContentText tag="h2" text={heading} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase" />

          <ContentText tag="p" text={description} className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-black/60 leading-relaxed" />
        </div>

        {/* Image */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src={image}
              alt="What We Offer"
              className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
