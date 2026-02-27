"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
export default function ReverseWhat({ content }) {
  const router = useRouter();
  return (
    <section
      className="relative w-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
      style={{
        backgroundImage: `url(/What.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/WhatBG.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold uppercase text-white leading-tight">
          What Is a Reverse <br className="hidden sm:block" /> Mortgage?
        </h1>

        <p className="mt-4 sm:mt-5 lg:mt-6 text-xs sm:text-sm md:text-base text-white leading-relaxed max-w-3xl mx-auto">
          A Reverse Mortgage lets homeowners 62+ tap into home equity. Instead
          of paying the lender, you receive funds as a lump sum, credit line, or
          monthly payments. Repayment is due when you move out, sell, or pass
          away, and with FHA insurance, you or your heirs never owe more than
          the home's value.
        </p>

        <div className="mt-6 sm:mt-8 lg:mt-10 flex justify-center">
          <Button onClick={() => router.push("/applynow")} label="Get a Quote" bgColor="#FF6B6B" dotColor="#1a1a1a" />
        </div>
      </div>
    </section>
  );
}
