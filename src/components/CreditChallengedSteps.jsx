import React from "react";

const CreditChallengedSteps = ({ content }) => {
  const steps = [
    {
      icon: "/RefinanceLogo1.svg",
      text: "Keep credit card balances below 30% to boost your score.",
      bgColor: "bg-[#F6F6F6]"
    },
    {
      icon: "/RefinanceLogo1.svg",
      text: "Consolidate high-interest debts; consider Cash Out Refinance.",
      bgColor: "bg-[#E6FF4B]"
    },
    {
      icon: "/RefinanceLogo1.svg",
      text: "Check credit reports yearly and dispute errors quickly.",
      bgColor: "bg-[#F6F6F6]"
    }
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
          <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase leading-tight">
            Steps to Improve Your Credit
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed">
            While we can find a loan solution for you today, improving your credit will always give you better terms in the future. Building credit takes time and patience, but these tips can help you manage your credit best:
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${step.bgColor} rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10 flex flex-col text-left`}
            >
              {/* Icon */}
              <div className="mb-2 sm:mb-3">
                <img
                  src={step.icon}
                  alt="Credit Improvement Step"
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
                />
              </div>
              
              {/* Text */}
              <p className="text-sm sm:text-base md:text-lg text-black font-medium leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreditChallengedSteps;

