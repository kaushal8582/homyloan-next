"use client";

import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultHero = {
  heading: "USDA Loans",
  description: "Homy Loans now offers in-house USDA loans, providing faster approvals and personalized service to help you achieve your homeownership goals with ease.",
  ctaLabel: "Explore loan programs",
};

export default function USDALoans({ content }) {
  const router = useRouter();
  const hero = mergeWithDefaults(defaultHero, content);
  return (
    <section className="w-full min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 lg:py-20 mt-10 sm:mt-12 lg:mt-16  flex justify-center items-center">
      <div className="max-w-7xl w-full px-0 sm:px-4 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-20">
        <div className="w-full lg:max-w-xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight text-black">
            {hero.heading}
          </h1>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg text-black leading-relaxed">
            {hero.description}
          </p>
          <div className="mt-6 sm:mt-7 lg:mt-8 flex justify-center lg:justify-start">
            <Button
              onClick={() => router.push("/usda")}
              label={hero.ctaLabel}
              bgColor="#E6FF4B"
              dotColor="#000000"
              className="!w-auto sm:!w-[28vw] lg:!w-[22vw]"
            />
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-[520px] h-64 sm:h-72 md:h-80 lg:h-[360px] flex-shrink-0">
          {/* Top image */}
          <img
            src={hero.imageUrl || "/Reverse3.svg"}
            alt="USDA home"
            className="absolute top-0 right-4 sm:right-6 lg:right-8 w-[70%] sm:w-[75%] lg:w-[420px] h-32 sm:h-40 lg:h-[180px] object-cover rounded-[60px] sm:rounded-[90px] lg:rounded-[120px]"
          />

          {/* Bottom left */}
          <img
            src={hero.imageUrl2 || "/Reverse2.svg"}
            alt="USDA home"
            className="absolute bottom-0 left-0 sm:-left-4 lg:-left-[60px] w-[45%] sm:w-[48%] lg:w-[260px] h-24 sm:h-32 lg:h-[160px] object-cover rounded-[60px] sm:rounded-[90px] lg:rounded-[120px]"
          />

          {/* Bottom right */}
          <img
            src={hero.imageUrl3 || "/Reverse1.svg"}
            alt="USDA home"
            className="absolute bottom-0 right-0 sm:-right-4 lg:-right-8 w-[45%] sm:w-[48%] lg:w-[260px] h-24 sm:h-32 lg:h-[160px] object-cover rounded-[60px] sm:rounded-[90px] lg:rounded-[120px]"
          />
        </div>
      </div>
    </section>
  );
}

