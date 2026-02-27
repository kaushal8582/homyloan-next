"use client";

import Image from "next/image";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import home3 from "../assets/home3.jpg";
import home4 from "../assets/home4.jpg";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultHero = {
  mainHeading: "HOME PURCHASE LOANS",
  subText:
    "Owning a home offers more than equity—it brings stability, fulfillment, and community. At Homy Loans, we make it possible with financing starting at just 3% down**. Let's clear up common myths so you can buy with confidence.",
  ctaPrimaryLabel: "Check Today's Rate",
  ctaSecondaryLabel: "Get a Quote",
  imageUrls: [home1, home2, home3, home4],
  factHeading: "FACT VERSUS FICTION:\nYOUR DOWN PAYMENT",
  factText:
    "Many people still believe a 20% down payment is required to buy a home. This is simply not true. We offer a multitude of programs that could work for your home purchase, with many options requiring a much smaller down payment.",
};

export default function PurchaseLoanHero({ content }) {
  const router = useRouter();
  const c = content && typeof content === "object" ? content : {};
  const hero = mergeWithDefaults(defaultHero, c);
  const defaultUrls = defaultHero.imageUrls;
  const fromApi = Array.isArray(hero.imageUrls) ? hero.imageUrls.slice(0, 4) : [];
  const imageUrls = [0, 1, 2, 3].map((i) =>
    fromApi[i] && typeof fromApi[i] === "string" && fromApi[i].trim() ? fromApi[i] : defaultUrls[i]
  );
  const factLines = (hero.factHeading || defaultHero.factHeading).split("\n");

  return (
    <div className="w-full">
      <section className="w-full flex flex-col items-center text-center mt-[120px] sm:mt-32 lg:mt-40 px-4 sm:px-6 lg:px-8">
        <h1 className="text-[#101011] font-semibold uppercase leading-[1] text-3xl sm:text-4xl md:text-5xl lg:text-[65px]">
          {hero.mainHeading}
        </h1>

        <p className="text-[#101011] font-medium text-sm sm:text-base lg:text-[18px] leading-[1.4] mt-4 sm:mt-5 lg:mt-6 max-w-[950px] mx-auto">
          {hero.subText}
        </p>

        <div className="mt-5 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
          <Button
            onClick={() => router.push("/applynow")}
            label={hero.ctaPrimaryLabel}
            bgColor="#FF6B6B"
            dotColor="#1a1a1a"
          />
          <Button
            onClick={() => router.push("/applynow")}
            label={hero.ctaSecondaryLabel}
            bgColor="#FF6B6B"
            dotColor="#1a1a1a"
          />
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 w-full max-w-7xl mx-auto bg-[#FFFFFF] gap-3 sm:gap-4 md:gap-6 lg:gap-10 mt-12 sm:mt-24 md:mt-32 lg:mt-40 px-4 sm:px-6 lg:px-8">
        {imageUrls.slice(0, 4).map((img, i) => (
          <div
            key={i}
            className="w-full aspect-square overflow-hidden rounded-lg sm:rounded-xl relative"
          >
            <Image
              src={img}
              fill
              className="object-cover"
              style={{ transform: "scale(1.2)" }}
              alt={`Home ${i + 1}`}
            />
          </div>
        ))}
      </div>

      <section className="w-full py-16 sm:py-20 md:py-24 lg:py-28 flex flex-col items-center bg-[#FFFFFF] text-center px-4 sm:px-6 lg:px-8">
        <h2 className="font-['General_Sans_Variable'] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[55px] leading-[1.1] uppercase text-[#101011]">
          {factLines[0]}
          {factLines.length > 1 && (
            <>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px]">{factLines[1]}</span>
            </>
          )}
        </h2>

        <p className="mt-4 sm:mt-5 lg:mt-6 max-w-[820px] font-['General_Sans_Variable'] font-medium text-sm sm:text-base lg:text-[18px] leading-[1.4] text-[#101011]">
          {hero.factText}
        </p>
      </section>
    </div>
  );
}
