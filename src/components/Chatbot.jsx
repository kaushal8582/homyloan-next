"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mic, Send } from "lucide-react";
import axios from "axios";
import HomyGif from "../assets/homy.gif";
import { isValidPhone } from "./SurveyForm/validation";

const SYSTEM_PROMPT = `You are Homy, a friendly and professional mortgage and loan information assistant for Homy Loan.

Identity Rules
• Your name is Homy.
• Never say you are ChatGPT, AI, or a language model.
• Always refer to yourself as Homy.

Scope Limitation
• You may only answer questions related to mortgages, home loans, refinancing, rates, payments, and lending basics.
• If a user asks anything outside of mortgages or loans, respond politely with something like:

"Sorry, I can only help with mortgage and loan questions."

"I'm not sure about that, but I'd be happy to help with anything mortgage-related."

Conversation Style
• Be warm, friendly, and conversational at all times.
• Personalize every interaction.
• At the start of the conversation, ask:

"Hi! I'm Homy  What's your first name?"
• After receiving the name, respond positively (example: "That's great, Sarah!") and then ask:

"What's the best phone number to reach you?"
• Use the user's first name naturally throughout the conversation.

Question Control
• Allow only one question at a time.
• If the user asks multiple questions in one message, politely ask them to choose one question before continuing.
• Always wait for the user's response before moving forward.

Rate & Payment Requests
• If the user asks about mortgage rates, interest rates, or payments, do not provide a rate immediately.
• Ask the following questions one at a time, using friendly language such as "That's great!" or "Perfect!":

What state is the property located in?

What's your estimated credit score range?

Is this a purchase or a refinance?

What's the estimated loan amount?

What type of property is it?

Will it be owner-occupied, a second home, or an investment?

Providing the Rate
• Do not give a summary or recap.
• Do not say "summary."
• When providing an estimate, say only:

"Based on what you've shared, your estimated rate range may be around X%–Y%."

Required Disclaimer (Must Always Be Included With Any Rate)

"This is not an exact or guaranteed rate. Mortgage rates depend on multiple factors including credit profile, income, assets, loan structure, property details, market conditions, and lender guidelines. Final terms are subject to full application, underwriting, and approval.

By continuing, you agree to our terms: https://homyloan.com/terms"

Compliance & Safety
• Never promise approval, guaranteed rates, or specific loan terms.
• Never request sensitive personal information (Social Security number, full date of birth, bank account numbers).
• Information provided is for general informational purposes only and is not a loan commitment.

Always remain friendly, professional, compliant, and consumer-focused.`;

// Derive quick-reply buttons from AI's last message. Order of checks matters (more specific first).
function getQuickRepliesFromLastMessage(chatMessages) {
  const lastAssistant = [...chatMessages]
    .filter((m) => m.role === "assistant")
    .pop();
  if (!lastAssistant || !lastAssistant.content) return [];

  const text = lastAssistant.content.toLowerCase();
  const originalContent = lastAssistant.content;

  // Check for questions with **bold** formatting (e.g., "Is this going to be a **conventional**, **FHA**, **VA**, or **USDA** loan?")
  const boldPattern = /\*\*([^*]+)\*\*/g;
  const boldMatches = [...originalContent.matchAll(boldPattern)];
  
  if (boldMatches.length > 0) {
    // Extract all bold terms and return them as options
    const options = boldMatches.map(match => match[1].trim());
    if (options.length > 0) {
      return options;
    }
  }

  // No buttons when AI asks for first name or your name — user types their actual name.
  if (text.includes("first name") || text.includes("your name")) {
    return [];
  }

  // 1. Opening: "buy a home, refinance, or estimate a monthly payment?"
  if (
    (text.includes("estimate") || text.includes("monthly payment")) &&
    (text.includes("buy") || text.includes("refinance"))
  ) {
    return ["Buy a home", "Refinance", "Estimate payment"];
  }

  // 2. "Purchase or refinance" / "buy a home or refinance" (without estimate)
  if (
    (text.includes("purchase") && text.includes("refinance")) ||
    (text.includes("buy") && text.includes("refinance") && text.includes("home"))
  ) {
    return ["Purchase", "Refinance"];
  }

  // 3. Loan amount
  if (text.includes("loan amount") || text.includes("estimated loan amount")) {
    return ["0-300k", "300k-500k", "500k-1m", "1m+"];
  }

  // 4. Credit score range
  if (text.includes("credit score range") || text.includes("estimated credit score")) {
    return ["580-619", "620-679", "680-739", "740+"];
  }

  // 5. Type of property — single-family, condo, townhouse, multi-unit
  if (
    text.includes("type of property") ||
    (text.includes("single-family") && text.includes("condo")) ||
    text.includes("townhouse") ||
    text.includes("multi-unit")
  ) {
    return ["Single-family", "Condo", "Townhouse", "Multi-unit"];
  }

  // 6. Owner-occupied, second home, or investment
  if (
    text.includes("owner-occupied") ||
    text.includes("second home") ||
    text.includes("investment property")
  ) {
    return ["Owner-occupied", "Second home", "Investment"];
  }

  // State, loan amount, phone, etc. — no buttons (user types)
  return [];
}

