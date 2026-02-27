import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Plus, Check } from 'lucide-react';
import { getAutocompletePredictions, getPlaceDetails } from '@/services/googleApi';

const StepNineForm = ({ formData = {}, onNext, onDataChange, onValidityChange }) => {
  const [selected, setSelected] = useState(formData.mailingAddressConfirm ?? null);

  const [mailingAddress, setMailingAddress] = useState({
    mailingStreet: formData.mailingStreet ?? '',
    mailingApt: formData.mailingApt ?? '',
    mailingCity: formData.mailingCity ?? '',
    mailingState: formData.mailingState ?? '',
    mailingZip: formData.mailingZip ?? (formData.zip ?? ''),
  });

  // Pre-fill mailingZip from zip code if available and mailingZip is empty
  useEffect(() => {
    if (formData.zip && !formData.mailingZip && !mailingAddress.mailingZip) {
      setMailingAddress((prev) => ({ ...prev, mailingZip: formData.zip }));
    }
  }, [formData.zip]);

  const [autocompleteInput, setAutocompleteInput] = useState(formData.mailingStreet ?? '');
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
  const debounceTimerRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Sync autocompleteInput with mailingAddress.mailingStreet when address changes externally
  useEffect(() => {
    if (mailingAddress.mailingStreet && !autocompleteInput) {
      setAutocompleteInput(mailingAddress.mailingStreet);
    }
  }, [mailingAddress.mailingStreet]);

  const update = (key, value) =>
    setMailingAddress((prev) => ({ ...prev, [key]: value }));

  // Handle autocomplete input with debouncing
  const handleAutocompleteInput = async (value) => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!value || value.length < 2) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsLoadingPredictions(true);
    
    // Debounce API calls
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await getAutocompletePredictions(value);
        setPredictions(results);
        setShowPredictions(results.length > 0);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPredictions([]);
        setShowPredictions(false);
      } finally {
        setIsLoadingPredictions(false);
      }
    }, 300);
  };

  // Handle prediction selection
  const handleSelectPrediction = async (prediction) => {
    setShowPredictions(false);
    setPredictions([]);

    try {
      const placeDetails = await getPlaceDetails(prediction.placeId);
      if (placeDetails) {
        setMailingAddress({
          mailingStreet: placeDetails.street || '',
          mailingApt: placeDetails.apt || '',
          mailingCity: placeDetails.city || '',
          mailingState: placeDetails.state || '',
          mailingZip: placeDetails.zip || '',
        });
        setAutocompleteInput(placeDetails.street || prediction.description);
      } else {
        setAutocompleteInput(prediction.description);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      setAutocompleteInput(prediction.description);
    }
  };

  // Close predictions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowPredictions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        ...formData,
        mailingAddressConfirm: selected,
        ...mailingAddress,
      });
    }
  }, [selected, mailingAddress]);

  const canProceed = () => {
    if (!selected) return false;
    if (selected === 1) return true; // Yes - same address
    if (selected === 2) {
      return !!(
        mailingAddress.mailingStreet?.trim() &&
        mailingAddress.mailingCity?.trim() &&
        mailingAddress.mailingState?.trim() &&
        mailingAddress.mailingZip?.trim()
      );
    }
    return false;
  };

  useEffect(() => {
    onValidityChange?.(canProceed());
  }, [selected, mailingAddress]);

  const currentAddressText =
    [
      formData.street,
      formData.city,
      formData.state,
      formData.zip,
    ]
      .filter(Boolean)
      .join(", ") || "your current address";

  const options = [
    {
      id: 1,
      title: "Yes",
      icon: <CheckCircle className="text-[#1E2128]" size={28} />,
    },
    {
      id: 2,
      title: "No",
      // Plus icon rotated 45deg as per your Figma 'plus-circle' spec
      icon: <Plus className="text-[#1E2128] rotate-45" size={28} />,
    }
  ];

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      
      {/* Frame 1171275639 - Title Section */}
      <div className="w-full max-w-[664px] mb-12">
        <h1 className="text-[32px] sm:text-[45px] font-bold text-[#171A1F] leading-tight sm:leading-[60px] tracking-[-0.9px]">
        Is {currentAddressText} your mailing address?
        </h1>
      </div>

      {/* Frame 1 - Cards Container (Gap 16px) */}
      <div className="flex flex-col gap-4 w-full sm:w-[750px]">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => {
              setSelected(option.id);
              if (option.id === 1) onNext?.();
            }}
            className={`
              relative flex items-center h-[100px] px-[22px] cursor-pointer
              bg-white border-2 rounded-[16px] transition-all duration-200
              ${selected === option.id 
                ? 'border-[#E6FF4B] shadow-lg scale-[1.01]' 
                : 'border-[#DEE1E6]'}
              shadow-[0px_1px_2.5px_rgba(23,26,31,0.07),0px_0px_2px_rgba(23,26,31,0.08)]
            `}
          >
            {/* Icon Container (Frame 1171275640 context) */}
            <div className="w-[56px] h-[56px] bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0">
              {option.icon}
            </div>

            {/* Title */}
            <span className="ml-[20px] text-[16px] font-medium text-[#171A1F] leading-[24px]">
              {option.title}
            </span>

            {/* Custom Radio/Check Circle (Rectangle Spec) */}
            <div className={`
              absolute right-[30px] w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
              ${selected === option.id 
                ? 'bg-[#E6FF4B] border-[#E6FF4B]' 
                : 'border-[rgba(86,93,109,0.3)]'}
            `}>
              {selected === option.id && <Check size={14} className="text-black font-bold" />}
            </div>
          </div>
        ))}
      </div>

        {selected === 2 && (

      <div className="flex flex-col items-start   max-w-4xl mt-5">
      <div className="w-full sm:w-[750px] mb-2 mt-10">
        <div className="mb-8 ">
          <h2 className="text-[25px] font-semibold text-black leading-[34px]">Got it. What’s your mailing address?
          </h2>
          {/* <WhyAskedDisclosure
            question="What if I pay to live somewhere but I'm not on a lease?"
            variant="muted"
            className="opacity-70 mt-3"
          /> */}
          
        </div>
        <div className="flex flex-col gap-4">
          <div ref={autocompleteRef} className="relative w-full">
            <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
              <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">Street Address</label>
              <input
                type="text"
                placeholder="Start typing your address..."
                value={autocompleteInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setAutocompleteInput(value);
                  update('mailingStreet', value);
                  handleAutocompleteInput(value);
                }}
                onFocus={() => {
                  if (predictions.length > 0) {
                    setShowPredictions(true);
                  }
                }}
                className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
              />
            </div>
            {showPredictions && (
              <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#DEE1E6] rounded-[16px] shadow-lg max-h-[300px] overflow-y-auto">
                {isLoadingPredictions ? (
                  <div className="p-4 text-center text-[#A1A1A1]">Loading...</div>
                ) : predictions.length > 0 ? (
                  predictions.map((prediction, index) => (
                    <div
                      key={prediction.placeId || index}
                      onClick={() => handleSelectPrediction(prediction)}
                      className="px-[34px] py-3 cursor-pointer hover:bg-[#F3F4F6] transition-colors border-b border-[#DEE1E6] last:border-b-0"
                    >
                      <div className="text-[16px] font-medium text-[#171A1F]">
                        {prediction.description}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-[#A1A1A1]">No results found</div>
                )}
              </div>
            )}
          </div>
          <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
            <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">Apt, Suite, Unit (optional)</label>
            <input
              type="text"
              placeholder="Apt, Sui ..."
              value={mailingAddress.mailingApt}
              onChange={(e) => update('mailingApt', e.target.value)}
              className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
            />
          </div>
          <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
            <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">City</label>
            <input
              type="text"
              placeholder="Enter City"
              value={mailingAddress.mailingCity}
              onChange={(e) => update('mailingCity', e.target.value)}
              className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
            />
          </div>
          <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
            <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">Select a State</label>
            <input
              type="text"
              placeholder="Select a State"
              value={mailingAddress.mailingState}
              onChange={(e) => update('mailingState', e.target.value)}
              className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
            />
          </div>
          <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
            <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">Zip Code</label>
            <input
              type="text"
              placeholder="Enter Zip Code"
              value={mailingAddress.mailingZip}
              onChange={(e) => update('mailingZip', e.target.value)}
              className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
            />
          </div>
          {/* <WhyAskedDisclosure
            question="What about other home types?"
            variant="muted"
            className="opacity-70"
          /> */}
        </div>
      </div>
   
   
    </div>
        )}
    </div>
  );
};

export default StepNineForm;
