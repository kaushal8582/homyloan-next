"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import SurveyChatbot from "../Components/SurveyForm/SurveyChatbot";
import { submitSurvey } from "@/services/surveyApi";

// Saare Forms Import
import JourneyForm from "../Components/SurveyForm/Form1";
import TimeframeForm from "../Components/SurveyForm/Form2";
import StepThreeForm from "../Components/SurveyForm/Form3";
import PriceInputStep from "../Components/SurveyForm/Form4";
import HomeLocationForm from "../Components/SurveyForm/Form5";
import HomeTypeForm from "../Components/SurveyForm/Form5b";
import HomeUsageForm from "../Components/SurveyForm/Form5c";
import StepSixForm from "../Components/SurveyForm/Form6";
import ContactInfoStep from "../Components/SurveyForm/Form7";
import AddressTimelineStep from "../Components/SurveyForm/Form8";
import AddressFormStep from "../Components/SurveyForm/Form8b";
import StepNineForm from "../Components/SurveyForm/Form9";
import MainWrapper from "../Components/SurveyForm/Form10Wrapper";
import ContactInfoStart from "../Components/SurveyForm/Form11";
import FormStep12 from "../Components/SurveyForm/Form12";
import MarriedStatusForm from "../Components/SurveyForm/Form13";
import SpouseForm from "../Components/SurveyForm/Form14";
import TaxInputStep from "../Components/SurveyForm/Form15";
import FundsListingStep from "../Components/SurveyForm/Form16";
import CreditCheckIntro from "../Components/SurveyForm/Form17";

// Assets
import MainImg from "../assets/Subtract.svg";
import MainImg2 from "../assets/formImg.svg";



