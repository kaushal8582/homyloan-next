import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import WhyAskedDisclosure from './WhyAskedDisclosure';

const timelineOptions = [
  { id: 1, title: 'Own', sub: 'Immediately' },
  { id: 2, title: 'Rent', sub: 'Soon' },
  { id: 3, title: "i don't own or rent", sub: 'Plan' },
];

const AddressTimelineStep = ({ formData = {}, onNext, onDataChange, stepNumber }) => {
  const [timeline, setTimeline] = useState(formData.timeline ?? null);

  useEffect(() => {
    if (onDataChange) onDataChange({ ...formData, timeline });
  }, [timeline]);

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      <div className="w-full sm:w-[750px] mb-10">
        <h1 className="text-[32px] sm:text-[45px] font-bold text-[#171A1F] leading-[60px] tracking-[-0.9px]">
          Where's the home located?
        </h1>
      </div>
      <div className="flex flex-col gap-6 w-full sm:w-[750px] mb-4">
        <div className="flex flex-col gap-4">
          {timelineOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                setTimeline(opt.id);
                onDataChange?.({ ...formData, timeline: opt.id });
                onNext?.();
              }}
              className={`
                relative flex items-center h-[100px] px-[34px] cursor-pointer
                bg-white border-2 rounded-[16px] transition-all
                ${timeline === opt.id ? 'border-[#E6FF4B] shadow-md' : 'border-[#DEE1E6]'}
                shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
              `}
            >
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-[#171A1F] leading-[24px]">{opt.title}</span>
              </div>
              <div className={`
                absolute right-8 w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${timeline === opt.id ? 'bg-[#E6FF4B] border-[#E6FF4B]' : 'border-[rgba(86,93,109,0.3)]'}
              `}>
                {timeline === opt.id && <Check size={14} className="text-black font-bold" />}
              </div>
            </div>
          ))}
        </div>
        <WhyAskedDisclosure
          question="What if I pay to live somewhere but I'm not on a lease?"
          variant="muted"
          className="opacity-70"
        />
      </div>
    </div>
  );
};

export default AddressTimelineStep;
