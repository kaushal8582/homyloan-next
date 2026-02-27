import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultOverview = {
  heading: "Program Overview",
  description: "Caring for others is admirable, but student loan debt can make homeownership challenging. If you're a resident, recent medical school graduate, or early in your career, the Doctor Loan is designed for you. This program offers terms tailored to homebuyers with strong earning potential, helping you achieve your homeownership goals sooner.",
  imageUrl: "/physician.svg",
};

const PhysicianLoanOverview = ({ content }) => {
  const data = mergeWithDefaults(defaultOverview, content);
  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto bg-[#F6F6F6] rounded-3xl sm:rounded-[35px] lg:rounded-[40px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-black/60 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
        {data.imageUrl && (
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <img src={data.imageUrl} alt={data.heading} className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] object-cover" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhysicianLoanOverview;

