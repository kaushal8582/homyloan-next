import React, { useState } from 'react';
import { CheckCircle, Plus, Check } from 'lucide-react';
import WhyAskedDisclosure from './WhyAskedDisclosure';


const MarriedStatusForm = ({ formData = {}, onNext, onDataChange }) => {
  const [selected, setSelected] = useState(formData.married ?? null);

  React.useEffect(() => {
    if (onDataChange) onDataChange({ ...formData, married: selected });
  }, [selected]);

  const options = [
    {
      id: 1,
      title: "Yes",
      icon: <CheckCircle className="text-[#1E2128]" size={28} />,
    },
    {
      id: 2,
      title: "No",
      // Plus icon rotated 45deg as per your Figma 'plus-circle' spec
      icon: <Plus className="text-[#1E2128] rotate-45" size={28} />,
    }
  ];

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      
      {/* Frame 1171275639 - Title Section */}
      <div className="w-full max-w-[664px] mb-12">
        <h1 className="text-[32px] sm:text-[45px] font-bold text-[#171A1F] leading-tight sm:leading-[60px] tracking-[-0.9px]">
        Are you married?
        </h1>
      </div>

      {/* Frame 1 - Cards Container (Gap 16px) */}
      <div className="flex flex-col gap-4 w-full sm:w-[750px]">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => {
              setSelected(option.id);
              onDataChange?.({ ...formData, married: option.id });
              onNext?.(option.id);
            }}
            className={`
              relative flex items-center h-[100px] px-[22px] cursor-pointer
              bg-white border-2 rounded-[16px] transition-all duration-200
              ${selected === option.id 
                ? 'border-[#E6FF4B] shadow-lg scale-[1.01]' 
                : 'border-[#DEE1E6]'}
              shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
            `}
          >
            {/* Icon Container (Frame 1171275640 context) */}
            <div className="w-[56px] h-[56px] bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0">
              {option.icon}
            </div>

            {/* Title */}
            <span className="ml-[20px] text-[16px] font-medium text-[#171A1F] leading-[24px]">
              {option.title}
            </span>

            {/* Custom Radio/Check Circle (Rectangle Spec) */}
            <div className={`
              absolute right-[30px] w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
              ${selected === option.id 
                ? 'bg-[#E6FF4B] border-[#E6FF4B]' 
                : 'border-[rgba(86,93,109,0.3)]'}
            `}>
              {selected === option.id && <Check size={14} className="text-black font-bold" />}
            </div>
          </div>
        ))}
      </div>
      <WhyAskedDisclosure
        question="Does being married affect my chances of getting a mortgage?"
        textSize="base"
        className="mt-4"
      />
      <WhyAskedDisclosure
        question="What if I'm not married, but want to apply with someone else?"
        textSize="base"
        className="mt-4"
      />
    </div>
  );
};

export default MarriedStatusForm;