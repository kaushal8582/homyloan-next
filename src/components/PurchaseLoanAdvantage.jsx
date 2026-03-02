"use client";

import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultAdvantage = {
  heading: "The Homy Loans Human Advantage",
  bodyText:
    "Purchasing a home is one of life's biggest decisions. At Homy Loans, we ensure you have dedicated human support every step of the way. We believe in a human powered mortgage process, meaning you work with one caring, experienced loan officer from application to close. We are here to answer your questions, ease your worries, and make your homebuying experience as smooth as possible.",
  ctaLabel: "Get a Quote",
  backgroundImage: "/humanadvantagebg.svg",
};

export default function PurchaseLoanAdvantage({ content }) {
  const router = useRouter();
  const c = content && typeof content === "object" ? content : {};
  const adv = mergeWithDefaults(defaultAdvantage, c);
  const bgImage = adv.backgroundImage || defaultAdvantage.backgroundImage;

  return (
    <section className="w-full flex justify-center mt-16 sm:mt-20 md:mt-24 lg:mt-32 px-4 sm:px-6 lg:px-8">
      <div
        className="relative w-full max-w-[1290px] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:h-[551px] rounded-3xl sm:rounded-[50px] lg:rounded-[70px] overflow-hidden bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center px-6 sm:px-8 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex flex-col items-center max-w-4xl">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[55px] font-medium font-['General_Sans_Variable'] leading-[1.1] text-center">
            {adv.heading}
          </h2>

          <p className="text-white text-sm sm:text-base md:text-lg lg:text-[18px] font-normal font-['General_Sans_Variable'] max-w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] mt-4 sm:mt-5 lg:mt-6 text-center leading-[1.4]">
            {adv.bodyText}
          </p>

          <div className="mt-6 sm:mt-7 lg:mt-8">
            <Button onClick={() => router.push("/applynow")} label={adv.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>
      </div>
    </section>
  );
}