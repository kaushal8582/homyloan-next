"use client";

import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultHero = {
  heading: "Reverse\nMortgage (HECM)",
  description: "A Reverse Mortgage is also known as a HECM (Home Equity Conversion Mortgage).",
  ctaLabel: "Explore loan programs",
};

export default function ReverseMortgage({ content }) {
  const router = useRouter();
  const hero = mergeWithDefaults(defaultHero, content?.hero);

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 lg:py-20 mt-20 sm:mt-24 lg:mt-32 bg-white flex justify-center items-center">
      <div className="max-w-7xl w-full px-0 sm:px-4 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-20">
        <div className="w-full lg:max-w-xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight text-black">
            {(hero.heading || "").split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && (hero.heading || "").includes("\n") ? <br /> : null}</span>
            ))}
          </h1>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg text-black leading-relaxed">{hero.description}</p>
          <div className="mt-6 sm:mt-7 lg:mt-8 flex justify-center lg:justify-start">
            <Button
              onClick={() => router.push("/reverse")}
              label={hero.ctaLabel}
              bgColor="#E6FF3F"
              dotColor="#000000"
              className="!w-[85%] sm:!w-[28vw] lg:!w-[22vw]"
            />
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-[520px] h-64 sm:h-72 md:h-80 lg:h-[360px] flex-shrink-0">
          {/* Top image */}
          <img
            src="/Reverse3.svg"
            alt="Reverse mortgage home"
            className="absolute top-0 right-4 sm:right-6 lg:right-8 w-[70%] sm:w-[75%] lg:w-[420px] h-32 sm:h-40 lg:h-[180px] object-cover rounded-[60px] sm:rounded-[90px] lg:rounded-[120px]"
          />

          {/* Bottom left */}
          <img
            src="/Reverse2.svg"
            alt="Modern home"
            className="absolute bottom-0 left-0 sm:-left-4 lg:-left-[60px] w-[45%] sm:w-[48%] lg:w-[260px] h-24 sm:h-32 lg:h-[160px] object-cover rounded-[60px] sm:rounded-[90px] lg:rounded-[120px]"
          />

          {/* Bottom right */}
          <img
            src="/Reverse1.svg"
            alt="Family home"
            className="absolute bottom-0 right-0 sm:-right-4 lg:-right-8 w-[45%] sm:w-[48%] lg:w-[260px] h-24 sm:h-32 lg:h-[160px] object-cover rounded-[60px] sm:rounded-[90px] lg:rounded-[120px]"
          />
        </div>
      </div>
    </section>
  );
}
