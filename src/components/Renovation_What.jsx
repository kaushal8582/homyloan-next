"use client";

import Renovationwhat from "../assets/Renovationwhat.jpg";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
export default function Renovation_what({ content }) {
  const router = useRouter();
  return (
    <section className=" max-w-[1480px] mx-auto w-full flex flex-col lg:flex-row items-center justify-start px-4 sm:px-8 lg:px-20 mt-16 sm:mt-20 lg:mt-28 gap-8 lg:gap-0 py-10 lg:py-0">

      {/* LEFT IMAGE CARD */}
      <div className="w-full sm:w-[90%] lg:w-[585px] h-80 sm:h-96 md:h-[450px] lg:h-[601px] bg-[#F5F5F5] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] flex items-center justify-center p-6 sm:p-8 lg:p-0 order-2 lg:order-1">
        <div className="w-full h-full sm:w-[85%] sm:h-[85%] lg:w-[480px] lg:h-[480px] rounded-3xl sm:rounded-[40px] lg:rounded-[45px] overflow-hidden">
          <img
            src={Renovationwhat}
            className="w-full h-full object-cover"
            alt="Renovation Loan"
          />
        </div>
      </div>

      {/* RIGHT TEXT SECTION */}
      <div className="w-full lg:max-w-[550px] lg:ml-20 order-1 lg:order-2 text-center lg:text-left">

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-medium uppercase leading-[120%] text-[#101011]">
          What is <br /> Renovation Loan?
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[17px] font-normal leading-[140%] text-[#101011B2]">
          A renovation loan is a single mortgage that includes both the cost of
          buying or refinancing a property and the funds needed for
          improvements and repairs. Instead of managing multiple loans, the
          entire balance is rolled into one monthly mortgage payment, making it
          simple to finance your project.
        </p>
        <div className="flex justify-center lg:justify-start mt-6 sm:mt-7 lg:mt-8">
          <Button onClick={()=>{router.push("/applynow")}} label="Check Today's Rates" bgColor="#FF6B6B" dotColor="#1a1a1a"
          className="!w-auto sm:!w-[28vw] lg:!w-[18vw]"/>
        </div>
      </div>
     
    </section>
  );
}
