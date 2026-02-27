import React from "react";

const CreditChallengedLoanPrograms = () => {
  const programs = [
    {
      title: "FHA LOANS",
      content: "BEST FOR: BUYERS WITH LOW CREDIT SCORES AND MINIMAL CASH FOR A DOWN PAYMENT. MINIMUM FICO SCORE OF 580 (WITH 3.5% DOWN). ALLOWS SELLER-PAID CLOSING COSTS UP TO 6%.",
      href: "/fha-loan"
    },
    {
      title: "VA LOANS",
      content: "BEST FOR: ELIGIBLE ACTIVE DUTY MILITARY, VETERANS, AND SURVIVING SPOUSES. NO SET MINIMUM CREDIT SCORE (MOST LENDERS USE 580 AS A BENCHMARK). OFFERS 100% FINANCING ($0 MONEY DOWN), NO PRIVATE MORTGAGE INSURANCE (PMI).",
      href: "/va-loan"
    },
    {
      title: "USDA LOANS",
      content: "BEST FOR: LOW-TO-MODERATE INCOME BUYERS PURCHASING IN A USDA-APPROVED RURAL AREA. MINIMUM CREDIT SCORE OF 600 NEEDED TO QUALIFY. 100% FINANCING ($0 MONEY DOWN) AVAILABLE.",
      href: "/usda"
    }
  ];

  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-left max-w-4xl mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white uppercase leading-tight">
            Loan Programs with Lower Credit Requirements
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
            Whether you are looking to purchase a new home or refinance an existing mortgage, Homy Loans offers the full range of VA products to meet your financial needs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black uppercase mb-4">
                  {program.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-black/70 leading-relaxed font-medium">
                  {program.content}
                </p>
              </div>
              <a
                href={program.href}
                className="mt-6 sm:mt-8 inline-block bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-black/90 transition-colors flex items-center gap-2 w-fit"
              >
                Explore More
                <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreditChallengedLoanPrograms;

