import React from 'react'

const AmpCalculator = () => {
  return (
    <section className="w-full flex justify-center mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-8">
      {/* OUTER GRADIENT BACKGROUND + ROUNDED BORDER BOX */}
      <div
        className="rounded-3xl sm:rounded-[40px] lg:rounded-[50px] w-full max-w-[1290px] p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 lg:mb-20"
        style={{
          background:
            "linear-gradient(132.67deg, rgba(230,255,75,0.20) 0.55%, rgba(246,195,88,0.20) 100.89%)",
          border: "1px solid rgba(230,255,75,0.5)",
        }}
      >
        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-medium text-[#101011] leading-[100%]">
          Calculator
        </h1>

        {/* INNER WHITE BOX */}
        <div className="w-full bg-[#FFFFFF] border border-[#D4D4D4] rounded-3xl sm:rounded-[40px] lg:rounded-[50px] mt-6 sm:mt-8 lg:mt-10 p-6 sm:p-8 lg:p-12 shadow">
          {/* HEADINGS */}
          <h3 className="text-[#000000] text-lg sm:text-xl md:text-2xl lg:text-[25px] font-semibold">
            Fill out the form
          </h3>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-5 sm:gap-y-6 lg:gap-y-7 mt-6 sm:mt-7 lg:mt-8">
            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                First Name
              </label>
              <input
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:ring-2 focus:ring-[#E6FF4B] outline-none"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                Last Name
              </label>
              <input
                placeholder="Last Name"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:ring-2 focus:ring-[#E6FF4B] outline-none"
              />
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                Phone Number
              </label>
              <input
                placeholder="Phone Number"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:ring-2 focus:ring-[#E6FF4B] outline-none"
              />
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                Email Address
              </label>
              <input
                placeholder="Email"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:ring-2 focus:ring-[#E6FF4B] outline-none"
              />
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                Company Name
              </label>
              <select className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:ring-2 focus:ring-[#E6FF4B] outline-none">
                <option>Company Name</option>
              </select>
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                Company HQ Location
              </label>
              <input
                placeholder="Company HQ Location"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:ring-2 focus:ring-[#E6FF4B] outline-none"
              />
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                Job Title
              </label>
              <input
                placeholder="Job Title"
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:ring-2 focus:ring-[#E6FF4B] outline-none"
              />
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                Number of employees
              </label>
              <input
                className="w-full h-12 sm:h-14 lg:h-[60px] bg-white border border-[#D4D4D4] rounded-xl lg:rounded-[15px] px-3 sm:px-4 text-sm sm:text-base focus:ring-2 focus:ring-[#E6FF4B] outline-none"
                placeholder="Number of employees"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button className="mt-8 sm:mt-9 lg:mt-10 w-full sm:w-auto sm:min-w-[280px] lg:min-w-[344px] h-12 sm:h-14 lg:h-[55px] bg-black text-[#E6FF4B] rounded-xl lg:rounded-[15px] font-semibold text-sm sm:text-base hover:bg-gray-900 transition-colors">
            Submit Response
          </button>
        </div>
      </div>
    </section>
  );
}

export default AmpCalculator