const SurveyForm = () => {
  const [searchParams] = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [stepCanProceed, setStepCanProceed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 21;

  // Pre-fill zip code from URL parameter
  useEffect(() => {
    const zipCodeFromUrl = searchParams?.get?.("zipCode");
    if (zipCodeFromUrl) {
      // Validate and set zip code in formData (5 or 6 digits)
      const cleanedZip = zipCodeFromUrl.replace(/[\s-]/g, '');
      if (/^\d{5,6}$/.test(cleanedZip)) {
        setFormData((prev) => ({ ...prev, zip: cleanedZip }));
      }
    }
  }, [searchParams]);

  const buildSubmissionData = (data) => {
    const isTownhome = data.homeType === "townhome";
    const mailingAddress =
      data.mailingAddressConfirm === 1
        ? {
            street: data.street ?? "",
            apt: data.apt ?? "",
            city: data.city ?? "",
            state: data.state ?? "",
            zip: data.zip ?? "",
          }
        : {
            street: data.mailingStreet ?? "",
            apt: data.mailingApt ?? "",
            city: data.mailingCity ?? "",
            state: data.mailingState ?? "",
            zip: data.mailingZip ?? "",
          };

    const agentContact =
      data.workingWithAgent === 1
        ? {
            firstName: data.agentFirstName ?? "",
            lastName: data.agentLastName ?? "",
            email: data.agentEmail ?? "",
            phone: data.agentPhone ?? "",
          }
        : null;

    const journeyLabels = {
      1: "Looking at homes & listings",
      2: "I signed a purchase agreement",
      3: "Offer pending / found a house",
    };
    const timeframeLabels = {
      1: "Within 30 days",
      2: "Within 2-3 months",
      3: "Within 6 months",
    };
    const usageTypeLabels = {
      primary: "Primary Residence",
      secondary: "Secondary Residence",
      investment: "Investment Property",
      1: "Primary Residence",
      2: "Secondary Residence",
      3: "Investment Property",
    };
    const yesNoLabels = { 1: "Yes", 2: "No" };
    const militaryAffiliationLabels = {
      1: "No, I haven't served",
      2: "Yes, I'm currently serving",
      3: "Yes, I served in the past",
      4: "Yes, I'm a surviving spouse",
    };
    const serviceTypeLabels = {
      1: "Regular military",
      2: "Reserves",
      3: "National Guard",
    };
    const fundsSourceLabels = {
      1: "My financial account",
      2: "Gifts",
    };
    const addressTimelineLabels = {
      1: "Own",
      2: "Rent",
      3: "i don't own or rent",
    };
    const homePriceLabels = {
      1: "0k to 300k",
      2: "300k to 500k",
      3: "500k to 1m",
      4: "1m+",
    };

    const journey =
      data.journey != null ? journeyLabels[data.journey] ?? data.journey : data.journey;
    const timeframe =
      data.timeframe != null ? timeframeLabels[data.timeframe] ?? data.timeframe : data.timeframe;
    const usageType =
      data.usageType != null
        ? usageTypeLabels[data.usageType] ?? (typeof data.usageType === "string" ? data.usageType : null)
        : data.usageType;
    const workingWithAgent =
      data.workingWithAgent != null ? yesNoLabels[data.workingWithAgent] ?? data.workingWithAgent : data.workingWithAgent;
    const mailingAddressConfirm =
      data.mailingAddressConfirm != null
        ? yesNoLabels[data.mailingAddressConfirm] ?? data.mailingAddressConfirm
        : data.mailingAddressConfirm;
    const militaryAffiliation =
      data.militaryAffiliation != null
        ? militaryAffiliationLabels[data.militaryAffiliation] ?? data.militaryAffiliation
        : data.militaryAffiliation;
    const serviceType =
      data.serviceType != null ? serviceTypeLabels[data.serviceType] ?? data.serviceType : data.serviceType;
    const marriedStatus =
      data.married != null ? yesNoLabels[data.married] ?? data.married : (data.marriedStatus ?? data.married);
    const fundsSource =
      data.fundsSource != null ? fundsSourceLabels[data.fundsSource] ?? data.fundsSource : data.fundsSource;
    const addressTimeline =
      data.timeline != null ? addressTimelineLabels[data.timeline] ?? data.timeline : (data.addressTimeline ?? data.timeline);
    const homePrice =
      typeof data.homePrice === "number"
        ? homePriceLabels[data.homePrice] ?? data.homePrice
        : data.homePrice;

    const military = {
      affiliation: data.militaryAffiliation != null ? militaryAffiliationLabels[data.militaryAffiliation] ?? data.militaryAffiliation : null,
      etsDate: data.militaryAffiliation === 2 ? (data.etsDate ?? "") : undefined,
      branchOfService: [3, 4].includes(data.militaryAffiliation) ? (data.branchOfService ?? "") : undefined,
      serviceType: data.serviceType != null && [3, 4].includes(data.militaryAffiliation) ? (serviceTypeLabels[data.serviceType] ?? data.serviceType) : null,
    };
    if (military.etsDate === undefined) delete military.etsDate;
    if (military.branchOfService === undefined) delete military.branchOfService;
    if (military.serviceType === undefined) delete military.serviceType;

    return {
      ...data,
      journey,
      timeframe,
      usageType,
      workingWithAgent,
      mailingAddressConfirm,
      militaryAffiliation,
      serviceType,
      marriedStatus,
      fundsSource,
      addressTimeline,
      homePrice,
      units: isTownhome ? data.units ?? "" : null,
      mailingAddress,
      agentContact,
      military,
    };
  };

  const handleSubmit = async () => {
    // Prevent multiple submissions
    if (isSubmitted || isSubmitting) {
      return;
    }

    const finalPayload = buildSubmissionData(formData);
    
    // Log for debugging
    console.log("Survey form data (raw):", formData);
    console.log("Survey form data (final):", finalPayload);
    
    setIsSubmitting(true);
    
    try {
      const response = await submitSurvey(finalPayload);
      console.log("Survey submitted successfully:", response);
      
      // Mark as submitted
      setIsSubmitted(true);
      
      // Prevent browser back navigation
      window.history.pushState(null, "", window.location.href);
      
      // Show success message and redirect
      alert("Thank you! Your survey has been submitted successfully.");
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        router.replace("/");
      }, 500);
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert(`Failed to submit survey: ${error.message || "Please try again."}`);
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleDataChange = (data) =>
    setFormData((prev) => ({ ...prev, ...data }));
  const formProps = {
    formData,
    onNext: handleNext,
    onDataChange: handleDataChange,
    onValidityChange: setStepCanProceed,
  };

  const validationSteps = [4, 5, 9, 11, 12, 14, 15, 19];

  // Reset stepCanProceed when entering non-validation step
  React.useEffect(() => {
    if (!validationSteps.includes(currentStep)) setStepCanProceed(true);
    else if (currentStep === 9) {
      const filled =
        (formData.agentFirstName ?? '').trim() !== '' &&
        (formData.agentLastName ?? '').trim() !== '' &&
        (formData.agentEmail ?? '').trim() !== '' &&
        (formData.agentPhone ?? '').trim() !== '';
      setStepCanProceed(filled);
    } else if (currentStep === 12) {
      const confirm = formData.mailingAddressConfirm;
      if (confirm === 1) setStepCanProceed(true);
      else if (confirm === 2) {
        const mailingValid =
          (formData.mailingStreet ?? '').trim() !== '' &&
          (formData.mailingCity ?? '').trim() !== '' &&
          (formData.mailingState ?? '').trim() !== '' &&
          (formData.mailingZip ?? '').trim() !== '';
        setStepCanProceed(mailingValid);
      } else setStepCanProceed(false);
    }
  }, [currentStep, formData.agentFirstName, formData.agentLastName, formData.agentEmail, formData.agentPhone, formData.mailingAddressConfirm, formData.mailingStreet, formData.mailingCity, formData.mailingState, formData.mailingZip]);

  // Scroll to top when step changes (Next, Back, or child-triggered navigation)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Back Step Handler
  const handleBack = () => {
    // Prevent going back after submission
    if (isSubmitted) {
      return;
    }
    
    if (currentStep <= 1) return;
    if (currentStep === 10) {
      setCurrentStep(formData.workingWithAgent === 1 ? 9 : 8);
      return;
    }
    if (currentStep === 18) {
      setCurrentStep(formData.married === 1 ? 17 : 16);
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  // Prevent browser back navigation after submission
  useEffect(() => {
    if (isSubmitted) {
      // Push a new state to prevent back navigation
      window.history.pushState(null, "", window.location.href);
      
      const handlePopState = (e) => {
        if (isSubmitted) {
          window.history.pushState(null, "", window.location.href);
          router.replace("/");
        }
      };

      window.addEventListener("popstate", handlePopState);
      
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isSubmitted]);

  // Progress percentage calculation
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  // Form Rendering Logic (1 question per page, serial steps)
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <JourneyForm {...formProps} />;
      case 2:
        return <TimeframeForm {...formProps} />;
      case 3:
        return <StepThreeForm {...formProps} />;
      case 4:
        return <PriceInputStep {...formProps} />;
      case 5:
        return <HomeLocationForm {...formProps} />;
      case 6:
        return <HomeTypeForm {...formProps} />;
      case 7:
        return <HomeUsageForm {...formProps} />;
      case 8:
        return (
          <StepSixForm
            {...formProps}
            onNext={(agentChoice) => {
              handleDataChange({ workingWithAgent: agentChoice });
              setCurrentStep(agentChoice === 1 ? 9 : 10);
            }}
          />
        );
      case 9:
        return <ContactInfoStep {...formProps} />;
      case 10:
        return <AddressTimelineStep {...formProps} />;
      case 11:
        return <AddressFormStep {...formProps} />;
      case 12:
        return <StepNineForm {...formProps} />;
      case 13:
        return (
          <MainWrapper>
            {/* <img src={MainImg} alt="main" /> */}
            <div className="flex flex-col items-start p-0 gap-[36px] w-full max-w-[750px]">
              <div className="flex flex-col items-start p-0 gap-[16px] w-full self-stretch">
                <h1 className="text-[#171A1F] text-[45px] font-bold leading-[60px] tracking-[-0.9px]">
                  Next, we'll need some personal info
                </h1>
                <p className="text-[#565D6D] text-[18px] font-normal leading-[28px]">
                  These are standard questions to verify that you're you.
                  Everything you enter is completely secure.
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between mt-5">
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-[130px] h-[48px] bg-white border-2 border-[#DEE1E6] rounded-[16px] hover:bg-[#F3F4F6]"
              >
                <ChevronLeft size={16} className="text-[#171A1F] mr-1" />
                <span className="text-[16px] font-medium text-[#171A1F]">
                  Back
                </span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center justify-center w-[163px] h-[48px] bg-[#000510] rounded-[16px] shadow-lg"
              >
                <span className="text-[16px] font-medium text-white mr-1">
                  Next Step
                </span>
                <ChevronRight size={16} className="text-white" />
              </button>
            </div>
          </MainWrapper>
        );
      case 14:
        return <ContactInfoStart {...formProps} />;
      case 15:
        return <FormStep12 {...formProps} />;
      case 16:
        return (
          <MarriedStatusForm
            {...formProps}
            onNext={(marriedChoice) => {
              handleDataChange({ married: marriedChoice });
              setCurrentStep(marriedChoice === 1 ? 17 : 18);
            }}
          />
        );
      case 17:
        return <SpouseForm {...formProps} />;
      case 18:
        return (
          <MainWrapper>
            {/* <img src={MainImg2} alt="main2" /> */}
            <div className="flex flex-col items-start p-0 gap-[36px] w-full max-w-[750px]">
              <div className="flex flex-col items-start p-0 gap-[16px] w-full self-stretch">
                <h1 className="text-[#171A1F] text-[45px] font-bold leading-[60px] tracking-[-0.9px]">
                  On to the finances!
                </h1>
                <p className="text-[#565D6D] text-[18px] font-normal leading-[28px]">
                  We'll ask a few questions about your income and available
                  funds. Estimates are okay for now.
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between mt-5">
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-[130px] h-[48px] bg-white border-2 border-[#DEE1E6] rounded-[16px] hover:bg-[#F3F4F6]"
              >
                <ChevronLeft size={16} /> <span className="ml-1">Back</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center justify-center w-[163px] h-[48px] bg-[#000510] rounded-[16px] shadow-lg"
              >
                <span className="text-white">Next Step</span>{" "}
                <ChevronRight size={16} className="text-white" />
              </button>
            </div>
          </MainWrapper>
        );
      case 19:
        return <TaxInputStep {...formProps} />;
      case 20:
        return <FundsListingStep {...formProps} />;
      case 21:
        return <CreditCheckIntro {...formProps} />;
      default:
        return <JourneyForm />;
    }
  };

  const isWrapperStep = currentStep === 13 || currentStep === 18;

  // Steps with selectors: user selects option → auto-navigate, Next is hidden
  // Form9 (12) and Form12 (15) have conditional follow-ups → show Next, validate before proceeding
  const selectorSteps = [1, 2, 3, 4, 6, 7, 8, 10, 16, 17, 20];
  const hideNextButton = selectorSteps.includes(currentStep);
  const isValidationStep = validationSteps.includes(currentStep);
  // Step 12 (mailing address): Yes → auto-advance, no Next; No → show Next with form (enabled when valid)
  const showNext = !hideNextButton && (currentStep !== 12 || formData.mailingAddressConfirm === 2);

  return (
    <div>
      <Navbar />
      <div className=" w-full p-[15px] lg:p-[60px]">
        <div className="flex flex-col lg:flex-row w-full mt-[100px]">
          {/* LEFT SIDE: Chatbot only */}
          <div className="lg:w-[30%] w-full flex flex-col items-center">
            <SurveyChatbot currentStep={currentStep} />
          </div>

          {/* RIGHT SIDE: Form Rendering */}
          <div className="lg:w-[70%] w-full">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#171A1F] mb-2">Thank You!</h2>
                <p className="text-lg text-[#565D6D] mb-4">Your survey has been submitted successfully.</p>
                <p className="text-sm text-[#565D6D]">Redirecting you to the home page...</p>
              </div>
            ) : (
              renderForm()
            )}

            {!isWrapperStep && !isSubmitted && (
              <div className="w-full max-w-[1000px] pl-[40px] mt-8 m-auto">
                {/* Progress Bar - above buttons */}
                <div className="relative w-[80%] h-[76px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[14px] font-medium text-[#565D6D]">
                      Progress
                    </span>
                    <span className="text-[14px] font-medium text-[#565D6D]">
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="relative w-full h-[42px] flex items-center">
                    <div className="w-full h-[12px] bg-[#D9D9D9] rounded-[6px] overflow-hidden">
                      <div
                        className="h-full bg-[#E6FF4B] transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-[-10px]">
                    <p className="text-[12px] font-normal text-[#565D6D]">
                      Step {currentStep} of {totalSteps}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1 || isSubmitted}
                  className={`flex items-center justify-center w-[130px] h-[48px] bg-white border-2 border-[#DEE1E6] rounded-[16px] transition-all ${currentStep === 1 || isSubmitted ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F3F4F6]"}`}
                >
                  <ChevronLeft size={16} className="text-[#171A1F] mr-1" />
                  <span className="text-[16px] font-medium text-[#171A1F]">
                    Back
                  </span>
                </button>
                {showNext && (
                  <button
                    onClick={handleNext}
                    disabled={(isValidationStep && !stepCanProceed) || (currentStep === totalSteps && (isSubmitting || isSubmitted)) || isSubmitted}
                    className={`flex items-center justify-center w-[163px] h-[48px] rounded-[16px] shadow-lg transition-all ${currentStep === totalSteps ? "bg-green-600 hover:bg-green-700" : "bg-[#000510] hover:bg-[#1a1f2b]"} ${(isValidationStep && !stepCanProceed) || (currentStep === totalSteps && (isSubmitting || isSubmitted)) || isSubmitted ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span className="text-[16px] font-medium text-white mr-1">
                      {currentStep === totalSteps 
                        ? (isSubmitting ? "Submitting..." : isSubmitted ? "Submitted" : "Submit") 
                        : "Next Step"}
                    </span>
                    {currentStep !== totalSteps && (
                      <ChevronRight size={16} className="text-white" />
                    )}
                  </button>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyForm;