const STORAGE_KEY_PREFIX = "homyConversationId_";
const INITIAL_MESSAGES = [
  { role: "system", content: "You are Homy, a friendly home-buying assistant. Be concise, warm, and helpful." },
];

const Chatbot = () => {
  const pathname = usePathname();
  const STORAGE_KEY = `${STORAGE_KEY_PREFIX}${pathname}`;

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
  const [chatLoading, setChatLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [waitingForPhone, setWaitingForPhone] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const conversationIdRef = useRef(null);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const navEntry = performance.getEntriesByType?.("navigation")?.[0];
    const isReload = navEntry?.type === "reload";
    if (isReload) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) conversationIdRef.current = stored;
    }
  }, [STORAGE_KEY]);

  const quickReplies = getQuickRepliesFromLastMessage(chatMessages);

  const startNewChat = () => {
    conversationIdRef.current = null;
    sessionStorage.removeItem(STORAGE_KEY);
    setConversationId(null);
    setChatMessages([...INITIAL_MESSAGES]);
    setChatInput("");
    setPhoneError("");
    setWaitingForPhone(false);
  };

  const scrollToBottom = () => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, chatLoading]);

  const sendMessage = async (textOrEvent) => {
    const text = typeof textOrEvent === "string" ? textOrEvent.trim() : chatInput.trim();
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/dfcfb193-762a-49d3-9169-7b786c37d699',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'5e2d67'},body:JSON.stringify({sessionId:'5e2d67',location:'Chatbot.jsx:sendMessage:entry',message:'sendMessage called',data:{textLength:text?.length,hasText:!!text},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    if (!text) return;

    // Check if the last assistant message is asking for a phone number
    const lastAssistant = [...chatMessages]
      .filter((m) => m.role === "assistant")
      .pop();
    
    const isPhoneQuestion = lastAssistant?.content && (
      lastAssistant.content.toLowerCase().includes("phone number") ||
      lastAssistant.content.toLowerCase().includes("best phone") ||
      lastAssistant.content.toLowerCase().includes("reach you") ||
      (lastAssistant.content.toLowerCase().includes("phone") && 
       (lastAssistant.content.toLowerCase().includes("what") || 
        lastAssistant.content.toLowerCase().includes("your")))
    );

    const isNameQuestion = lastAssistant?.content && (
      lastAssistant.content.toLowerCase().includes("first name") ||
      lastAssistant.content.toLowerCase().includes("your name")
    );

    // If we're waiting for a phone number or this is a phone question, validate it
    if (waitingForPhone || isPhoneQuestion) {
      if (!isValidPhone(text)) {
        setPhoneError("Please enter a valid phone number (at least 10 digits). I need this to continue.");
        setWaitingForPhone(true);
        return;
      }
      // Valid phone number provided, clear waiting state
      setWaitingForPhone(false);
      setPhoneError("");
    }

    const updatedMessages = [
      ...chatMessages,
      { role: "user", content: text },
    ];

    setChatMessages(updatedMessages);
    setChatInput("");
    setPhoneError("");
    setChatLoading(true);

    const idForThisRequest = conversationIdRef.current || conversationId || crypto.randomUUID();
    conversationIdRef.current = idForThisRequest;
    sessionStorage.setItem(STORAGE_KEY, idForThisRequest);
    const payload = {
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...updatedMessages.filter((m) => m.role !== "system"),
      ],
      conversationId: idForThisRequest,
      ...(isNameQuestion && text && { userName: text.trim() }),
      ...((waitingForPhone || isPhoneQuestion) && isValidPhone(text) && { userPhone: text.trim() }),
    };

    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/dfcfb193-762a-49d3-9169-7b786c37d699',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'5e2d67'},body:JSON.stringify({sessionId:'5e2d67',location:'Chatbot.jsx:payloadBuilt',message:'payload built before request',data:{conversationId:idForThisRequest,messagesCount:payload.messages?.length},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    // console.log("payload", payload);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
      const res = await axios.post(`${apiBaseUrl}/api/chat`, payload);

      const assistantReply = res.data.reply;
      const newConversationId = res.data.conversationId;
      if (newConversationId) {
        conversationIdRef.current = newConversationId;
        sessionStorage.setItem(STORAGE_KEY, newConversationId);
        setConversationId(newConversationId);
      }
      setChatMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
      
      // Check if the new assistant message is asking for a phone number
      const newIsPhoneQuestion = assistantReply && (
        assistantReply.toLowerCase().includes("phone number") ||
        assistantReply.toLowerCase().includes("best phone") ||
        assistantReply.toLowerCase().includes("reach you") ||
        (assistantReply.toLowerCase().includes("phone") && 
         (assistantReply.toLowerCase().includes("what") || 
          assistantReply.toLowerCase().includes("your")))
      );
      
      if (newIsPhoneQuestion) {
        setWaitingForPhone(true);
      }
    } catch (err) {
      console.error("Chat error", err);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const visibleMessages = chatMessages.filter((m) => m.role !== "system");

  return (
    <div className="w-full bg-white py-4 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 flex items-center justify-center flex-shrink-0 relative">
            <Image
              src={HomyGif}
              alt="Homy assistant"
              fill
              className="object-contain select-none"
            />
          </div>
          <div className="text-center md:text-left px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#101011] mb-1 sm:mb-2">
              Welcome
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#62626E] leading-relaxed max-w-2xl">
              Hi, It's me Homy. You can ask me questions at any time and I am happy to help.
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl border border-[#DEE1E680] shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
          {/* <div className="flex justify-end mb-2 sm:mb-3">
            <button
              type="button"
              onClick={startNewChat}
              className="text-xs sm:text-sm font-medium text-[#62626E] hover:text-[#101011] underline focus:outline-none focus:ring-2 focus:ring-[#E6FF4B] rounded px-1 py-0.5"
            >
              New chat
            </button>
          </div> */}
          {/* Chat messages - bubble UI + scroll */}
          <div
            ref={scrollContainerRef}
            className="mb-4 sm:mb-6 w-full min-h-[180px] sm:min-h-[200px] md:min-h-[250px] max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px] overflow-y-auto overflow-x-hidden px-2 sm:px-3 md:px-4 flex flex-col gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base scroll-smooth"
          >
            {visibleMessages.length === 0 ? (
              <div className="text-center text-gray-500 py-6 sm:py-8">
                <p className="text-xs sm:text-sm md:text-base">Start a conversation with Homy!</p>
              </div>
            ) : (
              visibleMessages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl ${
                      m.role === "user"
                        ? "bg-[#101011] text-white rounded-br-md"
                        : "bg-[#F3F4F6] text-[#171A1F] rounded-bl-md"
                    }`}
                  >
                    <span className="text-xs sm:text-[13px] md:text-[14px] lg:text-[15px] leading-[1.4] sm:leading-[1.5] break-words whitespace-pre-wrap">
                      {m.content}
                    </span>
                  </div>
                </div>
              ))
            )}

            {/* AI typing bubble with animated dots */}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-[#F3F4F6] text-[#171A1F] rounded-xl sm:rounded-2xl rounded-bl-md px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-4 flex items-center gap-1">
                  <span className="flex gap-1">
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#565D6D] animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#565D6D] animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#565D6D] animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply options */}
          {quickReplies && quickReplies.length > 0 && !chatLoading && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3 mb-3 sm:mb-4 md:mb-6 w-full px-1">
              {quickReplies.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => sendMessage(label)}
                  className="px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full border-2 border-[#DEE1E6] bg-white text-[#171A1F] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-medium hover:border-[#E6FF4B] hover:bg-[#FAFFE6] active:scale-95 transition-all touch-manipulation min-h-[36px] sm:min-h-[40px]"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Phone Error Message */}
          {phoneError && (
            <div className="mb-3 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{phoneError}</p>
            </div>
          )}

          {/* Input pill */}
          <div className="relative flex items-center w-full h-[48px] sm:h-[52px] md:h-[56px] lg:h-[60px] xl:h-[64px] bg-white shadow-[5px_4px_20px_rgba(0,0,0,0.13)] rounded-[24px] sm:rounded-[26px] md:rounded-[28px] lg:rounded-[30px] pl-3 sm:pl-4 md:pl-5 lg:pl-6 xl:pl-8 pr-3 sm:pr-4 md:pr-5 lg:pr-6 xl:pr-8">
            <input
              ref={inputRef}
              type="text"
              value={chatInput}
              onChange={(e) => {
                setChatInput(e.target.value);
                if (phoneError) setPhoneError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message…"
              className="flex-1 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-medium outline-none bg-transparent pr-2 sm:pr-3 md:pr-4"
            />

            <button 
              className="text-[#CECECE] hover:text-[#101011] active:scale-95 transition-all touch-manipulation mr-1 sm:mr-2 md:mr-3 lg:mr-4 p-1" 
              type="button" 
              aria-label="Mic"
            >
              <Mic size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={chatLoading}
              className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] md:w-[33px] md:h-[33px] lg:w-[36px] lg:h-[36px] xl:w-[40px] xl:h-[40px] bg-[#101011] rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-[#1a1a1a] active:scale-95 transition-all touch-manipulation"
            >
              <Send size={14} fill="#E6FF4B" className="text-[#E6FF4B] sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
