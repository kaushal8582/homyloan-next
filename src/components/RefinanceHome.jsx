"use client";

import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultReasons = {
  heading: "Reasons to Refinance",
  description:
    "Homeowners refinance for many reasons. We help you define your goal and choose the best option, which often includes: Securing a Lower Rate to reduce monthly payments and save money. Getting a Shorter Term to pay off the loan sooner and save on total interest. Switching to a Fixed Rate from an ARM for predictable payments. Converting Home Equity to Cash for major expenses or debt payoff.",
  ctaLabel: "Get a Quote",
  imageUrl: "/door.jpg",
};

export default function RefinanceHome({ content }) {
  const router = useRouter();
  const r = mergeWithDefaults(defaultReasons, content?.reasons);
  const imgSrc = (r.imageUrl && r.imageUrl.trim()) ? r.imageUrl : "/door.jpg";

  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-center gap-14">
      <div className="max-w-xl">
        <h1 className="text-[#101011] font-semibold text-[44px] leading-[100%] uppercase">{r.heading}</h1>
        <p className="text-[#101011B2] font-[400px] text-[18px] leading-[100%] mt-6">{r.description}</p>
        <Button onClick={() => router.push("/applynow")} label={r.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
      </div>
      <div>
        <img src={imgSrc} alt="Door" className="h-[385px] w-[600px] rounded-[24px] object-cover" />
      </div>
    </section>
  );
}