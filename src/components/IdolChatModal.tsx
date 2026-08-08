import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Trophy, RefreshCw, Sparkles, MessageSquare, ShieldCheck, Flame } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

interface IdolChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'model',
    text: 'Сайн уу! Би Лионель Месси байна. ⚽️🏆 Хөлбөмбөг, бэлтгэл сургуулилт, эсвэл зорилгодоо хүрэхийн тулд хэрхэн тууштай байх талаар чамтай ярилцахад бэлэн байна. Надаас юу ч асууж болно!',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const SUGGESTIONS = [
  'Хөлбөмбөгийн замналаа хэрхэн эхлүүлсэн бэ?',
  '2022 оны Дэлхийн аваргад түрүүлсэн мэдрэмж ямар байсан бэ?',
  'Бэрхшээлтэй үед хэрхэн шантрахгүй байх вэ?',
  'Даруу зан болон багаар ажиллахын үнэ цэнэ юу вэ?',
];

export const IdolChatModal: React.FC<IdolChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const apiMessages = updatedMessages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: 'idol',
          messages: apiMessages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Хариу авахад алдаа гарлаа.');
      }

      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('Idol Chat error:', err);
      setError(err.message || 'Сүлжээний алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className="bg-[#111111] text-white w-full max-w-3xl h-[90vh] max-h-[750px] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-gradient-to-r from-zinc-900 via-[#161616] to-zinc-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 overflow-hidden bg-zinc-800 flex items-center justify-center text-amber-400 shadow-md">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#111111] rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-unbounded font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                  Lionel Messi
                  <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                </h3>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full hidden sm:inline-block">
                  Idol Coach
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Онлайн
                </span>
                <span>•</span>
                <span>FIFA World Cup 2022 Champion 🏆</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Чат цэвэрлэх"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider">Шинэчлэх</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Заавар хаах"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-[11px] text-amber-200/90 flex items-center justify-between shrink-0 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Мессийн сургаал, туршлагад тулгуурласан урам зориг өгөх AI дасгалжуулагч</span>
          </div>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden md:inline">Gemini 3.6 Flash</span>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#0d0d0d]">
          {messages.map((msg) => {
            const isMe = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isMe ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-black flex items-center justify-center shrink-0 shadow-md font-bold text-xs mt-1">
                    LM
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 border border-zinc-700">
                    ТА
                  </div>
                )}

                <div className={`max-w-[82%] sm:max-w-[75%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-amber-500 text-black font-medium rounded-tr-none shadow-md'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none whitespace-pre-line shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-zinc-500 px-1 ${isMe ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-black flex items-center justify-center shrink-0 font-bold text-xs mt-1 animate-pulse">
                LM
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-zinc-400 font-medium ml-1">Месси бодож байна...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => handleSendMessage()}
                className="text-rose-400 underline font-bold hover:text-rose-200 cursor-pointer text-xs"
              >
                Дахин оролдох
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <div className="px-4 py-2.5 bg-zinc-950 border-t border-zinc-800/80 overflow-x-auto whitespace-nowrap flex items-center gap-2 text-xs shrink-0 no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-amber-400/80 shrink-0 flex items-center gap-1">
            <Flame className="w-3 h-3" /> Асуулт:
          </span>
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(s)}
              disabled={isLoading}
              className="px-3 py-1 bg-zinc-900 border border-zinc-700/60 hover:border-amber-400 hover:text-amber-300 text-zinc-300 text-[11px] rounded-full transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Лионель Мессигээс асуух зүйлээ бичнэ үү..."
            disabled={isLoading}
            className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-amber-400 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-black p-3 rounded-xl transition-all font-bold cursor-pointer shrink-0 shadow-md"
            aria-label="Илгээх"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
