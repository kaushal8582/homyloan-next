import React from 'react'
import Button from '../UI/Button';
const OurCommitment = ({ content }) => {
  const heading = content?.heading || "Our Commitment to You";
  const description = content?.description || "At HomyLoans, we understand that a fulfilling career is built on trust, growth, and purpose. That's why we invest in our team's development, celebrate achievements, and foster an inclusive environment where everyone can thrive.";
  const image = content?.image || "/door.jpg";

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-14">
      {/* LEFT CONTENT */}
      <div className="w-full lg:max-w-xl text-center lg:text-left">
        {/* TITLE */}
        <h1 className="text-[#101011] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-[110%] lg:leading-[100%] uppercase">
          {heading}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-[#101011B2] font-normal text-sm sm:text-base lg:text-[18px] leading-[140%] lg:leading-[100%] mt-4 sm:mt-5 lg:mt-6">
          {description}
        </p>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full sm:w-[90%] lg:w-auto flex-shrink-0">
        <img
          src={image}
          alt="Door"
          className="w-full lg:w-[600px] h-64 sm:h-80 md:h-96 lg:h-[586px] rounded-2xl sm:rounded-3xl lg:rounded-[24px] object-cover"
        />
      </div>
    </section>
  );
}

export default OurCommitment
