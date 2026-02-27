"use client";

import { useRouter } from "next/navigation";
import Button from "../UI/Button";

export default function CreditChallengedRenovation() {
  const router = useRouter();
  return (
    <section className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 sm:px-8 lg:px-20 mt-24 sm:mt-28 lg:mt-40 gap-8 lg:gap-12">
      {/* LEFT SIDE */}
      <div className="w-full lg:max-w-[600px] mt-0 sm:mt-6 lg:mt-16 flex-1 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-semibold text-[#101011] leading-[100%] uppercase">
          Renovation Loan <br /> Credit Challenged <br /> Mortgages
        </h1>

        <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[18px] font-medium text-[#101011] leading-[140%] opacity-80">
          At Homy Loans, we're committed to offering a wide range of mortgage options. A lower credit score doesn't automatically prevent you from owning a home—these loan programs are designed to help you achieve your homeownership dreams.
        </p>

        {/* BUTTON */}
        <div className="flex justify-center lg:justify-start mt-6 sm:mt-7 lg:mt-8">
          <Button 
            onClick={() => router.push("/purchase")}
            label="Explore Loan Programs" 
            bgColor="#E6FF4B" 
            dotColor="#1a1a1a" 
            className="!w-auto sm:!w-[28vw] lg:!w-[22vw]"  
          />
        </div>
      </div>

      {/* RIGHT IMAGE - RESPONSIVE */}
      <div className="relative w-full sm:w-[80%] lg:w-[500px] xl:w-[560px] h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[560px] mt-0 lg:mt-[80px] rounded-3xl sm:rounded-[40px] lg:rounded-[60px] overflow-hidden flex-shrink-0">
        <img
          src="/sufficent.svg"
          className="w-full h-full object-cover"
          alt="Renovation Loan Credit Challenged Mortgages"
        />
      </div>
    </section>
  );
}

