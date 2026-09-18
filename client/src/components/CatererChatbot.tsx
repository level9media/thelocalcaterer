import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { MessageSquare, X, Send, Loader2, ChevronDown, Phone } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING = "Hi! 👋 I'm the assistant for The Local Caterer. I can help with pricing questions, menu options, availability, and booking. What can I help you with today?";

const QUICK_REPLIES = [
  "What events do you cater?",
  "How do I get a quote?",
  "What areas do you serve?",
  "Do you do weddings?",
];

export default function CatererChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = trpc.chat.message.useMutation();
  const captureLead = trpc.chat.captureLead.useMutation();

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    analytics.ctaClick("chatbot-open", "floating-button");
  };

  const handleSend = async (text?: string) => {
    const userMessage = (text || input).trim();
    if (!userMessage || isTyping) return;

    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);

    // Show lead form after 3 user messages if not captured yet
    if (!leadCaptured && newMessages.filter((m) => m.role === "user").length >= 3) {
      setTimeout(() => setShowLeadForm(true), 500);
    }

    try {
      const result = await sendMessage.mutateAsync({
        messages: newMessages,
      });
      const assistantContent = typeof result.content === "string" ? result.content : "I'm sorry, I couldn't process that. Please call us at (480) 718-1671.";
      setMessages([...newMessages, { role: "assistant", content: assistantContent }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please call us at (480) 718-1671 or visit our contact page.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email) return;

    try {
      await captureLead.mutateAsync({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        message: messages.map((m) => `${m.role}: ${m.content}`).join("\n"),
      });
      setLeadCaptured(true);
      setShowLeadForm(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Thanks, ${leadData.name.split(" ")[0]}! We have your info and will follow up shortly. In the meantime, feel free to keep asking questions or call us at (480) 718-1671.`,
        },
      ]);
    } catch {
      // Silently fail — don't interrupt the chat
      setLeadCaptured(true);
      setShowLeadForm(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#2D6A4F" }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageSquare size={22} className="text-white" />
        )}
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">1</span>
          </span>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: "520px", backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#2D6A4F" }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <MessageSquare size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                The Local Caterer
              </p>
              <p className="text-white/70 text-xs">Typically replies instantly</p>
            </div>
            <a
              href="tel:+14807181671"
              className="flex items-center gap-1 text-white/80 hover:text-white text-xs transition-colors"
              onClick={() => analytics.phoneClick()}
            >
              <Phone size={12} /> Call
            </a>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white ml-1">
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm"
                      : "text-gray-800 rounded-bl-sm"
                  }`}
                  style={{
                    backgroundColor: msg.role === "user" ? "#2D6A4F" : "#F3F4F6",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Lead capture form */}
            {showLeadForm && !leadCaptured && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-2">
                <p className="text-xs font-semibold text-green-800 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Want us to follow up with a quote?
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email address *"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 text-xs py-2 rounded-lg text-white font-medium transition-colors"
                      style={{ backgroundColor: "#2D6A4F" }}
                    >
                      Get a Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowLeadForm(false); setLeadCaptured(true); }}
                      className="text-xs px-3 py-2 rounded-lg text-gray-500 hover:text-gray-700"
                    >
                      Skip
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies (only on first message) */}
          {messages.length === 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="text-xs px-3 py-1.5 rounded-full border border-green-200 text-green-700 hover:bg-green-50 transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t border-gray-100">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Type a message..."
                className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                style={{ backgroundColor: "#2D6A4F" }}
              >
                {isTyping ? (
                  <Loader2 size={15} className="text-white animate-spin" />
                ) : (
                  <Send size={15} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
