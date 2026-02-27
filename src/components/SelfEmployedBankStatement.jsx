import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultBankStatement = {
  heading: "What Is The Bank Statement Program?",
  description: "This program is a specialized lending option for self-employed borrowers that allows them to use their personal or business bank statements, rather than traditional tax forms, to document income and qualify for a mortgage. This is a great fit for those who need to utilize their bank statements to accurately reflect their true earnings.",
  imageUrl: "/self.svg",
};

const SelfEmployedBankStatement = ({ content }) => {
  const data = mergeWithDefaults(defaultBankStatement, content);
  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto bg-[#F6F6F6] rounded-3xl sm:rounded-[35px] lg:rounded-[40px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-black leading-relaxed">
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

export default SelfEmployedBankStatement;
