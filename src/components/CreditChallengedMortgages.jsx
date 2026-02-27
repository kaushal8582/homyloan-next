"use client";

import { useRouter } from "next/navigation";
import Button from "../UI/Button";

export default function CreditChallengedMortgages() {
  const router = useRouter();
  return (
    <section className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 sm:px-8 lg:px-20 mt-12 sm:mt-16 lg:mt-24 gap-8 lg:gap-12">
      {/* LEFT IMAGE - RESPONSIVE */}
      <div className="relative w-full sm:w-[80%] lg:w-[500px] xl:w-[560px] h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[560px] rounded-3xl sm:rounded-[40px] lg:rounded-[60px] overflow-hidden flex-shrink-0 order-2 lg:order-1">
        <img
          src="/sufficent.svg"
          className="w-full h-full object-cover"
          alt="Mortgages for the Credit Challenged"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:max-w-[600px] mt-0 sm:mt-6 lg:mt-16 flex-1 text-center lg:text-left order-1 lg:order-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold text-[#101011] leading-[100%] uppercase">
          Mortgages for the <br /> Credit Challenged
        </h1>

        <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-medium text-[#101011] leading-[140%] opacity-80">
          At Homy Loans, we believe no one's credit score should automatically prevent you from achieving homeownership. We are committed to offering a robust product line that includes flexible loan options for buyers who are credit challenged, ensuring you have an experienced partner by your side every step of the way.
        </p>

        {/* BUTTON */}
        <div className="flex justify-center lg:justify-start mt-6 sm:mt-7 lg:mt-8">
          <Button 
            onClick={() => router.push("/applynow")}
            label="Get a Quote" 
            bgColor="#E6FF4B" 
            dotColor="#1a1a1a" 
            className="!w-auto sm:!w-[28vw] lg:!w-[22vw]"  
          />
        </div>
      </div>
    </section>
  );
}

