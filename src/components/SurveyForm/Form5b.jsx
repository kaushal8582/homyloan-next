import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import WhyAskedDisclosure from './WhyAskedDisclosure';

const homeTypes = [
  { id: 'single', title: 'Single Family' },
  { id: 'townhome', title: '2 - 4 units' },
  { id: 'condo', title: 'Condo/Co-op' },
  { id: 'Manufactured', title: 'Manufactured' }
];





const HomeTypeForm = ({ formData = {}, onNext, onDataChange, stepNumber }) => {
  const [homeType, setHomeType] = useState(formData.homeType ?? null);
  const [units, setUnits] = useState(formData.units ?? "");

  

  useEffect(() => {
    if (onDataChange) onDataChange({ ...formData, homeType, units });
  }, [homeType, units]);

  useEffect(() => {
    if (homeType !== "townhome" && units) {
      setUnits("");
    }
  }, [homeType]);

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      <div className="w-full sm:w-[750px] mb-2">
        <h2 className="text-[25px] font-semibold text-black font-['General_Sans'] mb-6">
          What type of home is it?
        </h2>
        <div className="flex flex-col gap-4">
          {homeTypes.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setHomeType(item.id);
                onDataChange?.({ ...formData, homeType: item.id, units });
                // For 2-4 units, wait for dropdown selection before moving next.
                if (item.id !== 'townhome') onNext?.();
              }}
              className={`
                relative flex items-center h-[100px] px-8 cursor-pointer
                bg-white border-2 rounded-[16px] transition-all
                ${homeType === item.id ? 'border-[#E6FF4B] shadow-md' : 'border-[#DEE1E6]'}
              `}
            >
              <span className="text-[16px] font-medium text-[#171A1F]">{item.title}</span>
              <div className={`absolute right-8 w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${homeType === item.id ? 'bg-[#E6FF4B] border-[#E6FF4B]' : 'border-[rgba(86,93,109,0.3)]'}`}>
                {homeType === item.id && <Check size={14} className="text-black font-bold" />}
              </div>
            </div>
          ))}
        </div>
        <WhyAskedDisclosure question="What about other home types?"  className="mt-4 opacity-80 mb-4" >
        For townhouses, go ahead and choose Single-family.

For mobile homes, we don’t usually offer mortgages, but <b> Homy Loans</b> may be able to help.
        </WhyAskedDisclosure>
      </div>

{formData.homeType === 'townhome' && (
      <div className="w-full sm:w-[750px] mb-2">
        <h2 className="text-[25px] font-semibold text-black font-['General_Sans'] mb-6">
         Units
        </h2>
        <div className="w-full sm:w-[750px]">
  <div
    className="
      relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px]
      shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
      px-8 flex flex-col justify-center
      focus-within:border-[#171A1F] transition-all
    "
  >
    {/* Label */}
    <label className="text-[16px] font-semibold text-[#171A1F] leading-[24px]">
      Units
    </label>

    {/* Select */}
    <div className="relative mt-1 flex items-center">
      <select
        className="
          w-full appearance-none bg-transparent outline-none
          text-[16px] font-medium text-[rgba(141,141,141,0.72)]
          leading-[24px] cursor-pointer pr-8
        "
        value={units}
        onChange={(e) => {
          const value = e.target.value;
          setUnits(value);
          onDataChange?.({ ...formData, homeType, units: value });
          if (value) onNext?.();
        }}
      >
        <option value="" disabled>
          Select a number of units
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      {/* Chevron icon */}
      <div className="pointer-events-none absolute right-0 text-[rgba(141,141,141,0.72)]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  </div>
</div>

        
      </div>
)}
    
      



    </div>
  );
};

export default HomeTypeForm;
