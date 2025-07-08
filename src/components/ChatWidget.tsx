// @/components/ChatWidget.tsx
'use client';
import { useState, useEffect } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Preserve draft on reopen
  useEffect(() => {
    const draft = localStorage.getItem('chatDraft');
    if (draft) setMessage(draft);
  }, [isOpen]);

  const handleSubmit = () => {
    setIsSending(true);
    // Send message logic
    setTimeout(() => {
      setIsSending(false);
      setMessage('');
      localStorage.removeItem('chatDraft');
      setIsOpen(false);
    }, 1000);
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          aria-label="Open chat"
        >
          <FiMessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-80 h-96 bg-white dark:bg-slate-800 rounded-xl shadow-xl flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Support Chat</h3>
            <button 
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FiX className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Chat messages would go here */}
            <div className="text-center py-12 text-slate-500">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500 mx-auto mb-4"></div>
              Connecting to support agent...
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  localStorage.setItem('chatDraft', e.target.value);
                }}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                disabled={isSending}
              />
              <button
                onClick={handleSubmit}
                disabled={isSending || !message.trim()}
                className="px-4 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 disabled:opacity-50"
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}