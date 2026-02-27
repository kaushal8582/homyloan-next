"use client";

import Image from "next/image";
import FHAloans from "../assets/FHAloans.jpg";
import VAloan from "../assets/VAloans.jpg";
import Conventionalloans from "../assets/conventionalloans.jpg";
import USDAloans from "../assets/usdaloans.jpg";
import DPAloans from "../assets/dpaloans.jpg";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultLoanOptions = {
  heading: "Our Loan Program Options",
  subtext:
    "Lorem Ipsum: The industry standard since the 1500s. It is derived from a 1st-century BC Latin text by Cicero, De finibus bonorum et malorum.",
  cards: [
    { title: "FHA Loans", description: "Requires as low as 3.5% down payment.", image: FHAloans, route: "/fha-loan" },
    { title: "VA Loans", description: "Often allows for zero down payment for eligible veterans.", image: VAloan, route: "/va-loan" },
    { title: "USDA Loans", description: "Offers zero down payment for eligible properties in rural areas.", image: USDAloans, route: "/usdaloan" },
    { title: "Conventional Loans", description: "Down payments can be as low as 3%.", image: Conventionalloans, route: "/conventional-loan" },
    { title: "DPA Loans", description: "Programs are available to help cover down payment.", image: DPAloans, route: "/Downpaymentassistance" },
  ],
};

function hasValue(v) {
  return v != null && (typeof v !== "string" || v.trim() !== "");
}

export default function PurchaseLoanOption({ content }) {
  const router = useRouter();
  const opts = content && typeof content === "object" ? content : {};
  const heading = hasValue(opts.heading) ? opts.heading : defaultLoanOptions.heading;
  const subtext = hasValue(opts.subtext) ? opts.subtext : defaultLoanOptions.subtext;
  const rawCards = Array.isArray(opts.cards) && opts.cards.length >= 5 ? opts.cards.slice(0, 5) : null;
  const cards = rawCards
    ? rawCards.map((card, i) => mergeWithDefaults(defaultLoanOptions.cards[i] || defaultLoanOptions.cards[0], card))
    : defaultLoanOptions.cards;

  const bigCard = cards[0];
  const smallCards = cards.slice(1, 5);

  return (
    <section className="w-full flex flex-col items-center bg-[#F3F3F3] py-10 sm:py-16 lg:py-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[55px] font-medium text-[#101011] text-center px-4">
        {heading}
      </h2>

      <p className="text-sm sm:text-base lg:text-[18px] text-[#101011] max-w-full sm:max-w-[90%] lg:max-w-[820px] text-center mt-3 sm:mt-4 px-4">
        {subtext}
      </p>

      <div className="mt-8 sm:mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 w-full max-w-7xl px-4 sm:px-6 lg:px-6">
        {bigCard && (
          <div className="relative col-span-1 sm:col-span-2 lg:col-span-6 lg:row-span-2 h-64 sm:h-80 lg:h-[520px] rounded-2xl sm:rounded-3xl lg:rounded-[30px] overflow-hidden">
            <Image src={bigCard.image || defaultLoanOptions.cards[0].image} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <button
              onClick={() => { const r = bigCard.route; router.push(typeof r === "string" ? r : "/fha-loan"); }}
              aria-label={`Explore ${bigCard.title}`}
              className="cursor-pointer absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 bg-white h-9 sm:h-10 lg:h-[50px] px-4 sm:px-5 lg:px-6 rounded-full font-semibold text-xs sm:text-sm lg:text-base transition-colors duration-200 ease-in-out hover:bg-black hover:text-white"
            >
              Explore →
            </button>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 text-white">
              <h3 className="text-base sm:text-lg lg:text-[20px] font-semibold">{bigCard.title}</h3>
              <p className="text-sm sm:text-base lg:text-[16px] mt-1 sm:mt-1.5 lg:mt-2">{bigCard.description}</p>
            </div>
          </div>
        )}

        {smallCards.map((card, i) => (
          <div
            key={i}
            className="relative col-span-1 lg:col-span-3 h-56 sm:h-64 lg:h-[250px] rounded-2xl sm:rounded-3xl lg:rounded-[30px] overflow-hidden"
          >
            <Image src={card.image || defaultLoanOptions.cards[i + 1]?.image} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <button
              onClick={() => { const r = card.route; if (typeof r === "string" && r !== "#") router.push(r); }}
              aria-label={`Explore ${card.title}`}
              className="cursor-pointer absolute top-3 right-3 sm:top-4 sm:right-4 bg-white h-9 sm:h-10 lg:h-[45px] px-4 sm:px-5 rounded-full font-semibold text-xs sm:text-sm lg:text-base transition-colors duration-200 ease-in-out hover:bg-black hover:text-white"
            >
              Explore →
            </button>
            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 lg:bottom-6 lg:left-6 text-white">
              <h3 className="text-base sm:text-lg lg:text-[20px] font-semibold">{card.title}</h3>
              <p className="text-sm sm:text-base lg:text-[16px] mt-1 sm:mt-1.5 lg:mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}