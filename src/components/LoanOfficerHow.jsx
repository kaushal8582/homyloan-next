import React from "react";

const LoanOfficerHow = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-24">
      {/* TOP 2-COLUMN SECTION */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 sm:gap-10 lg:gap-20">
        {/* LEFT IMAGE */}
        <div className="w-full sm:w-[90%] lg:w-[520px] h-64 sm:h-80 md:h-96 lg:h-[630px] rounded-2xl sm:rounded-3xl lg:rounded-[40px] overflow-hidden flex-shrink-0 mx-auto lg:mx-0">
          <img
            src="/LoanOfficer.svg"
            alt="Loan Officer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 w-full">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 lg:mb-10 leading-tight text-center lg:text-left">
            HOW TO BECOME A <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>LOAN OFFICER
          </h2>

          {/* STEP 1 */}
          <div className="mb-6 sm:mb-8 text-left">
            <p className="font-semibold text-sm sm:text-base">Step 1</p>
            <p className="uppercase font-semibold mt-1 text-sm sm:text-base">
              TAKE THE REQUIRED 20-HOUR COURSE
            </p>
            <ul className="list-disc ml-4 sm:ml-5 mt-2 sm:mt-3 text-gray-600 space-y-1 text-xs sm:text-sm lg:text-base">
              <li>
                Sign up to take the online 20-hour pre-license education course.
              </li>
              <li>
                Loan Factory offers a special discount of only $180 for the
                licensing course at Mortgage-Education.com.
              </li>
            </ul>
          </div>

          {/* STEP 2 */}
          <div className="mb-6 sm:mb-8 text-left">
            <p className="font-semibold text-sm sm:text-base">Step 2</p>
            <p className="uppercase font-semibold mt-1 text-sm sm:text-base">
              SAFE TEST WITH PROMETRIC
            </p>
            <ul className="list-disc ml-4 sm:ml-5 mt-2 sm:mt-3 text-gray-600 space-y-1 text-xs sm:text-sm lg:text-base">
              <li>Schedule and pass your SAFE Test with Prometric.</li>
              <li>
                Request an account and check your results on the NMLS database
                after 72 hours.
              </li>
            </ul>
          </div>

          {/* STEP 3 */}
          <div className="mb-8 sm:mb-10 text-left">
            <p className="font-semibold text-sm sm:text-base">Step 3</p>
            <p className="uppercase font-semibold mt-1 text-sm sm:text-base">
              APPLY FOR YOUR NMLS LICENSE
            </p>
            <ul className="list-disc ml-4 sm:ml-5 mt-2 sm:mt-3 text-gray-600 space-y-1 text-xs sm:text-sm lg:text-base">
              <li>Submit your payment and MU4 application through NMLS.</li>
              <li>Clear a credit check and background check to qualify.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FULL WIDTH FOOTNOTE */}
      <div className="max-w-7xl mx-auto mt-10 sm:mt-12 lg:mt-16 text-center px-0 sm:px-4 lg:px-10">
        <p className="text-gray-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-5 lg:mb-6">
          After obtaining a license, you should carefully choose a mortgage
          broker to work with. Loan Factory is the fastest-growing Mortgage
          Broker in the US. You can learn more about Loan Factory by attending
          our weekly webinar.
        </p>

        <p className="text-gray-500 text-xs sm:text-sm lg:text-base leading-relaxed">
          Loan Factory is not just an ordinary broker; we are a tech startup
          with proprietary technology that is disrupting the mortgage industry.
          You can see the benefits of working with Loan Factory here.
        </p>
      </div>
    </section>
  );
};

export default LoanOfficerHow;
