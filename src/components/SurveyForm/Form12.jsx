import React, { useState, useEffect } from "react";
import { Search, FileEdit, Home, Check } from "lucide-react";
import { formatMMYYYY } from "./validation";

const FormStep12 = ({ formData = {}, onNext, onDataChange, onValidityChange }) => {
  const [militaryAffiliation, setMilitaryAffiliation] = useState(
    formData.militaryAffiliation ?? null,
  );
  const [monthValue, setMonthValue] = useState(formData.etsDate ?? "");
  const [branchOfService, setBranchOfService] = useState(formData.branchOfService ?? "");
  const [serviceType, setServiceType] = useState(formData.serviceType ?? null);

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        ...formData,
        militaryAffiliation,
        etsDate: monthValue,
        branchOfService,
        serviceType,
      });
    }
  }, [militaryAffiliation, monthValue, branchOfService, serviceType]);

  const canProceed = () => {
    if (!militaryAffiliation) return false;
    if (militaryAffiliation === 1) return true;
    if (militaryAffiliation === 2) return !!monthValue;
    if ([3, 4].includes(militaryAffiliation)) return !!branchOfService && !!serviceType;
    return false;
  };

  useEffect(() => {
    onValidityChange?.(canProceed());
  }, [militaryAffiliation, monthValue, branchOfService, serviceType]);

  const options = [
    {
      id: 1,
      title: "No, I haven't served",
      icon: <Search className="text-[#1E2128]" size={24} />, // Mobile par icon thoda chota
    },
    {
      id: 2,
      title: "Yes, I'm currently serving",
      icon: <FileEdit className="text-[#1E2128]" size={24} />,
    },
    {
      id: 3,
      title: "Yes, I served in the past",
      icon: <Home className="text-[#1E2128]" size={24} />,
    },
    {
      id: 4,
      title: "Yes, I'm a surviving spouse",
      icon: <Home className="text-[#1E2128]" size={24} />,
    },
  ];


  const options2 = [
    {
      id: 1,
      title: "Regular military ",
      
    },
    {
      id: 2,
      title: "Reserves",
      // Plus icon rotated 45deg as per your Figma 'plus-circle' spec
      
    },
    {
      id: 3,
      title: "National Guard",
      
      
    },
  ];

  const handleAffiliationChange = (id) => {
    setMilitaryAffiliation(id);
    if (id === 1) {
      setMonthValue("");
      setBranchOfService("");
      setServiceType(null);
      return;
    }
    if (id === 2) {
      setBranchOfService("");
      setServiceType(null);
      return;
    }
    if (id === 3 || id === 4) {
      setMonthValue("");
    }
  };

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      {/* Main Title - Responsive text size */}
      <h1 className="text-[28px] sm:text-[45px] font-bold text-[#171A1F] leading-[36px] sm:leading-[60px] tracking-[-0.5px] sm:tracking-[-0.9px] mb-3 sm:mb-4">
        Thanks, {(formData.firstName ?? '').trim() || 'there'}. Do you have any military affiliation?
      </h1>

      {/* Subtitle - Responsive text size */}
      <p className="text-[15px] sm:text-[18px] text-[#565D6D] leading-[22px] sm:leading-[28px] mb-8 sm:mb-12">
        Knowing this will help us see if you could get a veterans Affairs (VA)
        loan.
      </p>

      {/* Cards Container - Full width on mobile, max-width on desktop */}
      <div className="flex flex-col gap-4 w-full sm:w-[750px]">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleAffiliationChange(option.id)}
            className={`
              relative flex items-center h-[80px] sm:h-[100px] px-4 sm:px-[22px] cursor-pointer
              bg-white border-2 rounded-[16px] transition-all duration-200
              ${militaryAffiliation === option.id ? "border-[#E6FF4B] shadow-lg scale-[1.01]" : "border-[#DEE1E6]"}
              shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
            `}
          >
            {/* Icon Container - Responsive scale */}
            {/* <div className="flex-shrink-0 w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
              {React.cloneElement(option.icon, { size: window?.innerWidth < 640 ? 20 : 28 })}
            </div> */}

            {/* Title - Truncate long text on small mobile screens if needed */}
            <span className="ml-3 sm:ml-[20px] text-[14px] sm:text-[16px] font-medium text-[#171A1F] pr-8">
              {option.title}
            </span>

            {/* Custom Radio Button - Fixed position */}
            <div
              className={`
              absolute right-4 sm:right-[30px] w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors
              ${
                militaryAffiliation === option.id
                  ? "bg-[#E6FF4B] border-[#E6FF4B]"
                  : "border-[rgba(86,93,109,0.3)]"
              }
            `}
            >
              {militaryAffiliation === option.id && (
                <Check size={12} className="text-black font-bold" />
              )}
            </div>
          </div>
        ))}
      </div>

      {militaryAffiliation === 2 && (

      <div className="w-full sm:w-[750px] mt-10">
        <h1 className="text-[28px] sm:text-[20px] font-semibold text-[#171A1F] leading-[36px] sm:leading-[60px] tracking-[-0.5px] sm:tracking-[-0.9px] mb-3 sm:mb-4">
          When is your estimated Expiration Terms of Service (ETS)?
        </h1>
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
            Estimated ETS
          </label>

          {/* Month/Year Picker */}
          <div className="relative mt-1 flex items-center">
            {/* Display (MM/YYYY) */}
            <span className="pointer-events-none absolute left-0 text-[16px] font-medium text-[rgba(141,141,141,0.72)] leading-[24px]">
              {monthValue ? formatMMYYYY(monthValue) : "MM/YYYY"}
            </span>

            <input
              type="month"
              value={monthValue}
              onChange={(e) => setMonthValue(e.target.value)}
              className="
          w-full bg-transparent outline-none appearance-none
          text-transparent caret-transparent
          leading-[24px] pr-12
          cursor-pointer
          [&::-webkit-calendar-picker-indicator]:opacity-0
          [&::-webkit-calendar-picker-indicator]:absolute
          [&::-webkit-calendar-picker-indicator]:right-0
          [&::-webkit-calendar-picker-indicator]:w-10
          [&::-webkit-calendar-picker-indicator]:h-10
        "
            />

            {/* Calendar icon (right) */}
            <div className="pointer-events-none absolute right-0 text-[rgba(141,141,141,0.72)]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      )}


{militaryAffiliation && militaryAffiliation !== 1  && (
      <div className="w-full sm:w-[750px] mt-10">
        <h1 className="text-[28px] sm:text-[20px] font-semibold text-[#171A1F] leading-[36px] sm:leading-[60px] tracking-[-0.5px] sm:tracking-[-0.9px] mb-3 sm:mb-4">
          What military branch of service are you a part of?
        </h1>

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
           Branch of Service
          </label>

          {/* Select */}
          <div className="relative mt-1 flex items-center">
            <select
              value={branchOfService}
              onChange={(e) => setBranchOfService(e.target.value)}
              className="
          w-full appearance-none bg-transparent outline-none
          text-[16px] font-medium text-[rgba(141,141,141,0.72)]
          leading-[24px] cursor-pointer pr-8
        "
            >
              <option value="" disabled>
                Select a branch of service
              </option>
              <option value="airforce">Air Force</option>
              <option value="army">Army</option>
              <option value="coastguard">Coast Guard</option>
              <option value="marinemajors">Marine Corps</option>
              <option value="navy">Navy</option>
              <option value="spaceforce">Space Force</option>
              
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
)}

{([3, 4].includes(militaryAffiliation)) && (
      <div className="w-full sm:w-[750px] mt-10">
        <h1 className="text-[28px] sm:text-[20px] font-semibold text-[#171A1F] leading-[36px] sm:leading-[60px] tracking-[-0.5px] sm:tracking-[-0.9px] mb-3 sm:mb-4">
         What was your service type?
        </h1>

        <div className="flex flex-col gap-4 w-full ">
        {options2?.map((option) => (
          <div
            key={option.id}
            onClick={() => setServiceType(option.id)}
            className={`
              relative flex items-center h-[100px] px-[22px] cursor-pointer
              bg-white border-2 rounded-[16px] transition-all duration-200
              ${serviceType === option.id 
                ? 'border-[#E6FF4B] shadow-lg scale-[1.01]' 
                : 'border-[#DEE1E6]'}
              shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
            `}
          >
            {/* Icon Container (Frame 1171275640 context) */}
            {/* <div className="w-[56px] h-[56px] bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0">
              {option.icon}
            </div> */}

            {/* Title */}
            <span className="ml-[20px] text-[16px] font-medium text-[#171A1F] leading-[24px]">
              {option.title}
            </span>

            {/* Custom Radio/Check Circle (Rectangle Spec) */}
            <div className={`
              absolute right-[30px] w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
              ${serviceType === option.id 
                ? 'bg-[#E6FF4B] border-[#E6FF4B]' 
                : 'border-[rgba(86,93,109,0.3)]'}
            `}>
              {serviceType === option.id && <Check size={14} className="text-black font-bold" />}
            </div>
          </div>
        ))}
      </div>
      </div>
)}


    </div>
  );
};

export default FormStep12;
