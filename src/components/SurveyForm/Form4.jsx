import React, { useState } from 'react';
import { Check } from 'lucide-react';

const PriceInputStep = ({ formData = {}, onNext, onDataChange, onValidityChange }) => {
  const options = [
    { id: 1, label: '0k to 300k' },
    { id: 2, label: '300k to 500k' },
    { id: 3, label: '500k to 1m' },
    { id: 4, label: '1m+' },
  ];

  const [selectedRange, setSelectedRange] = useState(formData.homePrice ?? null);

  React.useEffect(() => {
    if (selectedRange) {
      onDataChange?.({ ...formData, homePrice: selectedRange });
    }
  }, []);

  const canProceed = () => Boolean(selectedRange);

  React.useEffect(() => {
    onValidityChange?.(canProceed());
  }, [selectedRange]);

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      
      {/* Frame 1171275639 - Title Section */}
      <div className="w-full mb-4 sm:mb-6">
        <h1 className="text-[32px] sm:text-[45px] font-bold text-[#171A1F] leading-tight sm:leading-[60px] tracking-[-0.9px] max-w-[788px]">
          What's the price of the home you've picked out?
        </h1>
      </div>

      {/* Subtitle Section */}
      <div className="mb-8 sm:mb-10 max-w-[658px]">
        <p className="text-[16px] sm:text-[18px] text-[#565D6D] leading-[28px]">
          Select your home price range to help us personalize your loan options.
        </p>
      </div>

      {/* Price Range Options */}
      <div className="flex flex-col gap-4 w-full sm:w-[750px]">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              setSelectedRange(option.label);
              onDataChange?.({ ...formData, homePrice: option.label });
              onNext?.();
            }}
            className={`
              relative flex items-center h-[100px] px-[28px] text-left
              bg-white border-2 rounded-[16px] transition-all duration-200
              ${selectedRange === option.label
                ? 'border-[#E6FF4B] shadow-lg scale-[1.01]'
                : 'border-[#DEE1E6] hover:border-gray-400'}
              shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
            `}
          >
            <span className="text-[18px] font-medium text-[#171A1F] leading-[28px]">
              {option.label}
            </span>

            <span
              className={`
                absolute right-[28px] w-6 h-6 rounded-full border-2
                flex items-center justify-center transition-colors
                ${selectedRange === option.label
                  ? 'bg-[#E6FF4B] border-[#E6FF4B]'
                  : 'border-[rgba(86,93,109,0.3)]'}
              `}
            >
              {selectedRange === option.label && <Check size={14} className="text-black font-bold" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceInputStep;
