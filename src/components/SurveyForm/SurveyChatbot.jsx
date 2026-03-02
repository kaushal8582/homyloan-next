"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mic, Send } from "lucide-react";
import axios from "axios";
import HomyGif from "../../assets/homy.gif";
import { isValidPhone } from "./validation";

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

const SurveyChatbot = ({ currentStep = 1, onQuickSelect }) => {
  const pathname = usePathname();
  const STORAGE_KEY = `${STORAGE_KEY_PREFIX}${pathname}`;

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "You are Homy, a friendly home-buying assistant. Be concise, warm, and helpful." },
  ]);
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
    if (typeof textOrEvent === "string" && text !== "Custom") onQuickSelect?.(text);

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

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
    <>
      <div className="w-[15rem] h-[15rem] flex items-center justify-center relative">
        <Image
          src={HomyGif}
          fill
          alt="Homy assistant"
          className="object-contain select-none"
        />
      </div>

      <div
        style={{ borderTopLeftRadius: "0px" }}
        className="rounded-[16px] border border-[#DEE1E680] p-6"
      >
        <h3 className="text-[14px] leading-6 font-[500] px-5">Welcome</h3>
        <p className="text-[16px] font-[400] text-[#62626E] leading-[130%] mt-[3px] px-5">
          Hi, Its me Homy. you can ask me questions at any time and I am happy
          to help.
        </p>
        <div className="relative w-full flex flex-col items-center">
          {/* Chat messages - bubble UI + scroll */}
          <div
            ref={scrollContainerRef}
            className="mb-4 w-[333px] min-h-[80px] max-h-[220px] overflow-y-auto overflow-x-hidden px-2 flex flex-col gap-3 text-sm scroll-smooth"
          >
            {visibleMessages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                    m.role === "user"
                      ? "bg-[#101011] text-white rounded-br-md"
                      : "bg-[#F3F4F6] text-[#171A1F] rounded-bl-md"
                  }`}
                >
                  <span className="text-[13px] leading-[1.4]">{m.content}</span>
                </div>
              </div>
            ))}

            {/* AI typing bubble with animated dots */}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-[#F3F4F6] text-[#171A1F] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                  <span className="flex gap-1">
                    <span
                      className="w-2 h-2 rounded-full bg-[#565D6D] animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[#565D6D] animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[#565D6D] animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Phone Error Message */}
          {phoneError && (
            <div className="mb-3 px-4 py-2 bg-red-50 border border-red-200 rounded-lg w-[333px]">
              <p className="text-red-600 text-sm">{phoneError}</p>
            </div>
          )}

          {/* Quick reply options (selector when 2 options like Hi/Hello or Purchase/Refinance) */}
          {quickReplies && quickReplies.length > 0 && !chatLoading && (
            <div className="flex flex-wrap justify-center gap-2 mb-3 w-[333px]">
              {quickReplies.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => sendMessage(label)}
                  className="px-4 py-2 rounded-full border-2 border-[#DEE1E6] bg-white text-[#171A1F] text-[13px] font-medium hover:border-[#E6FF4B] hover:bg-[#FAFFE6] transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Input pill */}
          <div className="relative flex items-center w-[333px] h-[56px] bg-white shadow-[5px_4px_20px_rgba(0,0,0,0.13)] rounded-[30px] pl-[22px]">
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
              className="w-[160px] text-[13px] font-medium outline-none bg-transparent"
            />

            <button className="absolute right-[70px] text-[#CECECE]" type="button" aria-label="Mic">
              <Mic size={24} />
            </button>

            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={chatLoading}
              className="absolute right-[18px] w-[33px] h-[33px] bg-[#101011] rounded-full flex items-center justify-center disabled:opacity-50"
            >
              <Send size={16} fill="#E6FF4B" className="text-[#E6FF4B]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyChatbot;
