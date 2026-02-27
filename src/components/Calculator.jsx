"use client";

import { useRouter } from "next/navigation";
export default function Calculator() {
  const router = useRouter()
  return (
    <section className="w-full flex justify-center mt-10 sm:mt-16 lg:mt-20 px-4 sm:px-8 lg:px-20">

      {/* OUTER GRADIENT BACKGROUND + ROUNDED BORDER BOX */}
      <div
        className="rounded-3xl sm:rounded-[40px] lg:rounded-[50px] w-full lg:w-[90vw] max-w-[1290px] p-2 pt-6 sm:p-8 lg:p-12"
        style={{
          background:
            "linear-gradient(132.67deg, rgba(230,255,75,0.20) 0.55%, rgba(246,195,88,0.20) 100.89%)",
          border: "1px solid rgba(230,255,75,0.5)",
        }}
      >

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl lg:text-[55px] font-medium text-[#101011] leading-[100%]">
          Calculator
        </h1>

        {/* INNER WHITE BOX */}
        <div className="w-full max-w-[1187px] bg-[#FFFFFF] border border-[#D4D4D4] rounded-3xl sm:rounded-[40px] lg:rounded-[50px] mt-6 sm:mt-8 lg:mt-10 p-6 sm:p-8 lg:p-12 shadow">

          {/* HEADINGS */}
          <h3 className="text-[#000000] text-xl sm:text-2xl lg:text-[25px] font-semibold">House Payment</h3>
          <p className="text-sm sm:text-base lg:text-[18px] font-medium mt-2">
            What will my monthly payment be?
          </p>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-5 sm:gap-y-6 lg:gap-y-7 mt-6 sm:mt-7 lg:mt-8">

            {/* STATE */}
            <div>
              <label className="text-sm sm:text-base lg:text-[16px] font-medium mb-2 block">State</label>
              <select className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl sm:rounded-[15px] px-3 sm:px-4 pr-8 sm:pr-10 text-sm sm:text-base lg:text-[16px]">
                <option>Select State</option>
              </select>
            </div>

            {/* TAXES */}
            <div>
              <label className="text-sm sm:text-base lg:text-[16px] font-medium mb-2 block">
                Avg. Annual R.E. Taxes
              </label>
              <input
                placeholder="123234"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl sm:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base lg:text-[16px]"
              />
            </div>

            {/* INSURANCE */}
            <div>
              <label className="text-sm sm:text-base lg:text-[16px] font-medium mb-2 block">
                Avg. Annual HO Insurance
              </label>
              <input
                placeholder="234252"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl sm:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base lg:text-[16px]"
              />
            </div>

            {/* HOME PRICE */}
            <div>
              <label className="text-sm sm:text-base lg:text-[16px] font-medium mb-2 block">
                Home Price
              </label>
              <input
                placeholder="43000"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl sm:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base lg:text-[16px]"
              />
            </div>

            {/* TERM */}
            <div>
              <label className="text-sm sm:text-base lg:text-[16px] font-medium mb-2 block">Term</label>
              <select className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl sm:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base lg:text-[16px]">
                <option>30 years</option>
              </select>
            </div>

            {/* MONTHLY FEE */}
            <div>
              <label className="text-sm sm:text-base lg:text-[16px] font-medium mb-2 block">
                Monthly Fee
              </label>
              <input
                placeholder="1200"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl sm:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base lg:text-[16px]"
              />
            </div>

            {/* DOWN PAYMENT */}
            <div>
              <label className="text-sm sm:text-base lg:text-[16px] font-medium mb-2 block">
                Down Payment
              </label>
              <input
                placeholder="%234325"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl sm:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base lg:text-[16px]"
              />
            </div>

            {/* INTEREST RATE */}
            <div>
              <label className="text-sm sm:text-base lg:text-[16px] font-medium mb-2 block">
                Interest Rate
              </label>
              <select className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl sm:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base lg:text-[16px]">
                <option>7.6%</option>
              </select>
            </div>
          </div>

          {/* RESULT BOXES */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-6 mt-6 sm:mt-8 lg:mt-10">
            <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[388px] h-24 sm:h-28 lg:h-[119px] bg-[#F7F7F7] rounded-2xl sm:rounded-[25px] flex flex-col justify-center px-5 sm:px-6 shadow">
              <p className="text-lg sm:text-xl lg:text-[22px] font-semibold">$4,600.36</p>
              <span className="text-xs sm:text-sm lg:text-[14px] mt-1">Monthly</span>
            </div>

            <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[388px] h-24 sm:h-28 lg:h-[119px] bg-[#F7F7F7] rounded-2xl sm:rounded-[25px] flex flex-col justify-center px-5 sm:px-6 shadow">
              <p className="text-lg sm:text-xl lg:text-[22px] font-semibold">7.60%</p>
              <span className="text-xs sm:text-sm lg:text-[14px] mt-1">Interest Rate</span>
            </div>
          </div>

          {/* BUTTON */}
          <button onClick={()=>{router.push("/applynow")}} className=" cursor-pointer mt-6 sm:mt-8 lg:mt-10 w-full sm:w-80 lg:w-[344px] h-12 sm:h-14 lg:h-[55px] bg-black text-[#E6FF4B] rounded-xl sm:rounded-[15px] font-semibold text-sm sm:text-base lg:text-[16px]">
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  );
}
