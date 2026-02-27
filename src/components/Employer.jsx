"use client";

import React from "react";
import { useRouter } from "next/navigation";
function Employer({ content }) {
  const router = useRouter();
  const cards = content?.cards || [
    {
      title: "Zero Cost to You",
      desc: "This benefit costs you ZERO dollars to offer to your workforce.",
      dark: true,
    },
    {
      title: "Dedicated Representative",
      desc: "Your Employees would have one dedicated Homy Representative Officer throughout the entire home buying process.",
      highlight: true,
    },
    {
      title: "Home Buyer Education",
      desc: "We will educate your workforce on homeownership benefits and opportunities.",
      dark:true,
    },
    {
      title: "Savings",
      desc: "By utilizing Homy AMP, your employees will receive an exclusive lender credit.",
      highlight: true,
    },
  ];
  
  const topLabel = content?.topLabel || "Our Loan options";
  const topHeading = content?.topHeading || "EMPLOYER MORTGAGE BENEFIT";
  const topDescription = content?.topDescription || "Looking to offer your employees valuable benefits at no cost to your business? Homy Loans introduces the Homy AMP (Affinity Mortgage Program).\n\nThis program is available to businesses and institutions, helping employers provide a unique mortgage benefit to their workforce while supporting homeownership for their employees.";
  const bottomLabel = content?.bottomLabel || "Our Loan options";
  const bottomHeading = content?.bottomHeading || "LEARN MORE ABOUT HOMY LOAN AMP!";

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      {/* Top Heading */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500">
          {topLabel}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-3 sm:mt-4 uppercase">
          {topHeading}
        </h2>

        <p className="text-sm sm:text-base text-gray-600 mt-4 sm:mt-5 lg:mt-6 leading-relaxed">
          {topDescription.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < topDescription.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-h-[200px] sm:min-h-[230px]
              ${card.dark ? "bg-[#F4F4F4] text-black" : "bg-[#E6FF4B] text-black"}
            `}
          >
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{card.title}</h3>
              <p className="text-xs sm:text-sm leading-relaxed">{card.desc}</p>
            </div>

            <button
              onClick={() => router.push("/homebuyer")}
              className={`mt-5 sm:mt-6 w-fit px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity
                ${card.dark ? "bg-black text-white" : "bg-black text-white"}
              `}
            >
              Explore More →
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Heading */}
      <div className="text-center mt-12 sm:mt-16 lg:mt-20">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500">
          {bottomLabel}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-3 sm:mt-4 uppercase">
          {bottomHeading}
        </h2>
      </div>
    </section>
  );
}

export default Employer;
