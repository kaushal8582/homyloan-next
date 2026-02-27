import React, { useState, useEffect } from 'react';
import { Search, FileEdit, Home, Check } from 'lucide-react';

const JourneyForm = ({ formData = {}, onNext, onDataChange }) => {
  const [selected, setSelected] = useState(formData.journey ?? null);
  const [iconSize, setIconSize] = useState(28);

  useEffect(() => {
    if (onDataChange) onDataChange({ ...formData, journey: selected });
  }, [selected]);

  useEffect(() => {
    const updateSize = () => setIconSize(window.innerWidth < 640 ? 20 : 28);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const options = [
    {
      id: 1,
      title: "Looking at homes & listings",
      icon: <Search className="text-[#1E2128]" size={24} />, // Mobile par icon thoda chota
    },
    {
      id: 2,
      title: "I signed a purchase agreement",
      icon: <FileEdit className="text-[#1E2128]" size={24} />,
    },
    {
      id: 3,
      title: "Offer pending / found a house",
      icon: <Home className="text-[#1E2128]" size={24} />,
    }
  ];

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      
      {/* Main Title - Responsive text size */}
      <h1 className="text-[28px] sm:text-[45px] font-bold text-[#171A1F] leading-[36px] sm:leading-[60px] tracking-[-0.5px] sm:tracking-[-0.9px] mb-3 sm:mb-4">
        Where are you in your home buying journey?
      </h1>

      {/* Subtitle - Responsive text size */}
      <p className="text-[15px] sm:text-[18px] text-[#565D6D] leading-[22px] sm:leading-[28px] mb-8 sm:mb-12">
        This helps us customize the next steps for you.
      </p>

      {/* Cards Container - Full width on mobile, max-width on desktop */}
      <div className="flex flex-col gap-4 w-full">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => {
              setSelected(option.id);
              onDataChange?.({ ...formData, journey: option.id });
              onNext?.();
            }}
            className={`
              relative flex items-center h-[80px] sm:h-[100px] px-4 sm:px-[22px] cursor-pointer
              bg-white border-2 rounded-[16px] transition-all duration-200
              ${selected === option.id ? 'border-[#E6FF4B] shadow-lg scale-[1.01]' : 'border-[#DEE1E6]'}
              shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
            `}
          >
            {/* Icon Container - Responsive scale */}
            <div className="flex-shrink-0 w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
              {React.cloneElement(option.icon, { size: iconSize })}
            </div>

            {/* Title - Truncate long text on small mobile screens if needed */}
            <span className="ml-3 sm:ml-[20px] text-[14px] sm:text-[16px] font-medium text-[#171A1F] pr-8">
              {option.title}
            </span>

            {/* Custom Radio Button - Fixed position */}
            <div className={`
              absolute right-4 sm:right-[30px] w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors
              ${selected === option.id 
                ? 'bg-[#E6FF4B] border-[#E6FF4B]' 
                : 'border-[rgba(86,93,109,0.3)]'}
            `}>
              {selected === option.id && <Check size={12} className="text-black font-bold" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyForm;