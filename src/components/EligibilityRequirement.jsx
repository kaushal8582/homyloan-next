import React from "react";

const EligibilityRequirement = ({ content }) => {
  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-4xl text-center text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-7 lg:mb-8 tracking-wide uppercase">
          ELIGIBILITY REQUIREMENTS:
        </h2>

        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300 space-y-3 sm:space-y-4">
          <span className="block">
            All borrowers must be at least 62 years of age.
          </span>
          <span className="block">
            You must have 50% or greater equity in the home.
          </span>
          <span className="block">
            The property must be your primary residence (no second homes or
            vacation homes).
          </span>
          <span className="block">
            Borrowers must pass a financial assessment to ensure they can meet
            ongoing obligations like property taxes and homeowner's insurance.
          </span>
          <span className="block">
            All borrowers are required to attend HUD-approved reverse mortgage
            counseling to ensure they understand the loan's terms and
            implications.
          </span>
        </p>
      </div>
    </section>
  );
};

export default EligibilityRequirement;
