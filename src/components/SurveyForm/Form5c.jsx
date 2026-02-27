import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import WhyAskedDisclosure from './WhyAskedDisclosure';

const usageOptions = [
  { id: 'primary', title: 'Primary Residence' },
  { id: 'secondary', title: 'Secondary Residence' },
  { id: 'investment', title: 'Investment Property' }
];

const HomeUsageForm = ({ formData = {}, onNext, onDataChange, stepNumber }) => {
  const [usageType, setUsageType] = useState(formData.usageType ?? null);

  useEffect(() => {
    if (onDataChange) onDataChange({ ...formData, usageType });
  }, [usageType]);

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      <div className="w-full sm:w-[750px]">
        <h2 className="text-[25px] font-semibold text-black font-['General_Sans'] mb-6">
          How do you plan to use it?
        </h2>
        <div className="flex flex-col gap-4">
          {usageOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setUsageType(item.id);
                onDataChange?.({ ...formData, usageType: item.id });
                onNext?.();
              }}
              className={`
                relative flex items-center h-[100px] px-8 cursor-pointer
                bg-white border-2 rounded-[16px] transition-all
                ${usageType === item.id ? 'border-[#E6FF4B] shadow-md' : 'border-[#DEE1E6]'}
              `}
            >
              <span className="text-[16px] font-medium text-[#171A1F]">{item.title}</span>
              <div className={`absolute right-8 w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${usageType === item.id ? 'bg-[#E6FF4B] border-[#E6FF4B]' : 'border-[rgba(86,93,109,0.3)]'}`}>
                {usageType === item.id && <Check size={14} className="text-black font-bold" />}
              </div>
            </div>
          ))}
        </div>
        <WhyAskedDisclosure question="What are the differences?" className="mt-4 opacity-80" >
       <span className='pl-3' > A primary residence is where you live for most of the year.<br/></span>
<span className='pl-3' >A vacation home is somewhere you live for part of the year.<br/></span>
<span className='pl-3' >An investment property is often used to generate income.<br/></span>
        </WhyAskedDisclosure>
      </div>
    </div>
  );
};

export default HomeUsageForm;
