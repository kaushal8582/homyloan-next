import React from "react";

const ReferralTable2 = () => {
  return (
    <section className="w-full mt-24 sm:mt-28 md:mt-36 lg:mt-56 mb-12 sm:mb-16 lg:mb-20 flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-[1290px]">
        {/* PAGE HEADING */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-semibold leading-[110%] text-[#101011] mb-8 sm:mb-10 lg:mb-12 text-center lg:text-left">
          We appreciate your referral
        </h1>

        {/* OUTER CREAM BOX */}
        <div
          className="rounded-3xl sm:rounded-[35px] lg:rounded-[50px] p-6 sm:p-8 md:p-10 lg:p-12"
          style={{
            background: "#FBFBDC",
            border: "1px solid rgba(230,255,75,0.5)",
          }}
        >
          <p className="font-semibold mb-2 text-sm sm:text-base">Step 1</p>

          <p className="uppercase font-semibold text-base sm:text-lg mb-4">
            TAKE THE REQUIRED 20-HOUR COURSE
          </p>

          <ol className="list-decimal ml-4 sm:ml-5 space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-left">
            <li>
              Signup to take the 20-hour pre-license education course. The
              fastest growing online mortgage pre-licensing education from Loan
              Factory.
            </li>

            <li>
              Save big! Make sure to use referral registration and receive
              special discount at{" "}
              <a
                href="https://www.mortgage-education.com"
                target="_blank"
                rel="noreferrer"
                className="text-red-500 underline break-all"
              >
                www.Mortgage-Education.com
              </a>
            </li>
          </ol>

          <p className="font-semibold uppercase mb-3 sm:mb-4 text-sm sm:text-base">
            BONUS FOR LOAN FACTORY LOAN OFFICERS:
          </p>
          {/* BONUS TABLE */}
          <div className="bg-white rounded-[30px] overflow-x-auto border border-[#E5E5E5]">
            <div className="min-w-[900px]">
              {/* GREEN HEADER AREA */}
              <div
                style={{ borderBottomRightRadius: "35px" }}
                className="bg-[#E6FF4B] overflow-hidden rounded-t-[30px] px-6 pt-4 pb-8 relative shadow"
              >
                {/* TOP HEADER */}
                <div className="grid grid-cols-4 text-sm font-semibold">
                  <div>Number loan closed in the preceding 12 months</div>

                  <div className="col-span-2 text-center">
                    REFERRING LOAN OFFICER
                  </div>

                  <div className="text-center">Referred Loan Officer</div>
                </div>

                {/* FLOATING SUB HEADER */}
                <div className="absolute right-0 bottom-0 w-[75%]">
                  <div
                    style={{
                      borderTopRightRadius: "30px",
                      borderBottomLeftRadius: "0px",
                    }}
                    className="grid grid-cols-4 bg-white rounded-full shadow-md text-sm font-medium pl-10"
                  >
                    <div className="py-2 text-center">One-time Bonus</div>

                    <div className="py-2 pl-20 text-right">RSUs</div>

                    <div className="py-2 pl-58 text-right">RSUs</div>
                  </div>
                </div>
              </div>

              {/* SPACE FOR FLOATING HEADER */}
              <div className="h-10"></div>

              {/* ROWS */}
              {[
                ["0", "$200", "0", "0"],
                ["<12", "$500", "0", "0"],
                ["12+", "$1,000", "1,000", "2,000"],
                ["24+", "$2,000", "2,000", "4,000"],
                ["36+", "$3,000", "3,000", "6,000"],
                ["48+", "$4,000", "4,000", "8,000"],
                ["60+", "$5,000", "5,000", "10,000"],
                ["72+", "$6,000", "6,000", "12,000"],
                ["84+", "$7,000", "7,000", "14,000"],
                ["108+", "$9,000", "9,000", "18,000"],
                ["120+", "$10,000", "10,000", "20,000"],
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 text-sm">
                  <div className="p-3">{row[0]}</div>

                  <div className="p-3 text-center border-l border-black/10">
                    {row[1]}
                  </div>

                  <div className="p-3 text-center border-l border-black/10">
                    {row[2]}
                  </div>

                  <div className="p-3 text-center border-l border-black/10">
                    {row[3]}
                  </div>
                </div>
              ))}

              {/* LOAD MORE BUTTON */}
              <div className="flex justify-center py-6">
                <button className="px-10 py-2 bg-black text-[#E6FF4B] rounded-full text-sm font-medium hover:bg-gray-900 transition-colors">
                  Load More!
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* EXAMPLE & BONUS INFO */}
        <div className="mt-6 sm:mt-8 lg:mt-10 space-y-4 sm:space-y-6 max-w-3xl">
          {/* Example Section */}
          <div>
            <p className="font-semibold mb-2 text-sm sm:text-base">For example:</p>

            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3">
              If the referred LO closed 7 loans in the preceding 12 months, the
              referring LO will earn a one-time bonus of $500
            </p>

            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              If the referred LO closed 50 loans in the preceding 12 months, the
              referring LO will earn a one-time bonus of $4000 or 4000 RSUs. The
              referred LO will earn 8000 RSUs.
            </p>
          </div>

          {/* Bonus If Not Loan Factory LO */}
          <div>
            <p className="font-semibold uppercase mb-3 text-sm sm:text-base">
              Bonus if you are not a Loan Factory Loan Officer:
            </p>

            <ul className="list-disc ml-4 sm:ml-5 space-y-2 text-xs sm:text-sm lg:text-base text-gray-600 text-left">
              <li>
                Earn $200 for referring a loan officer who closed less than 5
                loans in the preceding 12 months
              </li>

              <li>
                Earn $500 for referring a loan officer who closed 5+ loans in
                the preceding 12 months
              </li>
            </ul>
          </div>
        </div>
        {/* WHO ARE YOU REFERRING */}
        <div className="mt-10 sm:mt-12 lg:mt-16">
          <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold mb-6 sm:mb-7 lg:mb-8">
            Who Are You Referring?
          </h3>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-5 lg:gap-y-6">
            {/* First Name */}
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Loan officer's first name *
              </label>
              <input
                placeholder="Full Name"
                className="w-full h-11 sm:h-12 lg:h-[48px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Loan officer's last name
              </label>
              <input
                placeholder="Last Name"
                className="w-full h-11 sm:h-12 lg:h-[48px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Loan officer's email *
              </label>
              <input
                placeholder="Email"
                className="w-full h-11 sm:h-12 lg:h-[48px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Loan officer's phone *
              </label>
              <input
                placeholder="(000) 000-0000"
                className="w-full h-11 sm:h-12 lg:h-[48px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>

            {/* NOTE (FULL WIDTH) */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-sm sm:text-base">Note</label>
              <textarea
                placeholder="Enter Note"
                rows={5}
                className="w-full border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 py-3 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>
          </div>
        </div>
        {/* YOUR CONTACT INFORMATION */}
        <div className="mt-10 sm:mt-12 lg:mt-16">
          <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold mb-6 sm:mb-7 lg:mb-8">
            Your Contact Information
          </h3>

          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-4 sm:mb-5 lg:mb-6">
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">Your name *</label>
              <input
                placeholder="Full Name"
                className="w-full h-11 sm:h-12 lg:h-[48px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">Your email *</label>
              <input
                placeholder="Email"
                className="w-full h-11 sm:h-12 lg:h-[48px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>
          </div>

          {/* Phone + Zelle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-4 sm:mb-5 lg:mb-6">
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">Your phone</label>
              <input
                placeholder="(000) 000-0000"
                className="w-full h-11 sm:h-12 lg:h-[48px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Do you have a Zelle account?
              </label>

              <div className="flex gap-2 sm:gap-3 mt-1">
                <button className="px-6 sm:px-8 h-10 sm:h-11 lg:h-[44px] rounded-full bg-[#F1F1F1] text-xs sm:text-sm hover:bg-gray-200 transition-colors">
                  Yes
                </button>

                <button className="px-6 sm:px-8 h-10 sm:h-11 lg:h-[44px] rounded-full bg-[#FFE3D5] text-[#FF6B3D] border border-[#FF6B3D] text-xs sm:text-sm hover:bg-[#FFD5C0] transition-colors">
                  No
                </button>
              </div>
            </div>
          </div>

          {/* Preferred Payment Method */}
          <div className="mb-4 sm:mb-5 lg:mb-6">
            <label className="block mb-2 font-medium text-sm sm:text-base">
              Tell us your preferred payment method *
            </label>

            <textarea
              placeholder="Your Preferred Payment Method"
              className="w-full h-24 sm:h-28 lg:h-[120px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 py-3 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2 mb-6 sm:mb-8 lg:mb-10 text-xs sm:text-sm text-gray-600">
            <input type="checkbox" className="mt-0.5 sm:mt-1 flex-shrink-0" />
            <span>
              Email me when the referred loan officer attended the webinar or
              sponsored by Loan Factory.
            </span>
          </div>

          {/* SUBMIT BUTTON */}
          <button className="w-full sm:w-auto sm:min-w-[220px] lg:w-[280px] h-12 sm:h-14 lg:h-[55px] bg-black text-[#E6FF4B] rounded-xl lg:rounded-[14px] font-semibold text-sm sm:text-base hover:bg-gray-900 transition-colors">
            Send Referral
          </button>
        </div>
        {/* POLICY SECTION */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h3 className="text-base sm:text-lg lg:text-[20px] font-semibold mb-4 sm:mb-5 lg:mb-6">
            Policy When the Referrals are NOT Eligible:
          </h3>

          <ol className="list-decimal ml-4 sm:ml-5 space-y-3 sm:space-y-4 lg:space-y-5 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed text-left">
            <li>
              The referred loan officer joined after 120 days from the referral
              date.
              <br />
              <span className="font-medium text-gray-700">Reason:</span> The
              loan officer should persuade the recruited loan officer to attend
              the webinar and join Loan Factory within 120 days.
            </li>

            <li>
              The referred loan officer registered or attended our weekly
              webinar before the referral date.
              <br />
              <span className="font-medium text-gray-700">Reason:</span> The
              loan officer was recruited by Loan Factory before being recruited
              by the referring loan officer.
            </li>

            <li>The referred loan officer joined Loan Factory in the past.</li>

            <li>The referrer and referee loan officers are spouses.</li>

            <li>
              The referred loan officer is a mortgage broker (owns a mortgage
              brokerage) or is with another broker (concurrently with Loan
              Factory). In other words, if the referred loan officer is
              simultaneously working with another mortgage company while being
              with Loan Factory, no referral bonus will be awarded.
            </li>
          </ol>

          <p className="mt-4 sm:mt-5 lg:mt-6 text-xs sm:text-sm lg:text-base text-gray-600">
            <span className="font-medium text-gray-700">Reason:</span> The
            referred loan officer is not considered exclusive to Loan Factory.
          </p>

          {/* BONUS PAYMENT */}
          <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
            <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold mb-3 sm:mb-4">Bonus Payment:</h3>

            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4 sm:mb-5 lg:mb-6">
              Referring loan officer will be eligible for bonus{" "}
              <span className="font-semibold text-gray-800">
                60 days after the referred loan officer is 100% onboarded.
              </span>
            </p>

            <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every Saturday, the system will automatically detect eligible
              bonuses from 60 days ago (refer to the policy above). It will then
              generate special commission requests for Commission Team to review
              and approve the referral bonuses. From there it can take another
              15 days to receive payment.
              <br />
              <br />
              So you can expect your bonus payment approximately{" "}
              <span className="font-semibold text-gray-800">
                75 days from the date the referred LO is 100% onboarded.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralTable2;
