"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import homyloan from "../assets/homyloan.png";
import consumerAccess from "../assets/consumerAccess.png";
import housingOpportunity from "../assets/housingopportunity.png";
import linkedicon from "../assets/linkedinicon.svg";
import facebookicon from "../assets/facebookicon.svg";
import twittericon from "../assets/twitter.svg";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0D0D] text-white pt-20 pb-10 font-['General_Sans_Variable']">
      {/* TOP SECTION */}
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* LEFT SIDE */}
        <div>
          <Image src={homyloan} alt="HomyLoan Logo" width={180} height={60} className="mb-6" />
          <p className="text-[16px] font-medium leading-[1]">info@homyloan.com</p>
          <p className="text-[16px] font-medium leading-[1] mt-1">+1 (214) 494-9492</p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 mt-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-[35px] h-[35px] rounded-full border border-[#7C7C7C] flex items-center justify-center hover:bg-white/10 transition-all">
              <Image src={linkedicon} alt="linkedin" width={20} height={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-[35px] h-[35px] rounded-full border border-[#7C7C7C] flex items-center justify-center hover:bg-white/10 transition-all">
              <Image src={facebookicon} alt="facebook" width={20} height={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-[35px] h-[35px] rounded-full border border-[#7C7C7C] flex items-center justify-center hover:bg-white/10 transition-all">
              <Image src={twittericon} alt="twitter" width={20} height={20} />
            </a>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="flex justify-between">
          {/* Pick Your Mortgage - Matched with Purchase Dropdown */}
          <div>
            <h3 className="text-[16px] font-bold leading-[28px] mb-4">Pick your Mortgage</h3>
            <ul className="space-y-3 text-[16px] font-normal flex flex-col">
              <a href="/purchase" className="hover:text-[#E6FF4B]">Buy a Home</a>
              <a href="/refinance2" className="hover:text-[#E6FF4B]">Save money</a>
              <a href="/va-loan" className="hover:text-[#E6FF4B]">Use my VA Benefits</a>
              <a href="/jumbo-loans" className="hover:text-[#E6FF4B]">Buy Big</a>
              <a href="/renovation-loans" className="hover:text-[#E6FF4B]">Remodel</a>
              <a href="/Downpaymentassistance" className="hover:text-[#E6FF4B]">Help With Downpayment</a>
              <a href="/usda" className="hover:text-[#E6FF4B]">Rural Housing</a>
              <a href="/credit-challenged" className="hover:text-[#E6FF4B]">Credit Challenged</a>
              <a href="/reverse" className="hover:text-[#E6FF4B]">Retire Comfortably</a>
            </ul>
          </div>

          {/* Your Mortgage Options - Matched with Resources/ApplyNow */}
          <div>
            <h3 className="text-[16px] font-bold leading-[28px] mb-4">Your Mortgage Options</h3>
            <ul className="space-y-3 text-[16px] font-normal flex flex-col">
              <a href="/applynow" className="hover:text-[#E6FF4B]">Apply Now</a>
              <a href="/mortgagepayment" className="hover:text-[#E6FF4B]">Mortgage Payment</a>
              <a href="/findofficer" className="hover:text-[#E6FF4B]">Find a Licensed Loan Officer</a>
              <a href="/rate-calculator" className="hover:text-[#E6FF4B]">Check Today’s Rates</a>
              <a href="/rate-calculator" className="hover:text-[#E6FF4B]">Mortgage Calculator</a>
              <a href="/homebuyer" className="hover:text-[#E6FF4B]">Homebuyer Mortgage Guide</a>
              <a href="/careermeetpurpose" className="hover:text-[#E6FF4B]">Loan Officer Opportunities</a>
            </ul>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <h3 className="text-[16px] font-bold leading-[28px] mb-4">Legal Center</h3>
          <ul className="space-y-3 text-[16px] font-normal">
            <li className="text-white/70">Licensing</li>
            <li className="text-white/50 text-sm">
              NMLS 2783307 | BK #0910215 | MA <br />
              #ML42056 | CA #603GS64
            </li>
            <li className="hover:text-[#E6FF4B] cursor-pointer">Legal Disclaimer</li>
            <li className="hover:text-[#E6FF4B] cursor-pointer">An Equal Housing Lender</li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="w-full border-t border-[#333] my-15"></div>

      {/* LOGOS */}
      <div className="flex items-center justify-center gap-10 mb-10">
        <Image src={housingOpportunity} alt="Housing Opportunity" width={65} height={65} />
        <Image src={consumerAccess} alt="Consumer Access" width={65} height={65} />
      </div>

      {/* LINKS */}
      <div className="text-center text-[14px] underline font-normal space-x-3 px-6 leading-loose">
        <Link href="/ecoa" className="hover:text-[#E6FF4B]">ECOA</Link> |
        <Link href="/fair-housing" className="hover:text-[#E6FF4B]">Fair Housing Act</Link> |
        <Link href="/dodd-frank" className="hover:text-[#E6FF4B]">Dodd Frank Act</Link> |
        <Link href="/advertisement" className="hover:text-[#E6FF4B]">Advertising and Marketing</Link> |
        <Link href="/fair-lending" className="hover:text-[#E6FF4B]">Fair Lending</Link> |
        <Link href="/data-privacy-security" className="hover:text-[#E6FF4B]">Data Privacy and Security</Link> |
        <Link href="/training-and-education" className="hover:text-[#E6FF4B]">Training and Education</Link> |
        <Link href="/state-law-regulation" className="hover:text-[#E6FF4B]">State Laws & Regulations</Link>
      </div>

      {/* COPYRIGHT */}
      <p className="text-center text-[14px] font-['Poppins'] mt-4 text-white/60">
        All Rights Reserved Homy Loans LLC | Copyright © 2026
      </p>
    </footer>
  );
}