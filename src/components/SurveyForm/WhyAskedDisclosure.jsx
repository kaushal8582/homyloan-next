import React, { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';

const WhyAskedDisclosure = ({
  question,
  children,
  className = '',
  variant = 'default',
  textSize = 'sm',
  bold = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = useId();

  const iconColor = variant === 'muted' ? 'text-[#62626E]' : 'text-[#282828]';
  const textSizeClass = textSize === 'base' ? 'text-[16px]' : 'text-[14px]';

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className={`flex items-center justify-start gap-[5px] cursor-pointer bg-transparent border-none p-0 text-left w-full ${iconColor}`}
        aria-expanded={isExpanded}
        aria-controls={contentId}
      >
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${iconColor}`}
        />
        <span className={`${bold ? 'font-bold' : 'font-medium'} font-['General_Sans'] ${textSizeClass}`}>
          {question}
        </span>
      </button>
      {isExpanded && children && (
        <div id={contentId} className="mt-3 text-[#565D6D] text-[13px] leading-[17px]">
          {children}
        </div>
      )}
    </div>
  );
};

export default WhyAskedDisclosure;
