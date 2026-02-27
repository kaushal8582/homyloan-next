import React from "react";

const FixedAdjustableEligibility = () => {
  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white uppercase tracking-wide">
            Eligibility Requirements:
          </h2>
        </div>

        {/* Two Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* Left Box - Fixed-Rate Mortgage (White) */}
          <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-4 sm:mb-5 lg:mb-6">
              Fixed-Rate Mortgage
            </h3>

            <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
              A fixed-rate mortgage has a constant interest rate for the life of the loan, typically offered as 15- or 30-year terms. A 15-year loan often comes with a lower rate but higher monthly payments, while a 30-year loan spreads payments over a longer period, resulting in lower monthly costs. Your interest rate remains the same unless you refinance or modify the loan.
            </p>
          </div>

          {/* Right Box - Adjustable-Rate Mortgage (Yellow-Green) */}
          <div className="bg-[#E6FF4B] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-4 sm:mb-5 lg:mb-6">
              Adjustable-Rate Mortgage (ARM)
            </h3>

            <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
              An ARM has a fixed interest rate for an initial period, then adjusts based on market conditions. For example, a 5/1 ARM keeps the rate fixed for 5 years, then adjusts annually. This can offer lower initial rates and payments, but your monthly payment may fluctuate once the adjustable phase begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FixedAdjustableEligibility;
