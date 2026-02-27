import React, { useState } from 'react';

const ContactInfoStep = ({ formData: parentData = {}, onNext, onDataChange, onValidityChange }) => {
  const [local, setLocal] = useState({
    agentFirstName: parentData.agentFirstName ?? "",
    agentLastName: parentData.agentLastName ?? "",
    agentEmail: parentData.agentEmail ?? "",
    agentPhone: parentData.agentPhone ?? ""
  });

  const fields = [
    { id: 'agentFirstName', label: "Agent's First Name", placeholder: 'John', width: 'w-[227px]' },
    { id: 'agentLastName', label: "Agent's Last Name", placeholder: 'Doe', width: 'w-[229px]' },
    { id: 'agentEmail', label: "Agent's Email", placeholder: 'example@mail.com', width: 'w-[189px]' },
    { id: 'agentPhone', label: "Agent's Phone Number", placeholder: '555-0123', width: 'w-[260px]' }
  ];

  const allFilled = fields.every((f) => (local[f.id] ?? '').trim() !== '');

  React.useEffect(() => {
    if (onDataChange) onDataChange({ ...parentData, ...local });
  }, [local]);

  React.useEffect(() => {
    onValidityChange?.(allFilled);
  }, [allFilled, onValidityChange]);

  return (
    <div className="flex flex-col items-start p-4 sm:p-10 max-w-4xl mx-auto ">
      
      {/* Frame 1171275639 - Header Section */}
      <div className="w-full sm:w-[750px] mb-4">
        <h1 className="text-[32px] sm:text-[45px] font-bold text-[#171A1F] leading-[60px] tracking-[-0.9px]">
          Great! What`s their contact info?
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-[16px] sm:text-[18px] text-[#565D6D] leading-[28px] mb-10 sm:w-[750px]">
      Select the timeframe that best fits your plans. We'll customize our search speed to match yours.
      </p>

      {/* Frame 1171275670 - Inputs Container (Gap 22px) */}
      <div className="flex flex-col gap-[22px] w-full sm:w-[750px]">
        {fields.map((field) => (
          <div 
            key={field.id}
            className="
              relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] 
              shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
              px-[34px] flex flex-col justify-center transition-all focus-within:border-[#171A1F]
            "
          >
            {/* Label - Positioned at top: 10px */}
            <label className="text-[16px] font-semibold text-[#171A1F] leading-[24px] mb-1">
              {field.label}
            </label>

            <input
              type={field.id === 'agentEmail' ? 'email' : field.id === 'agentPhone' ? 'tel' : 'text'}
              placeholder={field.placeholder}
              value={local[field.id]}
              className="
                w-full bg-transparent outline-none 
                text-[16px] font-medium text-[rgba(141,141,141,0.72)] 
                leading-[24px] placeholder:text-[rgba(141,141,141,0.4)]
              "
              onChange={(e) => setLocal(prev => ({ ...prev, [field.id]: e.target.value }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoStep;
