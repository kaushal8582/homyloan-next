import React from "react";

const USDARequirementHero = ({ content }) => {
  return (
    <section className="w-full min-h-screen bg-black flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full text-center">
        {/* Heading */}
        <h2 className="text-white text-4xl md:text-5xl font-semibold uppercase">
          Eligibility Requirements:
        </h2>

        {/* Description */}
        <p className="mt-6 text-sm md:text-base text-white/80 max-w-3xl mx-auto leading-relaxed">
          All borrowers must be at least 62 years of age.
          <br />
          You must have 50% or greater equity in the home.
          <br />
          The property must be your primary residence (no second homes or
          vacation homes).
          <br />
          Borrowers must pass a financial assessment to ensure they can meet
          ongoing obligations like property taxes and homeowner’s insurance.
          <br />
          All borrowers are required to attend HUD-approved reverse mortgage
          counseling to ensure they understand the loan’s terms and
          implications.
        </p>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Borrower Card */}
          <div className="bg-white rounded-3xl p-8 text-left shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Borrower Requirements
            </h3>

            <ul className="space-y-3 text-sm md:text-base text-black/80 list-disc pl-5">
              <li>Income ≤115% of area median income</li>
              <li>Credit score typically 600+</li>
              <li>Stable, dependable income</li>
              <li>U.S. citizen or permanent resident</li>
            </ul>
          </div>

          {/* Property Card */}
          <div className="bg-[#E6FF4B] rounded-3xl p-8 text-left shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Property Requirements
            </h3>

            <ul className="space-y-3 text-sm md:text-base text-black/80">
              <li>
                Location: The property must be located in a qualified rural area
                as defined by the USDA mapping tool.
              </li>

              <li>
                Primary Residence: The property must serve as the buyer’s
                primary residence.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USDARequirementHero;
