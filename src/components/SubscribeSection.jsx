"use client";

import { useState } from 'react';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // API base URL - use environment variable or fallback to localhost:3000
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const API_URL = `${API_BASE_URL}/api/subscription`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email.trim()) {
      setMessage('Email is required');
      setMessageType('error');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please provide a valid email address');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle different error status codes
        throw new Error(data.error || 'Subscription failed');
      }

      // Success
      setMessage('Successfully subscribed!');
      setMessageType('success');
      setEmail(''); // Clear input after successful subscription
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);

    } catch (error) {
      // Handle network errors or API errors
      setMessage(error.message || 'Network error. Please try again.');
      setMessageType('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#E6FF4B] py-12 sm:py-16 md:py-20 flex flex-col items-center px-4 sm:px-6">
      <h2 className="font-['General_Sans_Variable'] font-semibold text-[clamp(2rem,5vw,3.4375rem)] leading-[1.1] text-center text-black max-w-[90vw] sm:max-w-none">
        Get all Magazines Into
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>Your Inbox
      </h2>

      <form 
        onSubmit={handleSubmit}
        className="mt-6 sm:mt-8 md:mt-10 w-full max-w-[495px] flex flex-col items-center"
      >
        <div className="flex sm:flex-row items-center bg-[#f4f4f4] border border-[#D4D4D4] rounded-[145px] w-full h-auto sm:h-[60px] overflow-hidden gap-3 sm:gap-0 px-3 sm:p-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
            className="flex-1 w-full sm:w-auto h-[50px] sm:h-full px-4 sm:px-6 font-['General_Sans_Variable'] font-normal text-[14px] sm:text-[16px] text-black outline-none placeholder:text-[#000000] bg-transparent disabled:opacity-60"
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-[112px] sm:w-[116px] h-[40px] bg-black text-white rounded-[145px] sm:mr-1.5 font-['General_Sans_Variable'] font-semibold text-[14px] sm:text-[16px] leading-[1] flex items-center justify-center hover:bg-gray-900 transition-colors duration-200 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {/* Message display */}
        {message && (
          <div 
            className={`mt-4 px-4 py-2 rounded-lg text-sm font-['General_Sans_Variable'] text-center max-w-full ${
              messageType === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
