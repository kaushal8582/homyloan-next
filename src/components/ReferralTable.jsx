import React from "react";

const ReferralTable = () => {
  return (
    <section className="w-full flex justify-center px-4 sm:px-6 md:px-10 lg:px-20 mt-28 sm:mt-32 md:mt-40 lg:mt-64 mb-12 sm:mb-16 lg:mb-20">
      {/* OUTER GRADIENT BOX */}
      <div
        className="rounded-3xl sm:rounded-[35px] lg:rounded-[50px] w-full max-w-[1290px] p-6 sm:p-8 md:p-10 lg:p-12"
        style={{
          background:
            "linear-gradient(132.67deg, rgba(230,255,75,0.20) 0.55%, rgba(246,195,88,0.20) 100.89%)",
          border: "1px solid rgba(230,255,75,0.5)",
        }}
      >
        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[55px] font-medium text-[#101011] leading-[110%] lg:leading-[100%] text-center lg:text-left">
          We appreciate your referral
        </h1>

        {/* INNER WHITE FORM BOX */}
        <div className="w-full max-w-[1187px] bg-white border border-[#D4D4D4] rounded-2xl sm:rounded-3xl lg:rounded-[40px] mt-6 sm:mt-8 lg:mt-10 p-6 sm:p-8 md:p-10 lg:p-12 shadow">
          {/* BORROWER INFO */}
          <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold mb-4 sm:mb-5 lg:mb-6">
            Borrower Information
          </h3>

          {/* Borrower Full Name */}
          <div className="mb-4 sm:mb-5 lg:mb-6">
            <label className="block mb-2 font-medium text-sm sm:text-base">
              Borrower's full name *
            </label>
            <input
              placeholder="Full Name"
              className="w-full h-12 sm:h-14 lg:h-[60px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
            />
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-4">
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">Borrower's phone</label>
              <input
                placeholder="(000) 000-0000"
                className="w-full h-12 sm:h-14 lg:h-[60px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Borrower's email(s)
              </label>
              <input
                placeholder="Email"
                className="w-full h-12 sm:h-14 lg:h-[60px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start sm:items-center gap-2 mb-8 sm:mb-9 lg:mb-10 text-xs sm:text-sm text-gray-500">
            <input type="checkbox" className="mt-0.5 sm:mt-0 flex-shrink-0" />
            <span>
              Email me when the borrowers apply and when their loan is funded
            </span>
          </div>

          {/* PERSONAL INFO */}
          <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold mb-4 sm:mb-5 lg:mb-6">
            Personal Information
          </h3>

          {/* Your Name */}
          <div className="mb-4 sm:mb-5 lg:mb-6">
            <label className="block mb-2 font-medium text-sm sm:text-base">Your name *</label>
            <input
              placeholder="Full Name"
              className="w-full h-12 sm:h-14 lg:h-[60px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
            />
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-2">
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">Your phone</label>
              <input
                placeholder="(000) 000-0000"
                className="w-full h-12 sm:h-14 lg:h-[60px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">Your email *</label>
              <input
                placeholder="Email"
                className="w-full h-12 sm:h-14 lg:h-[60px] border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E6FF4B]"
              />
            </div>
          </div>

          {/* Helper text */}
          <p className="text-[10px] sm:text-xs text-gray-400 mb-6 sm:mb-8 lg:mb-10 text-end">
            We would like to know your email address so that we can show our
            appreciation to you
          </p>

          {/* BUTTON */}
          <button className="w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px] lg:w-[25vw] h-12 sm:h-14 lg:h-[55px] bg-black text-[#E6FF4B] rounded-xl lg:rounded-[14px] font-semibold text-sm sm:text-base hover:bg-gray-900 transition-colors">
            Send Referral
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReferralTable;
