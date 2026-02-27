import React from "react";

const USDAEligibility = () => {
  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white uppercase tracking-wide">
            Eligibility Requirements:
          </h2>
        </div>

        {/* General Requirements */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12">
          <div className="text-center text-white space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg leading-relaxed">
            <p>All borrowers must meet income requirements (typically at or below 115% of area median income).</p>
            <p>You must have sufficient credit history and demonstrate the ability to repay the loan.</p>
            <p>The property must be your primary residence (no second homes or vacation homes).</p>
            <p>Borrowers must pass a financial assessment to ensure they can meet ongoing obligations like property taxes and homeowner's insurance.</p>
            <p>All borrowers are required to meet USDA eligibility criteria and understand the loan's terms and implications.</p>
          </div>
        </div>

        {/* Two Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* Left Box - Borrower Requirements (White) */}
          <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-4 sm:mb-5 lg:mb-6">
              Borrower Requirements
            </h3>

            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg text-black leading-relaxed">
              <li>Income ≤115% of area median income</li>
              <li>Credit score typically 600+</li>
              <li>Stable, dependable income</li>
              <li>U.S. citizen or permanent resident</li>
            </ul>
          </div>

          {/* Right Box - Property Requirements (Lime Green) */}
          <div className="bg-[#E6FF4B] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-4 sm:mb-5 lg:mb-6">
              Property Requirements
            </h3>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-black leading-relaxed">
              <div>
                <p className="font-normal mt-2">
                    Location: The property must be located in a qualified rural area as defined by the USDA mapping tool.
                </p>
              </div>

              <div>
                <p className="font-normal mt-2">
                Primary Residence: The property must serve as the buyer's primary residence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USDAEligibility;

