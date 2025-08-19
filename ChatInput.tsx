
import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';
import LoadingIcon from './icons/LoadingIcon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="p-4 border-t border-gray-800 bg-gray-950">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="أدخل أمرك هنا..."
          className="flex-1 bg-gray-900 rounded-lg p-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingIcon /> : <SendIcon />}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;