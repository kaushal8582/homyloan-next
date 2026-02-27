"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import computer from "../assets/computer.svg";

const OnlinePayment = ({ content }) => {
  const router = useRouter();
  const heading = content?.heading || "NOW YOU CAN MAKE YOUR";
  const headingLine2 = content?.headingLine2 || "PAYMENTS ONLINE!";
  const listItems = content?.listItems || [
    "Steps to make your mortgage payment:",
    "Click on the \"Mortgage Payment Form\" to access the DocuSign document.",
    "Fill out the DocuSign ACH Authorization form.",
    "Click Send.",
    "That's it! Someone from our team will email you confirmation when completed.",
  ];
  const image = content?.image || "/OnlinePayment.svg";
  
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-start px-4 sm:px-6 md:px-12 lg:px-20 mt-16 sm:mt-20 lg:mt-28 mb-8 sm:mb-10 lg:mb-12 gap-8 lg:gap-0">
      {/* LEFT IMAGE */}
      <div className="w-full sm:w-[90%] lg:w-[585px] h-80 sm:h-96 md:h-[480px] lg:h-[601px] rounded-3xl sm:rounded-[45px] lg:rounded-[60px] flex items-center justify-center p-8 sm:p-10 lg:p-0">
        <div className="w-full h-full rounded-2xl sm:rounded-[35px] lg:rounded-[45px] overflow-hidden">
          <img
            src={image}
            className="w-full h-full object-cover"
            alt="Online Payment"
          />
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full lg:max-w-[550px] lg:ml-20 text-center lg:text-left">
        {/* HEADING */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-semibold uppercase leading-[110%] lg:leading-[105%] tracking-[1px] text-[#101011]">
          {heading} <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>{headingLine2}
        </h1>

        {/* DESCRIPTION LIST */}
        <ul className="mt-6 sm:mt-7 lg:mt-8 space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-[16px] text-[#101011] text-left max-w-lg mx-auto lg:mx-0 list-disc pl-7 sm:pl-8">
          {listItems.map((item, index) => (
            <li key={index} className={index < 2 ? "list-none -ml-4" : ""}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OnlinePayment;
