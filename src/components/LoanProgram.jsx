import Button from "../UI/Button";

export default function LoanProgram({ content }) {
  return (
    <section className="w-full py-8 sm:py-12 lg:py-15 bg-white ">
      {/* HEADER */}
      <div className="max-w-full sm:max-w-5xl mx-auto text-center px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase leading-tight text-black">
          Loan Programs with Lower Credit <br className="hidden sm:block" /> Requirements
        </h1>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-black/60 max-w-full sm:max-w-3xl mx-auto px-2 sm:px-0">
          While a low score can make conventional financing difficult, several
          government-backed programs are designed specifically to help borrowers
          with less-than-perfect credit.
        </p>
      </div>

      {/* CARDS */}
      <div className="mt-6 sm:mt-10 lg:mt-16 max-w-full sm:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8 px-3 sm:px-6 lg:px-10">
        {/* FHA */}
        <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold">FHA Loans</h3>
              <img src="/loan1.svg" alt="FHA" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
            </div>

            <p className="mt-2 sm:mt-3 lg:mt-4 text-[0.688rem] sm:text-xs lg:text-sm text-black/70 leading-relaxed">
              <span className="font-semibold">Best For:</span> Buyers with low
              credit scores and minimal cash for a down payment.
            </p>

            <p className="mt-1.5 sm:mt-2 lg:mt-3 text-[0.688rem] sm:text-xs lg:text-sm text-black/70 leading-relaxed">
              Minimum FICO score of 580 (with 3.5% down). Allows seller-paid
              closing costs up to 6%.
            </p>
          </div>

          <button className="inline-flex w-fit bg-black text-white px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-[0.688rem] sm:text-xs lg:text-sm items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 lg:mt-5">
            Explore More
            <span>→</span>
          </button>
        </div>

        {/* VA */}
        <div className="bg-[#E6FF4B] rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold">VA Loans</h3>
              <img src="/loan2.svg" alt="VA" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
            </div>

            <p className="mt-2 sm:mt-3 lg:mt-4 text-[0.688rem] sm:text-xs lg:text-sm text-black/80 leading-relaxed">
              <span className="font-semibold">Best For:</span> Eligible active
              duty military, veterans, and surviving spouses.
            </p>

            <p className="mt-1.5 sm:mt-2 lg:mt-3 text-[0.688rem] sm:text-xs lg:text-sm text-black/80 leading-relaxed">
              No set minimum credit score. No cash down requirement. Offers 100%
              financing with no Private Mortgage Insurance (PMI).
            </p>
          </div>

          <button className="inline-flex w-fit bg-black text-white px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-[0.688rem] sm:text-xs lg:text-sm items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 lg:mt-5">
            Explore More
            <span>→</span>
          </button>
        </div>

        {/* USDA */}
        <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold">USDA Loans</h3>
              <img src="/loan3.svg" alt="USDA" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
            </div>

            <p className="mt-2 sm:mt-3 lg:mt-4 text-[0.688rem] sm:text-xs lg:text-sm text-black/70 leading-relaxed">
              <span className="font-semibold">Best For:</span> Low-to-moderate
              income buyers purchasing in USDA-approved rural areas.
            </p>

            <p className="mt-1.5 sm:mt-2 lg:mt-3 text-[0.688rem] sm:text-xs lg:text-sm text-black/70 leading-relaxed">
              Minimum credit score of 600 needed to qualify. 100% financing
              available ($0 money down).
            </p>
          </div>

          <button className="inline-flex w-fit bg-black text-white px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-[0.688rem] sm:text-xs lg:text-sm items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 lg:mt-5">
            Explore More
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
