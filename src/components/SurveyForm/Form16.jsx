import React, { useState } from 'react';
import WhyAskedDisclosure from './WhyAskedDisclosure';

const FundsListingStep = ({ formData = {}, onNext, onDataChange }) => {
  const [selectedOption, setSelectedOption] = useState(formData.fundsSource ?? null);

  React.useEffect(() => {
    if (onDataChange) onDataChange({ ...formData, fundsSource: selectedOption });
  }, [selectedOption]);

  const options = [
    { id: 1, text: "My financial account" },
    { id: 2, text: "Gifts" }
  ];

  return (
    /* Frame 1171275652 - Main Wrapper */
    <div className="flex flex-col items-start p-4 sm:p-10 max-w-4xl mx-auto">
      <div className="w-full sm:w-[750px] min-h-[590px] flex flex-col gap-[20px]">
      {/* Frame 1171275640 - Content Section */}
      <div className="flex flex-col items-start p-0 gap-[24px] w-full self-stretch">
        
        {/* Frame 1171275639 - Header */}
        <div className="flex flex-col items-start p-0 gap-[16px] w-full max-w-[818px]">
          <h1 className="w-full text-[#171A1F] text-[45px] font-bold leading-[60px] tracking-[-0.9px]">
            Next, go ahead and list your funds
          </h1>
          <p className="w-full max-w-[658px] text-[#565D6D] text-[18px] font-normal leading-[28px]">
          It's best to include everything you can think of, even if you
          don't plan on putting it toward your home.
          </p>
        </div>

        {/* Frame 1171275668 - Help Text Section */}
        <div className="flex flex-col items-start p-0 gap-[16px] w-full max-w-[658px]">
          <WhyAskedDisclosure
            question="Why should i list everything?"
            textSize="base"
            bold
          />
          <p className="text-[#565D6D] text-[18px] font-normal leading-[28px]">
          Select all the apply
          </p>
        </div>

        {/* Frame 1171275669 - Options Container */}
        <div className="flex flex-col items-end p-0 gap-[24px] w-full self-stretch">
          <div className="flex flex-col items-start p-0 gap-[16px] w-full">
            {options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => {
                  setSelectedOption(opt.id);
                  onDataChange?.({ ...formData, fundsSource: opt.id });
                  onNext?.();
                }}
                className={`
                  relative box-border w-full h-[100px] rounded-[16px] cursor-pointer transition-all
                  bg-white border-2 flex items-center px-[30px]
                  shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
                  ${selectedOption === opt.id ? 'border-[#171A1F]' : 'border-[#DEE1E6]'}
                `}
              >
                <span className="text-[16px] font-medium text-[#171A1F] leading-[24px]">
                  {opt.text}
                </span>

                {/* Custom Radio Button (Rectangle spec) */}
                <div className={`
                  absolute right-[30px] w-[24px] h-[24px] rounded-full border-2 transition-colors
                  ${selectedOption === opt.id ? 'bg-[#171A1F] border-[#171A1F]' : 'border-[rgba(86,93,109,0.3)]'}
                `}>
                  {selectedOption === opt.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto mt-[6px]" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Aligned Footer Text */}
          {/* <p className="w-full text-[#494949] text-[18px] font-bold leading-[28px] text-right">
          Total Funds: $0
          </p> */}
        </div>
      </div>
      </div>
    </div>
  );
};

export default FundsListingStep;