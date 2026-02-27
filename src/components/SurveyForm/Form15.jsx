import React, { useState } from 'react';
import WhyAskedDisclosure from './WhyAskedDisclosure';

const TaxInputStep = ({ formData = {}, onDataChange, onValidityChange }) => {
  const [income, setIncome] = useState(formData.yearlyIncome ?? "");

  // Handle price change and format with commas
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = new Intl.NumberFormat().format(value);
    setIncome(formatted);
    onDataChange?.({ ...formData, yearlyIncome: formatted });
  };

  React.useEffect(() => {
    onDataChange?.({ ...formData, yearlyIncome: income });
  }, [income]);

  const canProceed = () => {
    const num = parseInt(String(income).replace(/\D/g, ""), 10);
    return !isNaN(num) && num > 0;
  };

  React.useEffect(() => {
    onValidityChange?.(canProceed());
  }, [income]);

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      
      {/* Frame 1171275639 - Title Section */}
      <div className="w-full mb-4 sm:mb-6">
        <h1 className="text-[32px] sm:text-[45px] font-bold text-[#171A1F] leading-tight sm:leading-[60px] tracking-[-0.9px] max-w-[788px]">
        What`s your yearly income before taxes?
        </h1>
      </div>

      {/* Subtitle Section */}
      <div className="mb-8 sm:mb-10 max-w-[658px]">
        <p className="text-[16px] sm:text-[18px] text-[#565D6D] leading-[28px]">
        This is the same thing as gross income. You don't need to
        be exact but try to get as close as possible.
        </p>
      </div>

      {/* Frame 1 - Input Container */}
      <div className="w-full sm:w-[750px]">
        <div className="
          relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] 
          shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
          px-8 flex flex-col justify-center focus-within:border-[#171A1F] transition-all
        ">
          {/* Label (Price label) */}
          <label className="text-[16px] font-semibold text-[#171A1F] leading-[24px]">
          Yearly Income
          </label>

          {/* Input field with $ sign */}
          <div className="flex items-center mt-1">
            <span className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] mr-1">
              $
            </span>
            <input
              type="text"
              value={income}
              onChange={handleChange}
              placeholder="0"
              className="
                w-full bg-transparent outline-none 
                text-[16px] font-medium text-[rgba(141,141,141,0.72)] 
                leading-[24px] placeholder:text-gray-300
              "
            />
          </div>
        </div>
          <WhyAskedDisclosure
            question="What counts toward yearly income?"
            textSize="base"
            className="mt-4"
          />
      </div>
    </div>
  );
};

export default TaxInputStep;
