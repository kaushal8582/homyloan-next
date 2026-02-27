import React, { useState } from 'react';
import { Rocket, Calendar, Hourglass, Check } from 'lucide-react';

const TimeframeForm = ({ formData = {}, onNext, onDataChange }) => {
  const [selected, setSelected] = useState(formData.timeframe ?? null);

  React.useEffect(() => {
    if (onDataChange) onDataChange({ ...formData, timeframe: selected });
  }, [selected]);

  const options = [
    {
      id: 1,
      title: "Within 30 days",
      subtitle: "ASAP",
      icon: <Rocket className="text-[#565D6D]" size={40} />,
    },
    {
      id: 2,
      title: "Within 2-3 months",
      subtitle: "Planning Phase",
      icon: <Calendar className="text-[#565D6D]" size={40} />,
    },
    {
      id: 3,
      title: "Within 6 months",
      subtitle: "Just Looking",
      icon: <Hourglass className="text-[#565D6D]" size={40} />,
    }
  ];

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-6xl mx-auto ">
      
      {/* Title Section */}
      <h1 className="text-[32px] sm:text-[45px] font-bold text-[#101011] leading-tight sm:leading-[54px] mb-4">
        When would you like to buy a house?
      </h1>

      {/* Subtitle Section */}
      <p className="max-w-[658px] text-[16px] sm:text-[18px] text-[#565D6D] leading-[28px] mb-12">
        Select the timeframe that best fits your plans. We'll customize our search speed to match yours.
      </p>

      {/* Selectable Cards Container */}
      <div className="flex flex-wrap gap-6 w-full justify-start">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => {
              setSelected(option.id);
              onDataChange?.({ ...formData, timeframe: option.id });
              onNext?.();
            }}
            className={`
              relative flex flex-col items-center justify-center
              w-full sm:w-[272px] h-[212px] 
              bg-white border-2 rounded-[16px] cursor-pointer
              transition-all duration-300 ease-in-out
              ${selected === option.id 
                ? 'border-[#E6FF4B] shadow-xl scale-[1.02] ring-1 ring-[#E6FF4B]/20' 
                : 'border-[#DEE1E6] hover:border-gray-400'}
            `}
          >
            {/* Selection Indicator (Tick mark) */}
            {selected === option.id && (
              <div className="absolute top-4 right-4 bg-[#E6FF4B] rounded-full p-1 animate-in zoom-in">
                <Check size={16} className="text-black font-bold" />
              </div>
            )}

            {/* Icon Container (Rocket/Calendar/Hourglass) */}
            <div className="w-[80px] h-[80px] bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              {option.icon}
            </div>

            {/* Main Text (Within 30 days etc.) */}
            <h3 className="text-[18px] font-medium text-[#171A1F] leading-[28px] text-center">
              {option.title}
            </h3>

            {/* Subtext (ASAP, Planning etc.) */}
            <p className="text-[14px] font-normal text-[#565D6D] leading-[20px] text-center mt-1">
              {option.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeframeForm;