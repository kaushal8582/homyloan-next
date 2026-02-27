"use client";

import { useRouter } from "next/navigation";
import Button from "../UI/Button";

export default function MortgageForCredit({ content }) {
  const router = useRouter();
  return (
  <section className="w-full px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-16 flex justify-center bg-[#F4F4F4] h-[100vh] 2xl:h-auto overflow-hidden">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
        {/* LEFT CONTENT */}
        <div className="w-full lg:max-w-xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase leading-tight text-black">
            Mortgages for <br /> the Credit <br /> Challenged
          </h1>

          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base leading-relaxed text-black/70">
            At Homy Loans, we believe low credit scores should not automatically
            prevent you from achieving homeownership. We are committed to
            offering a robust product lineup flexible loan options for buyers
            who are credit challenged, ensuring you have an empowered journey
            your way.
          </p>

          <div className="mt-4 sm:mt-5 flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label="Get a Quote" bgColor="#E6FF3F" dotColor="#000000" />
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:w-auto items-center">
          <img
            src="/Credit1.svg"
            alt="Exterior home"
            className="w-full sm:w-64 md:w-80 lg:w-[400px] h-64 sm:h-72 md:h-80 lg:h-[350px] rounded-2xl object-cover"
          />

          <img
            src="/credit2.svg"
            alt="Interior home"
            className="w-full sm:w-64 md:w-80 lg:w-[400px] h-64 sm:h-72 md:h-80 lg:h-[350px] rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
