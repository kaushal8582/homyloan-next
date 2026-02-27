"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const STORAGE_KEY = "purchase-calculator";

const PurchaseCalculator = () => {
  const [showExtraPayments, setShowExtraPayments] = useState(false);
  const sliderRef = useRef(null);
  const hasLoaded = useRef(false);
  const didMount = useRef(false);

  // State for all inputs
  const [homeValue, setHomeValue] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [downPaymentMode, setDownPaymentMode] = useState("%"); // "$" or "%"
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // percentage value
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(4500);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [hoaDues, setHoaDues] = useState(0);
  const [pmi, setPmi] = useState(0);
  const [extraPayment, setExtraPayment] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 7),
  );


  const router = useRouter();

  // Calculated values
  const [calculations, setCalculations] = useState({
    loanAmount: 360000,
    monthlyPI: 2450,
    monthlyTax: 375,
    monthlyInsurance: 100,
    monthlyPMI: 0,
    monthlyHOA: 0,
    totalMonthly: 2925,
    totalInterest: 548034,
    payoffDate: "May 2054",
    cashToClose: 98500,
    downPaymentPercent: 20,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const d = JSON.parse(saved);

      setHomeValue(d.homeValue ?? 450000);
      setDownPayment(d.downPayment ?? 90000);
      setDownPaymentMode(d.downPaymentMode ?? "%");
      setDownPaymentPercent(d.downPaymentPercent ?? 20);
      setInterestRate(d.interestRate ?? 7.5);
      setLoanTerm(d.loanTerm ?? 30);
      setPropertyTax(d.propertyTax ?? 4500);
      setHomeInsurance(d.homeInsurance ?? 1200);
      setHoaDues(d.hoaDues ?? 0);
      setPmi(d.pmi ?? 0);
      setExtraPayment(d.extraPayment ?? 0);
      setStartDate(d.startDate ?? new Date().toISOString().slice(0, 7));
    }

    hasLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;

    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        homeValue,
        downPayment,
        downPaymentMode,
        downPaymentPercent,
        interestRate,
        loanTerm,
        propertyTax,
        homeInsurance,
        hoaDues,
        pmi,
        extraPayment,
        startDate,
      }),
    );
  }, [
    homeValue,
    downPayment,
    downPaymentMode,
    downPaymentPercent,
    interestRate,
    loanTerm,
    propertyTax,
    homeInsurance,
    hoaDues,
    pmi,
    extraPayment,
    startDate,
  ]);

  // Calculate mortgage
  useEffect(() => {
    const loanAmount = Math.max(0, homeValue - downPayment);

    if (loanAmount === 0) {
      const closingCosts = homeValue * 0.03;

      setCalculations({
        loanAmount: 0,
        monthlyPI: 0,
        monthlyTax: propertyTax / 12,
        monthlyInsurance: homeInsurance / 12,
        monthlyPMI: 0,
        monthlyHOA: hoaDues,
        totalMonthly:
          propertyTax / 12 + homeInsurance / 12 + hoaDues + extraPayment,
        totalInterest: 0,
        payoffDate: "N/A",
        cashToClose: downPayment + closingCosts,
        downPaymentPercent: 100,
      });

      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Monthly P&I
    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI =
        (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPI = loanAmount / numberOfPayments;
    }

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyPMI = pmi / 12;
    const monthlyHOA = hoaDues;

    const totalMonthly =
      monthlyPI +
      monthlyTax +
      monthlyInsurance +
      monthlyPMI +
      monthlyHOA +
      extraPayment;

    /* -----------------------------
       EXTRA PAYMENT PAYOFF LOGIC
    ----------------------------- */

    let balance = loanAmount;
    let months = 0;
    let totalInterest = 0;

    while (balance > 0 && months < 1000 * 12) {
      const interestForMonth = balance * monthlyRate;

      let principalPaid = monthlyPI + extraPayment - interestForMonth;

      if (principalPaid < 0) {
        principalPaid = monthlyPI - interestForMonth;
      }

      totalInterest += interestForMonth;
      balance -= principalPaid;
      months++;
    }

    const payoffMonths = months > 0 ? months : numberOfPayments;

    const start = new Date(startDate + "-01");
    const payoffDate = new Date(
      start.setMonth(start.getMonth() + payoffMonths),
    );

    const payoffDateStr = payoffDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    /* ----------------------------- */

    const closingCosts = homeValue * 0.03;
    const cashToClose = downPayment + closingCosts;

    const downPaymentPercent = ((downPayment / homeValue) * 100).toFixed(0);

    setCalculations({
      loanAmount,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      monthlyHOA,
      totalMonthly,
      totalInterest,
      payoffDate: payoffDateStr,
      cashToClose,
      downPaymentPercent,
    });
  }, [
    homeValue,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    homeInsurance,
    hoaDues,
    pmi,
    extraPayment,
    startDate,
  ]);

  // Pie chart calculations
  const piTotal =
    calculations.monthlyPI +
      calculations.monthlyTax +
      calculations.monthlyInsurance +
      calculations.monthlyPMI || 1;

  const piPercent = (calculations.monthlyPI / piTotal) * 100;
  const taxPercent = (calculations.monthlyTax / piTotal) * 100;
  const insPercent = (calculations.monthlyInsurance / piTotal) * 100;
  const pmiPercent = (calculations.monthlyPMI / piTotal) * 100;

  // Calculate dash arrays for pie chart
  const circumference = 2 * Math.PI * 70;
  const piDash = (piPercent / 100) * circumference;
  const taxDash = (taxPercent / 100) * circumference;
  const insDash = (insPercent / 100) * circumference;
  const pmiDash = (pmiPercent / 100) * circumference;

  const startDrag = (e) => {
    e.preventDefault();

    const move = (event) => {
      const clientX = event.touches?.[0]?.clientX ?? event.clientX;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;

      // Calculate loan amount percentage (0-100%)
      // When dragging right, loan amount increases (down payment decreases)
      let loanPercent = (x / rect.width) * 100;
      loanPercent = Math.max(0, Math.min(100, loanPercent));

      // Convert loan percentage to down payment percentage
      const downPaymentPercentage = 100 - loanPercent;

      // Calculate new down payment based on the percentage
      const newDownPayment = Math.round(
        (homeValue * downPaymentPercentage) / 100,
      );
      setDownPayment(newDownPayment);
    };

    move(e);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);

    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", stop);

    function stop() {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCurrencyInput = (value, setter) => {
    const numValue = parseFloat(value.replace(/,/g, "")) || 0;
    setter(numValue);
  };

  // Sync down payment when mode changes
  useEffect(() => {
    if (downPaymentMode === "%") {
      const calculatedDownPayment = Math.round(
        (homeValue * downPaymentPercent) / 100,
      );
      if (calculatedDownPayment !== downPayment) {
        setDownPayment(calculatedDownPayment);
      }
    }
  }, [downPaymentMode, downPaymentPercent, homeValue]);

  // Sync percentage when dollar amount changes in $ mode
  useEffect(() => {
    if (downPaymentMode === "$") {
      const calculatedPercent = ((downPayment / homeValue) * 100).toFixed(1);
      const newPercent = parseFloat(calculatedPercent);
      if (Math.abs(newPercent - downPaymentPercent) > 0.1) {
        setDownPaymentPercent(newPercent);
      }
    }
  }, [downPayment, homeValue, downPaymentMode]);

  // Calculate loan amount percentage for slider position
  const loanAmountPercent = ((homeValue - downPayment) / homeValue) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* LEFT COLUMN - Property & Loan Details */}
      <div>
        {/* Property & Loan Details */}
        <div className="bg-[#FFFFFF] p-6 rounded-3xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/house.svg"
                alt="House"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <h2 className="text-lg sm:text-xl font-semibold">
                Property & Loan Details
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Enter the purchase price and loan terms.
            </p>
          </div>

          {/* Home Value & Down Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Home Value
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(homeValue)}
                  onChange={(e) =>
                    handleCurrencyInput(e.target.value, setHomeValue)
                  }
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Down Payment
              </label>
              <div className="relative bg-white border border-[#e4e2dd] rounded-[14px] h-[46px] overflow-hidden">
                {/* Input Field */}
                <div className="absolute left-0 top-0 h-[46px] w-[calc(100%-85px)]">
                  <input
                    type="text"
                    value={
                      downPaymentMode === "$"
                        ? formatCurrency(downPayment)
                        : downPaymentPercent.toFixed(1)
                    }
                    onChange={(e) => {
                      if (downPaymentMode === "$") {
                        handleCurrencyInput(e.target.value, setDownPayment);
                      } else {
                        const value = parseFloat(e.target.value) || 0;
                        setDownPaymentPercent(
                          Math.min(100, Math.max(0, value)),
                        );
                      }
                    }}
                    className="w-full h-full px-3 pr-12 border-0 bg-transparent text-[14px] text-[#25231d] focus:outline-none"
                    placeholder={downPaymentMode === "$" ? "0" : "0.0"}
                  />
                  {downPaymentMode === "%" && (
                    <span className="absolute right-[0px] top-1/2 -translate-y-1/2 text-[16px] text-[rgba(16,16,17,0.6)] font-medium">
                      %
                    </span>
                  )}
                  {downPaymentMode === "$" && (
                    <span className="absolute right-[0px] top-1/2 -translate-y-1/2 text-[16px] text-[rgba(16,16,17,0.6)] font-medium">
                      $
                    </span>
                  )}
                </div>

                {/* Toggle Buttons Container */}
                <div className="absolute right-0 top-0 h-[46px] w-[82px] bg-[rgba(246,245,243,0.5)] border-l border-[#e4e2dd] flex items-center">
                  {/* Vertical Divider Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e4e2dd]"></div>

                  {/* Dollar Button */}
                  <button
                    onClick={() => {
                      // Sync percentage from current dollar value before switching
                      const calculatedPercent = (
                        (downPayment / homeValue) *
                        100
                      ).toFixed(1);
                      setDownPaymentPercent(parseFloat(calculatedPercent));
                      setDownPaymentMode("$");
                    }}
                    className={`h-[38px] w-[32px] ml-[5px] rounded-[12px] flex items-center justify-center transition-all ${
                      downPaymentMode === "$"
                        ? "bg-white border border-black shadow-[0px_0px_0px_0px_rgba(23,26,31,0),0px_2px_4px_0px_rgba(0,0,0,0.08)]"
                        : "bg-transparent border-0"
                    }`}
                  >
                    <span
                      className={`text-[12px] font-medium leading-[20px] ${
                        downPaymentMode === "$"
                          ? "text-[#25231d]"
                          : "text-[rgba(16,16,17,0.6)]"
                      }`}
                    >
                      $
                    </span>
                  </button>

                  {/* Percentage Button */}
                  <button
                    onClick={() => {
                      // Sync dollar value from current percentage before switching
                      const calculatedDownPayment = Math.round(
                        (homeValue * downPaymentPercent) / 100,
                      );
                      setDownPayment(calculatedDownPayment);
                      setDownPaymentMode("%");
                    }}
                    className={`h-[38px] w-[37px] ml-[3px] rounded-[12px] flex items-center justify-center transition-all ${
                      downPaymentMode === "%"
                        ? "bg-white border border-black shadow-[0px_0px_0px_0px_rgba(23,26,31,0),0px_2px_4px_0px_rgba(0,0,0,0.08)]"
                        : "bg-transparent border-0"
                    }`}
                  >
                    <span
                      className={`text-[12px] font-medium leading-[20px] ${
                        downPaymentMode === "%"
                          ? "text-[#25231d]"
                          : "text-[rgba(16,16,17,0.6)]"
                      }`}
                    >
                      %
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Amount */}
          <div className="mb-4">
            <div className="p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">
                  Loan Amount
                </span>
                <span className="text-xl font-bold">
                  ${formatCurrency(calculations.loanAmount)}
                </span>
              </div>

              {/* Slider - now represents loan amount (increases to the right) */}
              <div
                ref={sliderRef}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
                className="relative w-full h-2 bg-[#E5E5E5] rounded-full cursor-pointer select-none"
              >
                <div
                  className="absolute left-0 top-0 h-full bg-[#E6FF4B] rounded-full"
                  style={{ width: `${loanAmountPercent}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black rounded-full"
                  style={{ left: `calc(${loanAmountPercent}% - 7px)` }}
                />
              </div>
            </div>
          </div>

          {/* Interest Rate & Loan Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Interest Rate
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(parseFloat(e.target.value) || 0)
                  }
                  className="w-full h-12 pr-7 pl-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Loan Term
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent appearance-none bg-white"
              >
                <option value={30}>30 years</option>
                <option value={20}>20 years</option>
                <option value={15}>15 years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Taxes & Insurance */}
        <div className="mb-6 bg-[#FFFFFF] p-6 rounded-3xl my-5">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/tax.svg"
              alt="Tax"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <h3 className="text-lg font-semibold">Taxes & Insurance</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Estimated monthly or yearly expenses.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Property Tax / Year
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(propertyTax)}
                  onChange={(e) =>
                    handleCurrencyInput(e.target.value, setPropertyTax)
                  }
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Home Insurance / Year
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(homeInsurance)}
                  onChange={(e) =>
                    handleCurrencyInput(e.target.value, setHomeInsurance)
                  }
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                HOA Dues / Month
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(hoaDues)}
                  onChange={(e) =>
                    handleCurrencyInput(e.target.value, setHoaDues)
                  }
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                PMI / Year
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(pmi)}
                  onChange={(e) => handleCurrencyInput(e.target.value, setPmi)}
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Extra Payments & Strategy */}
        <div className="bg-[#FFFFFF] p-6 rounded-3xl">
          <button
            onClick={() => setShowExtraPayments(!showExtraPayments)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <img
                src="/payment.svg"
                alt="Money"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <h3 className="text-lg font-semibold">
                Extra Payments & Strategy
              </h3>
            </div>
            <span className="text-gray-400 flex items-center">
              {showExtraPayments ? (
                "−"
              ) : (
                <img src="/down.svg" alt="expand" className="w-4 h-4" />
              )}
            </span>
          </button>

          {showExtraPayments && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Extra Monthly Payment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="text"
                    value={formatCurrency(extraPayment)}
                    onChange={(e) =>
                      handleCurrencyInput(e.target.value, setExtraPayment)
                    }
                    className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN - Monthly Payment & Summary */}
      <div className="space-y-6">
        {/* Monthly Payment Card */}
        <div className="bg-[#F7F7F7] rounded-3xl p-6 sm:p-8 bg-[#FFFFFF]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img
                src="/pie.svg"
                alt="House"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <h2 className="text-lg sm:text-xl font-semibold">
                Monthly Payment
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Based on ${formatCurrency(homeValue)} home value
          </p>

          {/* Donut Chart */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Principal & Interest */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#E6FF4B"
                  strokeWidth="30"
                  strokeDasharray={`${piDash} ${circumference}`}
                  transform="rotate(-90 100 100)"
                />
                {/* Property Taxes */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#4169E1"
                  strokeWidth="30"
                  strokeDasharray={`${taxDash} ${circumference}`}
                  strokeDashoffset={-piDash}
                  transform="rotate(-90 100 100)"
                />
                {/* Home Insurance */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#FFA500"
                  strokeWidth="30"
                  strokeDasharray={`${insDash} ${circumference}`}
                  strokeDashoffset={-(piDash + taxDash)}
                  transform="rotate(-90 100 100)"
                />
                {/* PMI */}
                {calculations.monthlyPMI > 0 && (
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#FF4444"
                    strokeWidth="30"
                    strokeDasharray={`${pmiDash} ${circumference}`}
                    strokeDashoffset={-(piDash + taxDash + insDash)}
                    transform="rotate(-90 100 100)"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-gray-500">Est.</span>
                <span className="text-3xl sm:text-4xl font-bold">
                  ${formatCurrency(calculations.totalMonthly)}
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E6FF4B]"></span>
                <span className="text-sm">Principal & Interest</span>
              </div>
              <span className="font-semibold">
                ${formatCurrency(calculations.monthlyPI)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4169E1]"></span>
                <span className="text-sm">Property Taxes</span>
              </div>
              <span className="font-semibold">
                ${formatCurrency(calculations.monthlyTax)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFA500]"></span>
                <span className="text-sm">Home Insurance</span>
              </div>
              <span className="font-semibold">
                ${formatCurrency(calculations.monthlyInsurance)}
              </span>
            </div>
            {calculations.monthlyPMI > 0 && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF4444]"></span>
                  <span className="text-sm">PMI</span>
                </div>
                <span className="font-semibold">
                  ${formatCurrency(calculations.monthlyPMI)}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300 flex items-center justify-between">
            <p className="text-xs text-gray-400 flex items-center">
              <img
                src="/info.svg"
                alt="Info"
                className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
              />
              Estimates only
            </p>
            <p className="text-xs text-gray-400">Updated just now</p>
          </div>
        </div>

        {/* Loan Summary Card */}
        <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8">
          <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Loan Amount</span>
              <span className="font-semibold">
                ${formatCurrency(calculations.loanAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-600">Down Payment</span>
                <span className="text-xs text-gray-500 block">
                  ({calculations.downPaymentPercent}%)
                </span>
              </div>
              <span className="font-semibold">
                ${formatCurrency(downPayment)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Interest Paid</span>
              <span className="font-semibold">
                ${formatCurrency(calculations.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Est. Payoff Date</span>
              <span className="font-semibold">{calculations.payoffDate}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-300">
              <span className="text-base font-semibold">Cash to Close</span>
              <span className="text-2xl font-bold text-[#C0EE2B]">
                ${formatCurrency(calculations.cashToClose)}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#C0EE2B1A] rounded-3xl p-6 sm:p-8">
          <h4 className="font-semibold mb-2">Ready to move forward?</h4>
          <p className="text-sm text-gray-600 mb-4">
            Get pre-approved in as little as 3 minutes with no impact to your
            credit score.
          </p>
          <button onClick={()=>{router.push("/survey")}} className=" cursor-pointer w-full h-12 bg-[#C0EE2B] hover:bg-[#d4ed3a] text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            Start Pre-Approval
            <span>→</span>
          </button>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-xs text-gray-400 flex">
              <img src="info.svg" alt="" className="pr-2" /> Secure & Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCalculator;
