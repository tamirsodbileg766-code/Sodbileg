import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Telescope, Sparkles, RefreshCw, Atom, ShieldAlert, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'model',
    text: 'Сайн уу! Намайг Содбилэг гэдэг. 🚀🔭 Би 13 настай, одон орон ба физикт маш их сонирхолтой. Надаас сансар огторгуй, хар нүх, физикийн гайхалтай онолууд болон суралцах талаар асуугаарай!',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const SUGGESTIONS = [
  'Хар нүх (Black Hole) хэрхэн үүсдэг вэ?',
  'Ангараг дээр амьдрах боломжтой юу?',
  'Эйнштейний харьцангуйн онолыг энгийнээр тайлбарлаач',
  'Сансар огторгуйн хамгийн сонирхолтой баримт юу вэ?',
];

export const MeAiChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
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
      setHasUnread(false);
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

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
          persona: 'me',
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
      console.error('Me-AI Chat error:', err);
      setError(err.message || 'Сүлжээний алдаа гарлаа.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setError(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Messenger Popup Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] max-w-[calc(100vw-2.5rem)] bg-[#111111] text-white border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-indigo-500/20 bg-gradient-to-r from-zinc-900 via-[#181824] to-zinc-900 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-indigo-400 bg-indigo-950 text-indigo-300 flex items-center justify-center font-bold shadow-sm">
                  <Telescope className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#111111] rounded-full" />
              </div>

              <div>
                <h4 className="font-unbounded font-bold text-xs sm:text-sm tracking-tight text-white flex items-center gap-1.5">
                  Содбилэг (Me-AI)
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                </h4>
                <p className="text-[10px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                  <Atom className="w-3 h-3 text-indigo-400" />
                  <span>13 настай • Одон орон & Физик</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                title="Чатыг дахин эхлүүлэх"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleToggle}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                title="Буулгах"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader Badge */}
          <div className="px-3 py-1.5 bg-indigo-500/10 border-b border-indigo-500/20 text-[10px] text-indigo-200 flex items-center justify-between shrink-0">
            <span>🌌 Астрофизикийн сонирхолтой асуултуудад хариулна</span>
            <span className="font-mono text-[9px] text-zinc-400">Gemini AI</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#0d0d12] text-xs">
            {messages.map((msg) => {
              const isMe = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {!isMe ? (
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5 shadow-sm">
                      ST
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-200 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5 border border-zinc-700">
                      ТА
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-indigo-600 text-white font-medium rounded-tr-none shadow-sm'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none whitespace-pre-line shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className={`text-[9px] text-zinc-500 px-1 ${isMe ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5 animate-pulse">
                  ST
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 text-xs text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-zinc-400 ml-1">Содбилэг хариулж байна...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px]">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="px-3 py-2 bg-zinc-950 border-t border-zinc-800/80 overflow-x-auto whitespace-nowrap flex items-center gap-1.5 text-[11px] shrink-0 no-scrollbar">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s)}
                disabled={isLoading}
                className="px-2.5 py-1 bg-zinc-900 border border-indigo-500/30 hover:border-indigo-400 hover:text-indigo-300 text-zinc-300 text-[10px] rounded-full transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Содбилэгээс физик, сансрын тухай асуу..."
              disabled={isLoading}
              className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-indigo-400 text-white placeholder-zinc-500 text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all cursor-pointer shrink-0"
              aria-label="Илгээх"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Messenger Icon Button */}
      <button
        onClick={handleToggle}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/20"
        aria-label="Me-AI чат нээх"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        )}

        {/* Unread indicator badge */}
        {hasUnread && !isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 border-2 border-[#111111] rounded-full animate-bounce" />
        )}

        {/* Tooltip on Desktop */}
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-zinc-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:flex items-center gap-1.5">
            <span>Содбилэгийн AI туслахтай чатлах</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </div>
        )}
      </button>
    </div>
  );
};
