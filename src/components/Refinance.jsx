"use client";

import Image from "next/image";
import home6 from "../assets/home6.svg";
import computer from "../assets/computer.svg";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultHero = {
  heading: "REFINANCE YOUR\nHOME",
  description:
    "To refinance a mortgage means to replace an existing mortgage loan with a new one. With a refinance, the principal balance of the existing loan is paid-in-full using the balance of the new loan.",
  ctaLabel: "Check Today's Rate",
  imageUrl: "",
};
const defaultWhatIs = {
  heading: "WHAT IS\nREFINANCING?",
  description:
    "To refinance a mortgage means to replace an existing mortgage loan with a new one. With a refinance, the principal balance of the existing loan is paid-in-full using the balance of the new loan.",
  ctaLabel: "Get a Quote",
  imageUrl: "",
};

export default function RefinanceSection({ content }) {
  const router = useRouter();
  const hero = mergeWithDefaults(defaultHero, content?.hero);
  const whatIs = mergeWithDefaults(defaultWhatIs, content?.whatIs);
  const heroImg = (hero.imageUrl && hero.imageUrl.trim()) ? hero.imageUrl : home6;
  const whatIsImg = (whatIs.imageUrl && whatIs.imageUrl.trim()) ? whatIs.imageUrl : computer;

  return (
    <div className="max-w-[1480px] mx-auto">
      <section className="w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 mt-20 sm:mt-24 lg:mt-28 gap-8 lg:gap-0">
        <div className="w-full lg:max-w-[600px] text-center lg:text-left">
          <h1 className="mt-20 sm:mt-8 lg:mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold leading-[100%] uppercase text-[#101011]">
            {(hero.heading || "").split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && (hero.heading || "").includes("\n") ? <br /> : null}</span>
            ))}
          </h1>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-medium leading-[140%] text-[#101011]">
            {hero.description}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={hero.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>
        <div className="relative w-full sm:w-[80%] lg:w-[560px] h-64 sm:h-80 md:h-96 lg:h-[560px] lg:mt-[100px] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] overflow-hidden">
          <Image src={heroImg} fill className="object-cover" alt="" />
        </div>
      </section>
      <section className="w-full flex flex-col lg:flex-row items-center justify-start px-4 sm:px-8 lg:px-20 mt-24 sm:mt-28 lg:mt-36 gap-8 lg:gap-0">
        <div className="w-full sm:w-[90%] lg:w-[585px] h-80 sm:h-96 md:h-[500px] lg:h-[601px] bg-[#F5F5F5] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] flex items-center justify-center p-6 sm:p-8 lg:p-0 order-2 lg:order-1">
          <div className="w-full h-full sm:w-[85%] sm:h-[85%] lg:w-[480px] lg:h-[480px] rounded-3xl sm:rounded-[40px] lg:rounded-[45px] overflow-hidden flex items-center justify-center relative">
            <Image src={whatIsImg} fill className="object-cover" alt="Refinancing" />
          </div>
        </div>
        <div className="w-full lg:max-w-[550px] mb-0 lg:mb-20 lg:ml-20 order-1 lg:order-2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold uppercase leading-[100%] tracking-[1px] text-[#101011]">
            {(whatIs.heading || "").split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && (whatIs.heading || "").includes("\n") ? <br /> : null}</span>
            ))}
          </h1>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-medium leading-[150%] text-[#101011]">
            {whatIs.description}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={whatIs.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>
      </section>
    </div>
  );
}
