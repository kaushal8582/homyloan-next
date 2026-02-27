"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const DEFAULT_STEPS = [
  {
    title: "Consultation",
    description:
      "We begin by understanding your financial goals and homeownership aspirations.",
    highlight: false,
  },
  {
    title: "Pre-Qualification",
    description:
      "We'll assess your financial situation to determine how much you can afford to borrow.",
    highlight: true,
  },
  {
    title: "Application",
    description:
      "Submit your application and necessary documentation through our secure platform.",
    highlight: false,
  },
  {
    title: "Undertaking",
    description:
      "Our team reviews your information and prepares your loan for approval.",
    highlight: true,
  },
  {
    title: "Approval & Closing",
    description:
      "Once approved, we'll guide you through the closing process to finalize your loan.",
    highlight: false,
  },
];

const OurProcess = ({ content }) => {
  const router = useRouter();
  const heading = content?.heading || "Our Process";
  const steps = content?.steps?.length ? content.steps : DEFAULT_STEPS;

  return (
    <section className=" w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase mb-8 sm:mb-10 lg:mb-12">
          {heading}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[200px] sm:min-h-[220px] lg:min-h-[240px]
                ${step.highlight ? "bg-[#E6FF4B]" : "bg-gray-100"}`}
            >
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-black mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <button onClick={() => router.push("/applynow")} className="inline-flex items-center gap-2 bg-black text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-fit mt-4 hover:opacity-90 transition-opacity">
                Explore More
                <ArrowRight size={14} className="flex-shrink-0" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
