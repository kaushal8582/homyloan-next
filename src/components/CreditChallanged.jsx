"use client";

import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultHero = {
  heading: "Credit Challenged\nMortgages",
  description:
    "At Homy Loans, we're committed to offering a wide range of mortgage options! A lower credit score doesn't automatically prevent you from owning a home— there are programs designed to help you achieve your homeownership dreams.",
  ctaLabel: "Explore loan programs",
};

export default function CreditChallenged({ content }) {
  const router = useRouter();
  const hero = mergeWithDefaults(defaultHero, content?.hero);

  return (
    <section className="w-full py-28 pb-32 sm:pb-28 flex justify-center items-center bg-white h-screen">
      <div className="max-w-3xl text-center px-6 mt-32 sm:mt-28 md:mt-24 lg:mt-20">
        <h1 className="text-5xl font-bold uppercase leading-tight text-black">
          {(hero.heading || "").split("\n").map((line, i) => (
            <span key={i}>{line}{i === 0 && (hero.heading || "").includes("\n") ? <br /> : null}</span>
          ))}
        </h1>
        <p className="mt-6 text-base font-medium leading-relaxed text-black">{hero.description}</p>
        <div className="mt-2 sm:mt-4 md:mt-5 mb-8 sm:mb-6 md:mb-4 flex justify-center">
          <Button
            onClick={() => router.push("/credit-challenged")}
            label={hero.ctaLabel}
            bgColor="#E6FF3F"
            dotColor="#000000"
            className="!w-[85%] sm:!w-[28vw] lg:!w-[22vw]"
          />
        </div>
      </div>
    </section>
  );
}
