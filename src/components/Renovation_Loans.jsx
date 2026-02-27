"use client";

import { useRouter } from "next/navigation";
import Renovationdocuments from "../assets/Renovationdocuments.svg";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultHero = {
  heading: "Renovation\nLoans",
  description:
    "The HomeStyle Renovation Loan lets you finance both the purchase (or refinance) of a home and the cost of renovations with one convenient loan. Whether you're buying a fixer-upper or upgrading your current property, this program rolls the improvement costs right into your mortgage—simplifying the process and helping you create the home you've always envisioned.",
  ctaLabel: "Explore Loan Programs",
  imageUrl: "",
};

export default function Renovation_Loans({ content }) {
  const router = useRouter();
  const hero = mergeWithDefaults(defaultHero, content?.hero);
  const imgSrc = (hero.imageUrl && hero.imageUrl.trim()) ? hero.imageUrl : Renovationdocuments;

  return (
    <>
      <section className="max-w-[1480px] mx-auto w-full flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 sm:px-8 lg:px-20 mt-24 sm:mt-28 lg:mt-40 gap-8 lg:gap-12">
        <div className="w-full lg:max-w-[600px] mt-[70px] sm:mt-6 lg:mt-16 flex-1 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold text-[#101011] leading-[100%] uppercase">
            {(hero.heading || "").split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && (hero.heading || "").includes("\n") ? <br /> : null}</span>
            ))}
          </h1>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-medium text-[#101011] leading-[140%] opacity-80">
            {hero.description}
          </p>
          <div className="flex justify-center lg:justify-start mt-6 sm:mt-7 lg:mt-8">
            <Button onClick={() => router.push("/purchase")} label={hero.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" className="!w-auto sm:!w-[28vw] lg:!w-[22vw]" />
          </div>
        </div>
        <div className="relative w-full sm:w-[80%] lg:w-[500px] xl:w-[560px] h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[560px] mt-0 lg:mt-[80px] rounded-3xl sm:rounded-[40px] lg:rounded-[60px] overflow-hidden flex-shrink-0">
          <img src={imgSrc} className="w-full h-full object-cover" alt="Renovation Loans" />
        </div>
      </section>
    </>
  );
}
