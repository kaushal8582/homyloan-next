import React, { useState, useEffect } from 'react';
import WhyAskedDisclosure from './WhyAskedDisclosure';
import { isValidEmail, isValidPhone } from './validation';

const ContactInfoStart = ({ formData = {}, onNext, onDataChange, onValidityChange }) => {
    const [vals, setVals] = useState({
        firstName: formData.firstName ?? '',
        middleName: formData.middleName ?? '',
        lastName: formData.lastName ?? '',
        suffix: formData.suffix ?? '',
        email: formData.email ?? '',
        phone: formData.phone ?? '',
    });
    useEffect(() => {
        if (onDataChange) onDataChange({ ...formData, ...vals });
    }, [vals]);

    const canProceed = () => {
        const f = (vals.firstName ?? '').trim();
        const l = (vals.lastName ?? '').trim();
        const e = vals.email ?? '';
        const p = vals.phone ?? '';
        return f.length > 0 && l.length > 0 && isValidEmail(e) && isValidPhone(p);
    };

    useEffect(() => {
        onValidityChange?.(canProceed());
    }, [vals]);

    const inputFields = [
        { id: 'firstName', label: "First Name", placeholder: "First Name", width: "w-[83px]" },
        // { id: 'middleName', label: "", placeholder: "Middle Name (optional)", width: "w-[179px]" },
        { id: 'lastName', label: "Last Name", placeholder: "Last Name", width: "w-[82px]" },
        // { id: 'suffix', label: "", placeholder: "Select Suffix", width: "w-[97px]" },
        { id: 'email', label: "Email", placeholder: "Email", width: "w-[41px]" },
        { id: 'phone', label: "Phone number", placeholder: "(000) 00-0000", width: "w-[117px]" },
    ];

    return (
        <div className="flex flex-col items-start p-4 sm:p-10 max-w-4xl mx-auto">

            {/* Frame 1171275642 - Header & Subtitle */}
            <div className="flex flex-col items-start p-0 gap-[16px] w-full sm:w-[750px]">
                <h1 className="w-full text-[#171A1F] text-[45px] font-bold leading-[60px] tracking-[-0.9px]">
                    Let`s start with your contact info
                </h1>
                <p className="w-full text-[#565D6D] text-[18px] font-normal leading-[28px]">
                    Select the timeframe that best fits your plans. We'll customize our search speed to match yours.
                </p>
            </div >

            {/* Frame 1171275647 - Inputs Container (Gap 16px) */}
            <div className="flex flex-col gap-[16px] w-full sm:w-[750px]">
                {inputFields.map((field) => (
                    <div
                        key={field.id}
                        className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)] flex flex-col justify-center px-[34px]"
                    >
                        {/* Conditional Label (top: 10px) */}
                        {field.label && (
                            <span className="absolute top-[10px] text-[16px] font-medium text-[#171A1F] leading-[24px]">
                                {field.label}
                            </span>
                        )}
                        {/* Input / Placeholder (top: 38px) */}
                        <input
                            type="text"
                            placeholder={field.placeholder}
                            value={vals[field.id] ?? ''}
                            onChange={(e) => setVals(prev => ({ ...prev, [field.id]: e.target.value }))}
                            className="mt-[10px] text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none leading-[24px]"
                        />
                    </div>
                ))}
            </div>

            {/* Frame 1171275664 - Checkbox Section */}
            <div className="flex flex-row items-start gap-[13px] w-full sm:w-[750px] mt-4">
                {/* Rectangle 34624888 - Checkbox */}
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="
      peer
      appearance-none
      w-[25px] h-[25px]
      bg-white
      border-2 border-[#DEE1E6]
      rounded-[5px]
      shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]
      transition-all duration-150

      checked:bg-[#000510]
      checked:border-[#000510]
    "
                    />

                    {/* Check Icon */}
                    <svg
                        className="
      pointer-events-none
      absolute
      w-[14px] h-[14px]
      text-white
      opacity-0
      peer-checked:opacity-100
    "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                </label>

                <p className="w-[667px] text-[#565D6D] text-[18px] font-normal leading-[28px]">
                    All data is protected with bank-level encryption.We won`t sell or use it for anyting other than what`s stated in our <span className='underline'> Privacy Policy.</span>
                </p>
            </div>

            {/* Frame 1171275646 - Help Text with Chevron */}
            <div className="w-full sm:w-[750px]">
            <WhyAskedDisclosure
              question="Why do you need my contact info?"
              textSize="base"
              className="w-full mt-2"
            >
                <p className="w-full text-[#565D6D] text-[18px] font-normal leading-[28px] mt-6">
            By providing your contact info and clicking "I agree" below, you agree to the Rocket Mortgage Privacy Policy and Terms of Use, which includes your agreement to arbitrate claims related to the Telephone Consumer Protection Act. You also expressly consent by electronic signature to receive sales, marketing and other calls and texts, including those sent by any automated system or other means for selecting and dialing telephone numbers, or using an artificial or prerecorded voice message when a connection is completed. from Rocket Mortgage at the telephone number you provided, even if that telephone number is on a do-not-call list. Agreement to receive such calls or texts is not a condition of purchasing goods or services.
            </p>
            </WhyAskedDisclosure>

            {/* Final Long Paragraph Frame */}
            
            </div>

        </div>
    );
};

export default ContactInfoStart;