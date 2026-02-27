import React from "react";
import dollarImg from "../assets/dollar-square.svg";

/* ---------------- SHARED FIELD COMPONENTS (NEW DESIGN) ---------------- */

export function InputField({ label, placeholder, type = "text", defaultValue, prefix, suffix }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {prefix}
          </span>
        )}
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`w-full h-12 ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-7' : 'pr-3'} border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function SelectField({ label, options, defaultValue }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select 
        defaultValue={defaultValue}
        className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent appearance-none bg-white"
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SplitInputField({ label, placeholder1, placeholder2, suffix1, suffix2 }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={placeholder1}
            className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
          />
          {suffix1 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {suffix1}
            </span>
          )}
        </div>
        <div className="relative w-20">
          <input
            type="text"
            placeholder={placeholder2}
            className="w-full h-12 pr-7 pl-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
          />
          {suffix2 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {suffix2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function DisplayField({ label, value }) {
  return (
    <div className="p-4 bg-[#F7F7F7] rounded-xl">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-xl font-bold">{value}</span>
      </div>
    </div>
  );
}

export function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}

export function CollapsibleSection({ icon, title, isOpen, onToggle, children }) {
  return (
    <div className="border-t pt-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <span className="text-gray-400">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}

/* ---------------- RESULTS COMPONENTS ---------------- */

export function DonutChart({ centerValue, centerLabel = "Est." }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Green segment - Principal & Interest */}
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#E6FF4B"
            strokeWidth="30"
            strokeDasharray="280 440"
            transform="rotate(-90 100 100)"
          />
          {/* Blue segment - Property Taxes */}
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#4169E1"
            strokeWidth="30"
            strokeDasharray="70 440"
            strokeDashoffset="-280"
            transform="rotate(-90 100 100)"
          />
          {/* Orange segment - Home Insurance */}
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#FFA500"
            strokeWidth="30"
            strokeDasharray="50 440"
            strokeDashoffset="-350"
            transform="rotate(-90 100 100)"
          />
          {/* Red segment - PMI */}
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#FF4444"
            strokeWidth="30"
            strokeDasharray="40 440"
            strokeDashoffset="-400"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500">{centerLabel}</span>
          <span className="text-3xl sm:text-4xl font-bold">{centerValue}</span>
        </div>
      </div>
    </div>
  );
}

export function LegendItem({ color, label, value }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function MonthlyPaymentCard({ homeValue, centerValue, items }) {
  return (
    <div className="bg-[#F7F7F7] rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">💰</span>
        <h2 className="text-lg sm:text-xl font-semibold">Monthly Payment</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">Based on {homeValue} home value</p>

      <DonutChart centerValue={centerValue} />

      <div className="space-y-3">
        {items.map((item, idx) => (
          <LegendItem key={idx} {...item} />
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-300">
        <p className="text-xs text-gray-400">⓿ Estimates only</p>
        <p className="text-xs text-gray-400 text-right">Updated just now</p>
      </div>
    </div>
  );
}

export function SummaryItem({ label, value, sublabel }) {
  return (
    <div className="flex justify-between">
      <div>
        <span className="text-sm text-gray-600">{label}</span>
        {sublabel && (
          <span className="text-xs text-gray-400 block">{sublabel}</span>
        )}
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function LoanSummaryCard({ items, cashToClose, ctaTitle, ctaDescription }) {
  return (
    <div className="bg-[#F7F7F7] rounded-3xl p-6 sm:p-8">
      <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <SummaryItem key={idx} {...item} />
        ))}
        <div className="flex justify-between pt-3 border-t border-gray-300">
          <span className="text-base font-semibold">Cash to Close</span>
          <span className="text-2xl font-bold text-[#E6FF4B]">{cashToClose}</span>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-6 pt-6 border-t border-gray-300">
        <h4 className="font-semibold mb-2">{ctaTitle || "Ready to move forward?"}</h4>
        <p className="text-sm text-gray-600 mb-4">
          {ctaDescription || "Get pre-approved in as little as 3 minutes with no impact to your credit score."}
        </p>
        <button className="w-full h-12 bg-[#E6FF4B] hover:bg-[#d4ed3a] text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          Start Pre-Approval
          <span>→</span>
        </button>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-xs text-gray-400">🔒 Secure & Encrypted</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- LEGACY COMPONENTS (kept for backward compatibility) ---------------- */

export function Field({ label, placeholder, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[0.875rem] sm:text-[1rem] font-medium text-[#101011]">
        {label}
      </label>
      <input
        className="w-full h-[38px] sm:h-[46px] bg-white border border-[#D4D4D4] rounded-[12px] sm:rounded-[14px] px-3 sm:px-4 text-[0.875rem] sm:text-[1rem]"
        placeholder={placeholder}
      />
    </div>
  );
}

export function FieldButtons({ label, placeholder, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[0.875rem] sm:text-[1rem] font-medium text-[#101011]">
        {label}
      </label>

      <div className="relative">
        <input
          className="w-full h-[38px] sm:h-[46px] bg-white border border-[#D4D4D4] rounded-[12px] sm:rounded-[14px] px-3 sm:px-4 pr-[80px] sm:pr-[90px] text-[0.875rem] sm:text-[1rem]"
          placeholder={placeholder}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1.5 sm:gap-2  px-1.5 sm:px-2 py-1">
          <button className="w-[32px] h-[30px] sm:w-[36px] sm:h-[33px] bg-black rounded-[8px] sm:rounded-[10px] flex justify-center items-center">
            <img
              src={dollarImg}
              className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] object-contain"
              alt="dollar"
            />
          </button>

          <button className="w-[32px] h-[30px] sm:w-[36px] sm:h-[33px] text-[#62626E] rounded-[8px] sm:rounded-[10px] text-sm sm:text-base">
            %
          </button>
        </div>
      </div>
    </div>
  );
}

export function FieldButtonsym({ label, placeholder, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[0.875rem] sm:text-[1rem] font-medium text-[#101011]">
        {label}
      </label>

      <div className="relative">
        <input
          className="w-full h-[38px] sm:h-[46px] bg-white border border-[#D4D4D4] rounded-[12px] sm:rounded-[14px] px-3 sm:px-4 pr-[80px] sm:pr-[90px] text-[0.875rem] sm:text-[1rem]"
          placeholder={placeholder}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1.5 sm:gap-2  px-1.5 sm:px-2 py-1">
          <button className="w-[32px] h-[30px] sm:w-[36px] sm:h-[33px] bg-black rounded-[8px] sm:rounded-[10px] flex justify-center items-center text-[#E6FF4B]">
            Y
          </button>

          <button className="w-[32px] h-[30px] sm:w-[36px] sm:h-[33px] text-[#62626E] rounded-[8px] sm:rounded-[10px] text-sm sm:text-base">
            M
          </button>
        </div>
      </div>
    </div>
  );
}

export function FieldPeriod({ label, placeholder }) {
  return (
    <div className="flex flex-col gap-2 sm:col-span-2">
      <label className="text-[0.875rem] sm:text-[1rem] font-medium text-[#101011]">
        {label}
      </label>

      <div className="relative">
        <input
          className="w-full h-[38px] sm:h-[46px] bg-white border border-[#D4D4D4] rounded-[12px] sm:rounded-[14px] px-3 sm:px-4 pr-[100px] sm:pr-[110px] text-[0.875rem] sm:text-[1rem]"
          placeholder={placeholder}
        />

        <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex gap-1.5 sm:gap-2 bg-[#F7F7F7] rounded-full px-2 sm:px-3 py-1">
          <button className="w-7 h-7 sm:w-8 sm:h-8 flex justify-center items-center text-[#62626E] text-sm sm:text-base">
            W
          </button>

          <button className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-[#E6FF4B] rounded-lg flex justify-center items-center text-sm sm:text-base">
            M
          </button>

          <button className="w-7 h-7 sm:w-8 sm:h-8 flex justify-center items-center text-[#62626E] text-sm sm:text-base">
            Y
          </button>
        </div>
      </div>
    </div>
  );
}

export function ResultsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-10 lg:mt-14">
      <PaymentBreakdownBox />
      <LoanDetailsBox />
    </div>
  );
}

function PaymentBreakdownBox() {
  return (
    <div className="w-full max-w-[547.8px] mx-auto bg-[#F7F7F7] rounded-[30px] sm:rounded-[40px] lg:rounded-[46.9px] p-4 sm:p-5 lg:p-6">
      <h2 className="text-[1.25rem] sm:text-[1.5rem] lg:text-[1.5625rem] font-semibold mb-3 sm:mb-4">
        Payment Breakdown
      </h2>
      <div className="text-center py-8">
        <p className="text-gray-500">Calculation results will appear here</p>
      </div>
    </div>
  );
}

function LoanDetailsBox() {
  return (
    <div className="w-full max-w-[520px] mx-auto rounded-[30px] sm:rounded-[35px] lg:rounded-[40px] p-4 sm:p-6 lg:p-8 bg-[#F7F7F7]">
      <h2 className="text-[1.25rem] sm:text-[1.5rem] lg:text-[1.5625rem] font-semibold mb-4 sm:mb-5 lg:mb-6">
        Loan Details
      </h2>
      <div className="text-center py-8">
        <p className="text-gray-500">Loan details will appear here</p>
      </div>
    </div>
  );
}
