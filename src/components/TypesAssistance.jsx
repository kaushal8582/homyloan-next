import React from 'react'
import Button from '../UI/Button';

const TypesAssistance = ({ content }) => {
  return (
    <section className="w-full flex justify-center my-8 sm:my-12 lg:my-16 px-4 sm:px-6 lg:px-0">
      <div
        className="relative w-full max-w-[1290px] min-h-[600px] sm:min-h-[700px] lg:min-h-screen rounded-3xl sm:rounded-[50px] lg:rounded-[70px] overflow-hidden bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center py-10 sm:py-12 lg:py-0"
        style={{ backgroundImage: `url(/humanadvantagebg.svg)` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[55px] font-medium leading-[1.1] text-center py-3 sm:py-4 lg:py-5">
            Types of Assistance Available
          </h2>

          <p className="text-white text-sm sm:text-base lg:text-[18px] font-normal font-['General_Sans_Variable'] max-w-full sm:max-w-[90%] lg:max-w-[800px] py-3 sm:py-4 lg:py-5 text-center leading-[1.4]">
            Down Payment Assistance comes in various forms, each designed to
            meet different financial needs. Our loan officers will help you
            determine which type you qualify for.
          </p>
          <div className="bg-[#FFFFFF] rounded-lg sm:rounded-xl shadow-md overflow-x-auto w-full max-w-5xl py-3 sm:py-4 lg:py-5 mt-8 sm:mt-12 lg:mt-20">
            {/* Header */}
            <div className="hidden lg:grid grid-cols-3 gap-4 lg:gap-6 px-4 sm:px-6 py-3 sm:py-4 border-b text-xs sm:text-sm font-bold text-gray-700">
              <div>Assistance Type</div>
              <div>Description</div>
              <div>Key Feature</div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 px-4 sm:px-6 py-4 sm:py-4 border-b text-xs sm:text-sm text-gray-600">
              <div className="font-semibold lg:font-normal text-gray-800">
                <span className="lg:hidden font-bold text-gray-700">Assistance Type: </span>
                Grants
              </div>
              <div>
                <span className="lg:hidden font-bold text-gray-700">Description: </span>
                Funds provided that typically do not need to be repaid.
              </div>
              <div>
                <span className="lg:hidden font-bold text-gray-700">Key Feature: </span>
                Excellent for minimizing debt and maximizing savings.
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 px-4 sm:px-6 py-4 sm:py-4 border-b text-xs sm:text-sm text-gray-600">
              <div className="font-semibold lg:font-normal text-gray-800">
                <span className="lg:hidden font-bold text-gray-700">Assistance Type: </span>
                Second Mortgages (Silent Seconds)
              </div>
              <div>
                <span className="lg:hidden font-bold text-gray-700">Description: </span>
                A separate, low-interest loan specifically for the down payment.
              </div>
              <div>
                <span className="lg:hidden font-bold text-gray-700">Key Feature: </span>
                Repayment may be deferred or forgiven over time, depending on
                the program.
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 px-4 sm:px-6 py-4 sm:py-4 text-xs sm:text-sm text-gray-600">
              <div className="font-semibold lg:font-normal text-gray-800">
                <span className="lg:hidden font-bold text-gray-700">Assistance Type: </span>
                Zero Interest Loans
              </div>
              <div>
                <span className="lg:hidden font-bold text-gray-700">Description: </span>
                Assistance provided in the form of a loan with no interest
                charge.
              </div>
              <div>
                <span className="lg:hidden font-bold text-gray-700">Key Feature: </span>
                A low-cost way to borrow the funds you need.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TypesAssistance
