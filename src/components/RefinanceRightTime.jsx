"use client";

import Image from "next/image";
import home7 from "../assets/home7.jpg";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultRightTime = {
  heading: "WHEN IS THE RIGHT\nTIME TO REFINANCE?",
  subText:
    "To refinance a mortgage means to replace an existing mortgage loan with a new one. With a refinance, the principal balance of the existing loan is paid-in-full using the balance of the new loan.",
  imageUrl: "",
  bodyText:
    "There are several key indicators that it may be the right time to refinance. If your local housing market has driven up your home's value, the resulting high equity can open the door to a new loan with better terms or a cash out option. Also, if you can secure an interest rate that is significantly lower than your current one, refinancing is definitely worth exploring. Finally, if your mortgage is relatively new, getting a new loan early on can help ensure more of your monthly payment goes toward the principal balance, helping you build equity faster.",
  ctaLabel: "Get a Quote",
};

export default function RefinanceRightTime({ content }) {
  const router = useRouter();
  const rt = mergeWithDefaults(defaultRightTime, content?.rightTime);
  const imgSrc = (rt.imageUrl && rt.imageUrl.trim()) ? rt.imageUrl : home7;

  return (
    <section className="w-full bg-[#F4F4F4] py-20 px-6 flex flex-col items-center">
      <h1 className="text-[#101011] font-semibold text-[54px] leading-[100%] uppercase text-center max-w-[1100px]">
        {(rt.heading || "").split("\n").map((line, i) => (
          <span key={i}>{line}{i === 0 && (rt.heading || "").includes("\n") ? <br /> : null}</span>
        ))}
      </h1>
      <p className="text-[#101011] font-medium text-[18px] leading-[100%] text-center max-w-[850px] mt-6">{rt.subText}</p>
      <div className="mt-12 relative w-full max-w-[1030px] h-[464px] rounded-[70px] shadow-sm overflow-hidden">
        <Image src={imgSrc} fill alt="Home" className="object-cover" />
      </div>
      <p className="text-[#101011] font-medium text-[18px] leading-[100%] text-center max-w-[1000px] mt-10">{rt.bodyText}</p>
      <Button onClick={() => router.push("/applynow")} label={rt.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
    </section>
  );
}
